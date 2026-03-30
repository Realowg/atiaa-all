"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import type {
  AudienceJourney,
  ContactPath,
  ContactIntent,
  FaqItem,
  FoundingProject,
  GovernanceNode,
  ImageAsset,
  MembershipTier,
  NavItem,
  PartnerTrack,
  PageIntro,
  ParticipationStep,
  ProfileSlot,
  ProgrammeItem,
  ProofSlot,
  RoadmapPhase,
  SiteContent,
  StatItem,
} from "@/lib/site-content";

interface SitePageProps {
  content: SiteContent;
}

interface ContactPageProps extends SitePageProps {
  intent?: ContactIntent;
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

interface ImagePanelProps {
  image: ImageAsset;
  className?: string;
  objectClassName?: string;
  label?: string;
  priority?: boolean;
}

interface PageLeadProps {
  intro: PageIntro;
  actions?: React.ReactNode;
  className?: string;
}

type ContactState = "idle" | "invalid" | "success";

const contactIntentCopy: Record<
  ContactIntent,
  {
    heading: string;
    button: string;
    placeholder: string;
  }
> = {
  member: {
    heading: "Demande d’adhésion",
    button: "Envoyer la demande d’adhésion",
    placeholder:
      "Présentez votre profil, votre organisation et la manière dont vous souhaitez contribuer à l’alliance.",
  },
  partner: {
    heading: "Demande partenaire",
    button: "Envoyer la demande partenaire",
    placeholder:
      "Indiquez le type d’appui envisagé, le périmètre souhaité et les sujets que vous voulez soutenir.",
  },
  project: {
    heading: "Proposition de projet ou de format",
    button: "Envoyer la proposition",
    placeholder:
      "Décrivez le cas d’usage, le format ou le démonstrateur proposé et ce que vous souhaitez activer avec l’ATIAA.",
  },
};

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function Reveal({ children, className, delay = 0 }: RevealProps) {
  void delay;
  return <div className={className}>{children}</div>;
}

function BrandMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[1rem] border border-black/10 bg-white transition duration-300",
        "group-hover:border-black/18 group-hover:shadow-[0_14px_28px_rgba(17,17,17,0.08)]",
        className
      )}
    >
      <div className="absolute inset-[7px] rounded-[0.82rem] border border-black/16 transition duration-300 group-hover:border-black/22" />
      <div className="absolute h-5 w-5 rounded-full border border-black/16 transition duration-300 group-hover:border-black/22" />
      <div className="absolute h-2 w-2 rounded-full bg-black transition duration-300 group-hover:scale-110" />
      <div className="absolute h-px w-7 rotate-45 bg-black/35 transition duration-300 group-hover:bg-black/45" />
      <div className="absolute h-px w-7 -rotate-45 bg-black/14 transition duration-300 group-hover:bg-black/20" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.26em] text-black/46">
      <span className="h-px w-8 bg-black/16" />
      {children}
    </span>
  );
}

function ActionLink({ href, label, tone = "primary", onClick }: ActionLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
        tone === "primary" &&
          "bg-black text-white shadow-[0_10px_26px_rgba(17,17,17,0.08)] hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-[0_18px_36px_rgba(17,17,17,0.14)]",
        tone === "secondary" &&
          "border border-black/12 bg-white text-black hover:-translate-y-0.5 hover:border-black/24 hover:bg-black/[0.03] hover:shadow-[0_14px_30px_rgba(17,17,17,0.06)]",
        tone === "text" && "px-0 py-0 text-black/62 hover:text-black"
      )}
    >
      {label}
    </Link>
  );
}

function PageLead({ intro, actions, className }: PageLeadProps) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <SectionLabel>{intro.label}</SectionLabel>
      <h1 className="mt-4 max-w-[14ch] text-[2.35rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[3rem] lg:text-[3.4rem]">
        {intro.title}
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
        {intro.description}
      </p>
      {actions ? <div className="mt-6 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
    </div>
  );
}

function ImagePanel({
  image,
  className,
  objectClassName,
  label,
  priority = false,
}: ImagePanelProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#ecebe5] transition duration-300 hover:-translate-y-0.5 hover:border-black/18 hover:shadow-[0_22px_48px_rgba(17,17,17,0.08)]",
        className
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw"
        className={cn(
          "object-cover grayscale contrast-[1.14] brightness-[0.92] transition duration-700 group-hover:scale-[1.03] group-hover:contrast-[1.18]",
          objectClassName
        )}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.14))] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.2))]" />
      {label ? (
        <div className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-black/62 backdrop-blur transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-white/94 group-hover:text-black/72">
          {label}
        </div>
      ) : null}
    </div>
  );
}

function StatColumn({ item, index }: { item: StatItem; index: number }) {
  return (
    <Reveal
      className={cn("py-5 lg:px-6 lg:py-6", index < 3 && "lg:border-r lg:border-black/10")}
      delay={index * 0.04}
    >
      <p className="text-[1.95rem] font-medium leading-none tracking-[-0.05em] text-black sm:text-[2.35rem]">
        {item.value}
      </p>
      <p className="mt-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-black/46">
        {item.label}
      </p>
      <p className="mt-3 max-w-[17rem] text-sm leading-6 text-black/62">{item.note}</p>
    </Reveal>
  );
}

function ProgrammeRow({ programme, index }: { programme: ProgrammeItem; index: number }) {
  return (
    <Reveal
      delay={index * 0.04}
      className="group -mx-3 grid gap-3 rounded-[1.5rem] border-t border-black/10 px-3 py-4 transition duration-300 hover:border-black/18 hover:bg-black/[0.024] sm:grid-cols-[56px_1fr]"
    >
      <div className="text-sm font-medium tracking-[0.04em] text-black/34 transition-colors duration-300 group-hover:text-black/54">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-black/48">
            {programme.status}
          </span>
          <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-black/48">
            {programme.window}
          </span>
        </div>
        <h3 className="text-[1.2rem] font-medium tracking-[-0.03em] text-black transition duration-300 group-hover:translate-x-0.5 sm:text-[1.28rem]">
          {programme.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/62 transition-colors duration-300 group-hover:text-black/72">
          {programme.description}
        </p>
        <p className="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-black/40">
          Public prioritaire
        </p>
        <p className="mt-1 text-sm leading-6 text-black/58">{programme.audience}</p>
      </div>
    </Reveal>
  );
}

function ProjectRow({ project, index }: { project: FoundingProject; index: number }) {
  return (
    <Reveal
      delay={index * 0.05}
      className="group -mx-4 grid gap-5 rounded-[1.75rem] border-t border-black/10 px-4 py-6 transition duration-300 hover:border-black/18 hover:bg-black/[0.022] sm:-mx-5 sm:px-5 lg:grid-cols-[0.44fr_0.78fr_0.78fr]"
    >
      <div>
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-black/40 transition-colors duration-300 group-hover:text-black/52">
          Projet {String(index + 1).padStart(2, "0")}
        </p>
        <p className="mt-3 inline-flex rounded-full bg-black/[0.04] px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-black/48">
          {project.stage}
        </p>
        <h3 className="mt-3 text-[2rem] font-medium leading-none tracking-[-0.06em] text-black transition duration-300 group-hover:translate-x-0.5 sm:text-[2.4rem]">
          {project.name}
        </h3>
      </div>
      <div>
        <p className="text-base leading-6 text-black/72 transition-colors duration-300 group-hover:text-black/82">
          {project.description}
        </p>
        <div className="mt-4 border-t border-black/10 pt-3 transition-colors duration-300 group-hover:border-black/18">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/38 transition-colors duration-300 group-hover:text-black/48">
            Champ d’application
          </p>
          <p className="mt-2 text-sm leading-6 text-black/62 transition-colors duration-300 group-hover:text-black/72">
            {project.scope}
          </p>
          <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/38 transition-colors duration-300 group-hover:text-black/48">
            Ce que cela démontre
          </p>
          <p className="mt-2 text-sm leading-6 text-black/62 transition-colors duration-300 group-hover:text-black/72">
            {project.demonstrates}
          </p>
        </div>
      </div>
      <div>
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/38 transition-colors duration-300 group-hover:text-black/48">
          Impact démontré
        </p>
        <p className="mt-2 text-sm leading-6 text-black/62 transition-colors duration-300 group-hover:text-black/72">
          {project.outcome}
        </p>
        <div className="mt-4 border-t border-black/10 pt-3 transition-colors duration-300 group-hover:border-black/18">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/38 transition-colors duration-300 group-hover:text-black/48">
            Soutien recherché
          </p>
          <p className="mt-2 text-sm leading-6 text-black/62 transition-colors duration-300 group-hover:text-black/72">
            {project.supportNeeded}
          </p>
        </div>
        <Link
          href="/contact?intent=project"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-black transition duration-300 group-hover:translate-x-0.5"
        >
          Proposer un échange autour du projet
          <span aria-hidden="true" className="transition duration-300 group-hover:translate-x-1">
            -&gt;
          </span>
        </Link>
      </div>
    </Reveal>
  );
}

function MembershipRow({
  tier,
  featured = false,
}: {
  tier: MembershipTier;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "group grid gap-5 px-6 py-6 transition duration-300 sm:px-7 lg:grid-cols-[0.8fr_0.7fr_0.7fr_auto] lg:items-start",
        featured
          ? "bg-black text-white hover:bg-black/96"
          : "border-t border-black/10 bg-white hover:border-black/18 hover:bg-[#f7f6f1]"
      )}
    >
      <div>
        <p
          className={cn(
            "text-[0.72rem] font-medium uppercase tracking-[0.24em] transition-colors duration-300",
            featured ? "text-white/54" : "text-black/42"
          )}
        >
          {tier.title}
        </p>
        <p
          className={cn(
            "mt-3 max-w-[18rem] text-base leading-6 transition-colors duration-300",
            featured ? "text-white/80" : "text-black/74 group-hover:text-black/82"
          )}
        >
          {tier.audience}
        </p>
      </div>
      <div>
        <p
          className={cn(
            "text-[0.68rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300",
            featured ? "text-white/46" : "text-black/38"
          )}
        >
          Ce qu’ils apportent
        </p>
        <p
          className={cn(
            "mt-2 text-sm leading-6 transition-colors duration-300",
            featured ? "text-white/74" : "text-black/62 group-hover:text-black/72"
          )}
        >
          {tier.contribution}
        </p>
      </div>
      <div>
        <p
          className={cn(
            "text-[0.68rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300",
            featured ? "text-white/46" : "text-black/38"
          )}
        >
          Ce qu’ils gagnent
        </p>
        <p
          className={cn(
            "mt-2 text-sm leading-6 transition-colors duration-300",
            featured ? "text-white/74" : "text-black/62 group-hover:text-black/72"
          )}
        >
          {tier.benefit}
        </p>
      </div>
      <div className="flex items-start lg:justify-end">
        <Link
          href={tier.title === "Partenaires" ? "/contact?intent=partner" : "/contact?intent=member"}
          className={cn(
            "inline-flex items-center gap-3 text-sm font-medium transition duration-300 group-hover:translate-x-0.5",
            featured ? "text-white" : "text-black"
          )}
        >
          <span>
            {tier.cta}
            <span
              className={cn(
                "mt-1 block text-[0.72rem] font-normal leading-5",
                featured ? "text-white/62" : "text-black/48"
              )}
            >
              {tier.nextStep}
            </span>
          </span>
          <span aria-hidden="true" className="pt-0.5 transition duration-300 group-hover:translate-x-1">
            -&gt;
          </span>
        </Link>
      </div>
    </div>
  );
}

function GovernanceRow({ node, index }: { node: GovernanceNode; index: number }) {
  return (
    <Reveal
      delay={index * 0.04}
      className="group -mx-3 grid gap-3 rounded-[1.5rem] border-t border-black/10 px-3 py-4 transition duration-300 hover:border-black/18 hover:bg-black/[0.02] sm:grid-cols-[52px_1fr]"
    >
      <div className="text-sm font-medium tracking-[0.04em] text-black/34 transition-colors duration-300 group-hover:text-black/54">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div>
        <h3 className="text-lg font-medium tracking-[-0.02em] text-black transition duration-300 group-hover:translate-x-0.5">
          {node.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-black/62 transition-colors duration-300 group-hover:text-black/72">
          {node.description}
        </p>
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
          "rounded-[1.75rem] border px-4 py-5 transition duration-300 sm:px-5",
          active
            ? "border-black bg-black text-white shadow-[0_18px_38px_rgba(17,17,17,0.12)]"
            : "border-black/10 bg-white hover:-translate-y-1 hover:border-black/18 hover:bg-[#fcfbf7] hover:shadow-[0_18px_38px_rgba(17,17,17,0.06)]"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <p
            className={cn(
              "text-[0.68rem] font-medium uppercase tracking-[0.24em]",
              active ? "text-white/54" : "text-black/38"
            )}
          >
            {step.phase}
          </p>
          <span className={cn("h-2.5 w-2.5 rounded-full", active ? "bg-white" : "bg-black/14")} />
        </div>
        <h3
          className={cn(
            "mt-3 text-[1.2rem] font-medium tracking-[-0.04em]",
            active ? "text-white" : "text-black"
          )}
        >
          {step.title}
        </h3>
        <p className={cn("mt-2 text-sm leading-6", active ? "text-white/72" : "text-black/62")}>
          {step.description}
        </p>
      </div>
    </Reveal>
  );
}

function ContactPathCard({
  path,
  active = false,
}: {
  path: ContactPath;
  active?: boolean;
}) {
  return (
    <Link
      href={path.href}
      data-intent={path.intent}
      data-active={active ? "true" : "false"}
      className={cn(
        "group block rounded-[1.75rem] border px-6 py-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(17,17,17,0.05)]",
        active
          ? "border-black bg-black text-white"
          : "border-black/10 bg-[#faf9f4] hover:border-black/18 hover:bg-[#f6f5ef]"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <p
          className={cn(
            "text-[0.68rem] font-medium uppercase tracking-[0.24em] transition-colors duration-300",
            active ? "text-white/62" : "text-black/42 group-hover:text-black/56"
          )}
        >
          {path.title}
        </p>
        <span
          aria-hidden="true"
          className={cn(
            "text-sm transition duration-300 group-hover:translate-x-1",
            active ? "text-white/62" : "text-black/34 group-hover:text-black/56"
          )}
        >
          -&gt;
        </span>
      </div>
      <p
        className={cn(
          "mt-3 text-sm leading-7 transition-colors duration-300",
          active ? "text-white/78" : "text-black/62 group-hover:text-black/72"
        )}
      >
        {path.description}
      </p>
      <p className={cn("mt-3 text-[0.72rem] leading-6", active ? "text-white/58" : "text-black/44")}>
        {path.nextStep}
      </p>
    </Link>
  );
}

function CompactProjectCard({ project }: { project: FoundingProject }) {
  return (
    <div className="rounded-[1.75rem] border border-black/10 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-black/18 hover:shadow-[0_20px_40px_rgba(17,17,17,0.06)]">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/40">
        {project.stage}
      </p>
      <h3 className="mt-3 text-[1.65rem] font-medium tracking-[-0.05em] text-black">
        {project.name}
      </h3>
      <p className="mt-3 text-sm leading-6 text-black/62">{project.description}</p>
      <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/38">
        Champ d’application
      </p>
      <p className="mt-2 text-sm leading-6 text-black/62">{project.scope}</p>
      <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/38">
        Ce que cela démontre
      </p>
      <p className="mt-2 text-sm leading-6 text-black/62">{project.demonstrates}</p>
    </div>
  );
}

function MembershipTeaser({ tier }: { tier: MembershipTier }) {
  return (
    <div className="rounded-[1.75rem] border border-black/10 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-black/18 hover:shadow-[0_20px_40px_rgba(17,17,17,0.06)]">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-black/42">
        {tier.title}
      </p>
      <p className="mt-3 text-sm leading-6 text-black/64">{tier.audience}</p>
      <p className="mt-3 text-[0.72rem] leading-6 text-black/46">{tier.nextStep}</p>
      <Link
        href="/adhesion"
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-black transition duration-300 hover:translate-x-0.5"
      >
        Voir les détails
        <span aria-hidden="true">-&gt;</span>
      </Link>
    </div>
  );
}

function AudienceJourneyCard({ journey }: { journey: AudienceJourney }) {
  return (
    <div className="rounded-[1.85rem] border border-black/10 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-black/18 hover:shadow-[0_22px_44px_rgba(17,17,17,0.06)] sm:p-6">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/40">
        {journey.label}
      </p>
      <h3 className="mt-3 max-w-[14ch] text-[1.55rem] font-medium leading-[1.05] tracking-[-0.04em] text-black">
        {journey.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-black/64">{journey.description}</p>
      <div className="mt-5 rounded-[1.3rem] bg-[#f7f6f1] px-4 py-3">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/38">
          Point d’appui
        </p>
        <p className="mt-2 text-sm leading-6 text-black/62">{journey.proof}</p>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <ActionLink href={journey.href} label={journey.cta} tone="secondary" />
        <ActionLink href={journey.contactHref} label={journey.contactCta} tone="text" />
      </div>
    </div>
  );
}

function ParticipationStepCard({ step, index }: { step: ParticipationStep; index: number }) {
  return (
    <div className="rounded-[1.65rem] border border-black/10 bg-white px-5 py-5">
      <p className="text-sm font-medium tracking-[0.04em] text-black/34">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-3 text-[1.15rem] font-medium tracking-[-0.03em] text-black">{step.title}</h3>
      <p className="mt-2 text-sm leading-6 text-black/62">{step.description}</p>
    </div>
  );
}

function ProfileCard({ profile }: { profile: ProfileSlot }) {
  return (
    <div className="rounded-[1.75rem] border border-black/10 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-black/18 hover:shadow-[0_20px_40px_rgba(17,17,17,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/40">
            {profile.group}
          </p>
          <h3 className="mt-3 text-[1.15rem] font-medium tracking-[-0.03em] text-black">
            {profile.placeholder}
          </h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/12 bg-[#f7f6f1] text-sm font-medium text-black/52">
          AT
        </div>
      </div>
      <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/38">
        Rôle prévu
      </p>
      <p className="mt-2 text-sm leading-6 text-black/62">{profile.role}</p>
      <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/38">
        Champ d’action
      </p>
      <p className="mt-2 text-sm leading-6 text-black/62">{profile.focus}</p>
      <p className="mt-4 text-[0.72rem] leading-6 text-black/44">{profile.note}</p>
    </div>
  );
}

function PartnerTrackCard({ track }: { track: PartnerTrack }) {
  return (
    <div className="rounded-[1.75rem] border border-black/10 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-black/18 hover:shadow-[0_20px_40px_rgba(17,17,17,0.05)]">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/40">
        Track partenaire
      </p>
      <h3 className="mt-3 text-[1.25rem] font-medium tracking-[-0.03em] text-black">{track.title}</h3>
      <p className="mt-3 text-sm leading-6 text-black/62">{track.description}</p>
      <div className="mt-4 rounded-[1.25rem] bg-[#f7f6f1] px-4 py-3">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/38">
          Valeur
        </p>
        <p className="mt-2 text-sm leading-6 text-black/62">{track.value}</p>
      </div>
    </div>
  );
}

function ProofSlotCard({ slot }: { slot: ProofSlot }) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-black/16 bg-[#faf9f4] p-5">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/40">
        {slot.stateLabel}
      </p>
      <h3 className="mt-3 text-[1.15rem] font-medium tracking-[-0.03em] text-black">{slot.title}</h3>
      <p className="mt-3 text-sm leading-6 text-black/62">{slot.description}</p>
    </div>
  );
}

function FaqRow({ item, index }: { item: FaqItem; index: number }) {
  return (
    <div className={cn("py-4", index > 0 && "border-t border-black/10")}>
      <p className="text-[0.95rem] font-medium tracking-[-0.02em] text-black">{item.question}</p>
      <p className="mt-2 text-sm leading-6 text-black/62">{item.answer}</p>
    </div>
  );
}

function ClosingPanel({
  label,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  label: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-black px-6 py-6 text-white sm:px-8 sm:py-7">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/56">
        {label}
      </p>
      <h2 className="mt-3 max-w-3xl text-[1.5rem] font-medium leading-tight tracking-[-0.04em] sm:text-[1.7rem]">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72 sm:text-base">
        {description}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={primaryHref}
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:bg-white/92"
        >
          {primaryLabel}
        </Link>
        <Link
          href={secondaryHref}
          className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/6 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/26 hover:bg-white/10"
        >
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}

function ContactForm({
  intent,
  selectedPath,
}: {
  intent: ContactIntent;
  selectedPath: ContactPath;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<ContactState>("idle");
  const [message, setMessage] = useState("");
  const intentCopy = contactIntentCopy[intent];

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
        `Complétez tous les champs avec une adresse email valide pour préparer le parcours « ${selectedPath.title} ».`
      );
      return;
    }

    setState("success");
    setMessage(
      `Votre demande « ${selectedPath.title} » est prête à être qualifiée. En attendant l’ouverture complète du canal, écrivez à contact@atiaa.org en rappelant votre organisation, votre profil et votre objectif.`
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
      data-contact-intent={intent}
      className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.05)] transition duration-300 hover:border-black/16 hover:shadow-[0_28px_64px_rgba(17,17,17,0.08)] sm:p-7"
    >
      <div className="mb-5 rounded-[1.6rem] border border-black/10 bg-[#faf9f4] px-4 py-4">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/42">
          {intentCopy.heading}
        </p>
        <p className="mt-2 text-sm leading-6 text-black/62">{selectedPath.nextStep}</p>
      </div>

      <input type="hidden" name="intent" value={intent} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/42">
            Nom
          </span>
          <input
            type="text"
            name="name"
            className="w-full rounded-2xl border border-black/10 bg-[#f5f4ef] px-4 py-3 text-sm text-black outline-none transition duration-300 hover:border-black/16 focus:border-black"
          />
        </label>
        <label className="space-y-2">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/42">
            Organisation
          </span>
          <input
            type="text"
            name="organization"
            className="w-full rounded-2xl border border-black/10 bg-[#f5f4ef] px-4 py-3 text-sm text-black outline-none transition duration-300 hover:border-black/16 focus:border-black"
          />
        </label>
        <label className="space-y-2">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/42">
            Email
          </span>
          <input
            type="email"
            name="email"
            className="w-full rounded-2xl border border-black/10 bg-[#f5f4ef] px-4 py-3 text-sm text-black outline-none transition duration-300 hover:border-black/16 focus:border-black"
          />
        </label>
        <label className="space-y-2">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/42">
            Profil
          </span>
          <select
            name="profile"
            defaultValue=""
            className="w-full rounded-2xl border border-black/10 bg-[#f5f4ef] px-4 py-3 text-sm text-black outline-none transition duration-300 hover:border-black/16 focus:border-black"
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

      <label className="mt-4 block space-y-2">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/42">
          Message
        </span>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-[1.6rem] border border-black/10 bg-[#f5f4ef] px-4 py-3 text-sm text-black outline-none transition duration-300 hover:border-black/16 focus:border-black"
          placeholder={intentCopy.placeholder}
        />
      </label>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => {
            if (formRef.current) {
              submitForm(formRef.current);
            }
          }}
          className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-[0_10px_26px_rgba(17,17,17,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-[0_18px_36px_rgba(17,17,17,0.14)]"
        >
          {intentCopy.button}
        </button>
        <p className="max-w-xs text-sm leading-6 text-black/54">
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
                ? "border-black/10 bg-[#f2f5ef] text-black"
                : "border-black/10 bg-[#f5f1ea] text-black"
            )}
          >
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}

function SiteFrame({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="page-shell relative isolate overflow-hidden bg-background text-black">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
          <Link href="/" className="group flex items-center gap-4">
            <BrandMark />
            <div className="min-w-0">
              <p className="text-[1.28rem] font-medium tracking-[-0.04em] text-black transition-colors duration-300 group-hover:text-black">
                {content.brand.acronym}
              </p>
              <p className="mt-0.5 max-w-[14.5rem] text-[0.64rem] uppercase tracking-[0.22em] text-black/42 transition-colors duration-300 group-hover:text-black/54">
                Alliance Togolaise pour l’IA Appliquée
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {content.navItems.map((item: NavItem) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap text-[0.95rem] font-medium transition duration-300",
                    active ? "text-black" : "text-black/58 hover:text-black"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <ActionLink href="/contact?intent=partner" label="Devenir partenaire" tone="text" />
            <ActionLink href="/contact?intent=member" label="Rejoindre l’alliance" />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black transition duration-300 hover:border-black/18 hover:shadow-[0_14px_28px_rgba(17,17,17,0.08)] lg:hidden"
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
              className="overflow-hidden border-t border-black/10 bg-background/96 lg:hidden"
            >
              <div className="space-y-4 px-6 py-6 sm:px-8">
                {content.navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block text-base transition",
                      pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                        ? "text-black"
                        : "text-black/62 hover:text-black"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-3">
                  <ActionLink href="/contact?intent=member" label="Rejoindre l’alliance" />
                  <ActionLink href="/contact?intent=partner" label="Devenir partenaire" tone="secondary" />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>{children}</main>

      <footer className="border-t border-black/10 bg-[#faf9f5] py-10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.8fr_0.9fr] lg:px-12">
          <div>
            <div className="group flex items-center gap-4">
              <BrandMark />
              <div>
                <p className="text-2xl font-medium tracking-[-0.04em] text-black transition-colors duration-300 group-hover:text-black">
                  {content.brand.acronym}
                </p>
                <p className="mt-1 text-[0.64rem] uppercase tracking-[0.22em] text-black/42 transition-colors duration-300 group-hover:text-black/54">
                  Alliance Togolaise pour l’IA Appliquée
                </p>
              </div>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-black/62">{content.brand.tagline}</p>
            <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/40">
              {content.brand.location} · {content.brand.status}
            </p>
            <p className="mt-4 text-xs leading-6 text-black/34">
              Photographies documentaires sous licence Unsplash.
            </p>
          </div>

          <div className="grid gap-2 text-sm text-black/62">
            {content.footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-2 transition duration-300 hover:translate-x-0.5 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-2 text-sm text-black/62">
            <p>contact@atiaa.org</p>
            <p>LinkedIn — bientôt</p>
            <p>X / Twitter — bientôt</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomepageOverview({ content }: SitePageProps) {
  return (
    <>
      <section id="accueil" className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-[1520px] lg:grid lg:min-h-[calc(100svh-80px)] lg:grid-cols-[0.86fr_1.14fr]">
          <Reveal className="flex items-center px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 xl:py-16">
            <div className="max-w-[35rem]">
              <SectionLabel>
                {content.brand.status} — {content.brand.location}
              </SectionLabel>
              <p className="mt-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-black/42">
                {content.brand.name}
              </p>
              <h1 className="mt-4 max-w-[10.5ch] text-[2.85rem] font-medium leading-[0.95] tracking-[-0.07em] text-black sm:text-[4rem] lg:text-[5rem]">
                L’alliance qui transforme l’IA en usages concrets au Togo
              </h1>
              <p className="mt-5 max-w-[32rem] text-base leading-7 text-black/64 sm:text-[1.02rem] sm:leading-8">
                ATIAA fédère fondateurs, experts, organisations et partenaires pour démontrer,
                former et déployer l’IA appliquée, à partir de Lomé.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ActionLink href="/contact?intent=member" label="Rejoindre l’alliance" />
                <ActionLink href="/contact?intent=partner" label="Devenir partenaire" tone="secondary" />
              </div>

              <div className="mt-8 border-t border-black/10 pt-4">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/40">
                  Écosystème mobilisé
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-black/60">
                  {content.trustRoles.map((role) => (
                    <div key={role} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-black/32" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="group relative min-h-[23rem] overflow-hidden border-t border-black/10 transition duration-300 sm:min-h-[29rem] lg:min-h-0 lg:border-l lg:border-t-0">
            <Image
              src={content.imagery.hero.src}
              alt={content.imagery.hero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-[center_24%] grayscale contrast-[1.16] brightness-[0.86] transition duration-700 group-hover:scale-[1.025] group-hover:contrast-[1.2]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.28))] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.34))]" />
            <div className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-black/62 backdrop-blur transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-white/94 sm:left-5 sm:top-5">
              Alliance en structuration
            </div>
            <div className="absolute bottom-5 left-5 right-5 max-w-[22rem] rounded-[1.5rem] border border-white/18 bg-black/50 px-4 py-4 text-white backdrop-blur-sm transition duration-300 group-hover:-translate-y-0.5 group-hover:border-white/24 group-hover:bg-black/56 sm:bottom-6 sm:left-6 sm:right-6 sm:max-w-[24rem] sm:px-5 sm:py-5">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-white/60">
                Vue de terrain
              </p>
              <p className="mt-2 text-sm leading-6 text-white/86 sm:mt-3 sm:text-base sm:leading-7">
                Une plateforme qui rapproche les acteurs, structure les démonstrations et rend
                l’IA appliquée visible et transmissible.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f6f1]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:px-8 lg:grid-cols-4 lg:gap-0 lg:px-12">
          {content.stats.map((item, index) => (
            <StatColumn key={item.label} item={item} index={index} />
          ))}
        </div>
      </section>

      <section id="journeys-overview" className="border-b border-black/10 bg-[#f8f7f2] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <Reveal className="max-w-[34rem]">
            <SectionLabel>Choisir votre parcours</SectionLabel>
            <h2 className="mt-4 text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[3rem]">
              Trois portes d’entrée, un même niveau d’exigence.
            </h2>
            <p className="mt-5 text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
              Le site ne renvoie plus vers un contact générique. Chaque parcours qualifie un rôle,
              un niveau d’engagement et une prochaine étape précise.
            </p>
            <div className="mt-8 grid gap-4">
              {content.participationSteps.map((step, index) => (
                <ParticipationStepCard key={step.title} step={step} index={index} />
              ))}
            </div>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {content.audienceJourneys.map((journey) => (
              <AudienceJourneyCard key={journey.intent} journey={journey} />
            ))}
          </div>
        </div>
      </section>

      <section id="about-overview" className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:px-12">
          <Reveal className="order-2 lg:order-1">
            <ImagePanel
              image={content.imagery.why}
              className="aspect-[11/10] sm:aspect-[16/10] lg:h-[32rem]"
              objectClassName="object-[center_32%]"
              label="À propos"
            />
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <div className="max-w-[34rem]">
              <SectionLabel>{content.pageIntros.about.label}</SectionLabel>
              <h2 className="mt-4 text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[3rem]">
                {content.pageIntros.about.title}
              </h2>
              <p className="mt-5 text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
                {content.statements.why}
              </p>
              <div className="mt-8 border-l-2 border-black pl-5 sm:pl-6">
                <p className="text-[1.55rem] font-medium leading-tight tracking-[-0.04em] text-black sm:text-[2rem]">
                  {content.statements.activation}
                </p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.65rem] border border-black/10 bg-[#faf9f4] p-5">
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/40">
                    Mission
                  </p>
                  <p className="mt-3 text-sm leading-6 text-black/62">{content.statements.mission}</p>
                </div>
                <div className="rounded-[1.65rem] border border-black/10 bg-[#faf9f4] p-5">
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/40">
                    Confiance
                  </p>
                  <p className="mt-3 text-sm leading-6 text-black/62">{content.statements.trust}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ActionLink href="/about" label="Découvrir l’alliance" tone="secondary" />
                <ActionLink href="/contact?intent=member" label="Parler à la coordination" tone="text" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="programmes-overview" className="border-b border-black/10 bg-[#f8f7f2] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel>{content.pageIntros.programmes.label}</SectionLabel>
            <h2 className="mt-4 max-w-[11ch] text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[3rem]">
              {content.pageIntros.programmes.title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
              {content.pageIntros.programmes.description}
            </p>
            <div className="mt-8">
              <ImagePanel
                image={content.imagery.programmes}
                className="aspect-[15/10] sm:aspect-[4/3]"
                objectClassName="object-center"
                label="Formats prioritaires"
              />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ActionLink href="/programmes" label="Voir tous les programmes" tone="secondary" />
              <ActionLink href="/contact?intent=project" label="Proposer un format" tone="text" />
            </div>
          </Reveal>

          <div className="border-t border-black/10">
            {content.programmes.slice(0, 3).map((programme, index) => (
              <ProgrammeRow key={programme.title} programme={programme} index={index} />
            ))}
            <div className="rounded-[1.65rem] border border-black/10 bg-white p-5 mt-4">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/40">
                Secteurs ciblés
              </p>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm text-black/62">
                {content.sectors.map((sector) => (
                  <span key={sector} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projets-overview" className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
            <div className="max-w-3xl">
              <SectionLabel>{content.pageIntros.projets.label}</SectionLabel>
              <h2 className="mt-4 text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[3rem]">
                {content.pageIntros.projets.title}
              </h2>
              <p className="mt-5 text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
                Trois démonstrateurs servent déjà de base de preuve. Le prochain enjeu est
                d’ouvrir la page à d’autres initiatives documentées et lisibles.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ActionLink href="/projets" label="Voir les projets" tone="secondary" />
              <ActionLink href="/contact?intent=project" label="Proposer un démonstrateur" tone="text" />
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {content.projects.map((project) => (
              <CompactProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="engagement-overview" className="border-b border-black/10 bg-[#f8f7f2] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12">
          <Reveal className="max-w-[34rem]">
            <SectionLabel>S’engager avec ATIAA</SectionLabel>
            <h2 className="mt-4 text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[3rem]">
              Une adhésion structurée, un cadre partenaire lisible.
            </h2>
            <p className="mt-5 text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
              L’adhésion, le soutien partenaire et l’entrée par les démonstrateurs sont désormais
              pensés comme des parcours distincts, avec des prochaines étapes visibles dès le site.
            </p>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {content.membershipTiers.map((tier) => (
                <MembershipTeaser key={tier.title} tier={tier} />
              ))}
            </div>
          </Reveal>

          <div>
            <div className="rounded-[1.85rem] bg-black px-6 py-6 text-white sm:px-7">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/56">
                Lecture exécutive
              </p>
              <p className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.04em] text-white sm:text-[1.6rem]">
                {content.statements.support}
              </p>
            </div>
            <div className="mt-5 overflow-hidden rounded-[2rem] border border-black/10 bg-white">
              {content.supportPoints.slice(0, 3).map((point, index) => (
                <Reveal
                  key={point}
                  delay={index * 0.04}
                  className={cn(
                    "group grid gap-4 px-6 py-4 transition duration-300 hover:bg-black/[0.02] sm:grid-cols-[52px_1fr] sm:px-7",
                    index > 0 && "border-t border-black/10"
                  )}
                >
                  <div className="text-sm font-medium tracking-[0.04em] text-black/34 transition-colors duration-300 group-hover:text-black/52">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="max-w-2xl text-base leading-6 text-black/72 transition-colors duration-300 group-hover:text-black/84">
                    {point}
                  </p>
                </Reveal>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ActionLink href="/partenaires" label="Voir la page partenaires" tone="secondary" />
              <ActionLink href="/contact?intent=partner" label="Ouvrir un échange partenaire" tone="text" />
            </div>
          </div>
        </div>
      </section>

      <section id="contact-overview" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <ClosingPanel
            label="Passer à l’action"
            title="Choisissez maintenant le prochain échange à ouvrir avec l’ATIAA."
            description="Le site vous aide à comprendre l’alliance. Le contact vous permet de qualifier le bon parcours et de passer à une prochaine étape concrète."
            primaryHref="/contact?intent=member"
            primaryLabel="Rejoindre l’alliance"
            secondaryHref="/contact?intent=project"
            secondaryLabel="Proposer un démonstrateur"
          />
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {content.contactPaths.map((path) => (
              <ContactPathCard key={path.title} path={path} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function Homepage({ content }: SitePageProps) {
  return (
    <SiteFrame content={content}>
      <HomepageOverview content={content} />
    </SiteFrame>
  );
}

export function AboutPage({ content }: SitePageProps) {
  return (
    <SiteFrame content={content}>
      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-12">
          <PageLead
            intro={content.pageIntros.about}
            actions={
              <>
                <ActionLink href="/contact?intent=member" label="Rejoindre l’alliance" />
                <ActionLink href="/contact?intent=partner" label="Parler à la coordination" tone="secondary" />
              </>
            }
          />
          <div className="rounded-[2rem] border border-black/10 bg-[#faf9f4] p-6 sm:p-7">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/40">
              Repères d’alliance
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {content.stats.map((item) => (
                <div key={item.label} className="border-t border-black/10 pt-4">
                  <p className="text-[1.45rem] font-medium tracking-[-0.05em] text-black">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/42">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f8f7f2] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:px-12">
          <div className="max-w-[34rem]">
            <SectionLabel>Pourquoi ATIAA</SectionLabel>
            <h2 className="mt-4 text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[3rem]">
              L’intérêt pour l’IA progresse, mais l’exécution reste encore trop limitée.
            </h2>
            <p className="mt-5 text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
              {content.statements.why}
            </p>
            <div className="mt-8 border-l-2 border-black pl-5 sm:pl-6">
              <p className="text-[1.55rem] font-medium leading-tight tracking-[-0.04em] text-black sm:text-[2rem]">
                {content.statements.activation}
              </p>
            </div>
          </div>
          <ImagePanel
            image={content.imagery.why}
            className="aspect-[11/10] sm:aspect-[16/10] lg:h-[34rem]"
            objectClassName="object-[center_32%]"
            label="Adoption concrète"
          />
        </div>
      </section>

      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-12">
          <Reveal className="max-w-[34rem] space-y-8">
            <div>
              <SectionLabel>Mission, vision, piliers</SectionLabel>
              <h2 className="mt-4 text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[2.9rem]">
                Une plateforme d’exécution pour l’IA appliquée.
              </h2>
            </div>
            <div className="border-t border-black/10 pt-5">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/40">
                Mission
              </p>
              <p className="mt-3 text-base leading-7 text-black/72 sm:text-lg sm:leading-8">
                {content.statements.mission}
              </p>
            </div>
            <div className="border-t border-black/10 pt-5">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/40">
                Vision
              </p>
              <p className="mt-3 text-base leading-7 text-black/72 sm:text-lg sm:leading-8">
                {content.statements.vision}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border-t border-black/10">
              {content.pillars.map((pillar, index) => (
                <div
                  key={pillar}
                  className={cn(
                    "grid gap-3 border-b border-black/10 py-4 sm:grid-cols-[64px_1fr]",
                    index === 0 && "pt-0"
                  )}
                >
                  <div className="text-sm font-medium tracking-[0.04em] text-black/34">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[1.18rem] font-medium tracking-[-0.03em] text-black sm:text-[1.24rem]">
                      {pillar}
                    </p>
                    <span className="h-2.5 w-2.5 rounded-full bg-black/18" />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <Reveal className="max-w-[34rem]">
            <SectionLabel>Profils à documenter</SectionLabel>
            <h2 className="mt-4 text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[3rem]">
              Une architecture prête à accueillir les futurs profils fondateurs et de gouvernance.
            </h2>
            <p className="mt-5 text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
              Cette page prévoit déjà les espaces nécessaires pour rendre visibles les personnes,
              rôles et responsabilités qui renforceront la lisibilité de l’alliance à mesure que
              la structuration avance.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {content.leadershipProfiles.map((profile) => (
              <ProfileCard key={`${profile.group}-${profile.role}`} profile={profile} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f8f7f2] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12">
          <div className="max-w-[34rem]">
            <SectionLabel>Gouvernance et confiance</SectionLabel>
            <h2 className="mt-4 text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[3rem]">
              Une gouvernance lisible, neutre et pensée pour l’intérêt collectif.
            </h2>
            <p className="mt-5 text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
              {content.pageIntros.about.description}
            </p>
            <div className="mt-6 rounded-[1.85rem] bg-black px-6 py-6 text-white sm:px-7">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/56">
                Principe de confiance
              </p>
              <p className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.04em] text-white sm:text-[1.65rem]">
                {content.statements.trust}
              </p>
            </div>
            <div className="mt-8">
              <ImagePanel
                image={content.imagery.governance}
                className="aspect-[15/10] sm:aspect-[16/9]"
                objectClassName="object-center"
                label="Confiance et coordination"
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white px-6 py-2 sm:px-7">
            {content.governance.map((node, index) => (
              <GovernanceRow key={node.title} node={node} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <SectionLabel>Roadmap</SectionLabel>
            <h2 className="mt-4 text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[3rem]">
              {content.statements.roadmap}
            </h2>
          </div>
          <div className="mt-9 grid gap-5 lg:grid-cols-4">
            {content.roadmap.map((step, index) => (
              <RoadmapColumn key={step.phase} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <ClosingPanel
            label="Prochaine étape"
            title="Si vous voulez rejoindre la structuration, commencez par un échange de cadrage."
            description="L’ATIAA avance avec une logique de coalition: chaque nouveau membre, partenaire ou contributeur doit entrer avec un rôle clair et un niveau d’engagement explicite."
            primaryHref="/contact?intent=member"
            primaryLabel="Rejoindre l’alliance"
            secondaryHref="/contact?intent=partner"
            secondaryLabel="Parler partenariat"
          />
        </div>
      </section>
    </SiteFrame>
  );
}

export function ProgrammesPage({ content }: SitePageProps) {
  return (
    <SiteFrame content={content}>
      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-12">
          <PageLead
            intro={content.pageIntros.programmes}
            actions={
              <>
                <ActionLink href="/contact?intent=member" label="Participer à un programme" />
                <ActionLink href="/contact?intent=project" label="Proposer un format" tone="secondary" />
              </>
            }
          />
          <div className="rounded-[2rem] border border-black/10 bg-[#faf9f4] p-6 sm:p-7">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/40">
              Repères de programme
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="border-t border-black/10 pt-4">
                <p className="text-[1.45rem] font-medium tracking-[-0.05em] text-black">
                  {content.programmes.length}
                </p>
                <p className="mt-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/42">
                  formats actifs
                </p>
              </div>
              <div className="border-t border-black/10 pt-4">
                <p className="text-[1.45rem] font-medium tracking-[-0.05em] text-black">
                  {content.sectors.length}
                </p>
                <p className="mt-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/42">
                  secteurs ciblés
                </p>
              </div>
            </div>
            <div className="mt-5 border-t border-black/10 pt-4">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/40">
                Priorités
              </p>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm text-black/62">
                {content.sectors.slice(0, 5).map((sector) => (
                  <span key={sector} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f8f7f2] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <ImagePanel
              image={content.imagery.programmes}
              className="aspect-[15/10] sm:aspect-[4/3]"
              objectClassName="object-center"
              label="Démontrer et former"
            />
            <div className="mt-8 border-t border-black/10 pt-4">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/40">
                Secteurs ciblés
              </p>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm text-black/62">
                {content.sectors.map((sector) => (
                  <span key={sector} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="border-t border-black/10">
            {content.programmes.map((programme, index) => (
              <ProgrammeRow key={programme.title} programme={programme} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-3 lg:px-12">
          {content.participationSteps.map((step, index) => (
            <ParticipationStepCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <ClosingPanel
            label="Cadre d’activation"
            title="Des formats conçus pour produire de la preuve, faire monter les équipes en capacité et ouvrir des pilotes utiles."
            description="Si vous voulez participer à un programme, accueillir un format ou proposer une variante sectorielle, la prochaine étape est un échange de cadrage."
            primaryHref="/contact?intent=member"
            primaryLabel="Participer à un programme"
            secondaryHref="/contact?intent=project"
            secondaryLabel="Proposer un format"
          />
        </div>
      </section>
    </SiteFrame>
  );
}

export function ProjectsPage({ content }: SitePageProps) {
  return (
    <SiteFrame content={content}>
      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-12">
          <PageLead
            intro={content.pageIntros.projets}
            actions={
              <>
                <ActionLink href="/contact?intent=project" label="Proposer un projet" />
                <ActionLink href="/contact?intent=partner" label="Soutenir un démonstrateur" tone="secondary" />
              </>
            }
          />
          <div className="rounded-[2rem] border border-black/10 bg-[#faf9f4] p-6 sm:p-7">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/40">
              Cercle initial
            </p>
            <div className="mt-4 space-y-4">
              {content.projects.map((project) => (
                <div key={project.name} className="border-t border-black/10 pt-4">
                  <p className="text-[1.35rem] font-medium tracking-[-0.04em] text-black">
                    {project.name}
                  </p>
                  <p className="mt-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/40">
                    {project.stage}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/62">{project.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f8f7f2] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:px-12">
          <div className="max-w-[36rem]">
            <SectionLabel>Cadre de lancement</SectionLabel>
            <h2 className="mt-4 text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[3rem]">
              Un premier cercle de projets pour montrer des usages appliqués, observables et transmissibles.
            </h2>
            <p className="mt-5 text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
              Les projets fondateurs servent à installer des preuves visibles, documenter des cas
              d’usage concrets et ouvrir l’alliance à d’autres initiatives.
            </p>
          </div>
          <ImagePanel
            image={content.imagery.projects}
            className="aspect-[16/10] sm:aspect-[16/9]"
            objectClassName="object-center"
            label="Ateliers et preuves terrain"
          />
        </div>
      </section>

      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {content.projects.map((project, index) => (
            <ProjectRow key={project.name} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <ClosingPanel
            label="Ouvrir un démonstrateur"
            title="Vous avez un cas d’usage, un format ou un pilote crédible à proposer ?"
            description="Le contact projet sert à qualifier la valeur terrain, les besoins d’accompagnement et la manière dont le démonstrateur peut rejoindre l’écosystème ATIAA."
            primaryHref="/contact?intent=project"
            primaryLabel="Proposer un projet"
            secondaryHref="/contact?intent=partner"
            secondaryLabel="Soutenir un démonstrateur"
          />
        </div>
      </section>
    </SiteFrame>
  );
}

export function MembershipPage({ content }: SitePageProps) {
  return (
    <SiteFrame content={content}>
      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-12">
          <PageLead
            intro={content.pageIntros.adhesion}
            actions={
              <>
                <ActionLink href="/contact?intent=member" label="Ouvrir une prise de contact" />
                <ActionLink href="/about" label="Comprendre l’alliance" tone="secondary" />
              </>
            }
          />
          <div className="rounded-[2rem] border border-black/10 bg-[#faf9f4] p-6 sm:p-7">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/40">
              Niveaux d’engagement
            </p>
            <div className="mt-4 space-y-4">
              {content.membershipTiers.map((tier) => (
                <div key={tier.title} className="border-t border-black/10 pt-4">
                  <p className="text-[1.2rem] font-medium tracking-[-0.03em] text-black">
                    {tier.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/62">{tier.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f8f7f2] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white">
            <MembershipRow tier={content.membershipTiers[0]} featured />
            <MembershipRow tier={content.membershipTiers[1]} />
            <MembershipRow tier={content.membershipTiers[2]} />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-12">
          <div className="rounded-[2rem] border border-black/10 bg-[#faf9f4] px-6 py-6 sm:px-8">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/42">
              Principe d’engagement
            </p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
              L’adhésion n’est pas un statut décoratif. Elle sert à clarifier le rôle, l’apport et
              le niveau d’engagement de chaque acteur dans la structuration de l’alliance.
            </p>
          </div>
          <div className="rounded-[2rem] border border-black/10 bg-white px-6 py-4 sm:px-7">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/40">
              Questions fréquentes
            </p>
            <div className="mt-3">
              {content.faqs.adhesion.map((item, index) => (
                <FaqRow key={item.question} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <ClosingPanel
            label="Entrer dans la coalition"
            title="Choisissez le niveau d’engagement pertinent, puis ouvrez un échange de cadrage."
            description="Le bon parcours ne se décide pas par intuition. Il se qualifie en fonction de votre rôle, de votre capacité d’apport et du cadre le plus utile pour l’alliance."
            primaryHref="/contact?intent=member"
            primaryLabel="Ouvrir une prise de contact"
            secondaryHref="/about"
            secondaryLabel="Voir la structure de l’alliance"
          />
        </div>
      </section>
    </SiteFrame>
  );
}

export function PartnersPage({ content }: SitePageProps) {
  return (
    <SiteFrame content={content}>
      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-12">
          <PageLead
            intro={content.pageIntros.partenaires}
            actions={
              <>
                <ActionLink href="/contact?intent=partner" label="Devenir partenaire" />
                <ActionLink href="/projets" label="Voir les démonstrateurs" tone="secondary" />
              </>
            }
          />
          <div className="rounded-[2rem] border border-black/10 bg-[#faf9f4] p-6 sm:p-7">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/40">
              Ce que les partenaires gagnent
            </p>
            <div className="mt-4 space-y-4">
              {content.supportPoints.slice(0, 3).map((point) => (
                <div key={point} className="border-t border-black/10 pt-4">
                  <p className="text-sm leading-6 text-black/64">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f8f7f2] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-12">
          <div className="max-w-[34rem]">
            <div className="rounded-[1.85rem] bg-black px-6 py-6 text-white sm:px-7">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/56">
                Lecture exécutive
              </p>
              <p className="mt-3 text-[1.5rem] font-medium leading-tight tracking-[-0.04em] text-white sm:text-[1.6rem]">
                {content.statements.support}
              </p>
            </div>
            <div className="mt-8">
              <ImagePanel
                image={content.imagery.governance}
                className="aspect-[15/10] sm:aspect-[16/9]"
                objectClassName="object-center"
                label="Partenariats et coordination"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white">
            {content.supportPoints.map((point, index) => (
              <Reveal
                key={point}
                delay={index * 0.04}
                className={cn(
                  "group grid gap-4 px-6 py-4 transition duration-300 hover:bg-black/[0.02] sm:grid-cols-[52px_1fr] sm:px-7",
                  index > 0 && "border-t border-black/10"
                )}
              >
                <div className="text-sm font-medium tracking-[0.04em] text-black/34 transition-colors duration-300 group-hover:text-black/52">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="max-w-2xl text-base leading-6 text-black/72 transition-colors duration-300 group-hover:text-black/84">
                  {point}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-12">
          <Reveal className="max-w-[34rem]">
            <SectionLabel>Tracks partenaires</SectionLabel>
            <h2 className="mt-4 text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[3rem]">
              Trois manières de soutenir sans diluer l’utilité du partenariat.
            </h2>
            <p className="mt-5 text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
              L’ATIAA prépare des cadres distincts pour les soutiens fondateurs, les appuis sur
              programme et les partenariats orientés démonstrateurs ou pilotes.
            </p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            {content.partnerTracks.map((track) => (
              <PartnerTrackCard key={track.title} track={track} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f8f7f2] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-12">
          <Reveal className="max-w-[34rem]">
            <SectionLabel>Preuve à documenter</SectionLabel>
            <h2 className="mt-4 text-[2.2rem] font-medium leading-[1.02] tracking-[-0.06em] text-black sm:text-[3rem]">
              La page est prête à accueillir les premiers logos, soutiens et cas activés.
            </h2>
            <p className="mt-5 text-base leading-7 text-black/64 sm:text-lg sm:leading-8">
              Aucun faux logo n’est affiché. Les modules suivants sont prévus pour recevoir des
              preuves réelles dès qu’elles seront disponibles.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {content.proofSlots.map((slot) => (
              <ProofSlotCard key={slot.title} slot={slot} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <ClosingPanel
            label="Cadre partenaire"
            title="Si vous voulez soutenir ATIAA, ouvrez un échange structuré plutôt qu’un simple signal d’intérêt."
            description="Le partenariat doit préciser le type d’appui, le périmètre utile et la manière dont la contribution renforce des programmes, des démonstrateurs ou la structuration globale."
            primaryHref="/contact?intent=partner"
            primaryLabel="Devenir partenaire"
            secondaryHref="/projets"
            secondaryLabel="Voir les démonstrateurs"
          />
        </div>
      </section>
    </SiteFrame>
  );
}

export function ContactPage({ content, intent = "member" }: ContactPageProps) {
  const selectedPath =
    content.contactPaths.find((path) => path.intent === intent) ?? content.contactPaths[0];
  const orderedPaths = [
    selectedPath,
    ...content.contactPaths.filter((path) => path.intent !== intent),
  ];

  return (
    <SiteFrame content={content}>
      <section className="border-b border-black/10 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-12">
          <PageLead
            intro={content.pageIntros.contact}
            actions={
              <>
                <ActionLink href={selectedPath.href} label={selectedPath.title} tone="secondary" />
                <ActionLink href="/about" label="Voir la structure de l’alliance" tone="text" />
              </>
            }
          />
          <div className="space-y-3">
            {orderedPaths.map((path) => (
              <ContactPathCard key={path.title} path={path} active={path.intent === intent} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f7f2] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[0.84fr_1.16fr] lg:px-12">
          <div className="space-y-5">
            <div className="rounded-[1.75rem] border border-black/10 bg-white px-6 py-5">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/42">
                Parcours sélectionné
              </p>
              <h2 className="mt-3 text-[1.4rem] font-medium tracking-[-0.04em] text-black">
                {selectedPath.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-black/62">{selectedPath.description}</p>
              <p className="mt-4 text-[0.72rem] leading-6 text-black/46">{selectedPath.nextStep}</p>
            </div>
            <div className="rounded-[1.75rem] border border-black/10 bg-white px-6 py-5">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/42">
                Ce qui se passe ensuite
              </p>
              <div className="mt-3 space-y-4">
                {content.participationSteps.map((step, index) => (
                  <div key={step.title} className={cn(index > 0 && "border-t border-black/10 pt-4")}>
                    <p className="text-sm font-medium tracking-[-0.02em] text-black">
                      {String(index + 1).padStart(2, "0")} · {step.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-black/62">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-black/10 bg-white px-6 py-4">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/42">
                Questions fréquentes
              </p>
              <div className="mt-3">
                {content.faqs.contact.map((item, index) => (
                  <FaqRow key={item.question} item={item} index={index} />
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-black/10 bg-white px-6 py-5">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-black/42">
                Coordination
              </p>
              <p className="mt-3 text-sm leading-7 text-black/62">
                En attendant l’ouverture complète du canal, vous pouvez écrire à
                <span className="font-medium text-black"> contact@atiaa.org</span>.
              </p>
            </div>
          </div>

          <ContactForm intent={intent} selectedPath={selectedPath} />
        </div>
      </section>
    </SiteFrame>
  );
}
