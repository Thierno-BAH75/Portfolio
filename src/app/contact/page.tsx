import { redirect } from "next/navigation";

// La section Contact vit sur la home (architecture « vitrine à ancres »)
export default function ContactPage() {
  redirect("/#contact");
}
