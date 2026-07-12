import { getCertifications } from "@/lib/data";
import { CertificationsPageClient } from "./certifications-page-client";

export default async function CertificationsPage() {
  const certifications = await getCertifications();
  return <CertificationsPageClient certifications={certifications} />;
}
