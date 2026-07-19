"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Copy, Check, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import type { PersonalInfo } from "@/lib/data";
import type { Certification, Project, SkillCategory } from "@/types";

const CATEGORIES: SkillCategory[] = ["security", "network", "systems", "cloud", "tools", "scripting"];

// Sécurité : le terminal ne fait QUE du pattern matching sur cette liste
// fermée — aucune évaluation de code, aucun accès dynamique. Toute entrée
// non reconnue tombe sur "command not found".
const KNOWN_COMMANDS = ["skills", "certifications", "certifs", "contact", "projects", "help", "clear"] as const;

interface JsonMeta {
  url: string;
  status: number;
  ms: number;
}

// Omit<> sur une union ne distribue pas : on définit la charge utile à part
type EntryPayload =
  | { kind: "input"; text: string }
  | { kind: "lines"; lines: string[] }
  | { kind: "error"; text: string }
  | { kind: "json"; json: unknown; meta: JsonMeta };

type Entry = EntryPayload & { id: number };

// Coloration JSON minimaliste sans dépendance : tokenisation regex vers des
// <span> React (jamais de dangerouslySetInnerHTML)
const JSON_TOKEN = /("(?:[^"\\]|\\.)*")(\s*:)?|(\btrue\b|\bfalse\b|\bnull\b)|(-?\d+(?:\.\d+)?)/g;

function JsonView({ value }: { value: unknown }) {
  const text = JSON.stringify(value, null, 2);
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(JSON_TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(<span key={key++}>{text.slice(last, index)}</span>);
    if (match[1] !== undefined) {
      nodes.push(
        <span key={key++} className={match[2] ? "text-cyan-600 dark:text-cyan-300" : "text-violet-600 dark:text-violet-300"}>
          {match[1]}
        </span>
      );
      if (match[2]) nodes.push(<span key={key++}>{match[2]}</span>);
    } else if (match[3] !== undefined) {
      nodes.push(
        <span key={key++} className="text-amber-600 dark:text-amber-300">
          {match[3]}
        </span>
      );
    } else if (match[4] !== undefined) {
      nodes.push(
        <span key={key++} className="text-amber-600 dark:text-amber-300">
          {match[4]}
        </span>
      );
    }
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(<span key={key++}>{text.slice(last)}</span>);
  return <pre className="whitespace-pre-wrap break-words">{nodes}</pre>;
}

export function SkillsTerminal({
  certifications,
  featuredProjects,
  personalInfo,
}: {
  certifications: Certification[];
  featuredProjects: Project[];
  personalInfo: PersonalInfo;
}) {
  const { t, tx } = useI18n();
  const reduce = useReducedMotion();

  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const nextId = useRef(0);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = (entry: EntryPayload) => {
    setEntries((prev) => [...prev, { ...entry, id: nextId.current++ }]);
  };

  // Suivi du bas du terminal à chaque nouvelle entrée
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  // Fetch réel vers la route API publique, temps de réponse mesuré (pas
  // inventé) via performance.now() autour de l'appel
  const runEndpoint = async (category: string) => {
    const url = `/api/skills/${encodeURIComponent(category)}`;
    push({ kind: "input", text: `curl ${url}` });
    setBusy(true);
    const t0 = performance.now();
    try {
      const res = await fetch(url);
      const ms = Math.max(1, Math.round(performance.now() - t0));
      const json = await res.json();
      push({ kind: "json", json, meta: { url, status: res.status, ms } });
    } catch {
      push({ kind: "error", text: t.skills.terminal.fetchError });
    } finally {
      setBusy(false);
    }
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd || busy) return;
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(null);
    setInput("");

    const [name, ...args] = cmd.split(/\s+/);
    const lower = name.toLowerCase();

    if (!(KNOWN_COMMANDS as readonly string[]).includes(lower)) {
      push({ kind: "input", text: cmd });
      push({ kind: "error", text: `${t.skills.terminal.notFound} ${name} — ${t.skills.terminal.notFoundHint}` });
      return;
    }

    switch (lower) {
      case "clear":
        setEntries([]);
        return;
      case "skills":
        // Réutilise l'API réelle du point 1 — la réponse affichée est le
        // vrai JSON servi par /api/skills/[category]
        void runEndpoint(args[0]?.toLowerCase() ?? "all");
        return;
      case "certifications":
      case "certifs":
        push({ kind: "input", text: cmd });
        push({
          kind: "lines",
          lines: certifications.map((c) => `• ${tx(c.name)} — ${c.issuer} (${c.date})`),
        });
        return;
      case "contact":
        push({ kind: "input", text: cmd });
        push({
          kind: "lines",
          lines: [
            `email     ${personalInfo.email}`,
            `tél       ${personalInfo.phone}`,
            `zone      ${tx(personalInfo.location)}`,
            t.skills.terminal.contactHint,
          ],
        });
        return;
      case "projects":
        push({ kind: "input", text: cmd });
        push({
          kind: "lines",
          lines: featuredProjects.map((p) => `• ${tx(p.title)}  →  /projects/${p.slug}`),
        });
        return;
      case "help":
        push({ kind: "input", text: cmd });
        push({ kind: "lines", lines: t.skills.terminal.help });
        return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
      return;
    }
    // Navigation dans l'historique, comme un vrai shell
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(idx);
      setInput(history[idx]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const idx = historyIndex + 1;
      if (idx >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(idx);
        setInput(history[idx]);
      }
    }
  };

  const copyJson = (id: number, json: unknown) => {
    navigator.clipboard.writeText(JSON.stringify(json, null, 2)).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 2000);
    });
  };

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-5xl mx-auto mt-14 lg:mt-16"
    >
      {/* Fenêtre terminal — suit désormais le thème actif (variables
          sémantiques bg-card/text-foreground/border-border, comme le reste
          du site) plutôt qu'une palette zinc figée ; les accents
          violet/cyan restent identiques dans les deux thèmes. */}
      <div className="rounded-2xl border border-border/60 bg-card text-foreground overflow-hidden shadow-[0_8px_40px_rgba(139,92,246,0.08)]">
        {/* Barre de titre */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-muted/80">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </span>
          <span className="font-mono text-xs text-muted-foreground truncate">{t.skills.terminal.title}</span>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
            <span className={cn("w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400", !reduce && "animate-pulse")} />
            {t.skills.terminal.online}
          </span>
        </div>

        {/* Endpoints cliquables */}
        <div className="px-4 pt-3 pb-2 border-b border-border/70">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 font-mono">
            {t.skills.terminal.endpointsLabel}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                disabled={busy}
                onClick={() => runEndpoint(cat)}
                className="font-mono text-xs px-2.5 py-1 rounded-md border border-border text-foreground hover:border-violet-500/60 hover:text-violet-600 dark:hover:text-violet-300 hover:bg-violet-500/10 transition-colors disabled:opacity-50"
              >
                <span className="text-cyan-600 dark:text-cyan-400">GET</span> /api/skills/{cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sortie */}
        <div
          ref={outputRef}
          className="px-4 py-3 h-72 sm:h-80 overflow-y-auto font-mono text-[12.5px] leading-relaxed space-y-2"
          onClick={() => inputRef.current?.focus()}
        >
          <p className="text-muted-foreground">{t.skills.terminal.welcome1}</p>
          <p className="text-muted-foreground">{t.skills.terminal.welcome2}</p>

          {entries.map((entry) => {
            if (entry.kind === "input") {
              return (
                <p key={entry.id} className="text-foreground">
                  <span className="text-cyan-600 dark:text-cyan-400">visitor@portfolio</span>
                  <span className="text-muted-foreground">:~$</span> {entry.text}
                </p>
              );
            }
            if (entry.kind === "error") {
              return (
                <p key={entry.id} className="text-red-600 dark:text-red-400">
                  {entry.text}
                </p>
              );
            }
            if (entry.kind === "lines") {
              return (
                <div key={entry.id} className="text-foreground">
                  {entry.lines.map((line, i) => (
                    <p key={i} className="whitespace-pre-wrap break-words">
                      {line}
                    </p>
                  ))}
                </div>
              );
            }
            return (
              <div key={entry.id} className="rounded-lg border border-border bg-muted/60">
                <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border text-[11px] flex-wrap">
                  <span className={entry.meta.status < 400 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                    {entry.meta.status}
                  </span>
                  <span className="text-muted-foreground truncate">{entry.meta.url}</span>
                  {/* Temps réellement mesuré autour du fetch */}
                  <span className="text-violet-600 dark:text-violet-300">{entry.meta.ms} ms</span>
                  <button
                    type="button"
                    onClick={() => copyJson(entry.id, entry.json)}
                    className="ml-auto inline-flex items-center gap-1 text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                  >
                    {copiedId === entry.id ? <Check size={12} /> : <Copy size={12} />}
                    {copiedId === entry.id ? t.skills.terminal.copied : t.skills.terminal.copy}
                  </button>
                </div>
                <div className="px-3 py-2 max-h-64 overflow-y-auto text-foreground">
                  <JsonView value={entry.json} />
                </div>
              </div>
            );
          })}

          {busy && <p className="text-muted-foreground">…</p>}
        </div>

        {/* Ligne de commande */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-muted/50">
          <TerminalSquare size={14} className="text-violet-500 dark:text-violet-400 flex-shrink-0" aria-hidden="true" />
          <span className="font-mono text-xs sm:text-[12.5px] whitespace-nowrap">
            <span className="text-cyan-600 dark:text-cyan-400">visitor@portfolio</span>
            <span className="text-muted-foreground">:~$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.skills.terminal.placeholder}
            aria-label={t.skills.terminal.inputLabel}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            className="flex-1 min-w-0 bg-transparent font-mono text-[13px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none caret-cyan-500"
          />
        </div>
      </div>
    </motion.div>
  );
}
