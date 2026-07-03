import { redirect } from "next/navigation";

// La section À propos vit sur la home (architecture « vitrine à ancres »)
export default function AboutPage() {
  redirect("/#about");
}
