import { z } from "zod";

export interface ContactValidationMessages {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Messages par défaut (fallback si aucune traduction n'est fournie)
export const defaultContactMessages: ContactValidationMessages = {
  name: "Name must be at least 2 characters",
  email: "Invalid email address",
  subject: "Subject must be at least 5 characters",
  message: "Message must be at least 10 characters",
};

// Schéma de validation côté client (UX, messages d'erreur inline) —
// la soumission finale est envoyée directement à Formspree, qui applique
// ses propres validations et son anti-spam côté serveur.
export function makeContactSchema(
  messages: ContactValidationMessages = defaultContactMessages
) {
  return z.object({
    name: z.string().min(2, messages.name),
    email: z.string().email(messages.email),
    subject: z.string().min(5, messages.subject),
    message: z.string().min(10, messages.message),
  });
}

export type ContactFormData = z.infer<ReturnType<typeof makeContactSchema>>;
