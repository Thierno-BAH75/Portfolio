import { getAllCertificationsAdmin } from "@/lib/admin-data";
import { CertificationsList } from "@/components/admin/certifications/certifications-list";

export default async function AdminCertificationsPage() {
  const items = await getAllCertificationsAdmin();
  return <CertificationsList items={items} />;
}
