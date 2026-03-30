import type { Metadata } from "next";
import { MembershipPage } from "@/components/homepage";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Adhésion | ATIAA",
  description:
    "Consultez les niveaux d’adhésion de l’ATIAA pour les membres fondateurs, membres actifs et partenaires.",
};

export default function MembershipRoute() {
  return <MembershipPage content={siteContent.fr} />;
}
