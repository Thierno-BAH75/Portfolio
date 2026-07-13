"use client";

import React from "react";

// Rendu Markdown léger, dédié aux bulles de l'assistant de chat. Volontairement
// minimal (aucune dépendance) et calibré pour l'espacement compact d'une bulle
// — contrairement à MarkdownContent (src/components/projects), pensé pour les
// grandes pages projet (titres larges, bordures, couleurs atténuées).
//
// Couvre ce que le LLM émet réellement : **gras** et `code` en ligne, titres
// courts en gras sur leur propre ligne, puces (« - », « * » ou « • »), listes
// numérotées (« 1. ») et paragraphes séparés par une ligne vide.

// ── Inline : **gras** et `code` ────────────────────────────────────────
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|`([^`]+)`/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-b${i}`} className="font-semibold text-foreground">
          {match[1]}
        </strong>
      );
    } else {
      nodes.push(
        <code
          key={`${keyPrefix}-c${i}`}
          className="rounded bg-foreground/10 px-1 py-0.5 font-mono text-[0.85em]"
        >
          {match[2]}
        </code>
      );
    }
    last = match.index + match[0].length;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

type ListState =
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: { num: string; text: string }[] }
  | null;

// Une ligne entièrement en gras (sans autre astérisque à l'intérieur) est
// traitée comme un titre de section — c'est ainsi que le LLM sépare ses
// parties. « **Label :** suite de phrase » n'entre pas ici (astérisques non
// terminaux) et reste un paragraphe à gras en ligne.
const HEADING_RE = /^\*\*([^*]+?)\*\*:?$/;
const BULLET_RE = /^[-*•]\s+(.*)$/;
const ORDERED_RE = /^(\d+)[.)]\s+(.*)$/;

export function ChatMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: ListState = null;

  const flushList = (key: string) => {
    if (!list) return;
    if (list.type === "ul") {
      blocks.push(
        <ul key={key} className="my-1.5 space-y-1">
          {list.items.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-violet-400" />
              <span>{renderInline(item, `${key}-${idx}`)}</span>
            </li>
          ))}
        </ul>
      );
    } else {
      blocks.push(
        <ol key={key} className="my-1.5 space-y-1">
          {list.items.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="shrink-0 font-semibold text-violet-400">{item.num}.</span>
              <span>{renderInline(item.text, `${key}-${idx}`)}</span>
            </li>
          ))}
        </ol>
      );
    }
    list = null;
  };

  lines.forEach((raw, i) => {
    const line = raw.trim();
    const bullet = line.match(BULLET_RE);
    const ordered = line.match(ORDERED_RE);
    const heading = !bullet && HEADING_RE.exec(line);

    if (line === "") {
      flushList(`f${i}`);
    } else if (heading) {
      flushList(`f${i}`);
      blocks.push(
        <p key={i} className="mt-2.5 font-semibold text-foreground first:mt-0">
          {heading[1]}
        </p>
      );
    } else if (bullet) {
      if (list?.type !== "ul") {
        flushList(`f${i}`);
        list = { type: "ul", items: [] };
      }
      list.items.push(bullet[1]);
    } else if (ordered) {
      if (list?.type !== "ol") {
        flushList(`f${i}`);
        list = { type: "ol", items: [] };
      }
      list.items.push({ num: ordered[1], text: ordered[2] });
    } else {
      flushList(`f${i}`);
      blocks.push(
        <p key={i} className="leading-relaxed">
          {renderInline(line, `p${i}`)}
        </p>
      );
    }
  });
  flushList("f-end");

  return <div className="space-y-1.5">{blocks}</div>;
}
