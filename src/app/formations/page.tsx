import { redirect } from "next/navigation";

// Le parcours complet (scolaire + pro + certifications) vit sur la home
export default function FormationsPage() {
  redirect("/#experience");
}
