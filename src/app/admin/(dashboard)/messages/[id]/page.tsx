import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getMessageByIdAdmin } from "@/lib/admin-data";
import { markMessageRead } from "@/lib/actions/contact-messages";
import { MessageActions } from "@/components/admin/messages/message-actions";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(iso));
}

export default async function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const message = await getMessageByIdAdmin(id);
  if (!message) notFound();

  if (!message.read) {
    await markMessageRead(id);
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/messages"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Retour aux messages
      </Link>

      <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <div>
          <h1 className="text-xl font-bold">
            {message.firstName} {message.lastName}
          </h1>
          <a href={`mailto:${message.email}`} className="text-sm text-cyan-400 hover:underline">
            {message.email}
          </a>
          <p className="text-xs text-muted-foreground mt-1">{formatDate(message.createdAt)}</p>
        </div>

        {message.subject && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Sujet</p>
            <p className="text-sm">{message.subject}</p>
          </div>
        )}

        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Message</p>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.message}</p>
        </div>

        <div className="pt-4 border-t border-border">
          <MessageActions message={message} />
        </div>
      </div>
    </div>
  );
}
