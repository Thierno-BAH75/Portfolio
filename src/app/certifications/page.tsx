import type { Metadata } from "next";
import { getCertifications } from "@/lib/data";
import { CertificationsPageClient } from "./certifications-page-client";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Certifications réseaux, systèmes et cybersécurité : Cisco CCNA v7, CSNA Stormshield, ANSSI SecNumAcadémie, PIX et formations AFORP.",
};

export default async function CertificationsPage() {
  const certifications = await getCertifications();
  return <CertificationsPageClient certifications={certifications} />;
}
