import type { Metadata } from "next";
import { AboutPage } from "@/components/homepage";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "À propos | ATIAA",
  description:
    "Découvrez la mission, la vision, la gouvernance et la trajectoire de l’Alliance Togolaise pour l’IA Appliquée.",
};

export default function AboutRoute() {
  return <AboutPage content={siteContent.fr} />;
}
