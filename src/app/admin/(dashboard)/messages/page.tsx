import { getAllMessagesAdmin } from "@/lib/admin-data";
import { MessagesList } from "@/components/admin/messages/messages-list";

export default async function AdminMessagesPage() {
  const messages = await getAllMessagesAdmin();
  return <MessagesList messages={messages} />;
}
