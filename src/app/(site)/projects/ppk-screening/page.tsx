// src/app/projects/ppk-screening/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PPK Screening Referral System Case Study",
  description:
    "A production web app for hospital screening and referral. Built with Next.js React TypeScript Laravel MySQL and Docker.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <h3 className="text-lg font-medium tracking-wide text-zinc-100">
        {title}
      </h3>
      <div className="mt-6 text-zinc-300">{children}</div>
    </section>
  );
}

export default function PpkScreeningPage() {
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
            PPK Screening{" "}
            <span className="text-zinc-400">Recommendation Room</span>
          </h1>
          <p className="mt-2 text-[11px] tracking-widest text-zinc-400">
            by Techin
          </p>
        </header>

        {/* Hero */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_30px_60px_-30px_rgba(0,0,0,0.6)]">
          <Image
            src="/images/projects/ppk-screening.png"
            alt="PPK Screening Referral hero"
            width={1920}
            height={1080}
            className="h-auto w-full"
            priority
          />
        </div>

        {/* Editorial intro block */}
        <section className="mt-16">
          <div className="mx-auto max-w-4xl text-zinc-200">
            <p className="text-base md:text-lg leading-relaxed">
              <span
                className="
                  float-left
                  mr-4
                  mt-1
                  text-white
                  font-medium
                  leading-none
                  text-[clamp(42px,4.4vw,58px)]
                "
                style={{ lineHeight: "2.4rem" }}
              >
                PPK
              </span>
              Screening and Referral System is designed for outpatient screening
              in a public hospital environment. The system focuses on collecting
              accurate information once and guiding staff toward the correct
              clinical decision.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              Instead of relying on memory or paper based processes. The system
              applies predefined rules to determine the next step for each
              patient. This helps reduce mistakes and ensures consistency across
              different staff members and service periods.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              The interface is predictable and calm. The backend validates data
              and preserves long term integrity. The output can be printed for
              on site use and shared between counters and clinical rooms.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="my-16 border-white/10" />

        {/* What it does aligned with PPK */}
        <section className="mt-16">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-lg font-medium tracking-wide text-zinc-100">
              What it does
            </h3>

            <div className="mt-6 space-y-7 leading-relaxed text-zinc-300">
              <p>
                PPK provides a structured screening flow that guides nurses through
                consistent data capture at the counter. The design reduces hesitation
                and allows staff to focus on patient interaction rather than system
                logic.
              </p>

              <p>
                Based on the collected information. The system recommends the next
                clinic using predefined referral rules. This keeps routing decisions
                consistent across different shifts and experience levels.
              </p>

              <p>
                Identity and eligibility checks are aligned with common hospital
                operations. All changes are recorded so decisions can be reviewed when
                needed.
              </p>

              <p>
                A clear summary is generated at the end of the flow. This summary can be
                printed and used by the next room without losing context.
              </p>
            </div>
          </div>
        </section>

        {/* Second image */}
        <figure className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_30px_60px_-30px_rgba(0,0,0,0.6)]">
          <Image
            src="/images/projects/ppk-referral-02.png"
            alt="PPK tablet and form screen"
            width={1920}
            height={1200}
            className="h-auto w-full"
          />
          <figcaption className="p-4 text-center text-xs text-zinc-400">
            Tablet friendly layout for quick capture at screening counters.
          </figcaption>
        </figure>
      </div>
    </main>
  );
}
