"use client";

import React from "react";

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const nodes: React.ReactNode[] = [];
  const listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    const items = [...listBuffer];
    nodes.push(
      <ul key={key} className="my-3 space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-muted-foreground leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500" />
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    );
    listBuffer.length = 0;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("## ")) {
      flushList(`list-${i}`);
      nodes.push(
        <h2
          key={i}
          className="mt-9 mb-3 pb-2 text-lg font-bold text-foreground border-b border-border/50 first:mt-0"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
    } else if (line === "") {
      flushList(`list-${i}`);
    } else {
      flushList(`list-${i}`);
      nodes.push(
        <p key={i} className="text-muted-foreground leading-relaxed">
          {renderInline(line)}
        </p>
      );
    }
  }
  flushList("list-end");

  return <div className="space-y-1">{nodes}</div>;
}
