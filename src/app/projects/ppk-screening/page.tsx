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

export default function PpkScreeningPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-[1100px] px-6 py-10">
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
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="mt-6 text-center text-[clamp(28px,5.4vw,48px)] font-semibold leading-tight">
          PPK Screening Recommentdation Room
        </h1>
        <p className="mt-2 text-center text-[11px] tracking-widest text-emerald-300">
          by Techin
        </p>

        {/* Hero image */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40">
          <div className="relative h-[300px] md:h-[460px]">
            <Image
              src="/images/projects/ppk-referral.jpg"
              alt="PPK Screening & Referral — hero mockup"
              fill
              className="object-cover"
              sizes="(min-width:1024px) 1100px, 100vw"
              priority
            />
          </div>
        </div>

        {/* Body */}
        <article className="prose prose-invert prose-zinc mt-10 max-w-none">
          <p className="text-zinc-300">
            PPK Screening & Referral System is a web application designed for
            outpatient screening in a public hospital. The goal is simple:
            collect the right information once, decide the next step with clear
            rules, and help staff move patients to the correct clinic with less
            back and forth.
          </p>

          <p className="text-zinc-300">
            The app supports Thai National ID based flows, structured forms,
            reliable referral rules, and printable summaries for on-site use.
            The interface is clean and predictable so nurses can work quickly,
            while the backend enforces validation and keeps data consistent.
          </p>

          <h3 className="font-semibold">What it does</h3>
          <ul className="text-zinc-300">
            <li>
              Screening form with validated fields and versioned logic that can
              evolve without breaking existing records.
            </li>
            <li>
              Referral rules for common cases. For example, urinary tract
              infection routing: female patients go to Muang. Male patients who
              have prostate issues or urinary retention go to URO in the
              morning on Tuesday and Thursday between 08:00 and 12:00 (Thai
              time). At other times they go to Surgery.
            </li>
            <li>
              Identity and eligibility checks aligned with typical hospital
              operations.
            </li>
            <li>
              Role based access for nurses and admins, with auditable changes
              and status updates.
            </li>
            <li>Printable artifacts for counters and clinical rooms.</li>
          </ul>

          {/* Optional inline image (replace with your own) */}
          <figure className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40">
            <div className="relative h-[340px] md:h-[400px]">
              <Image
                src="/images/projects/ppk-mobile.jpg"
                alt="PPK mobile and form screen"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 1100px, 100vw"
              />
            </div>
            <figcaption className="p-4 text-center text-xs text-zinc-400">
              Mobile friendly layout for quick capture at screening counters.
            </figcaption>
          </figure>

          <h3 className="font-semibold">Stack</h3>
          <ul className="text-zinc-300">
            <li>
              <span className="text-zinc-200">Frontend:</span> Next.js, React,
              TypeScript, Tailwind, Framer Motion
            </li>
            <li>
              <span className="text-zinc-200">Backend:</span> Laravel 12, PHP
              8.3, MySQL
            </li>
            <li>
              <span className="text-zinc-200">DevOps:</span> Docker Compose,
              environment separation, migrations and backups
            </li>
          </ul>

          <h3 className="font-semibold">Results</h3>
          <ul className="text-zinc-300">
            <li>Faster screening with fewer misroutes</li>
            <li>Clearer accountability with audit trails</li>
            <li>Easy to extend as departments add more rules</li>
          </ul>

          <hr className="border-white/10" />

          <p className="text-sm text-zinc-400">
            The repository below shows the structure for both the frontend and
            backend parts, along with containerized setup for local development.
          </p>
        </article>

        {/* Footer actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="https://github.com/iMookatayou/PPK-Screening-Recommentdation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-200 hover:text-white"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </Link>
        </div>
      </div>
    </main>
  );
}
