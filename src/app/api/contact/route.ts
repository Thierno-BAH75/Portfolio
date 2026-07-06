import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { makeContactSchema } from "@/lib/contact-schema";

// Rate-limiting basique en mémoire (par IP) — suffisant pour un process Node
// unique. Sur du serverless multi-instance (Vercel, etc.), cet état n'est pas
// partagé entre instances : à remplacer par un store partagé (Redis/Upstash)
// si le trafic ou les abus le justifient.
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !contactEmail) {
    console.error(
      "[api/contact] Configuration manquante : RESEND_API_KEY et/ou CONTACT_EMAIL absents de l'environnement. " +
        "Ajoutez-les dans .env.local (voir .env.example)."
    );
    return NextResponse.json(
      { error: "server_not_configured" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = makeContactSchema().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: email,
      subject: `Nouveau message via portfolio — ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #1a1a1a;">
          <h2 style="margin-bottom: 4px;">Nouveau message depuis le portfolio</h2>
          <p style="color: #666; margin-top: 0;">Sujet : ${escapeHtml(subject)}</p>
          <table style="border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 4px 12px 4px 0; color: #666;">Nom</td>
              <td style="padding: 4px 0;"><strong>${escapeHtml(name)}</strong></td>
            </tr>
            <tr>
              <td style="padding: 4px 12px 4px 0; color: #666;">Email</td>
              <td style="padding: 4px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
            </tr>
          </table>
          <div style="padding: 16px; background: #f5f5f5; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(message)}</div>
        </div>
      `,
    });

    if (error) {
      console.error("[api/contact] Échec d'envoi Resend :", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[api/contact] Erreur inattendue lors de l'envoi :", err);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
