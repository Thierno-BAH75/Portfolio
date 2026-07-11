"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { AdminVeilleSource, AdminVeilleBookmark } from "@/lib/admin-data";
import { SourcesManager } from "./sources-manager";
import { BookmarksManager } from "./bookmarks-manager";

const TABS = ["sources", "bookmarks"] as const;
type Tab = (typeof TABS)[number];

const TAB_LABELS: Record<Tab, string> = {
  sources: "Sources RSS",
  bookmarks: "Articles épinglés",
};

export function VeilleTabs({
  sources,
  bookmarks,
}: {
  sources: AdminVeilleSource[];
  bookmarks: AdminVeilleBookmark[];
}) {
  const [tab, setTab] = useState<Tab>("sources");

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
              tab === t
                ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border-violet-500/40 text-foreground"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            )}
          >
            {TAB_LABELS[t]}
            {t === "sources" ? ` (${sources.length})` : ` (${bookmarks.length})`}
          </button>
        ))}
      </div>

      {tab === "sources" ? (
        <SourcesManager sources={sources} />
      ) : (
        <BookmarksManager bookmarks={bookmarks} />
      )}
    </div>
  );
}
