"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { HomeContent, MembershipTier, NavItem } from "@/lib/site-content";

interface HomepageProps {
  content: HomeContent;
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

interface ActionLinkProps {
  href: string;
  label: string;
  tone?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
}

interface MembershipPanelProps {
  tier: MembershipTier;
  featured?: boolean;
}

type ContactState = "idle" | "invalid" | "success";

const diagramNodes = [
  { label: "Fondateurs", x: "18%", y: "20%" },
  { label: "Experts", x: "73%", y: "17%" },
  { label: "Entreprises", x: "82%", y: "51%" },
  { label: "Écoles", x: "24%", y: "76%" },
  { label: "Institutions", x: "64%", y: "82%" },
  { label: "Partenaires", x: "8%", y: "50%" },
];

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function BrandMark() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/8">
      <div className="absolute inset-[6px] rounded-full border border-saffron-500/70" />
      <div className="absolute h-3 w-3 rounded-full bg-saffron-500" />
      <div className="absolute h-[1px] w-7 rotate-45 bg-white/40" />
      <div className="absolute h-[1px] w-7 -rotate-45 bg-white/18" />
    </div>
  );
}

function SectionLabel({
  children,
  inverse = false,
}: {
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.34em]",
        inverse ? "text-white/62" : "text-navy-700/78"
      )}
    >
      <span className={cn("h-px w-8", inverse ? "bg-saffron-400/90" : "bg-saffron-500/80")} />
      {children}
    </span>
  );
}

function ActionLink({ href, label, tone = "primary", onClick }: ActionLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[0.08em] transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-saffron-500",
        tone === "primary" &&
          "bg-saffron-500 text-navy-950 shadow-[0_18px_50px_rgba(174,126,30,0.24)] hover:-translate-y-0.5 hover:bg-saffron-400",
        tone === "secondary" &&
          "border border-white/18 bg-white/8 text-white backdrop-blur hover:border-white/28 hover:bg-white/12",
        tone === "ghost" &&
          "border border-navy-950/12 bg-white/60 text-navy-950 hover:border-saffron-500/40 hover:bg-white"
      )}
    >
      {label}
    </a>
  );
}

function AllianceDiagram() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative aspect-[7/6] min-h-[20rem] w-full overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-6 shadow-[0_24px_80px_rgba(7,17,36,0.35)] backdrop-blur lg:min-h-[22rem]">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute inset-x-8 top-8 h-px bg-white/10" />
        <div className="absolute inset-x-8 bottom-8 h-px bg-white/8" />
        <div className="absolute inset-y-8 left-8 w-px bg-white/8" />
        <div className="absolute inset-y-8 right-8 w-px bg-white/8" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/6" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/6" />
      </div>

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-white/26"
        aria-hidden="true"
      >
        {diagramNodes.map((node) => (
          <line
            key={node.label}
            x1="50"
            y1="50"
            x2={node.x.replace("%", "")}
            y2={node.y.replace("%", "")}
            stroke="currentColor"
            strokeWidth="0.4"
            strokeDasharray="1.6 1.8"
          />
        ))}
        <circle cx="50" cy="50" r="23" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="0.24" />
      </svg>

      {diagramNodes.map((node, index) => (
        <motion.div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/14 bg-navy-900/85 px-3 py-2 text-xs font-semibold tracking-[0.14em] text-white shadow-[0_10px_35px_rgba(0,0,0,0.22)]"
          style={{ left: node.x, top: node.y }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, index % 2 === 0 ? -3 : 3, 0],
                }
          }
          transition={{
            duration: 7 + index,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {node.label}
        </motion.div>
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 flex w-[14rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-[1.8rem] border border-saffron-500/40 bg-[linear-gradient(180deg,rgba(196,153,60,0.14),rgba(255,255,255,0.02))] px-6 py-5 text-left shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.018, 1],
              }
        }
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <span className="text-[0.68rem] uppercase tracking-[0.38em] text-saffron-400">
          Alliance
        </span>
        <span className="mt-3 font-display text-4xl leading-none text-white">ATIAA</span>
        <span className="mt-3 max-w-[10rem] text-sm leading-6 text-white/76">
          Démontrer, former, relier et déployer des usages concrets.
        </span>
      </motion.div>

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border-t border-white/10 pt-4 text-[0.68rem] uppercase tracking-[0.3em] text-white/56">
        <span>Lomé, Togo</span>
        <span>Mission collective</span>
      </div>
    </div>
  );
}

function MembershipPanel({ tier, featured = false }: MembershipPanelProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between p-7 backdrop-blur-sm",
        featured
          ? "rounded-[2rem] border border-navy-950/10 bg-navy-950 text-white shadow-[0_24px_70px_rgba(6,18,37,0.18)]"
          : "rounded-[1.7rem] border border-navy-950/10 bg-white/66"
      )}
    >
      <div>
        <p
          className={cn(
            "text-[0.72rem] font-semibold uppercase tracking-[0.32em]",
            featured ? "text-saffron-400" : "text-navy-700/76"
          )}
        >
          {tier.title}
        </p>
        <p className={cn("mt-5 text-base leading-7", featured ? "text-white/84" : "text-navy-800")}>
          {tier.audience}
        </p>
        <div className={cn("mt-7 space-y-4 border-t pt-6", featured ? "border-white/10" : "border-navy-950/10")}>
          <div>
            <p className={cn("text-xs font-semibold uppercase tracking-[0.24em]", featured ? "text-white/44" : "text-navy-700/56")}>
              Ce qu’ils apportent
            </p>
            <p className={cn("mt-2 text-sm leading-6", featured ? "text-white/72" : "text-navy-700")}>
              {tier.contribution}
            </p>
          </div>
          <div>
            <p className={cn("text-xs font-semibold uppercase tracking-[0.24em]", featured ? "text-white/44" : "text-navy-700/56")}>
              Ce qu’ils gagnent
            </p>
            <p className={cn("mt-2 text-sm leading-6", featured ? "text-white/72" : "text-navy-700")}>
              {tier.benefit}
            </p>
          </div>
        </div>
      </div>
      <a
        href="#contact"
        className={cn(
          "mt-8 inline-flex items-center text-sm font-semibold tracking-[0.08em] transition hover:translate-x-1",
          featured ? "text-saffron-400" : "text-navy-950"
        )}
      >
        {tier.cta}
      </a>
    </div>
  );
}

function ContactForm() {
  const [state, setState] = useState<ContactState>("idle");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const organization = String(formData.get("organization") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const profile = String(formData.get("profile") || "").trim();
    const note = String(formData.get("message") || "").trim();

    if (!name || !organization || !email || !profile || !note || !email.includes("@")) {
      setState("invalid");
      setMessage("Complétez tous les champs avec une adresse email valide pour préparer votre prise de contact.");
      return;
    }

    setState("success");
    setMessage(
      "Le canal d’adhésion sera finalisé prochainement. En attendant, écrivez à contact@atiaa.org en rappelant votre organisation et votre profil."
    );
    event.currentTarget.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-navy-950/10 bg-white/78 p-7 shadow-[0_24px_70px_rgba(13,26,52,0.1)] backdrop-blur-sm sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-navy-700/70">Nom</span>
          <input
            type="text"
            name="name"
            className="w-full rounded-2xl border border-navy-950/10 bg-bone-50 px-4 py-3 text-sm text-navy-950 outline-none transition focus:border-saffron-500"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-navy-700/70">Organisation</span>
          <input
            type="text"
            name="organization"
            className="w-full rounded-2xl border border-navy-950/10 bg-bone-50 px-4 py-3 text-sm text-navy-950 outline-none transition focus:border-saffron-500"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-navy-700/70">Email</span>
          <input
            type="email"
            name="email"
            className="w-full rounded-2xl border border-navy-950/10 bg-bone-50 px-4 py-3 text-sm text-navy-950 outline-none transition focus:border-saffron-500"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-navy-700/70">Profil</span>
          <select
            name="profile"
            defaultValue=""
            className="w-full rounded-2xl border border-navy-950/10 bg-bone-50 px-4 py-3 text-sm text-navy-950 outline-none transition focus:border-saffron-500"
          >
            <option value="" disabled>
              Choisir un profil
            </option>
            <option>Fondateur ou porteur de projet</option>
            <option>Expert ou praticien</option>
            <option>Entreprise</option>
            <option>École ou centre de formation</option>
            <option>Institution ou partenaire</option>
          </select>
        </label>
      </div>
      <label className="mt-5 block space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-navy-700/70">Message</span>
        <textarea
          name="message"
          rows={5}
          className="w-full rounded-[1.6rem] border border-navy-950/10 bg-bone-50 px-4 py-3 text-sm text-navy-950 outline-none transition focus:border-saffron-500"
          placeholder="Décrivez votre intérêt pour l’ATIAA, vos besoins ou la forme de contribution envisagée."
        />
      </label>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-navy-950 px-5 py-3 text-sm font-semibold tracking-[0.08em] text-bone-50 transition hover:-translate-y-0.5 hover:bg-navy-900"
        >
          Envoyer le message
        </button>
        <p className="text-sm leading-6 text-navy-700/74">
          V1 sans backend: message de contact guidé vers l’adresse de coordination.
        </p>
      </div>
      <AnimatePresence mode="wait">
        {state !== "idle" ? (
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className={cn(
              "mt-6 rounded-[1.4rem] border px-4 py-4 text-sm leading-6",
              state === "success"
                ? "border-emerald-700/16 bg-emerald-50 text-emerald-950"
                : "border-amber-700/16 bg-amber-50 text-amber-950"
            )}
          >
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}

export default function Homepage({ content }: HomepageProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="page-shell relative isolate overflow-hidden bg-bone-50 text-navy-950">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/82 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
          <a href="#accueil" className="flex items-center gap-4">
            <BrandMark />
            <div className="min-w-0">
              <p className="font-display text-xl leading-none tracking-[0.08em] text-white">
                {content.brand.acronym}
              </p>
              <p className="mt-1 max-w-[14rem] text-[0.65rem] uppercase tracking-[0.26em] text-white/52">
                Alliance Togolaise pour l’IA Appliquée
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {content.navItems.map((item: NavItem) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/72 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ActionLink href="#adhesion" label="Rejoindre l’alliance" tone="secondary" />
            <ActionLink href="#partenaires" label="Devenir partenaire" />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/16 text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-label="Ouvrir le menu"
          >
            <span className="relative h-4 w-4">
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-px w-4 -translate-y-[6px] bg-current transition",
                  menuOpen && "translate-y-0 rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-px w-4 bg-current transition",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-px w-4 translate-y-[6px] bg-current transition",
                  menuOpen && "translate-y-0 -rotate-45"
                )}
              />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/8 bg-navy-950/95 lg:hidden"
            >
              <div className="space-y-4 px-6 py-6 sm:px-8">
                {content.navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-base text-white/78 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-3">
                  <ActionLink
                    href="#adhesion"
                    label="Rejoindre l’alliance"
                    tone="secondary"
                    onClick={() => setMenuOpen(false)}
                  />
                  <ActionLink
                    href="#partenaires"
                    label="Devenir partenaire"
                    onClick={() => setMenuOpen(false)}
                  />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="overflow-hidden">
        <section
          id="accueil"
          className="relative isolate min-h-[calc(100svh-81px)] overflow-hidden bg-navy-950 text-white"
        >
          <div className="absolute inset-0 opacity-70">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(203,156,62,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_26%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:110px_110px]" />
            <div className="absolute inset-x-0 top-[18%] h-px bg-white/10" />
            <div className="absolute inset-x-0 bottom-[18%] h-px bg-white/8" />
          </div>

          <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-14 pt-14 sm:px-8 lg:grid lg:min-h-[calc(100svh-81px)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12 lg:px-12 lg:pb-12 lg:pt-12">
            <Reveal className="flex flex-col justify-center lg:pr-6">
              <SectionLabel inverse>{content.brand.status} — {content.brand.location}</SectionLabel>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-saffron-400">
                {content.brand.name}
              </p>
              <h1 className="mt-5 max-w-[12ch] font-display text-5xl leading-[0.95] text-bone-50 sm:text-6xl lg:max-w-[13.5ch] lg:text-[4.45rem] xl:text-[5rem]">
                L’alliance qui transforme l’IA en usages concrets au Togo
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/74 sm:text-xl">
                ATIAA fédère fondateurs, experts, organisations et partenaires pour démontrer,
                former et déployer l’intelligence artificielle appliquée, en commençant par Lomé.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ActionLink href="#adhesion" label="Rejoindre l’alliance" />
                <ActionLink href="#partenaires" label="Devenir partenaire" tone="secondary" />
              </div>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/42">
                  Écosystème mobilisé
                </p>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/72 sm:grid-cols-5">
                  {content.trustRoles.map((role) => (
                    <div key={role} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-saffron-400" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="flex items-center justify-center lg:justify-end" delay={0.12}>
              <AllianceDiagram />
            </Reveal>
          </div>
        </section>

        <section className="relative z-10 border-y border-navy-950/10 bg-bone-100">
          <div className="mx-auto grid max-w-7xl gap-px bg-navy-950/10 px-6 sm:px-8 lg:grid-cols-4 lg:px-12">
            {content.stats.map((item, index) => (
              <Reveal
                key={item.label}
                className="bg-bone-100 py-8 lg:py-10"
                delay={index * 0.05}
              >
                <div className="pr-4">
                  <p className="font-display text-4xl leading-none text-navy-950 sm:text-5xl">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-navy-700/76">
                    {item.label}
                  </p>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-navy-700">{item.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="mission" className="relative py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-12">
            <Reveal className="space-y-8">
              <SectionLabel>Pourquoi ATIAA</SectionLabel>
              <h2 className="max-w-[12ch] font-display text-4xl leading-tight text-navy-950 sm:text-5xl">
                Passer de l’intérêt pour l’IA à l’exécution réelle.
              </h2>
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <p className="text-lg leading-8 text-navy-800">
                  L’intérêt pour l’IA progresse au Togo. Le frein n’est plus seulement
                  l’évangélisation. Le vrai manque se situe désormais dans l’exécution, la
                  formation pratique, les outils, les démonstrateurs et le passage au
                  déploiement.
                </p>
                <blockquote className="rounded-[2rem] bg-navy-950 px-7 py-8 text-bone-50 shadow-[0_24px_70px_rgba(6,18,37,0.18)]">
                  <p className="font-display text-3xl leading-tight">
                    ATIAA est la couche d’activation manquante entre la curiosité et l’impact
                    réel.
                  </p>
                </blockquote>
              </div>
            </Reveal>

            <Reveal className="space-y-7" delay={0.08}>
              <div className="border-b border-navy-950/10 pb-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-navy-700/68">
                  Mission
                </p>
                <p className="mt-4 text-lg leading-8 text-navy-950">
                  Accélérer l’adoption concrète de l’IA au Togo par la démonstration, la
                  formation pratique, les partenariats et les projets pilotes.
                </p>
              </div>
              <div className="border-b border-navy-950/10 pb-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-navy-700/68">
                  Vision
                </p>
                <p className="mt-4 text-lg leading-8 text-navy-950">
                  Faire du Togo, en commençant par Lomé, un pôle de référence de l’IA appliquée
                  en Afrique francophone.
                </p>
              </div>
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-navy-700/68">
                  Piliers
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {content.pillars.map((pillar) => (
                    <div
                      key={pillar}
                      className="flex items-center justify-between border-b border-navy-950/10 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-navy-950"
                    >
                      <span>{pillar}</span>
                      <span className="text-saffron-500">●</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="programmes" className="border-y border-navy-950/10 bg-white/52 py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-12">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionLabel>Programmes</SectionLabel>
              <h2 className="mt-6 max-w-[12ch] font-display text-4xl leading-tight text-navy-950 sm:text-5xl">
                Des formats visibles, utiles et orientés terrain.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-navy-800">
                L’ATIAA ne se limite pas à un discours sur l’innovation. Elle met en circulation
                des démonstrations, des pratiques, des ateliers et des projets pilotes capables de
                créer de la confiance par la preuve.
              </p>
              <div className="mt-10 border-t border-navy-950/10 pt-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-navy-700/68">
                  Secteurs ciblés
                </p>
                <div className="mt-4 grid gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-navy-950 sm:grid-cols-2">
                  {content.sectors.map((sector) => (
                    <div key={sector} className="flex items-center gap-3 border-b border-navy-950/10 py-2">
                      <span className="h-2 w-2 rounded-full bg-saffron-400" />
                      <span>{sector}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="space-y-5">
              {content.programmes.map((programme, index) => (
                <Reveal
                  key={programme.title}
                  delay={index * 0.04}
                  className="grid gap-6 border-t border-navy-950/10 pt-6 sm:grid-cols-[88px_1fr]"
                >
                  <div className="font-display text-4xl leading-none text-saffron-500">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-2xl leading-tight text-navy-950">{programme.title}</h3>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-navy-800">
                      {programme.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projets" className="py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <Reveal className="max-w-4xl">
              <SectionLabel>Projets fondateurs et démonstrateurs</SectionLabel>
              <h2 className="mt-6 font-display text-4xl leading-tight text-navy-950 sm:text-5xl">
                Des initiatives réelles pour installer la crédibilité par l’exemple.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-navy-800">
                ATIAA s’appuie à son lancement sur un premier ensemble de projets démonstrateurs
                portés par des membres du cercle initial. Ils illustrent différentes catégories
                d’IA appliquée et ont vocation à être rejoints par d’autres initiatives.
              </p>
            </Reveal>

            <div className="mt-12 space-y-6">
              {content.projects.map((project, index) => {
                const reverse = index % 2 === 1;

                return (
                  <Reveal key={project.name} delay={index * 0.05}>
                    <article
                      className={cn(
                        "grid overflow-hidden rounded-[2.2rem] border border-navy-950/10 shadow-[0_24px_70px_rgba(13,26,52,0.08)] lg:grid-cols-2",
                        reverse ? "bg-bone-100" : "bg-white"
                      )}
                    >
                      <div
                        className={cn(
                          "relative overflow-hidden px-7 py-10 sm:px-10 sm:py-12",
                          reverse ? "order-2 bg-navy-950 text-bone-50" : "bg-navy-900 text-bone-50"
                        )}
                      >
                        <div className="absolute inset-0 opacity-50">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(203,156,62,0.22),transparent_30%)]" />
                          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:86px_86px]" />
                        </div>
                        <div className="relative">
                          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-saffron-400">
                            Projet démonstrateur {String(index + 1).padStart(2, "0")}
                          </p>
                          <h3 className="mt-8 font-display text-6xl leading-none sm:text-7xl">
                            {project.name}
                          </h3>
                          <p className="mt-6 max-w-lg text-lg leading-8 text-white/76">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div className={cn("px-7 py-10 sm:px-10 sm:py-12", reverse && "order-1")}>
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-navy-700/68">
                          Focus d’impact
                        </p>
                        <p className="mt-4 text-lg leading-8 text-navy-950">{project.outcome}</p>
                        <div className="mt-10 grid gap-6 border-t border-navy-950/10 pt-6 sm:grid-cols-2">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-navy-700/60">
                              Champ d’application
                            </p>
                            <p className="mt-3 text-sm leading-6 text-navy-800">{project.scope}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-navy-700/60">
                              Statut de lancement
                            </p>
                            <p className="mt-3 text-sm leading-6 text-navy-800">
                              Projet porté par le cercle initial et conçu pour ouvrir la voie à
                              d’autres initiatives.
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="adhesion" className="border-y border-navy-950/10 bg-bone-100 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <Reveal className="max-w-4xl">
              <SectionLabel>Adhésion</SectionLabel>
              <h2 className="mt-6 font-display text-4xl leading-tight text-navy-950 sm:text-5xl">
                Une alliance construite par les acteurs qui décident de faire avancer l’usage.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:grid-rows-2">
              <Reveal className="lg:row-span-2">
                <MembershipPanel tier={content.membershipTiers[0]} featured />
              </Reveal>
              <Reveal delay={0.06}>
                <MembershipPanel tier={content.membershipTiers[1]} />
              </Reveal>
              <Reveal delay={0.12}>
                <MembershipPanel tier={content.membershipTiers[2]} />
              </Reveal>
            </div>
          </div>
        </section>

        <section id="partenaires" className="py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
            <Reveal>
              <SectionLabel>Pourquoi soutenir ATIAA</SectionLabel>
              <h2 className="mt-6 max-w-[12ch] font-display text-4xl leading-tight text-navy-950 sm:text-5xl">
                Un point d’appui crédible pour les entreprises et institutions.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-navy-800">
                Soutenir ATIAA, ce n’est pas sponsoriser une page de plus. C’est contribuer à une
                couche d’activation qui relie formation, usages, pilotes, talents et impact local.
              </p>
              <div className="mt-10 rounded-[2rem] border border-navy-950/10 bg-white/74 px-7 py-7">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-navy-700/68">
                  Positionnement partenaire
                </p>
                <p className="mt-4 text-base leading-7 text-navy-800">
                  Une présence lisible dans un cadre collectif, utile, anti-capture et orienté sur
                  l’IA appliquée plutôt que sur l’effet d’annonce.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {content.supportPoints.map((point, index) => (
                <Reveal
                  key={point}
                  delay={index * 0.04}
                  className="border-l border-navy-950/14 pl-5"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-saffron-500">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-base leading-7 text-navy-900">{point}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="gouvernance" className="border-y border-white/10 bg-navy-950 py-24 text-white sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-12">
            <Reveal>
              <SectionLabel inverse>Gouvernance et confiance</SectionLabel>
              <h2 className="mt-6 max-w-[12ch] font-display text-4xl leading-tight text-bone-50 sm:text-5xl">
                Une coalition crédible, neutre et orientée mission.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/74">
                L’ATIAA est pensée pour préserver une mission collective. Sa gouvernance doit
                garantir neutralité, intégrité, anti-capture et capacité d’action.
              </p>
              <blockquote className="mt-10 rounded-[2rem] border border-white/10 bg-white/6 px-7 py-8 text-bone-50 backdrop-blur-sm">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-saffron-400">
                  Principe de confiance
                </p>
                <p className="mt-4 font-display text-3xl leading-tight">
                  Une alliance utile au terrain, pas un véhicule d’appropriation privée.
                </p>
              </blockquote>
            </Reveal>

            <div className="relative space-y-4 pl-8 before:absolute before:bottom-6 before:left-3 before:top-6 before:w-px before:bg-white/18">
              {content.governance.map((node, index) => (
                <Reveal
                  key={node.title}
                  delay={index * 0.05}
                  className="relative rounded-[1.8rem] border border-white/10 bg-white/6 px-6 py-6 shadow-[0_18px_55px_rgba(0,0,0,0.16)] backdrop-blur-sm"
                >
                  <span className="absolute left-[-2.2rem] top-7 flex h-6 w-6 items-center justify-center rounded-full border border-saffron-500/30 bg-navy-950 text-[0.68rem] font-semibold text-saffron-400">
                    {index + 1}
                  </span>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/46">
                    {node.title}
                  </p>
                  <p className="mt-3 text-base leading-7 text-white/76">{node.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <Reveal className="max-w-4xl">
              <SectionLabel>Roadmap</SectionLabel>
              <h2 className="mt-6 font-display text-4xl leading-tight text-navy-950 sm:text-5xl">
                ATIAA est actuellement en phase de structuration.
              </h2>
            </Reveal>

            <div className="relative mt-12">
              <div className="absolute left-0 right-0 top-9 hidden h-px bg-navy-950/12 lg:block" />
              <div className="grid gap-8 lg:grid-cols-4">
                {content.roadmap.map((step, index) => (
                  <Reveal
                    key={step.phase}
                    delay={index * 0.05}
                    className={cn("relative border-l border-navy-950/14 pl-5 lg:border-l-0 lg:pl-0", index % 2 === 1 && "lg:pt-12")}
                  >
                    <div className="absolute left-[-0.55rem] top-0 flex h-7 w-7 items-center justify-center rounded-full border border-saffron-500/32 bg-bone-50 text-[0.68rem] font-semibold text-saffron-500 lg:left-0 lg:top-6">
                      {index + 1}
                    </div>
                    <p className="pl-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-saffron-500 lg:pl-11">
                      {step.phase}
                    </p>
                    <div className="mt-4 pl-4 lg:pl-11">
                      <h3 className="text-[2rem] leading-tight text-navy-950">{step.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-navy-800">{step.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:108px_108px] opacity-40" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-12">
            <Reveal>
              <SectionLabel inverse>Finaliser le contact</SectionLabel>
              <h2 className="mt-6 max-w-[12ch] font-display text-4xl leading-tight text-bone-50 sm:text-5xl">
                Deux chemins pour rejoindre la dynamique.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/76">
                Que vous souhaitiez rejoindre l’alliance ou devenir partenaire fondateur, ATIAA
                veut ouvrir un cadre de contact clair, utile et crédible dès sa première version.
              </p>
              <div className="mt-10 grid gap-4">
                <a
                  href="#contact"
                  className="rounded-[1.7rem] border border-white/12 bg-white/6 px-6 py-5 transition hover:border-white/22 hover:bg-white/10"
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-saffron-400">
                    Je veux rejoindre ATIAA
                  </p>
                  <p className="mt-3 text-base leading-7 text-white/76">
                    Pour contribuer, apprendre, participer aux programmes ou intégrer les projets.
                  </p>
                </a>
                <a
                  href="#partenaires"
                  className="rounded-[1.7rem] border border-white/12 bg-white/6 px-6 py-5 transition hover:border-white/22 hover:bg-white/10"
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-saffron-400">
                    Je veux devenir partenaire fondateur
                  </p>
                  <p className="mt-3 text-base leading-7 text-white/76">
                    Pour soutenir une plateforme d’activation concrète de l’IA appliquée au Togo.
                  </p>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-navy-950/10 bg-bone-100 py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:px-12">
          <div>
            <p className="font-display text-2xl text-navy-950">{content.brand.acronym}</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-navy-800">{content.brand.tagline}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-navy-700/62">
              {content.brand.location} · {content.brand.status}
            </p>
          </div>
          <div className="grid gap-2 text-sm text-navy-800">
            {content.footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-navy-950">
                {link.label}
              </a>
            ))}
          </div>
          <div className="space-y-2 text-sm text-navy-800">
            <p>contact@atiaa.org</p>
            <p>LinkedIn — bientôt</p>
            <p>X / Twitter — bientôt</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
