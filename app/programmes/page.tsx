import type { Metadata } from "next";
import { ProgrammesPage } from "@/components/homepage";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Programmes | ATIAA",
  description:
    "Explorez les démonstrations, workshops, bootcamps, AI Clinics et formats d’activation portés par l’ATIAA.",
};

export default function ProgrammesRoute() {
  return <ProgrammesPage content={siteContent.fr} />;
}
