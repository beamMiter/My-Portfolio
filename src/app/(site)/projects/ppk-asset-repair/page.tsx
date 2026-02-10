// src/app/projects/ppk-asset-repair/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PPK Asset Repair Management System Case Study",
  description:
    "Asset repair management system for hospitals. Track issues, approvals, repair status, and history in one place.",
};

export default function PpkAssetRepairPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(70rem 55rem at 10% 0%, rgba(255,255,255,0.06), transparent 55%), radial-gradient(55rem 45rem at 95% 10%, rgba(255,255,255,0.045), transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85))",
        }}
      />

      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-14 py-10">
        {/* Header */}
        <header className="mt-12 md:mt-16 text-center">
          <h1 className="text-[clamp(28px,5.2vw,52px)] font-semibold leading-tight">
            PPK Asset <span className="text-zinc-400">Repair Management</span>
          </h1>
          <p className="mt-2 text-[11px] tracking-widest text-zinc-400">
            by Techin
          </p>
        </header>

        {/* Hero (match ppk-screening style: no fixed height, no top/bottom bars) */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_30px_60px_-30px_rgba(0,0,0,0.6)]">
          <Image
            src="/images/projects/ppk-repair.png"
            alt="PPK Asset Repair Management hero"
            width={1920}
            height={1080}
            priority
            className="h-auto w-full"
            sizes="(min-width:1280px) 1100px, 100vw"
          />
        </div>

        {/* Intro (moved up a bit, not too close) */}
        <section className="mt-12 md:mt-14">
          <div className="mx-auto max-w-4xl text-zinc-200">
            <p className="text-base md:text-lg leading-relaxed">
              <span
                className="float-left mr-4 mt-1 text-white font-medium leading-none text-[clamp(42px,4.4vw,58px)]"
                style={{ lineHeight: "2.4rem" }}
              >
                PPK
              </span>
              Asset Repair Management System is designed to help hospital teams
              report equipment issues and track repair progress in one place. It
              supports clear handoffs between requester and technician and keeps
              the repair history easy to review.
            </p>

            <p className="mt-6 text-sm md:text-base leading-relaxed text-zinc-300">
              The goal is to reduce missing details and reduce repeated follow
              ups. Each repair request becomes a single record that can be
              updated step by step until it is completed.
            </p>

            <p className="mt-6 text-sm md:text-base leading-relaxed text-zinc-300">
              The interface stays simple and predictable. Staff can submit a
              request quickly and technicians can update status while keeping
              evidence and notes attached to the same case.
            </p>
          </div>
        </section>

        {/* Divider (slightly tighter) */}
        <hr className="my-12 border-white/10" />

        {/* What it does */}
        <section className="mt-12">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-lg font-medium tracking-wide text-zinc-100">
              What it does
            </h3>

            <div className="mt-6 space-y-7 leading-relaxed text-zinc-300">
              <p>
                Users can create a repair request with structured information
                that helps technicians diagnose faster. The system keeps the
                request readable and consistent across different departments.
              </p>

              <p>
                Each request moves through clear statuses so everyone can see
                what is happening now and what should happen next. This reduces
                time spent on manual coordination.
              </p>

              <p>
                Technicians can record actions and outcomes over time. This
                builds repair history that can be searched later for recurring
                issues and maintenance planning.
              </p>

              <p>
                Access is separated by roles so the right people can submit,
                update and review information without exposing unnecessary
                controls.
              </p>
            </div>
          </div>
        </section>

        {/* Second image */}
        <figure className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_30px_60px_-30px_rgba(0,0,0,0.6)]">
          <Image
            src="/images/projects/ppk-repair1.png"
            alt="PPK Asset Repair Management system screen"
            width={1920}
            height={1200}
            className="h-auto w-full"
            sizes="(min-width:1280px) 1100px, 100vw"
          />
          <figcaption className="p-4 text-center text-xs text-zinc-400">
            Status based workflow for repair requests and technician updates.
          </figcaption>
        </figure>
      </div>
    </main>
  );
}
