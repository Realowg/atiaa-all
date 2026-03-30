import type { Metadata } from "next";
import { ProjectsPage } from "@/components/homepage";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Projets | ATIAA",
  description:
    "Découvrez les projets fondateurs et démonstrateurs qui installent la preuve de l’IA appliquée au sein de l’ATIAA.",
};

export default function ProjectsRoute() {
  return <ProjectsPage content={siteContent.fr} />;
}
