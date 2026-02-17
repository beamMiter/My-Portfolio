// src/app/projects/ppk-screening/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PPK Screening Referral System Case Study",
  description:
    "Hospital screening system for intake and referral recommendations.",
};

function TechStackClean({ items }: { items: string[] }) {
  return (
    <section className="mt-16">
      <div className="mx-auto max-w-4xl text-center">
        <h3 className="text-lg font-medium tracking-wide text-zinc-100">
          Tech Stack
        </h3>

        <div className="mt-6 flex flex-wrap items-center justify-center text-sm text-zinc-300">
          {items.map((tech, index) => (
            <div key={tech} className="flex items-center">
              <span className="px-4">{tech}</span>
              {index !== items.length - 1 && (
                <span className="h-4 w-px bg-white/15" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PpkScreeningPage() {
  return (
    <main className="min-h-screen text-white">
      {/* ลบ background gradient div ออกทั้งหมด - ใช้ bg จาก globals.css แทน */}

      <div className="mx-auto max-w-[1300px] px-6 md:px-10 lg:px-16 py-10">
        {/* Header */}
        <header className="mt-12 md:mt-16 text-center">
          <h1 className="text-[clamp(28px,5.2vw,52px)] font-semibold leading-tight">
            PPK Screening{" "}
            <span className="text-zinc-400">Recommendation Room</span>
          </h1>
        </header>

        {/* Hero */}
        <div className="mt-10 mx-auto max-w-5xl overflow-hidden rounded-lg ring-1 ring-white/5">
          <Image
            src="/images/projects/ppk-screening.png"
            alt="PPK Screening Referral hero"
            width={1800}
            height={1000}
            className="h-auto w-full"
            priority
          />
        </div>

        {/* Intro */}
        <section className="mt-16">
          <div className="mx-auto max-w-4xl text-zinc-200">
            <p className="text-base md:text-lg leading-relaxed">
              <span
                className="float-left mr-4 mt-1 text-white font-medium leading-none text-[clamp(42px,4.4vw,58px)]"
                style={{ lineHeight: "2.4rem" }}
              >
                PPK
              </span>
              Screening Recommendation Room supports two operational modes: full intake case
              screening and quick room recommendation. Both modes store results
              in the database for operational analytics and dashboard reporting.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              In full intake mode, staff can insert a Thai National ID card to
              automatically retrieve patient identity and basic entitlement
              information, eliminating repetitive manual entry.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              Completed screenings are recorded in the database and accessible
              through patient history, supporting traceability and structured
              clinical handoffs.
            </p>
          </div>
        </section>

        <hr className="my-16 border-white/10" />

        {/* Expanded What it does */}
        <section className="mt-16">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-lg font-medium tracking-wide text-zinc-100">
              What it does
            </h3>

            <div className="mt-6 space-y-8 leading-relaxed text-zinc-300">
              <p>
                Provides a structured screening workflow that guides staff
                through consistent patient intake, reducing reliance on memory
                and minimizing variation between shifts.
              </p>

              <p>
                Supports dual screening modes: a detailed case-based intake
                flow for collecting symptoms and contextual data, and a fast
                recommendation flow focused solely on routing patients to the
                appropriate examination room.
              </p>

              <p>
                Integrates Thai National ID card reading to automatically
                retrieve identity and basic entitlement information, improving
                speed, accuracy, and user experience at the counter.
              </p>

              <p>
                Applies predefined referral logic to recommend clinics based on
                screening inputs, ensuring routing decisions remain consistent
                and rule-driven.
              </p>

              <p>
                Stores every screening result in a centralized database,
                enabling dashboard analytics that reveal trends such as the
                most common screening reasons or peak intake periods.
              </p>

              <p>
                Maintains searchable patient history records so staff can
                review past screening outcomes, supporting continuity of care
                and operational traceability.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom image */}
        <div className="mt-16 mx-auto max-w-4xl">
          <Image
            src="/images/projects/ppk-referral-03.png"
            alt="PPK referral summary screen"
            width={2200}
            height={1400}
            className="h-auto w-full"
          />
        </div>

        <hr className="my-20 border-white/10" />

        {/* Tech Stack */}
        <TechStackClean
          items={["Next.js", "React", "TypeScript", "Laravel", "PHP", "MySQL"]}
        />

        {/* Final divider + Conference Info */}
        <div className="mt-16">
          <hr className="border-white/10" />
          <div className="mt-4 flex justify-end">
            <p className="text-sm text-zinc-500 italic">
              Presented at <span className="text-zinc-300">AUCC Conference 2026</span>
            </p>
          </div>
        </div>

        <div className="h-20" />
      </div>
    </main>
  );
}