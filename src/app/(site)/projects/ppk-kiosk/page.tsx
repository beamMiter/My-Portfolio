import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PPK Kiosk Queue System Case Study",
  description:
    "Self service kiosk for hospital queue management with Thai National ID and ticket printing.",
};

export default function PpkKioskPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(70rem 55rem at 10% 0%, rgba(255,255,255,0.06), transparent 55%), radial-gradient(55rem 45rem at 95% 10%, rgba(255,255,255,0.045), transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85))",
        }}
      />

      <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 lg:px-14">
        <header className="mt-12 text-center md:mt-16">
          <h1 className="text-[clamp(28px,5.2vw,52px)] font-semibold leading-tight">
            PPK Kiosk <span className="text-zinc-400">Queue System</span>
          </h1>
          <p className="mt-2 text-[11px] tracking-widest text-zinc-400">
            by Techin
          </p>
        </header>

        <div className="mt-8 overflow-hidden rounded-xl shadow-[0_18px_40px_-34px_rgba(0,0,0,0.95)]">
          <Image
            src="/images/projects/ppk-kiosk4.png"
            alt="PPK Kiosk Queue System hero"
            width={1920}
            height={1080}
            className="h-auto w-full"
            priority
          />
        </div>

        <section className="mt-16">
          <div className="mx-auto max-w-4xl text-zinc-200">
            <p className="text-base md:text-lg leading-relaxed">
              <span
                className="float-left mr-4 mt-1 text-white font-medium leading-none text-[clamp(42px,4.4vw,58px)]"
                style={{ lineHeight: "2.4rem" }}
              >
                PPK
              </span>
              Kiosk Queue System is designed for hospital lobbies where the first
              interaction must be fast and clear. Patients identify themselves
              using a Thai National ID and receive a queue ticket without requiring
              staff assistance.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              The system verifies entitlement automatically and determines the
              correct queue group and counter. This reduces reception workload and
              removes uncertainty during peak hours.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              The interface is built for public kiosks. Large touch targets and
              high contrast visuals help patients complete the process with
              confidence even without guidance.
            </p>
          </div>
        </section>

        <hr className="my-16 border-white/10" />

        <section className="mt-16">
          <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 items-start">
            {/* lower image: same (no edge) */}
            <figure className="overflow-hidden rounded-xl shadow-[0_18px_40px_-34px_rgba(0,0,0,0.95)]">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/projects/ppk-kiosk2.jpg"
                  alt="PPK Kiosk vertical screen"
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 420px, 100vw"
                />
              </div>
            </figure>

            <div>
              <h3 className="text-lg font-medium tracking-wide text-zinc-100">
                What it does
              </h3>

              <div className="mt-6 space-y-7 leading-relaxed text-zinc-300">
                <p>
                  PPK Kiosk handles patient identification through Thai National
                  ID input and validates eligibility before issuing a queue ticket.
                  This ensures that patients are routed correctly from the moment
                  they arrive.
                </p>

                <p>
                  Queue tickets are printed immediately using a thermal printer.
                  Each ticket includes the appropriate counter and queue prefix so
                  patients know exactly where to go next.
                </p>

                <p>
                  Queue groups and service hours can be configured by staff. This
                  allows departments to adapt the system to daily operations without
                  changing code.
                </p>

                <p>
                  The kiosk integrates with backend queue services to keep counters
                  and administrative views consistent. This improves traceability
                  and reduces manual resets.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
