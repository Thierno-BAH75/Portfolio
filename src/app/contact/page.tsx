import type { Metadata } from "next";
import { getPersonalInfo, getSocialLinks } from "@/lib/data";
import { ContactPageClient } from "./contact-page-client";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Thierno BAH pour échanger sur une alternance, un projet réseau/sécurité ou une opportunité de collaboration.",
};

export default async function ContactPage() {
  const [personalInfo, socialLinks] = await Promise.all([
    getPersonalInfo(),
    getSocialLinks(),
  ]);
  return <ContactPageClient personalInfo={personalInfo} socialLinks={socialLinks} />;
}
