"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inter, Liter } from "next/font/google";

import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";

const inter = Inter({ subsets: ["latin"] });
const liter = Liter({ subsets: ["latin"], weight: "400" });

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
      // แก้ไข: ใช้ inline-flex และ items-baseline เพื่อให้ตัวหนังสือไม่ลอย
      className="relative inline-flex items-baseline overflow-hidden"
      style={{ minWidth: `${minCh}ch`, height: "1.15em", verticalAlign: "top" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={items[i]}
          // แก้ไข: เอา absolute ออกเพื่อให้มันจัดตำแหน่งตาม flex ของตัวแม่
          className="inline-block text-[#3edc8a] font-bold will-change-transform normal-case tracking-[0.01em] sm:tracking-[0.015em] lg:tracking-[0.02em]"
          initial={{ y: "100%" }}
          animate={{ 
            y: "0%",
            transition: {
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }
          }}
          exit={{ 
            y: "-100%",
            transition: {
              duration: 0.4,
              ease: [0.7, 0, 0.84, 0]
            }
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
    <main className={`${inter.className} min-h-screen text-white`}>
      <HashScroller />

      <section
        id="home"
        className="scroll-mt-24 md:scroll-mt-28 min-h-[85svh] flex items-center px-5 sm:px-7 lg:px-9 xl:px-12 pt-5 lg:pt-6"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
            <div className="max-w-[760px]">
              <h1 className="mt-4 text-[clamp(40px,6.1vw,88px)] sm:text-[clamp(44px,6.2vw,88px)] font-bold leading-[1.1] sm:leading-[1.02] tracking-[-0.03em] text-white">
                <span className="flex flex-col sm:flex-row sm:items-baseline">
                  <span className="whitespace-nowrap">
                    Hello<span className={`${liter.className} font-normal`}>,</span> I
                    <span className={`${liter.className} font-normal`}>’</span>m
                  </span>
                  <span className="sm:ml-4 flex items-baseline">
                    <VerticalTicker />
                  </span>
                </span>
              </h1>

              <p className="mt-6 max-w-[62ch] text-[15px] md:text-[16px] leading-relaxed text-white/80">
                I<span className={`${liter.className} font-normal`}>’</span>m a fresh graduate developer who enjoys building practical
                and reliable software. I<span className={`${liter.className} font-normal`}>’</span>ve worked on real hospital projects<span className={`${liter.className} font-normal`}>,</span>
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