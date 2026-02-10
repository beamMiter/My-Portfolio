"use client";

import { useEffect } from "react";

import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";

function HashScroller() {
  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (!hash) return;
    const t = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return () => clearTimeout(t);
  }, []);
  return null;
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HashScroller />

      <style jsx global>{`
        :root {
          /* Dev Green – brighter but still calm */
          --dev-green: #3edc8a;
          --dev-green-soft: #5ae6a3;
          --dev-green-dark: #27b874;
        }

        .dev-green {
          color: var(--dev-green);
        }
        .dev-green-soft {
          color: var(--dev-green-soft);
        }
      `}</style>

      <section
        id="home"
        className="scroll-mt-28 min-h-[85svh] flex items-center bg-black text-white"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* LEFT : TEXT */}
            <div className="max-w-[640px]">
              {/* ROLE */}
              <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-white/55">
                Full-stack Developer
              </p>

              {/* HERO */}
              <h1 className="mt-4 text-[clamp(46px,6.4vw,88px)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
                Hello, I&apos;m{" "}
                <span className="dev-green font-semibold">
                  Techin
                </span>
              </h1>

              {/* TAGLINE */}
              <h2 className="mt-4 text-[clamp(18px,2.2vw,28px)] font-medium leading-snug text-white/80">
                I design and build{" "}
                <span className="dev-green-soft">
                  reliable software systems
                </span>{" "}
                that turn complex workflows into simple, scalable solutions.
              </h2>

              {/* BODY – แนะนำตัวแบบมืออาชีพ */}
              <p className="mt-6 max-w-[60ch] text-[15px] md:text-[16px] leading-relaxed text-white/55">
                I work across system architecture, backend services, and
                automation-driven workflows — focusing on clarity, long-term
                maintainability, and software that teams can trust in real
                production environments.
              </p>
            </div>

            {/* RIGHT : IMAGE PLACEHOLDER */}
            <div className="hidden lg:flex justify-center items-center">
              {/* ใส่รูป / motion / portrait ตรงนี้ */}
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
