"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
    }, 100);

    return () => clearTimeout(t);
  }, []);

  return null;
}

const TITLES = ["Techin", "Developer"];
const SWITCH_MS = 3200;

function VerticalTicker({
  items = TITLES,
  interval = SWITCH_MS,
}: {
  items?: string[];
  interval?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setI((v) => (v + 1) % items.length);
    }, interval);
    return () => clearInterval(id);
  }, [items.length, interval]);

  const minCh = useMemo(() => {
    const maxLen = items.reduce((m, s) => Math.max(m, s.length), 0);
    return Math.max(8, maxLen + 1);
  }, [items]);

  return (
    <span
      className="inline-block align-baseline whitespace-nowrap"
      style={{ minWidth: `${minCh}ch` }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={items[i]}
          className="inline-block text-[#3edc8a] font-semibold will-change-transform normal-case tracking-[0.04em] sm:tracking-[0.05em] lg:tracking-[0.06em]"
          initial={{ y: "-0.9em", opacity: 0 }}
          animate={{
            y: "0em",
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 520,
              damping: 18,
              mass: 0.7,
            },
          }}
          exit={{
            y: "0.55em",
            opacity: 0,
            transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {items[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen text-white">
      <HashScroller />

      <section
        id="home"
        className="scroll-mt-24 md:scroll-mt-28 min-h-[85svh] flex items-center px-5 sm:px-7 lg:px-9 xl:px-12 pt-5 lg:pt-6"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
            <div className="max-w-[760px]">
              <h1 className="mt-4 text-[clamp(40px,6.1vw,88px)] sm:text-[clamp(44px,6.2vw,88px)] font-semibold leading-[1.2] sm:leading-[1.02] tracking-[-0.03em] text-white">
                <span className="block sm:inline-block">Hello, I&apos;m</span>
                <span className="block sm:inline-block sm:ml-4">
                  <VerticalTicker />
                </span>
              </h1>

              <p className="mt-6 max-w-[62ch] text-[15px] md:text-[16px] leading-relaxed text-white/80">
                I’m a fresh graduate developer who enjoys building practical
                and reliable software. I’ve worked on real hospital projects,
                building internal systems and workflow tools that reduce
                manual steps and keep operations running smoothly.
              </p>
            </div>

            <div className="hidden lg:flex justify-center items-center">
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-px bg-white/5" />
      <div className="flex flex-col w-full">
        <ServicesSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  );
}