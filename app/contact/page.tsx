import type { Metadata } from "next";
import { ContactPage } from "@/components/homepage";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact | ATIAA",
  description:
    "Prenez contact avec l’ATIAA pour rejoindre l’alliance, proposer un projet ou devenir partenaire fondateur.",
};

export default function ContactRoute() {
  return <ContactPage content={siteContent.fr} />;
}
