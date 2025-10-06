"use client";

import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";

/** ===== เลื่อนอัตโนมัติเมื่อมี #section ใน URL ===== */
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

      {/* ===== Global accent gradient ===== */}
      <style jsx global>{`
        :root {
          --accent-1: #22d3ee; /* cyan-400 */
          --accent-2: #3b82f6; /* blue-500 */
          --accent-3: #a78bfa; /* violet-400 */
        }
        .accent {
          background: linear-gradient(
            90deg,
            var(--accent-1),
            var(--accent-2),
            var(--accent-3)
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      {/* ===== HERO / INTRO ===== */}
      <section
        id="home"
        className="scroll-mt-28 min-h-[80svh] flex items-center bg-black text-white"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          {/* Intro line */}
          <p className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">
            Hello, I&apos;m{" "}
            <span className="text-emerald-400 font-bold">
              Techin Jetsribumrung
            </span>
          </p>

          {/* Headline */}
          <h1 className="text-[clamp(30px,5.5vw,56px)] font-medium leading-tight text-zinc-100">
            A developer passionate about{" "}
            <span className="text-emerald-300">building clean & purposeful systems</span>{" "}
            for hospitals, public organizations, and real-world users
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-[70ch] text-zinc-400 text-[16px] leading-relaxed">
            I love crafting infrastructures that are stable, scalable, and
            thoughtfully designed — combining <strong>Next.js</strong>,{" "}
            <strong>Laravel</strong>, and <strong>n8n</strong> to deliver
            seamless, production-grade automation for real-world operations
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              About Me
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-300 hover:bg-emerald-500/15 hover:text-emerald-200 transition-colors"
            >
              View My Work →
            </a>
          </div>
        </div>
      </section>

      {/* ===== WHAT I DO ===== */}
      <ServicesSection />

      {/* ===== ABOUT ===== */}
      <AboutSection />

      {/* ===== PROJECTS / PORTFOLIO ===== */}
      <ProjectsSection />

      {/* ===== CONTACT ===== */}
      <ContactSection />
    </main>
  );
}
