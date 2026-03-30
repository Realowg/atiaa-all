"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import type {
  FoundingProject,
  GovernanceNode,
  HeroPanelItem,
  HomeContent,
  MembershipTier,
  NavItem,
  ProgrammeItem,
  RoadmapPhase,
  StatItem,
} from "@/lib/site-content";

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
  tone?: "primary" | "secondary" | "text";
  onClick?: () => void;
}

interface MembershipPanelProps {
  tier: MembershipTier;
  featured?: boolean;
}

type ContactState = "idle" | "invalid" | "success";

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function Reveal({ children, className, delay = 0 }: RevealProps) {
  void delay;
  return <div className={className}>{children}</div>;
}

function BrandMark() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_8px_24px_rgba(17,24,39,0.06)]">
      <div className="absolute inset-[7px] rounded-xl border border-navy-950/10" />
      <div className="absolute h-5 w-5 rounded-full border border-navy-950/15" />
      <div className="absolute h-2.5 w-2.5 rounded-full bg-navy-950" />
      <div className="absolute h-px w-6 rotate-45 bg-saffron-500/65" />
      <div className="absolute h-px w-6 -rotate-45 bg-saffron-500/30" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ink-700">
      <span className="h-px w-8 bg-navy-950/20" />
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
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy-950",
        tone === "primary" &&
          "bg-ink-950 text-white shadow-[0_14px_32px_rgba(17,24,39,0.12)] hover:-translate-y-0.5 hover:bg-navy-950",
        tone === "secondary" &&
          "border border-black/10 bg-white text-ink-950 hover:-translate-y-0.5 hover:border-black/16 hover:bg-ivory-50",
        tone === "text" && "px-0 py-0 text-navy-950 hover:text-ink-950"
      )}
    >
      {label}
    </a>
  );
}

function PlatformPanel({
  title,
  summary,
  items,
  metrics,
}: HomeContent["heroPanel"]) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_28px_80px_rgba(17,24,39,0.08)]"
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -6, 0],
            }
      }
      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(22,40,60,0.06),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0))]" />

      <div className="relative border-b border-black/8 px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.26em] text-navy-700">
              Plateforme
            </p>
            <h2 className="mt-3 text-[1.35rem] font-medium tracking-[-0.02em] text-ink-950 sm:text-[1.55rem]">
              {title}
            </h2>
          </div>
          <div className="hidden rounded-full border border-black/8 bg-ivory-50 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink-700 sm:block">
            Structuration active
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-700">{summary}</p>
      </div>

      <div className="relative grid gap-5 px-5 py-5 sm:px-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="rounded-[1.6rem] border border-black/8 bg-ivory-50 p-4 sm:p-5">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-700">
            Périmètre
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-[1.2rem] border border-black/7 bg-white px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-ink-700">Programmes</p>
              <p className="mt-1 text-sm leading-6 text-ink-950">
                Démonstrations publiques, workshops, bootcamps et AI Clinics.
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-black/7 bg-white px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-ink-700">Projets</p>
              <p className="mt-1 text-sm leading-6 text-ink-950">
                Cas démonstrateurs pour le travail, le contenu et l’accès local au savoir.
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-black/7 bg-white px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-ink-700">Adhésion</p>
              <p className="mt-1 text-sm leading-6 text-ink-950">
                Cercle fondateur, membres actifs et partenaires mobilisés autour de l’exécution.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 border-t border-black/8 pt-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-lg font-medium tracking-[-0.02em] text-ink-950">{metric.value}</p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-ink-700">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <PanelRow key={item.section} item={item} featured={index === 0} />
          ))}

          <div className="rounded-[1.45rem] border border-black/8 bg-ivory-50 px-4 py-4 sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/8 pb-3">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-700">
                Trajectoire
              </p>
              <span className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-navy-700">
                Lomé → national
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <p className="text-sm leading-6 text-ink-700">
                Une structure pensée pour lancer vite, documenter les résultats et préparer des
                pilotes plus larges.
              </p>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white sm:w-32">
                <motion.div
                  className="h-full rounded-full bg-navy-950"
                  animate={reduceMotion ? undefined : { width: ["34%", "42%", "34%"] }}
                  transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PanelRow({ item, featured = false }: { item: HeroPanelItem; featured?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-[1.45rem] border px-4 py-4 sm:px-5",
        featured
          ? "border-navy-950 bg-navy-950 text-white shadow-[0_16px_36px_rgba(22,40,60,0.16)]"
          : "border-black/8 bg-white"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p
          className={cn(
            "text-[0.68rem] font-medium uppercase tracking-[0.24em]",
            featured ? "text-white/58" : "text-ink-700"
          )}
        >
          {item.section}
        </p>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em]",
            featured ? "bg-white/10 text-white/76" : "bg-ivory-50 text-navy-700"
          )}
        >
          {item.status}
        </span>
      </div>
      <h3 className={cn("mt-3 text-lg font-medium tracking-[-0.02em]", featured ? "text-white" : "text-ink-950")}>
        {item.title}
      </h3>
      <p className={cn("mt-2 text-sm leading-6", featured ? "text-white/72" : "text-ink-700")}>
        {item.detail}
      </p>
    </div>
  );
}

function StatColumn({ item, index }: { item: StatItem; index: number }) {
  return (
    <Reveal
      className={cn("py-7 lg:px-6 lg:py-9", index < 3 && "lg:border-r lg:border-black/8")}
      delay={index * 0.04}
    >
      <p className="text-3xl font-medium tracking-[-0.03em] text-ink-950 sm:text-[2.35rem]">
        {item.value}
      </p>
      <p className="mt-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ink-700">
        {item.label}
      </p>
      <p className="mt-4 max-w-[18rem] text-sm leading-6 text-ink-700">{item.note}</p>
    </Reveal>
  );
}

function ProgrammeRow({ programme, index }: { programme: ProgrammeItem; index: number }) {
  return (
    <Reveal
      delay={index * 0.04}
      className="grid gap-4 border-t border-black/8 py-5 sm:grid-cols-[70px_1fr]"
    >
      <div className="text-sm font-medium tracking-[0.04em] text-navy-700">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div>
        <h3 className="text-[1.32rem] font-medium tracking-[-0.02em] text-ink-950">
          {programme.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-700">{programme.description}</p>
      </div>
    </Reveal>
  );
}

function ProjectModule({
  project,
  index,
}: {
  project: FoundingProject;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.05}>
      <article className="grid gap-6 rounded-[2rem] border border-black/8 bg-white px-6 py-7 shadow-[0_20px_56px_rgba(17,24,39,0.06)] sm:px-7 sm:py-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="border-b border-black/8 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-navy-700">
            Projet démonstrateur {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 text-[2rem] font-medium tracking-[-0.04em] text-ink-950 sm:text-[2.4rem]">
            {project.name}
          </h3>
          <p className="mt-4 text-sm leading-7 text-ink-700">{project.description}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-700">
              Champ d’application
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-950">{project.scope}</p>
          </div>
          <div>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-700">
              Impact démontré
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-950">{project.outcome}</p>
          </div>
          <div className="sm:col-span-2 rounded-[1.45rem] border border-black/8 bg-ivory-50 px-4 py-4">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-700">
              Rôle dans le lancement
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-700">
              Projet porté par le cercle initial pour ancrer l’ATIAA dans des preuves visibles,
              puis ouvrir la porte à d’autres initiatives rejoignant l’alliance.
            </p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function MembershipPanel({ tier, featured = false }: MembershipPanelProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between rounded-[1.9rem] border px-6 py-7 sm:px-7",
        featured
          ? "border-navy-950 bg-navy-950 text-white shadow-[0_20px_56px_rgba(22,40,60,0.14)]"
          : "border-black/8 bg-white"
      )}
    >
      <div>
        <p
          className={cn(
            "text-[0.72rem] font-medium uppercase tracking-[0.24em]",
            featured ? "text-white/58" : "text-ink-700"
          )}
        >
          {tier.title}
        </p>
        <p className={cn("mt-5 text-base leading-7", featured ? "text-white/82" : "text-ink-700")}>
          {tier.audience}
        </p>

        <div className={cn("mt-6 space-y-5 border-t pt-5", featured ? "border-white/10" : "border-black/8")}>
          <div>
            <p
              className={cn(
                "text-[0.68rem] font-medium uppercase tracking-[0.22em]",
                featured ? "text-white/44" : "text-ink-700"
              )}
            >
              Ce qu’ils apportent
            </p>
            <p className={cn("mt-2 text-sm leading-6", featured ? "text-white/72" : "text-ink-950")}>
              {tier.contribution}
            </p>
          </div>
          <div>
            <p
              className={cn(
                "text-[0.68rem] font-medium uppercase tracking-[0.22em]",
                featured ? "text-white/44" : "text-ink-700"
              )}
            >
              Ce qu’ils gagnent
            </p>
            <p className={cn("mt-2 text-sm leading-6", featured ? "text-white/72" : "text-ink-950")}>
              {tier.benefit}
            </p>
          </div>
        </div>
      </div>

      <a
        href="#contact"
        className={cn(
          "mt-8 inline-flex items-center text-sm font-medium transition hover:translate-x-1",
          featured ? "text-white" : "text-navy-950"
        )}
      >
        {tier.cta}
      </a>
    </div>
  );
}

function GovernanceRow({ node, index }: { node: GovernanceNode; index: number }) {
  return (
    <Reveal
      delay={index * 0.04}
      className="grid gap-4 border-t border-black/8 py-5 sm:grid-cols-[56px_1fr]"
    >
      <div className="text-sm font-medium tracking-[0.04em] text-navy-700">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div>
        <h3 className="text-lg font-medium tracking-[-0.02em] text-ink-950">{node.title}</h3>
        <p className="mt-2 text-sm leading-7 text-ink-700">{node.description}</p>
      </div>
    </Reveal>
  );
}

function RoadmapColumn({ step, index }: { step: RoadmapPhase; index: number }) {
  const active = index === 0;

  return (
    <Reveal delay={index * 0.05} className="relative">
      <div
        className={cn(
          "rounded-[1.75rem] border px-5 py-6 sm:px-6",
          active ? "border-navy-950 bg-navy-950 text-white" : "border-black/8 bg-white"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <p
            className={cn(
              "text-[0.68rem] font-medium uppercase tracking-[0.24em]",
              active ? "text-white/58" : "text-ink-700"
            )}
          >
            {step.phase}
          </p>
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              active ? "bg-saffron-400" : "bg-navy-950/18"
            )}
          />
        </div>
        <h3 className={cn("mt-4 text-[1.35rem] font-medium tracking-[-0.03em]", active ? "text-white" : "text-ink-950")}>
          {step.title}
        </h3>
        <p className={cn("mt-3 text-sm leading-7", active ? "text-white/72" : "text-ink-700")}>
          {step.description}
        </p>
      </div>
    </Reveal>
  );
}

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<ContactState>("idle");
  const [message, setMessage] = useState("");

  function submitForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const organization = String(formData.get("organization") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const profile = String(formData.get("profile") || "").trim();
    const note = String(formData.get("message") || "").trim();

    if (!name || !organization || !email || !profile || !note || !email.includes("@")) {
      setState("invalid");
      setMessage(
        "Complétez tous les champs avec une adresse email valide pour préparer votre prise de contact."
      );
      return;
    }

    setState("success");
    setMessage(
      "Le canal d’adhésion sera finalisé prochainement. En attendant, écrivez à contact@atiaa.org en rappelant votre organisation et votre profil."
    );
    form.reset();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitForm(event.currentTarget);
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_24px_72px_rgba(17,24,39,0.06)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ink-700">
            Nom
          </span>
          <input
            type="text"
            name="name"
            className="w-full rounded-2xl border border-black/8 bg-ivory-50 px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-navy-950"
          />
        </label>
        <label className="space-y-2">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ink-700">
            Organisation
          </span>
          <input
            type="text"
            name="organization"
            className="w-full rounded-2xl border border-black/8 bg-ivory-50 px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-navy-950"
          />
        </label>
        <label className="space-y-2">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ink-700">
            Email
          </span>
          <input
            type="email"
            name="email"
            className="w-full rounded-2xl border border-black/8 bg-ivory-50 px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-navy-950"
          />
        </label>
        <label className="space-y-2">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ink-700">
            Profil
          </span>
          <select
            name="profile"
            defaultValue=""
            className="w-full rounded-2xl border border-black/8 bg-ivory-50 px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-navy-950"
          >
            <option value="" disabled>
              Choisir un profil
            </option>
            <option value="fondateur">Fondateur ou porteur de projet</option>
            <option value="expert">Expert ou praticien</option>
            <option value="entreprise">Entreprise</option>
            <option value="ecole">École ou centre de formation</option>
            <option value="institution">Institution ou partenaire</option>
          </select>
        </label>
      </div>

      <label className="mt-5 block space-y-2">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ink-700">
          Message
        </span>
        <textarea
          name="message"
          rows={5}
          className="w-full rounded-[1.6rem] border border-black/8 bg-ivory-50 px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-navy-950"
          placeholder="Décrivez votre intérêt pour l’ATIAA, vos besoins ou la forme de contribution envisagée."
        />
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => {
            if (formRef.current) {
              submitForm(formRef.current);
            }
          }}
          className="inline-flex items-center justify-center rounded-full bg-ink-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-navy-950"
        >
          Envoyer le message
        </button>
        <p className="max-w-xs text-sm leading-6 text-ink-700">
          V1 sans backend: message de contact guidé vers l’adresse de coordination.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {state !== "idle" ? (
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              "mt-6 rounded-[1.4rem] border px-4 py-4 text-sm leading-6",
              state === "success"
                ? "border-emerald-700/15 bg-emerald-50 text-emerald-950"
                : "border-amber-700/15 bg-amber-50 text-amber-950"
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
    <div className="page-shell relative isolate overflow-hidden bg-background text-ink-950">
      <header className="sticky top-0 z-50 border-b border-black/7 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
          <a href="#accueil" className="flex items-center gap-4">
            <BrandMark />
            <div className="min-w-0">
              <p className="text-xl font-medium tracking-[-0.02em] text-ink-950">
                {content.brand.acronym}
              </p>
              <p className="mt-0.5 max-w-[14rem] text-[0.64rem] uppercase tracking-[0.2em] text-ink-700">
                Alliance Togolaise pour l’IA Appliquée
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {content.navItems.map((item: NavItem) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-ink-700 transition hover:text-ink-950"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <ActionLink href="#partenaires" label="Devenir partenaire" tone="text" />
            <ActionLink href="#adhesion" label="Rejoindre l’alliance" />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-ink-950 lg:hidden"
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
              className="overflow-hidden border-t border-black/8 bg-background/95 lg:hidden"
            >
              <div className="space-y-4 px-6 py-6 sm:px-8">
                {content.navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-base text-ink-700 transition hover:text-ink-950"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-3">
                  <ActionLink
                    href="#adhesion"
                    label="Rejoindre l’alliance"
                    onClick={() => setMenuOpen(false)}
                  />
                  <ActionLink
                    href="#partenaires"
                    label="Devenir partenaire"
                    tone="secondary"
                    onClick={() => setMenuOpen(false)}
                  />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        <section id="accueil" className="py-12 sm:py-14 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:gap-10 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-12 lg:px-12">
            <Reveal className="max-w-[38rem]">
              <SectionLabel>
                {content.brand.status} — {content.brand.location}
              </SectionLabel>
              <p className="mt-5 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-navy-700">
                {content.brand.name}
              </p>
              <h1 className="mt-4 max-w-[12ch] text-[2.95rem] font-medium leading-[0.96] tracking-[-0.06em] text-ink-950 sm:text-[3.7rem] lg:max-w-[11.5ch] lg:text-[4.15rem]">
                L’alliance qui transforme l’IA en usages concrets au Togo
              </h1>
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-7 text-ink-700 sm:text-lg sm:leading-8">
                ATIAA fédère fondateurs, experts, organisations et partenaires pour démontrer,
                former et déployer l’intelligence artificielle appliquée, en commençant par Lomé.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ActionLink href="#adhesion" label="Rejoindre l’alliance" />
                <ActionLink
                  href="#partenaires"
                  label="Devenir partenaire"
                  tone="secondary"
                />
              </div>

              <div className="mt-8 border-t border-black/8 pt-5">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-700">
                  Écosystème mobilisé
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-ink-700">
                  {content.trustRoles.map((role) => (
                    <div key={role} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-navy-950" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="lg:pl-4">
              <PlatformPanel {...content.heroPanel} />
            </Reveal>
          </div>
        </section>

        <section className="border-y border-black/8 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:px-8 lg:grid-cols-4 lg:gap-0 lg:px-12">
            {content.stats.map((item, index) => (
              <StatColumn key={item.label} item={item} index={index} />
            ))}
          </div>
        </section>

        <section className="bg-ivory-50 py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:px-12">
            <Reveal className="max-w-[32rem]">
              <SectionLabel>Pourquoi ATIAA</SectionLabel>
              <h2 className="mt-6 text-[2.45rem] font-medium leading-[1.02] tracking-[-0.05em] text-ink-950 sm:text-[3.25rem]">
                L’intérêt progresse, mais le passage à l’usage reste encore trop limité.
              </h2>
            </Reveal>

            <Reveal delay={0.06} className="grid gap-6">
              <p className="max-w-3xl text-lg leading-8 text-ink-700">
                Au Togo, l’IA attire de plus en plus d’attention. Le problème n’est plus seulement
                la découverte. Le vrai frein se situe dans l’exécution, la formation pratique, les
                outils, les cas d’usage documentés et les capacités de déploiement.
              </p>
              <div className="rounded-[1.9rem] border border-black/8 bg-white px-6 py-6 shadow-[0_18px_44px_rgba(17,24,39,0.05)] sm:px-7">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-navy-700">
                  Énoncé central
                </p>
                <p className="mt-4 font-display text-[2rem] leading-tight text-ink-950 sm:text-[2.3rem]">
                  ATIAA est la couche d’activation manquante entre la curiosité et l’impact réel.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="mission" className="bg-white py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:px-12">
            <Reveal className="space-y-8">
              <SectionLabel>Mission, vision, piliers</SectionLabel>
              <div className="rounded-[1.9rem] border border-black/8 bg-ivory-50 px-6 py-6 sm:px-7">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-700">
                  Mission
                </p>
                <p className="mt-4 text-lg leading-8 text-ink-950">
                  Accélérer l’adoption concrète de l’IA au Togo par la démonstration, la
                  formation pratique, les partenariats et les projets pilotes.
                </p>
              </div>
              <div className="rounded-[1.9rem] border border-black/8 bg-ivory-50 px-6 py-6 sm:px-7">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-700">
                  Vision
                </p>
                <p className="mt-4 text-lg leading-8 text-ink-950">
                  Faire du Togo, en commençant par Lomé, un pôle de référence de l’IA appliquée
                  en Afrique francophone.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border-t border-black/8">
                {content.pillars.map((pillar, index) => (
                  <div
                    key={pillar}
                    className={cn(
                      "grid gap-3 border-b border-black/8 py-5 sm:grid-cols-[72px_1fr]",
                      index === 0 && "pt-0"
                    )}
                  >
                    <div className="text-sm font-medium tracking-[0.04em] text-navy-700">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[1.3rem] font-medium tracking-[-0.02em] text-ink-950">
                        {pillar}
                      </p>
                      <span className="h-2.5 w-2.5 rounded-full bg-saffron-500/70" />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="programmes" className="bg-ivory-100 py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-12">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionLabel>Programmes</SectionLabel>
              <h2 className="mt-6 max-w-[12ch] text-[2.45rem] font-medium leading-[1.02] tracking-[-0.05em] text-ink-950 sm:text-[3.25rem]">
                Des formats concrets pour apprendre, tester et déployer.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-ink-700">
                L’ATIAA ne vend pas une vision abstraite de l’innovation. Elle organise des
                formats utiles pour produire de la preuve, de la capacité et des pilotes.
              </p>

              <div className="mt-10 rounded-[1.85rem] border border-black/8 bg-white px-6 py-6">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-700">
                  Secteurs ciblés
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3 text-sm text-ink-700">
                  {content.sectors.map((sector) => (
                    <span key={sector} className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-navy-950" />
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="border-t border-black/8">
              {content.programmes.map((programme: ProgrammeItem, index) => (
                <ProgrammeRow key={programme.title} programme={programme} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="projets" className="bg-white py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <Reveal className="max-w-4xl">
              <SectionLabel>Projets fondateurs</SectionLabel>
              <h2 className="mt-6 text-[2.45rem] font-medium leading-[1.02] tracking-[-0.05em] text-ink-950 sm:text-[3.25rem]">
                Des démonstrateurs réels pour installer la crédibilité par la preuve.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-700">
                ATIAA s’appuie à son lancement sur un premier ensemble de projets démonstrateurs
                portés par des membres du cercle initial. Ils illustrent différentes catégories
                d’IA appliquée et peuvent être rejoints par d’autres initiatives.
              </p>
            </Reveal>

            <div className="mt-12 space-y-6">
              {content.projects.map((project: FoundingProject, index) => (
                <ProjectModule key={project.name} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="adhesion" className="bg-ivory-50 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <Reveal className="max-w-4xl">
              <SectionLabel>Adhésion</SectionLabel>
              <h2 className="mt-6 text-[2.45rem] font-medium leading-[1.02] tracking-[-0.05em] text-ink-950 sm:text-[3.25rem]">
                Une coalition conçue pour engager des acteurs différents autour d’un même niveau
                d’exigence.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:grid-rows-2">
              <Reveal className="lg:row-span-2">
                <MembershipPanel tier={content.membershipTiers[0]} featured />
              </Reveal>
              <Reveal delay={0.05}>
                <MembershipPanel tier={content.membershipTiers[1]} />
              </Reveal>
              <Reveal delay={0.1}>
                <MembershipPanel tier={content.membershipTiers[2]} />
              </Reveal>
            </div>
          </div>
        </section>

        <section id="partenaires" className="bg-white py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
            <Reveal className="max-w-[34rem]">
              <SectionLabel>Pourquoi soutenir ATIAA</SectionLabel>
              <h2 className="mt-6 text-[2.45rem] font-medium leading-[1.02] tracking-[-0.05em] text-ink-950 sm:text-[3.25rem]">
                Un point d’appui crédible pour les entreprises et institutions.
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink-700">
                Soutenir ATIAA, c’est participer à une infrastructure de démonstration et
                d’adoption concrète de l’IA, avec un positionnement clair, sobre et orienté
                terrain.
              </p>
              <div className="mt-8 rounded-[1.85rem] border border-black/8 bg-ivory-50 px-6 py-6">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-700">
                  Lecture exécutive
                </p>
                <p className="mt-4 text-base leading-7 text-ink-950">
                  Visibilité crédible, accès à des talents, opportunités de pilotes, cas d’usage
                  terrain et co-construction d’initiatives utiles au lieu d’un simple sponsoring
                  d’image.
                </p>
              </div>
            </Reveal>

            <div className="border-t border-black/8">
              {content.supportPoints.map((point, index) => (
                <Reveal
                  key={point}
                  delay={index * 0.04}
                  className="grid gap-4 border-b border-black/8 py-5 sm:grid-cols-[56px_1fr]"
                >
                  <div className="text-sm font-medium tracking-[0.04em] text-navy-700">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="max-w-2xl text-base leading-7 text-ink-950">{point}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="gouvernance" className="bg-ivory-100 py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-12">
            <Reveal className="max-w-[32rem]">
              <SectionLabel>Gouvernance et confiance</SectionLabel>
              <h2 className="mt-6 text-[2.45rem] font-medium leading-[1.02] tracking-[-0.05em] text-ink-950 sm:text-[3.25rem]">
                Une gouvernance lisible, neutre et pensée pour l’intérêt collectif.
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink-700">
                L’ATIAA doit rester une mission commune. Sa gouvernance est conçue pour préserver
                la neutralité, l’intégrité, l’anti-capture et une capacité d’action réellement
                utile au terrain.
              </p>
              <div className="mt-8 rounded-[1.85rem] border border-black/8 bg-white px-6 py-6">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-700">
                  Principe de confiance
                </p>
                <p className="mt-4 font-display text-[2rem] leading-tight text-ink-950">
                  Une alliance utile au terrain, pas un véhicule d’appropriation privée.
                </p>
              </div>
            </Reveal>

            <div className="border-t border-black/8">
              {content.governance.map((node: GovernanceNode, index) => (
                <GovernanceRow key={node.title} node={node} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="bg-white py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <Reveal className="max-w-4xl">
              <SectionLabel>Roadmap</SectionLabel>
              <h2 className="mt-6 text-[2.45rem] font-medium leading-[1.02] tracking-[-0.05em] text-ink-950 sm:text-[3.25rem]">
                ATIAA est actuellement en phase de structuration.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-4">
              {content.roadmap.map((step: RoadmapPhase, index) => (
                <RoadmapColumn key={step.phase} step={step} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-ivory-50 py-24 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.84fr_1.16fr] lg:px-12">
            <Reveal className="max-w-[34rem]">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="mt-6 text-[2.45rem] font-medium leading-[1.02] tracking-[-0.05em] text-ink-950 sm:text-[3.25rem]">
                Deux chemins pour rejoindre la dynamique.
              </h2>
              <p className="mt-6 text-lg leading-8 text-ink-700">
                Que vous souhaitiez rejoindre l’alliance ou devenir partenaire fondateur, ATIAA
                ouvre un cadre de contact clair, simple et crédible.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="#contact"
                  className="block rounded-[1.75rem] border border-black/8 bg-white px-6 py-5 transition hover:border-black/14"
                >
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-navy-700">
                    Je veux rejoindre ATIAA
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink-700">
                    Pour contribuer, apprendre, participer aux programmes ou intégrer les projets.
                  </p>
                </a>
                <a
                  href="#partenaires"
                  className="block rounded-[1.75rem] border border-black/8 bg-white px-6 py-5 transition hover:border-black/14"
                >
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-navy-700">
                    Je veux devenir partenaire fondateur
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink-700">
                    Pour soutenir une plateforme d’activation concrète de l’IA appliquée au Togo.
                  </p>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/8 bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[1.15fr_0.85fr_0.9fr] lg:px-12">
          <div>
            <p className="text-2xl font-medium tracking-[-0.03em] text-ink-950">
              {content.brand.acronym}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-ink-700">{content.brand.tagline}</p>
            <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ink-700">
              {content.brand.location} · {content.brand.status}
            </p>
          </div>

          <div className="grid gap-2 text-sm text-ink-700">
            {content.footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-ink-950">
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-2 text-sm text-ink-700">
            <p>contact@atiaa.org</p>
            <p>LinkedIn — bientôt</p>
            <p>X / Twitter — bientôt</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
