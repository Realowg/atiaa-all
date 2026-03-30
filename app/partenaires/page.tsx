import type { Metadata } from "next";
import { PartnersPage } from "@/components/homepage";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Partenaires | ATIAA",
  description:
    "Comprenez pourquoi soutenir l’ATIAA et comment entreprises et institutions peuvent contribuer à une IA appliquée crédible au Togo.",
};

export default function PartnersRoute() {
  return <PartnersPage content={siteContent.fr} />;
}
