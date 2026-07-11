import { notFound } from "next/navigation";
import { getCertificationByIdAdmin } from "@/lib/admin-data";
import { CertificationForm } from "@/components/admin/certifications/certification-form";
import type { CertificationFormValues } from "@/lib/schemas";

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certification = await getCertificationByIdAdmin(id);
  if (!certification) notFound();

  const initial: CertificationFormValues = {
    name: certification.name,
    issuer: certification.issuer,
    date: certification.date,
    expiry: certification.expiry ?? "",
    icon: certification.icon,
    displayOrder: certification.displayOrder,
  };

  return <CertificationForm mode="edit" certificationId={certification.id} initial={initial} />;
}
