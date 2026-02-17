// src/app/projects/ppk-asset-repair/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PPK Asset Repair Management System Case Study",
  description:
    "Hospital repair and asset management system for reporting issues, triaging work, and tracking service history.",
};

function TechStackClean({ items }: { items: string[] }) {
  return (
    <section className="mt-16">
      <div className="mx-auto max-w-4xl text-center">
        <h3 className="text-lg font-medium tracking-wide text-zinc-100">
          Tech Stack
        </h3>

        <div className="mt-6 flex flex-wrap justify-center items-center text-sm text-zinc-300">
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

export default function PpkAssetRepairPage() {
  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto max-w-[1300px] px-6 md:px-10 lg:px-16 py-10">
        {/* Header */}
        <header className="mt-12 md:mt-16 text-center">
          <h1 className="text-[clamp(28px,5.2vw,52px)] font-semibold leading-tight">
            PPK Asset <span className="text-zinc-400">Repair Management</span>
          </h1>
        </header>

        {/* Hero - max-w-5xl */}
        <div className="mt-10 mx-auto max-w-5xl overflow-hidden rounded-lg ring-1 ring-white/5">
          <Image
            src="/images/projects/ppk-repair.png"
            alt="PPK Asset Repair Management hero"
            width={1800}
            height={1000}
            priority
            className="h-auto w-full"
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
              Asset Repair Management System is a hospital service platform for
              reporting repairs and tracking equipment assets. Users can submit a
              report, attach details, and follow the progress from start to finish
              in a single timeline.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              The system also supports discussion threads inside each report, so
              staff can exchange symptoms, troubleshooting steps, and solutions.
              This helps teams share knowledge and reduce repeated investigation.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              It is used by the Digital Health Technology team as a central intake
              point for repair requests from hospital users, with a workflow that
              keeps handoffs clear and easy to audit.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="my-16 border-white/10" />

        {/* What it does */}
        <section className="mt-16">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-lg font-medium tracking-wide text-zinc-100">
              What it does
            </h3>

            <div className="mt-6 space-y-7 leading-relaxed text-zinc-300">
              <p>
                Users can create repair reports for IT and equipment issues, with
                structured fields to reduce missing details and speed up triage.
              </p>

              <p>
                Incoming reports can be categorized into practical work groups,
                such as software tasks for programmers, network tasks (LAN / Wi-Fi
                configuration), and general hardware repairs (PC issues, printers,
                peripherals, and other devices).
              </p>

              <p>
                Staff can add and manage categories themselves, so new types of
                work can be supported as hospital operations evolve.
              </p>

              <p>
                Each report includes a discussion thread for communication and
                troubleshooting, keeping solutions and decisions recorded in the
                same place as the issue.
              </p>

              <p>
                Real-time sound notifications alert staff when new reports arrive,
                helping the support team respond quickly during active hours.
              </p>

              <p>
                After a job is completed, users can rate the assigned staff member.
                These ratings are used for performance summaries and operational
                reporting, helping the team review service quality over time.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom images - ขยายให้ใหญ่ขึ้นแต่ยังเล็กกว่า hero */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
          <Image
            src="/images/projects/ppk-repair4.png"
            alt="Repair screen 1"
            width={2200}
            height={1400}
            className="h-auto w-full"
          />
          <Image
            src="/images/projects/ppk-repair5.png"
            alt="Repair screen 2"
            width={2200}
            height={1400}
            className="h-auto w-full"
          />
        </div>

        {/* Divider before Tech */}
        <hr className="my-20 border-white/10" />

        {/* Tech Stack */}
        <TechStackClean items={["Laravel", "PHP", "MySQL", "Vite"]} />

        {/* Final divider */}
        <hr className="mt-16 border-white/10" />
      </div>
    </main>
  );
}