"use client";

import dynamic from "next/dynamic";

// Widget purement client (localStorage/i18n, animations) : chargé hors SSR
// pour ne pas alourdir le rendu initial du layout serveur.
const ChatWidget = dynamic(
  () => import("./chat-widget").then((m) => m.ChatWidget),
  { ssr: false }
);

export function ChatWidgetMount() {
  return <ChatWidget />;
}
