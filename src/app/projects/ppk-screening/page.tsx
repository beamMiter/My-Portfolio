// src/app/projects/ppk-screening/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Github, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "PPK Screening & Referral System — Case Study",
  description:
    "A production web app for hospital screening and referral. Built with Next.js, React, TypeScript, Laravel, MySQL, and Docker.",
};

const TECH = ["Next.js", "React", "TypeScript", "Laravel", "MySQL", "Docker"];

function AccentPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
      {children}
    </span>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h3 className="mb-4 text-lg font-semibold tracking-wide text-emerald-300">
        {title}
      </h3>
      <div className="text-zinc-300">{children}</div>
    </section>
  );
}

export default function PpkScreeningPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* subtle premium backdrop */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.7]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60rem 60rem at 20% -10%, rgba(16,185,129,0.08), transparent 55%), radial-gradient(50rem 50rem at 100% 10%, rgba(16,185,129,0.06), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14 py-10">
        {/* Back */}
        <div className="mb-8">
          <Link
            href="/Home#projects"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {TECH.map((t) => (
            <AccentPill key={t}>{t}</AccentPill>
          ))}
        </div>

        {/* Title */}
        <header className="mt-6 text-center">
          <h1 className="text-[clamp(28px,5.2vw,52px)] font-semibold leading-tight">
            PPK Screening <span className="text-zinc-400">Recommendation Room</span>
          </h1>
          <p className="mt-2 text-[11px] tracking-widest text-emerald-300">by Techin</p>
        </header>

        {/* Hero image */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_30px_60px_-30px_rgba(0,0,0,0.6)]">
          <Image
            src="/images/projects/ppk-referral-01.png"
            alt="PPK Screening & Referral — hero mockup"
            width={1920}
            height={1080}
            className="h-auto w-full"
            sizes="(min-width:1280px) 1100px, 100vw"
            priority
          />
        </div>

        {/* Lead section */}
        <section className="mt-10">
          <div className="mx-auto max-w-4xl leading-relaxed">
            {/* Grid layout ensures text drops below on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2">
              <span className="text-emerald-400 font-medium tracking-tight leading-none text-[36px] md:text-[48px]">
                PPK
              </span>

              <p className="text-base md:text-lg text-zinc-200 leading-snug md:leading-relaxed max-w-prose">
                Screening &amp; Referral System is a web application designed for
                outpatient screening in a public hospital. The goal is simple:
                collect the right information once, decide the next step with
                clear rules, and help staff move patients to the correct clinic
                with less back and forth.
              </p>
            </div>

            <p className="mt-6 text-sm md:text-base text-zinc-400 leading-relaxed">
              The app supports Thai National ID based flows, structured forms,
              reliable referral rules, and printable summaries for on-site use.
              The interface is clean and predictable so nurses can work quickly,
              while the backend enforces validation and keeps data consistent.
            </p>
          </div>
        </section>

        {/* What it does */}
        <Section title="What it does">
          <ul className="mt-2 space-y-2">
            <li>
              Screening form with validated fields and versioned logic that can
              evolve without breaking existing records.
            </li>
            <li>
              Referral rules for common cases. For example, urinary tract infection
              routing: female patients go to Muang. Male patients who have prostate
              issues or urinary retention go to URO in the morning on Tuesday and
              Thursday between 08:00 and 12:00 (Thai time). At other times they go
              to Surgery.
            </li>
            <li>Identity and eligibility checks aligned with typical hospital operations.</li>
            <li>
              Role-based access for nurses and admins, with auditable changes and
              status updates.
            </li>
            <li>Printable artifacts for counters and clinical rooms.</li>
          </ul>
        </Section>

        {/* Inline image */}
        <figure className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_30px_60px_-30px_rgba(0,0,0,0.6)]">
          <Image
            src="/images/projects/ppk-referral-02.png"
            alt="PPK Tablet and form screen"
            width={1920}
            height={1200}
            className="h-auto w-full"
            sizes="(min-width:1280px) 1100px, 100vw"
          />
          <figcaption className="p-4 text-center text-xs text-zinc-400">
            Tablet-friendly layout for quick capture at screening counters.
          </figcaption>
        </figure>

        {/* Stack */}
        <Section title="Stack">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-zinc-400">Frontend</p>
              <p className="mt-1 text-zinc-100">
                Next.js, React, TypeScript, Tailwind, Framer Motion
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-zinc-400">Backend</p>
              <p className="mt-1 text-zinc-100">Laravel 12, PHP 8.3, MySQL</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-zinc-400">DevOps</p>
              <p className="mt-1 text-zinc-100">
                Docker Compose, environment separation, migrations &amp; backups
              </p>
            </div>
          </div>
        </Section>

        {/* Results */}
        <Section title="Results">
          <ul className="mt-2 grid gap-3 md:grid-cols-3">
            {[
              "Faster screening with fewer misroutes",
              "Clearer accountability with audit trails",
              "Easy to extend as departments add more rules",
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-zinc-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <hr className="my-12 border-white/10" />

        <p className="text-sm text-zinc-400">
          The repository below shows the structure for both the frontend and
          backend parts, along with containerized setup for local development.
        </p>

        {/* Footer actions */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="https://github.com/iMookatayou/PPK-Screening-Recommentdation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200 hover:bg-emerald-500/15"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </Link>
        </div>
      </div>
    </main>
  );
}
