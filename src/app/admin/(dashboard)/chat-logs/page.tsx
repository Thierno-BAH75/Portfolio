import { getAllChatLogsAdmin } from "@/lib/admin-data";
import { ChatLogsList } from "@/components/admin/chat-logs/chat-logs-list";

export default async function AdminChatLogsPage() {
  const logs = await getAllChatLogsAdmin();
  return <ChatLogsList logs={logs} />;
}
