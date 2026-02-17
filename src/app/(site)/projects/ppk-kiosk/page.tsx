// src/app/projects/ppk-kiosk/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PPK Kiosk Queue System Case Study",
  description:
    "Self service kiosk for hospital queue management with Thai National ID verification and ticket printing.",
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

export default function PpkKioskPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(70rem 55rem at 10% 0%, rgba(255,255,255,0.06), transparent 55%), radial-gradient(55rem 45rem at 95% 10%, rgba(255,255,255,0.045), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-[1300px] px-6 py-10 md:px-10 lg:px-16">
        {/* Header */}
        <header className="mt-12 text-center md:mt-16">
          <h1 className="text-[clamp(28px,5.2vw,52px)] font-semibold leading-tight">
            PPK Kiosk <span className="text-zinc-400">Queue System</span>
          </h1>
        </header>

        {/* Hero (thin edge) */}
        <div className="mt-10 mx-auto max-w-5xl overflow-hidden rounded-lg ring-1 ring-white/5">
          <Image
            src="/images/projects/ppk-kiosk4.png"
            alt="PPK Kiosk Queue System hero"
            width={1920}
            height={1080}
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
              Kiosk Queue System is designed for hospital lobbies where the
              first interaction must be fast and clear. Patients identify
              themselves using a Thai National ID and receive a queue ticket
              without requiring staff assistance.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              When a patient inserts a National ID card, the kiosk reads the ID
              number and calls the hospital API to validate the citizen ID and
              retrieve basic entitlement information. This allows the system to
              determine the correct queue group and route the patient to the
              appropriate counter immediately.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              The kiosk then prints a queue ticket that includes essential
              patient and entitlement details. Screening staff can use this
              information as a starting point for triage without asking the
              patient to repeat basic identity and eligibility data.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              The interface is built for public kiosks. Large touch targets and
              high contrast visuals help patients complete the process with
              confidence even without guidance.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="my-16 border-white/10" />

        {/* What it does + lower image */}
        <section className="mt-16">
          <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 items-start">
            {/* lower image (no edge) */}
            <div>
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/projects/ppk-kiosk2.jpg"
                  alt="PPK Kiosk vertical screen"
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 420px, 100vw"
                />
              </div>
            </div>

            {/* text */}
            <div>
              <h3 className="text-lg font-medium tracking-wide text-zinc-100">
                What it does
              </h3>

              <div className="mt-6 space-y-7 leading-relaxed text-zinc-300">
                <p>
                  Reads Thai National ID from a card reader and sends the citizen
                  ID to the hospital API for verification and basic entitlement
                  lookup. This confirms identity and reduces manual input at the
                  front desk.
                </p>

                <p>
                  Automatically determines the correct queue group and service
                  counter based on entitlement and routing rules, so patients
                  receive clear instructions immediately after identification.
                </p>

                <p>
                  Prints a queue ticket with essential baseline information
                  (identity + entitlement + routing). Screening units can use
                  the printed data to start triage quickly and consistently.
                </p>

                <p>
                  Supports configurable queue groups and operating hours, so
                  departments can adjust the kiosk behavior to real daily
                  operations without changing code.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider before Tech */}
        <hr className="my-20 border-white/10" />

        {/* Tech Stack */}
        <TechStackClean
          items={["Next.js", "React", "TypeScript", "Prisma", "MySQL"]}
        />

        {/* Bottom Divider + Conference Info */}
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