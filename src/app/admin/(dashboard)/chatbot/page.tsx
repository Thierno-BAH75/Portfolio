import { getChatbotSettingsAdmin } from "@/lib/admin-data";
import { ChatbotSettingsForm } from "@/components/admin/chatbot/chatbot-settings-form";
import type { ChatbotSettingsFormValues } from "@/lib/schemas";

export default async function AdminChatbotPage() {
  const settings = await getChatbotSettingsAdmin();

  const initial: ChatbotSettingsFormValues = {
    tone: settings.tone,
    extraInstructions: settings.extraInstructions,
  };

  return <ChatbotSettingsForm initial={initial} />;
}
