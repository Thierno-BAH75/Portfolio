import { Metadata } from "next";
import { Contact } from "@/components/sections";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez-moi pour discuter de vos projets web. Je suis disponible pour des missions freelance et des collaborations.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Contact />
    </div>
  );
}
