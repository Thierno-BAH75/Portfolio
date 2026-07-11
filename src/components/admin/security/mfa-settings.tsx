"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ShieldOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Factor = { id: string; status: string; factorType: string };

export function MfaSettings() {
  const [loading, setLoading] = useState(true);
  const [factors, setFactors] = useState<Factor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Flux d'enrôlement
  const [enrolling, setEnrolling] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [pendingFactorId, setPendingFactorId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);

  const [unenrollTarget, setUnenrollTarget] = useState<Factor | null>(null);
  const [unenrolling, setUnenrolling] = useState(false);

  const refreshFactors = async () => {
    const supabase = createSupabaseBrowserClient();
    const { data, error: listError } = await supabase.auth.mfa.listFactors();
    if (listError) {
      setError(listError.message);
      return;
    }
    setFactors(
      (data?.totp ?? []).map((f) => ({ id: f.id, status: f.status, factorType: "totp" }))
    );
  };

  useEffect(() => {
    refreshFactors().finally(() => setLoading(false));
  }, []);

  const verifiedFactor = factors.find((f) => f.status === "verified");

  const startEnrollment = async () => {
    setError(null);
    setSuccess(null);
    setEnrolling(true);
    const supabase = createSupabaseBrowserClient();

    // Nettoie tout facteur laissé "unverified" par une tentative abandonnée
    // — Supabase refuse un nouvel enroll() tant qu'il traîne.
    const stale = factors.filter((f) => f.status !== "verified");
    for (const f of stale) {
      await supabase.auth.mfa.unenroll({ factorId: f.id });
    }

    const { data, error: enrollError } = await supabase.auth.mfa.enroll({ factorType: "totp" });
    if (enrollError || !data) {
      setError(enrollError?.message ?? "Impossible de démarrer l'activation.");
      setEnrolling(false);
      return;
    }
    setPendingFactorId(data.id);
    setQrCode(data.totp.qr_code);
    setSecret(data.totp.secret);
  };

  const cancelEnrollment = async () => {
    if (pendingFactorId) {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.mfa.unenroll({ factorId: pendingFactorId });
    }
    setEnrolling(false);
    setQrCode(null);
    setSecret(null);
    setPendingFactorId(null);
    setCode("");
  };

  const verifyEnrollment = async () => {
    if (!pendingFactorId || code.trim().length !== 6) return;
    setError(null);
    setVerifying(true);
    const supabase = createSupabaseBrowserClient();

    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId: pendingFactorId,
    });
    if (challengeError || !challenge) {
      setError(challengeError?.message ?? "Échec du challenge MFA.");
      setVerifying(false);
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId: pendingFactorId,
      challengeId: challenge.id,
      code: code.trim(),
    });
    setVerifying(false);
    if (verifyError) {
      setError("Code invalide. Réessayez.");
      return;
    }

    setSuccess("Authentification à deux facteurs activée.");
    setEnrolling(false);
    setQrCode(null);
    setSecret(null);
    setPendingFactorId(null);
    setCode("");
    await refreshFactors();
  };

  const confirmUnenroll = async () => {
    if (!unenrollTarget) return;
    setUnenrolling(true);
    const supabase = createSupabaseBrowserClient();
    const { error: unenrollError } = await supabase.auth.mfa.unenroll({ factorId: unenrollTarget.id });
    setUnenrolling(false);
    if (unenrollError) {
      setError(unenrollError.message);
      return;
    }
    setUnenrollTarget(null);
    setSuccess("Authentification à deux facteurs désactivée.");
    await refreshFactors();
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 size={14} className="animate-spin" />
        Chargement…
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-500">
          {success}
        </div>
      )}

      {verifiedFactor ? (
        <div className="flex items-center justify-between rounded-xl border border-green-500/30 bg-green-500/5 p-4">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-green-500" />
            <div>
              <p className="text-sm font-medium">2FA activée</p>
              <p className="text-xs text-muted-foreground">Un code TOTP est demandé à chaque connexion.</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="hover:text-red-400 hover:border-red-500/50"
            onClick={() => setUnenrollTarget(verifiedFactor)}
          >
            <ShieldOff size={14} />
            Désactiver
          </Button>
        </div>
      ) : enrolling && qrCode ? (
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <p className="text-sm text-muted-foreground">
            Scannez ce QR code avec Google Authenticator, Authy ou toute application TOTP, puis entrez le
            code à 6 chiffres généré.
          </p>
          <div className="flex justify-center">
            {/* Data URI fourni par Supabase — pas d'appel externe */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrCode} alt="QR code MFA" className="w-48 h-48 rounded-lg border border-border" />
          </div>
          {secret && (
            <p className="text-xs text-muted-foreground text-center break-all">
              Clé manuelle : <span className="font-mono">{secret}</span>
            </p>
          )}
          <div className="flex items-center gap-2 max-w-xs mx-auto">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              className="text-center font-mono tracking-widest"
              maxLength={6}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button size="sm" onClick={verifyEnrollment} disabled={verifying || code.length !== 6}>
              {verifying ? "Vérification…" : "Confirmer"}
            </Button>
            <Button size="sm" variant="outline" onClick={cancelEnrollment} disabled={verifying}>
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <ShieldOff size={20} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">2FA désactivée</p>
              <p className="text-xs text-muted-foreground">Recommandé pour sécuriser cet accès admin.</p>
            </div>
          </div>
          <Button size="sm" onClick={startEnrollment}>
            <ShieldCheck size={14} />
            Activer 2FA
          </Button>
        </div>
      )}

      <ConfirmDialog
        open={!!unenrollTarget}
        onOpenChange={(open) => !open && setUnenrollTarget(null)}
        title="Désactiver la 2FA ?"
        description="La connexion ne demandera plus de code TOTP après le mot de passe."
        confirmLabel="Désactiver"
        loading={unenrolling}
        onConfirm={confirmUnenroll}
      />
    </div>
  );
}
