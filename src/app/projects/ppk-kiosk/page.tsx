// src/app/projects/ppk-kiosk/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Github, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "PPK Kiosk Queue System — Case Study",
  description:
    "Self-service kiosk for hospital queueing with Thai National ID, entitlement verification, ticket printing, and counter routing. Built with Next.js, React, TypeScript, Laravel, MySQL, and Docker.",
};

const TECH = ["Next.js", "React", "TypeScript", "Laravel", "MySQL", "Docker"];

export default function PpkKioskPage() {
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
          PPK Kiosk Queue System
        </h1>
        <p className="mt-2 text-center text-[11px] tracking-widest text-emerald-300">
          by Techin
        </p>

        {/* Hero image */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40">
          <div className="relative h-[300px] md:h-[460px]">
            <Image
              src="/images/projects/ppk-kiosk.jpg"
              alt="PPK Kiosk — hero mockup"
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
            PPK Kiosk Queue System is a self-service web application for hospital
            lobbies. Patients identify themselves with a Thai National ID, the
            system checks entitlement, and a ticket is printed with the correct
            counter and queue group. The goal is to reduce reception workload
            and make the first touchpoint simple and predictable.
          </p>

          <h3 className="font-semibold">Capabilities</h3>
          <ul className="text-zinc-300">
            <li>
              National ID based sign-in and entitlement verification with clear
              feedback on success or next steps.
            </li>
            <li>
              Queue ticket printing (thermal printer) with clinic/counter
              mapping and optional QR on the slip.
            </li>
            <li>
              Configurable queue groups, prefixes, and service hours per
              department.
            </li>
            <li>
              Simple admin views for counters, prefixes, and daily resets.
            </li>
            <li>
              Accessibility-minded UI: large targets, high contrast, readable
              fonts for public kiosks.
            </li>
          </ul>

          <h3 className="font-semibold">Architecture</h3>
          <ul className="text-zinc-300">
            <li>
              <span className="text-zinc-200">Frontend:</span> Next.js, React,
              TypeScript, Tailwind.
            </li>
            <li>
              <span className="text-zinc-200">Backend:</span> Laravel 12
              (RESTful APIs), MySQL with normalized tables for queues,
              counters, and service profiles.
            </li>
            <li>
              <span className="text-zinc-200">DevOps:</span> Docker Compose for
              local and production parity, environment separation, migrations
              and backups.
            </li>
            <li>
              Network-safe printing via a small local print bridge or direct
              ESC/POS, depending on site constraints.
            </li>
          </ul>

          <h3 className="font-semibold">Outcomes</h3>
          <ul className="text-zinc-300">
            <li>Shorter lines at reception and fewer manual lookups</li>
            <li>Consistent ticket formats and clearer routing to counters</li>
            <li>Easy to extend with new departments and prefixes</li>
          </ul>

          <hr className="border-white/10" />

          <p className="text-sm text-zinc-400">
            The repository below includes the web kiosk and the backend API,
            packaged for Docker to simplify deployment and updates.
          </p>
        </article>

        {/* Footer actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="https://github.com/iMookatayou/PPK-Kiosk-Queue-System"
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
