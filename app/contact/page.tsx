import type { Metadata } from "next";
import { ContactPage } from "@/components/homepage";
import { type ContactIntent, siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact | ATIAA",
  description:
    "Prenez contact avec l’ATIAA pour rejoindre l’alliance, proposer un projet ou devenir partenaire fondateur.",
};

export default async function ContactRoute({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const params = await searchParams;
  const intent: ContactIntent =
    params.intent === "partner" || params.intent === "project" ? params.intent : "member";

  return <ContactPage content={siteContent.fr} intent={intent} />;
}
