"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Code2, ServerCog, Workflow, Sparkles, ArrowUpRight, Server, ShieldCheck, BrainCircuit, Mail, MapPin, Clock3, MessageCircle, FileText, Phone, Globe, Github, Linkedin } from "lucide-react";
import { SiReact, SiNextdotjs, SiTypescript, SiLaravel, SiGo, SiNodedotjs, SiDocker, SiPostgresql, SiMysql, SiMongodb, SiRedis, SiSqlite, SiLinux, SiJenkins, SiNginx, SiGit, SiFlutter, SiDart, SiVuedotjs, SiJquery, } from "react-icons/si";
import Marquee from "react-fast-marquee";
import { ICON_SRC_MAP, IconName } from "@/data/icons";
import Wave from "react-wavify";
import { useIntroUI } from "@/components/intro/IntroUIContext";

import IntroCube from "@/components/intro/IntroCube";

const TITLES = [
  "Techin Jetsribumrung",
  "Full-stack Developer",
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
];
const SWITCH_MS = 6500;

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

  const line = "1.4em";
  const padTop = "0.04em";

  return (
    <span
      className="relative inline-block overflow-hidden align-baseline"
      style={{
        height: line,
        lineHeight: line,
        verticalAlign: "baseline",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={items[i]}
          initial={{
            y: -32,          // โผล่มาจากบน
            opacity: 0,
          }}
          animate={{
            y: 0,            // มาหยุดที่ตำแหน่งปกติ
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 520, // เด้งแรงขึ้น
              damping: 18,    // ดึงให้เด้งนิด ๆ ไม่ย้วย
              mass: 0.7,
            },
          }}
          exit={{
            y: -18,          // เลื่อนขึ้นนิดเดียวแล้วค่อยหาย
            opacity: 0,
            transition: {
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="font-heading-dev inline-block will-change-transform text-[0.7em] md:text-[0.8em] tracking-[0.12em] uppercase"
          style={{
            lineHeight: line,
            paddingTop: padTop,
            color: "var(--dev-accent)",
          }}
        >
          {items[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const TOP_LABEL = "VIEW PORTFOLIO";
const BOTTOM_LABEL = "DEV PORTFOLIO";

function HoverWaveLabel({ hovered }: { hovered: boolean }) {
  const maxLen = Math.max(TOP_LABEL.length, BOTTOM_LABEL.length);

  return (
    <span className="inline-flex items-center justify-center font-heading-dev text-5xl tracking-[0.05em] uppercase font-semibold leading-none">
      {Array.from({ length: maxLen }).map((_, index) => {
        const topChar = TOP_LABEL[index] ?? " ";
        const bottomChar = BOTTOM_LABEL[index] ?? " ";
        const delay = index * 0.035;

        const isWideChar =
          ["W", "M"].includes(topChar) || ["W", "M"].includes(bottomChar);

        return (
          <span
            key={index}
            className={`relative inline-block overflow-hidden h-[1.2em] ${
              isWideChar ? "w-[1.35em]" : "w-[1.0em]"
            }`}
          >
            {/* VIEW PORTFOLIO (บน) – สีขาว */}
            <motion.span
              initial={false}
              animate={
                hovered
                  ? { y: "-100%", opacity: topChar === " " ? 0 : 1 }
                  : { y: "0%", opacity: topChar === " " ? 0 : 1 }
              }
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
              className="absolute inset-0 flex items-center justify-center text-white bg-transparent will-change-transform"
            >
              {topChar === " " ? "\u00A0" : topChar}
            </motion.span>

            {/* DEV PORTFOLIO (ล่าง) – ใช้สีเดียวกับ VerticalTicker */}
            <motion.span
              initial={false}
              animate={
                hovered
                  ? { y: "0%", opacity: bottomChar === " " ? 0 : 1 }
                  : { y: "100%", opacity: bottomChar === " " ? 0 : 1 }
              }
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
              className="absolute inset-0 flex items-center justify-center will-change-transform bg-transparent"
              style={{
                color: "var(--dev-accent)", 
              }}
            >
              {bottomChar === " " ? "\u00A0" : bottomChar}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

// REVEAL LINE
function RevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden inline-block align-top"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-zinc-950"
        initial={{ x: "0%" }}
        animate={{ x: "103%" }}
        transition={{
          delay,
          duration: 0.9,
          ease: [0.65, 0, 0.35, 1],
        }}
        style={{ transformOrigin: "left" }}
      />
      <span className="relative inline-block">{children}</span>
    </motion.div>
  );
}

export default function IntroWavePage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [showStage, setShowStage] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const { setShowLang } = useIntroUI();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 30);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const stageTimer = setTimeout(() => setShowStage(true), 2800);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
      setShowLang(true);
    }, 3800);

    return () => {
      clearTimeout(stageTimer);
      clearTimeout(contentTimer);
    };
  }, [setShowLang]);

  return (
    <main className="bg-[#0b0b0b] min-h-screen text-zinc-50">
      <style jsx global>{`
        :root {
          --font-sans-dev: system-ui, -apple-system, BlinkMacSystemFont,
            "SF Pro Text", "Segoe UI", sans-serif;
          --font-heading-dev: "Space Grotesk", system-ui, -apple-system,
            BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
          --font-mono-dev: "JetBrains Mono", ui-monospace, SFMono-Regular,
            Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
            monospace;
        }

        .font-sans-dev {
          font-family: var(--font-sans-dev);
        }
        .font-heading-dev {
          font-family: var(--font-heading-dev);
        }
        .font-mono-dev {
          font-family: var(--font-mono-dev);
        }

        .headline {
          line-height: 1.05;
          letter-spacing: -0.04em;
        }

        .accent-text {
          background: linear-gradient(120deg, #22c55e, #4ade80);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: none;
        }

        .subtle-label {
          letter-spacing: 0.25em;
        }

        @keyframes subtle-lines {
          0% {
            opacity: 0.06;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.06;
          }
        }
        .line-row {
          animation: subtle-lines 6s ease-in-out infinite;
        }
      `}</style>

    <div
      className={`relative min-h-screen overflow-hidden transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* พื้นหลังดำทั้งจอ */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* คลื่นครีม (พื้นหลังซ้ายล่าง) */}
      <motion.div
        className="pointer-events-none absolute inset-x-[-20%] bottom-[-45%] h-[170%] bg-[#e8e8e2] z-10"
        style={{
          borderTopLeftRadius: "55% 45%",
          borderTopRightRadius: "55% 45%",
          willChange: "transform",
        }}
        initial={{ y: "80%" }}
        animate={{ y: "-10%" }}
        transition={{
          duration: 4.5,
          ease: [0.25, 1, 0.28, 1],
        }}
      />

      {/* เส้นบาง ๆ ด้านล่างคลื่น */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[14%] px-10 md:px-20 line-row z-20">
        <div className="flex gap-6 opacity-60">
          {Array.from({ length: 11 }).map((_, idx) => (
            <div
              key={idx}
              className="h-px flex-1 bg-zinc-500/70 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* แผงดำฝั่งขวา (ซ้ายครีม / ขวาดำ) */}
      {showStage && (
        <motion.div
          className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[60%] bg-zinc-950 z-30"
          initial={{ x: "110%" }}
          animate={{ x: "0%" }}
          transition={{
            duration: 1.1,
            ease: [0.8, 0, 0.2, 1],
          }}
          style={{
            transformOrigin: "right",
            willChange: "transform",
          }}
        />
      )}

      {/* HERO CONTENT */}
      {showContent && (
        <div className="relative z-40 flex min-h-screen items-center">
          <div
            className="  mx-auto flex w-full max-w-6xl flex-col md:flex-row items-center md:items-center gap-10 lg:gap-14 px-4 md:px-8 lg:px-10">
            {/* LEFT: 3D CUBE */}
            <div className="w-full md:w-[40%] lg:w-[38%] flex items-center justify-center md:justify-start md:pr-4">
              <motion.div
                initial={{ scale: 0.06, opacity: 0, rotateZ: 0 }}
                animate={{ scale: 0.9, opacity: 1, rotateZ: 360 }}
                transition={{
                  delay: 0.55,
                  duration: 1.4,
                  ease: [0.18, 0.9, 0.2, 1],
                }}
                className="-translate-x-20 md:-translate-x-24 lg:-translate-x-50 -translate-y-6"
                style={{
                  display: "inline-block",
                  willChange: "transform, opacity",
                }}
              >
                <motion.div
                  animate={{ rotateZ: 360 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 26,
                    ease: "linear",
                  }}
                  style={{ display: "inline-block" }}
                >
                  <IntroCube />
                </motion.div>
              </motion.div>
            </div>

            {/* RIGHT: TEXT + BUTTON */}
            <div className="w-full md:w-[60%] lg:w-[62%] max-w-[44rem] font-sans-dev text-white md:pl-4 lg:pl-8">
              <div className="subpixel-antialiased transform-gpu">

                {/* HEADLINE + TICKER */}
                <RevealLine delay={0.35}>
                  <div className="relative inline-block">
                    <h1 className="headline font-heading-dev flex items-center gap-3 text-[clamp(40px,5vw,60px)] font-semibold leading-[1.08] whitespace-nowrap">
                      <span className="text-white">Hello, I&apos;m</span>

                      <span className="text-[#30BB64] tracking-[0.28em] translate-y-[3px] inline-block">
                        <VerticalTicker />
                      </span>
                    </h1>

                    <div className="relative z-[50] mt-3 h-[1px] w-full bg-white/30" />
                  </div>
                </RevealLine>

                {/* BODY TEXT */}
                <div className="mt-8 space-y-4 max-w-[42rem]">
                  <RevealLine delay={0.7}>
                    <div className="py-1">
                      <p className="text-[16px] md:text-[17px] leading-relaxed text-zinc-200">
                        I build internal platforms and mission-critical software
                        used across hospitals, government units, and
                        high-responsibility organizations in Thailand.
                      </p>
                    </div>
                  </RevealLine>

                  <RevealLine delay={1.0}>
                    <div className="py-1">
                      <p className="text-[16px] md:text-[17px] leading-relaxed text-zinc-200">
                        My work focuses on creating systems that reduce
                        operational complexity, improve reliability, and support
                        long-term organizational growth through automation,
                        stable architecture, and strong technical foundations.
                      </p>
                    </div>
                  </RevealLine>

                  <RevealLine delay={1.3}>
                    <div className="py-1">
                      <p className="text-[16px] md:text-[17px] leading-relaxed text-zinc-200">
                        I care about designing software that delivers measurable
                        business value — empowering teams, streamlining workflows,
                        and making technology an advantage rather than a burden.
                      </p>
                    </div>
                  </RevealLine>
                </div>

                {/* BUTTON WRAPPER */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15, duration: 0.8, ease: "easeOut" }}
                  className="mt-12 w-full flex items-center justify-start pl-2 relative z-50"
                >
                  {/* LEFT TEXT (VIEW PORTFOLIO คลื่น) */}
                  <div
                    data-hover-expand
                    className="select-none cursor-pointer hover:opacity-80 transition-opacity duration-300 flex items-center"
                    onMouseEnter={() => setBtnHovered(true)}
                    onMouseLeave={() => setBtnHovered(false)}
                    onClick={() => router.push("/home")}
                  >
                    <HoverWaveLabel hovered={btnHovered} />
                  </div>

                  {/* BUTTON ICON ONLY */}
                  <motion.button
                    type="button"
                    data-hover-expand
                    onClick={() => router.push("/home")}
                    onHoverStart={() => setBtnHovered(true)}
                    onHoverEnd={() => setBtnHovered(false)}
                    className="ml-6 group relative flex items-center justify-center w-[70px] h-[70px] aspect-square rounded-full bg-zinc-50 shadow-xl border border-white/60 hover:bg-white hover:scale-[1.07] transition-all duration-300 ease-out"
                  >
                    <ArrowUpRight className="w-6 h-6 text-zinc-900 group-hover:-translate-y-[6px] group-hover:translate-x-[6px] transition-transform duration-300" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

   {/* ===== SECTION 2: CALM SYSTEMS / INTERNAL STATUS ===== */}
    <section className="relative border-t border-zinc-900 bg-[#050507] py-20 md:py-24 overflow-hidden">
      {/* background grid เบา ๆ ฝั่งขวา */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-[46%] opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,#ffffff_0,transparent_0)] [background-size:16px_16px]" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-32">
        {/* TOP HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center justify-between text-[11px] md:text-xs text-zinc-500 font-mono-dev mb-3">
            <span className="tracking-[0.28em] uppercase">
              INTERNAL SYSTEMS · DEV / OPS
            </span>
            <span className="hidden md:inline tracking-[0.22em] uppercase">
              HOSPITAL & GOV TOOLS
            </span>
          </div>

          <h2 className="font-heading-dev text-[clamp(34px,6.2vw,80px)] leading-[1.06] tracking-[-0.04em] text-zinc-50 uppercase max-w-4xl">
            CALM <span className="accent-text inline-block">SYSTEMS</span> FOR REAL WORK
          </h2>
        </motion.div>

        {/* GRID CONTENT */}
        <div className="grid gap-y-10 gap-x-10 md:gap-y-14 md:grid-cols-[1.35fr_1.1fr_0.9fr] md:items-center">
          {/* LEFT COPY + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -60, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 lg:space-y-5"
          >
            <p className="text-[clamp(14px,1.3vw,18px)] leading-relaxed text-zinc-300 max-w-xl">
              This isn’t a showcase. It’s how I design{" "}
              <span className="accent-text">long-life internal systems</span> —
              tools staff rely on every single day, not just once for a demo.
            </p>

            <p className="text-[clamp(13px,1.15vw,17px)] leading-relaxed text-zinc-400 max-w-xl">
              Most of my work lives inside hospitals and government units —
              dashboards, queues, referrals, and infrastructure that must stay
              <span className="text-zinc-300"> stable even when everything around them isn’t.</span>
            </p>

            {/* CTA แบบคลีน */}
            <div className="pt-1.5 space-y-3">
              <button
                type="button"
                onClick={() => router.push("/contact")}
                className="group inline-flex items-center gap-3 rounded-full border border-zinc-600/80 px-6 py-2.5 font-mono-dev text-[11px] md:text-[12px] uppercase tracking-[0.28em] text-zinc-50 bg-transparent hover:border-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>CONTACT / COLLAB</span>
              </button>

              {/* CURRENT FOCUS ด้านล่าง */}
              <div className="text-[11px] md:text-[12px] text-zinc-400">
                <p className="font-mono-dev uppercase tracking-[0.22em] text-zinc-500">
                  CURRENT FOCUS
                </p>
                <p className="mt-1 leading-relaxed">
                  Asset repair dashboards, referral flows, and internal ops tools
                  for hospitals and government units.
                </p>
              </div>
            </div>
          </motion.div>

          {/* MIDDLE: MONITOR / STATUS PANEL – หน้าต่าง Mac */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md lg:max-w-lg mx-auto md:mx-0"
          >
            <div className="relative aspect-[4/4.6] overflow-hidden rounded-[1.9rem] border border-zinc-700/70 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 shadow-[0_22px_70px_rgba(0,0,0,0.9)]">
              {/* window bar + mac dots */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-3 text-[10px] text-zinc-400 font-mono-dev">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/85" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400/85" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/85" />
                </div>
                <span>/ppk/internal · status.dashboard</span>
              </div>
              <div className="absolute inset-x-5 top-10 h-px bg-zinc-700/70" />
              <div className="absolute inset-[9px] rounded-[1.6rem] border border-zinc-700/40 pointer-events-none" />

              {/* fake content */}
              <div className="absolute inset-0 flex flex-col justify-center gap-5 px-6">
                <div className="space-y-2.5">
                  <div className="h-2.5 w-32 rounded-full bg-emerald-500/90" />
                  <div className="h-1.5 w-44 rounded-full bg-zinc-100/85" />
                  <div className="h-1.5 w-36 rounded-full bg-zinc-500/85" />
                </div>

                <div className="mt-3 space-y-2.5">
                  {[
                    "Asset Repair · 24h SLA",
                    "Per Service Management",
                    "Form PPK · Referral Logic",
                    "Special Disease Surveillance",
                    "Internal Dashboards & Queues",
                  ].map((label, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-[10px] text-zinc-300/90"
                    >
                      <span className="h-[3px] w-10 rounded-full bg-emerald-500/80" />
                      <span className="h-[1px] flex-1 rounded-full bg-zinc-600/70" />
                      <span className="font-mono-dev text-[9px] text-zinc-400/90">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* curtain slide reveal */}
              <motion.div
                className="pointer-events-none absolute inset-0 bg-zinc-950"
                initial={{ x: "0%" }}
                whileInView={{ x: "105%" }}
                viewport={{ once: false, amount: 0.55 }}
                transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </motion.div>

          {/* RIGHT: AVAILABILITY + ACTIVE PERIOD CARD */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between gap-8 md:items-end"
          >
            <div className="w-full md:text-right space-y-1.5">
              <p className="font-mono-dev text-[10px] md:text-[11px] uppercase tracking-[0.26em] text-zinc-500">
                AVAILABLE FOR WORK
              </p>
              <p className="text-[clamp(12px,1.05vw,15px)] text-zinc-400 max-w-xs md:ml-auto">
                Supporting hospitals, government units, and internal teams that
                need someone close to both backend and operations.
              </p>
            </div>

            <div className="w-full md:ml-auto md:max-w-xs rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-4 py-3 space-y-1 md:text-right shadow-[0_14px_45px_rgba(0,0,0,0.65)]">
              <p className="font-mono-dev text-[10px] tracking-[0.26em] uppercase text-zinc-500">
                ACTIVE PERIOD
              </p>
              <p className="font-heading-dev text-[clamp(26px,3.4vw,40px)] leading-tight tracking-[-0.08em] text-zinc-100 whitespace-nowrap">
                2025 — 2026
              </p>
              <p className="mt-1 text-[11px] md:text-[12px] text-zinc-500">
                Based in Chanthaburi, Thailand — building systems that fit existing
                workflows instead of replacing them.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ===== SECTION 3: TECH STACK / LANGUAGES & PLATFORMS ===== */}
    <section className="relative bg-[#050507] border-t border-zinc-900 pt-24 pb-32 md:pt-28 md:pb-40 overflow-hidden min-h-[105vh]">
      {/* split background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-[55%] bg-[#050507]" />
        <div className="absolute inset-y-0 right-0 w-[45%] bg-white" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* TOP LABEL ROW */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] md:text-[11px] font-mono-dev mb-8">
            <span className="tracking-[0.26em] uppercase text-zinc-400">
              STACK · LANGUAGES · PLATFORMS
            </span>
            <span className="tracking-[0.22em] uppercase text-zinc-500">
              TYPESCRIPT · LARAVEL · GO · DEVOPS
            </span>
          </div>

          {/* MAIN GRID */}
          <div className="grid items-start gap-12 md:gap-16 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1.05fr)]">
            {/* ========== LEFT COLUMN ========== */}
            <div className="space-y-10 text-zinc-50">
              {/* intro copy */}
              <div className="space-y-3 max-w-xl">
                <p className="font-mono-dev text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-zinc-500">
                  DAILY TOOLING · HOW I PICK MY STACK
                </p>
                <p className="text-[13px] md:text-[14px] leading-relaxed text-zinc-300">
                  I prefer a small, well–understood stack over chasing every new
                  framework. These are the tools I actually reach for when building{" "}
                  <span className="accent-text">long–lived internal systems</span>{" "}
                  — things that have to survive years of change, not just a demo.
                </p>
              </div>

              {/* CORE STACK */}
              <div className="space-y-4">
                <p className="font-mono-dev text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-zinc-500">
                  CORE STACK
                </p>
                <div className="flex flex-wrap gap-x-7 gap-y-5">
                  {[
                    { name: "React", Icon: SiReact },
                    { name: "Next.js", Icon: SiNextdotjs },
                    { name: "TypeScript", Icon: SiTypescript },
                    { name: "Laravel", Icon: SiLaravel },
                    { name: "Go", Icon: SiGo },
                    { name: "Node.js", Icon: SiNodedotjs },
                    { name: "Docker", Icon: SiDocker },
                  ].map(({ name, Icon }) => (
                    <div
                      key={name}
                      className="flex flex-col items-center gap-1 text-zinc-200 select-none min-w-[72px]"
                    >
                      <Icon className="h-7 w-7 md:h-8 md:w-8" />
                      <span className="text-[10px] md:text-[11px] font-mono-dev uppercase tracking-[0.16em] text-zinc-400">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] md:text-[12px] text-zinc-500 max-w-xl">
                  This is where I spend most of my time — frontend, APIs, and
                  long–running internal web apps.
                </p>
              </div>

              {/* BACKEND & DATA */}
              <div className="space-y-4">
                <p className="font-mono-dev text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-zinc-500">
                  BACKEND & DATA
                </p>
                <div className="flex flex-wrap gap-x-7 gap-y-5">
                  {[
                    { name: "PostgreSQL", Icon: SiPostgresql },
                    { name: "MySQL", Icon: SiMysql },
                    { name: "MongoDB", Icon: SiMongodb },
                    { name: "Redis", Icon: SiRedis },
                  ].map(({ name, Icon }) => (
                    <div
                      key={name}
                      className="flex flex-col items-center gap-1 text-zinc-200 select-none min-w-[80px]"
                    >
                      <Icon className="h-6 w-6 md:h-7 md:w-7" />
                      <span className="text-[10px] md:text-[11px] font-mono-dev uppercase tracking-[0.16em] text-zinc-400 text-center">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] md:text-[12px] text-zinc-500 max-w-xl">
                  Picked for stability first: easy backups, boring migrations, and
                  good tooling on Linux servers.
                </p>
              </div>

              {/* ALSO USED / TOUCHED */}
              <div className="space-y-4">
                <p className="font-mono-dev text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-zinc-500">
                  ALSO USED / TOUCHED
                </p>
                <div className="flex flex-wrap gap-x-7 gap-y-5">
                  {[
                    { name: "Flutter", Icon: SiFlutter },
                    { name: "Dart", Icon: SiDart },
                    { name: "Vue.js", Icon: SiVuedotjs },
                  ].map(({ name, Icon }) => (
                    <div
                      key={name}
                      className="flex flex-col items-center gap-1 text-zinc-200 select-none min-w-[72px]"
                    >
                      <Icon className="h-6 w-6 md:h-7 md:w-7" />
                      <span className="text-[10px] md:text-[11px] font-mono-dev uppercase tracking-[0.16em] text-zinc-400">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] md:text-[12px] text-zinc-500 max-w-xl">
                  Not the main stack, but useful when a project needs mobile, legacy
                  integration, or a specific frontend style.
                </p>
              </div>
            </div>

            {/* ========== RIGHT COLUMN – FLOATING ICON CLOUD ========== */}
            <motion.div
              className="flex flex-col items-start md:items-end gap-8 md:gap-10"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            >
              <div className="space-y-2 md:text-right">
                <h2 className="font-heading-dev text-[clamp(32px,5.6vw,80px)] leading-[1.04] tracking-[-0.06em] uppercase text-zinc-900">
                  HOW I{" "}
                  <span className="accent-text inline-block">
                    KEEP SYSTEMS RUNNING
                  </span>
                </h2>
                <p className="text-[11px] md:text-[12px] font-mono-dev tracking-[0.22em] uppercase text-zinc-500">
                  RUNTIME · FRAMEWORKS · DATABASES
                </p>
              </div>

              {/* orbit container */}
              <div className="w-full max-w-sm md:max-w-md mt-[-40px] md:mt-[-50px]">
                <div className="relative aspect-[4/3] md:aspect-[5/4] max-h-[420px] mx-auto md:ml-auto">
                  {/* ลบวงแหวนด้านหลังออก ให้โลโก้ลอยเดี่ยว ๆ */}

                  {[
                    // core orbit (กลาง ๆ)
                    {
                      name: "react",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
                      top: "34%",
                      left: "26%",
                      delay: 0,
                      size: "md",
                    },
                    {
                      name: "nextjs",
                      src: "/icons/nextjs.svg",
                      top: "30%",
                      left: "50%",
                      delay: 0.08,
                      size: "md",
                    },
                    {
                      name: "typescript",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
                      top: "34%",
                      left: "74%",
                      delay: 0.16,
                      size: "md",
                    },
                    {
                      name: "laravel",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg",
                      top: "52%",
                      left: "30%",
                      delay: 0.24,
                      size: "md",
                    },
                    {
                      name: "go",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg",
                      top: "52%",
                      left: "69%",
                      delay: 0.32,
                      size: "md",
                    },
                    {
                      name: "nodejs",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
                      top: "45%",
                      left: "50%",
                      delay: 0.4,
                      size: "lg",
                    },

                    // data orbit
                    {
                      name: "postgresql",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
                      top: "20%",
                      left: "36%",
                      delay: 0.48,
                      size: "sm",
                    },
                    {
                      name: "mysql",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
                      top: "18%",
                      left: "64%",
                      delay: 0.56,
                      size: "sm",
                    },
                    {
                      name: "mongodb",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
                      top: "64%",
                      left: "26%",
                      delay: 0.64,
                      size: "sm",
                    },
                    {
                      name: "redis",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg",
                      top: "66%",
                      left: "52%",
                      delay: 0.72,
                      size: "sm",
                    },

                    // devops orbit
                    {
                      name: "docker",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
                      top: "12%",
                      left: "50%",
                      delay: 0.88,
                      size: "md",
                    },
                    {
                      name: "linux",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg",
                      top: "30%",
                      left: "14%",
                      delay: 0.96,
                      size: "sm",
                    },
                    {
                      name: "nginx",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg",
                      top: "30%",
                      left: "86%",
                      delay: 1.04,
                      size: "sm",
                    },
                    {
                      name: "git",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
                      top: "80%",
                      left: "34%",
                      delay: 1.12,
                      size: "sm",
                    },
                    {
                      name: "jenkins",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg",
                      top: "80%",
                      left: "66%",
                      delay: 1.2,
                      size: "sm",
                    },

                    // also used orbit
                    {
                      name: "flutter",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg",
                      top: "10%",
                      left: "28%",
                      delay: 1.28,
                      size: "xs",
                    },
                    {
                      name: "dart",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dart/dart-original.svg",
                      top: "10%",
                      left: "72%",
                      delay: 1.36,
                      size: "xs",
                    },
                    {
                      name: "vuejs",
                      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg",
                      top: "88%",
                      left: "50%",
                      delay: 1.44,
                      size: "xs",
                    },
                  ].map((icon, idx) => {
                    const sizeClass =
                      icon.size === "lg"
                        ? "h-16 w-16 md:h-20 md:w-20"
                        : icon.size === "md"
                        ? "h-12 w-12 md:h-14 md:w-14"
                        : icon.size === "sm"
                        ? "h-10 w-10 md:h-11 md:w-11"
                        : "h-8 w-8 md:h-9 md:w-9";

                    return (
                      <motion.div
                        key={`${icon.name}-${idx}`}
                        className="absolute"
                        style={{
                          top: icon.top,
                          left: icon.left,
                          transform: "translate(-50%, -50%)",
                        }}
                        initial={{ opacity: 0, scale: 0.78, y: 16 }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: {
                            duration: 0.6,
                            delay: icon.delay,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }}
                        viewport={{ once: false, amount: 0.4 }}
                        animate={{
                          y: [0, -6, 0],
                          x: [0, idx % 2 === 0 ? 4 : -4, 0],
                          rotate: [0, idx % 2 === 0 ? 2 : -2, 0],
                          transition: {
                            duration: 8.5,
                            delay: icon.delay,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                          },
                        }}
                      >
                        <img
                          src={icon.src}
                          alt={icon.name}
                          className={`${sizeClass} object-contain select-none pointer-events-none`}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>

     {/* ===== SECTION 4: AI TOOLCHAIN / ASSISTANTS ===== */}
    <section className="relative border-t border-zinc-900 py-20 md:py-28 overflow-hidden min-h-[105vh]">

      {/* split background: left white, right dark */}
      <div className="pointer-events-none absolute inset-0">

        {/* LEFT – สีขาว (ลดจาก 58% → 55% ให้สมดุลเหมือน Section 3) */}
        <div className="absolute inset-y-0 left-0 w-full bg-white lg:w-[55%]" />

        {/* RIGHT – สีดำ (ตาม Section 3 = 45%) */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[45%] bg-[#050507]" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16 items-start">

          {/* ============ LEFT COLUMN (WHITE SIDE) ============ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-zinc-900"
          >
            {/* TOP LABEL */}
            <div className="mb-4 text-[10px] md:text-[11px] font-mono-dev tracking-[0.26em] uppercase text-zinc-500">
              AI · TOOLCHAIN · DAILY USE
            </div>

            {/* HEADING */}
            <h2 className="font-heading-dev text-[clamp(32px,5.6vw,82px)] leading-[1.05] tracking-[-0.05em] text-zinc-900 uppercase">
              <span className="block">
                HOW I <span className="accent-text inline-block">USE MULTIPLE AI</span>
              </span>
            </h2>

            {/* INTRO */}
            <p className="text-[13px] md:text-[14px] leading-relaxed text-zinc-700 mb-8">
              Each model in this stack plays a different role. I don’t treat AI as one big tool —
              I use them as specialists. Some focus on code, some on reasoning, some on backend
              logic, and some on polishing or refactoring existing work.
            </p>

            {/* AI LIST */}
            <div className="space-y-6">
              {[
                {
                  name: "ChatGPT",
                  role: "Coding · Ideas · System Guidance",
                  image: "/images/ai/Chatgpt.png",
                  desc:
                    "Main assistant for system design, generating backend/frontend code, technical brainstorming, and refining UI/UX copy.",
                },
                {
                  name: "Gemini",
                  role: "Logic · Math · Structured Thinking",
                  image: "/images/ai/Gemini.png",
                  desc:
                    "Great when a problem needs strict step-by-step reasoning, mathematics, algorithms, or validating complex data flows.",
                },
                {
                  name: "Claude",
                  role: "Long-form Coding · Refactoring",
                  image: "/images/ai/Claude.png",
                  desc:
                    "Best for large files and deep refactors: controllers, service layers, and long pieces of structured, maintainable code.",
                },
                {
                  name: "Deepseek",
                  role: "Backend · Logic · Statistics",
                  image: "/images/ai/Deepseek.png",
                  desc:
                    "Backend-oriented work: query design, Go/Laravel optimization, and data / statistical reasoning for internal systems.",
                },
                {
                  name: "GitCopilot",
                  role: "Inline Fixes · Refactor · Optimize",
                  image: "/images/ai/Gitcopilot.png",
                  desc:
                    "Lives inside the editor: autocomplete, small fixes, refactors, and code clean-up.",
                },
              ].map((ai) => (
                <div key={ai.name} className="flex items-start gap-4">
                  <img
                    src={ai.image}
                    alt={ai.name}
                    className="h-10 w-10 md:h-11 md:w-11 object-contain select-none pointer-events-none"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-[14px] md:text-[15px] font-semibold">
                        {ai.name}
                      </span>
                      <span className="font-mono-dev text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-zinc-500">
                        {ai.role}
                      </span>
                    </div>
                    <p className="text-[12px] md:text-[13px] leading-relaxed text-zinc-700">
                      {ai.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="w-full lg:pl-10 text-zinc-50"
          >
            <div className="space-y-10 max-w-sm lg:ml-auto">
              <div className="space-y-2">
                <p className="font-mono-dev text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-zinc-500">
                  HOW IT FITS INTO THE WORKFLOW
                </p>
                <p className="text-[13px] md:text-[14px] leading-relaxed text-zinc-300">
                  This AI stack integrates directly into real work — planning, coding,
                  reviewing logic, resolving incidents, and keeping long-running systems
                  healthy inside hospitals and government units.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
                <p className="font-mono-dev text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-zinc-400">
                  PRINCIPLES
                </p>
                <ul className="space-y-1.5 text-[12px] md:text-[13px] text-zinc-300">
                  <li>• Pick the AI based on the task — not the hype.</li>
                  <li>• Keep a human in the loop for key decisions.</li>
                  <li>• Offload routine work, refactors, and deep reasoning.</li>
                  <li>• Reuse patterns that work across future projects.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="font-mono-dev text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-zinc-500">
                  TYPICAL FLOW
                </p>
                <p className="text-[12px] md:text-[13px] leading-relaxed text-zinc-300">
                  ChatGPT for architecture, Gemini/Deepseek for backend reasoning,
                  Claude for long refactors, GitCopilot for polishing and inline fixes.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-mono-dev text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-emerald-400">
                  WHY MULTI-AI WORKS BETTER
                </p>
                <p className="text-[12px] md:text-[13px] leading-relaxed text-zinc-300">
                  No single model excels at everything. Mixing tools gives stronger logic,
                  cleaner code, fewer mistakes, and faster iteration across the system.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ===== SECTION 5: CONTACT / WORK WITH ME ===== */}
    <section
      id="contact"
      className="relative border-t border-zinc-900 bg-[#050507] text-zinc-100 py-24 md:py-28 lg:py-32 min-h-[105vh] flex items-center"
    >
      {/* subtle background lines / pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#050507]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,#3f3f46_0,transparent_0)] [background-size:18px_18px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-14">
        {/* TOP ROW: LABEL + STATUS */}
        <div className="mb-10 md:mb-12 flex flex-wrap items-center justify-between gap-4 text-[11px] md:text-[12px] font-mono-dev">
          <div className="flex flex-wrap items-center gap-3 text-zinc-400 uppercase tracking-[0.26em]">
            <span>CONTACT / WORK WITH ME</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <div className="relative h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full bg-zinc-200" />
            </div>
            <span className="uppercase tracking-[0.22em] text-[10px] md:text-[11px]">
              AVAILABLE FOR SELECT INTERNAL PROJECTS · 2025–2026
            </span>
          </div>
        </div>

        {/* MAIN 2-COLUMN GRID */}
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1.6fr_1.4fr] items-start">
          {/* LEFT: MAIN CONTACT BLOCK */}
          <div className="space-y-8 max-w-xl">
            <div className="space-y-4">
              <h2 className="font-heading-dev text-[clamp(36px,5vw,44px)] leading-tight tracking-[-0.05em]">
                Get in touch / Contact
              </h2>
              <p className="text-[13px] md:text-[14px] leading-relaxed text-zinc-300">
                I focus on building{" "}
                <span className="font-semibold">
                  internal systems, hospital tools, and gov-style platforms
                </span>{" "}
                that are used every single day – not just for a demo. Stability,
                clear workflows, and long-term maintenance are the main goals.
              </p>
              <p className="text-[12px] md:text-[13px] leading-relaxed text-zinc-400">
                If you have an internal product, operations dashboard, or
                hospital workflow that needs proper architecture and hands-on
                implementation, feel free to reach out with some details about
                the project and how it is used.
              </p>
            </div>

            {/* CONTACT ROW (EMAIL / PHONE / LOCATION) */}
            <div className="grid gap-3 sm:grid-cols-3 text-[12px] md:text-[13px]">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-zinc-300" />
                <div>
                  <p className="font-mono-dev text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Email
                  </p>
                  <p className="mt-0.5">
                    {/* TODO: replace with your real email */}
                    your.email@example.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-zinc-300" />
                <div>
                  <p className="font-mono-dev text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Phone
                  </p>
                  <p className="mt-0.5">(+66) xxx-xxx-xxx</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-zinc-300" />
                <div>
                  <p className="font-mono-dev text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Location
                  </p>
                  <p className="mt-0.5">Chanthaburi, Thailand · UTC+7</p>
                </div>
              </div>
            </div>

            {/* WORKING STYLE / LANGUAGE */}
            <div className="grid gap-3 sm:grid-cols-2 text-[11px] md:text-[12px] text-zinc-400">
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 text-zinc-300" />
                <div>
                  <p className="font-mono-dev uppercase tracking-[0.18em] text-zinc-500">
                    Working style
                  </p>
                  <p className="mt-0.5">
                    Prefer mid–long term internal projects, where we can shape
                    the system around real staff workflows and iterate with
                    actual usage.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full border border-zinc-500 text-[9px] font-mono-dev text-zinc-300">
                  EN / TH
                </span>
                <div>
                  <p className="font-mono-dev uppercase tracking-[0.18em] text-zinc-500">
                    Language
                  </p>
                  <p className="mt-0.5">
                    Comfortable with technical communication in English and Thai
                    for docs, discussions, and implementation details.
                  </p>
                </div>
              </div>
            </div>

            {/* SOCIAL / LINKS */}
            <div className="pt-4 border-t border-zinc-800 mt-2">
              <p className="font-mono-dev text-[11px] uppercase tracking-[0.18em] text-zinc-500 mb-2">
                Social / Links
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[12px] md:text-[13px]">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>Extra link (Blog / CV)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-8 text-[12px] md:text-[13px]">
            <div>
              <div className="pb-2 border-b border-zinc-800 mb-2">
                <p className="font-mono-dev text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                  Project types
                </p>
              </div>
              <ul className="space-y-1.5 text-zinc-300">
                <li>• Maintenance / asset repair systems</li>
                <li>• Internal dashboards and queue systems</li>
                <li>• Referral and form-based patient flows</li>
                <li>• Reporting and overview tools for management</li>
              </ul>
            </div>

            <div>
              <div className="pb-2 border-b border-zinc-800 mb-2">
                <p className="font-mono-dev text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                  Tech focus
                </p>
              </div>
              <ul className="space-y-1.5 text-zinc-300">
                <li>• Next.js / React with TypeScript</li>
                <li>• Laravel / PHP for gov-style backends</li>
                <li>• Go / Node.js for services and APIs</li>
                <li>• MySQL / PostgreSQL / Redis</li>
              </ul>
            </div>

            <div>
              <div className="pb-2 border-b border-zinc-800 mb-2">
                <p className="font-mono-dev text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                  How we start
                </p>
              </div>
              <ol className="space-y-1.5 text-zinc-300 list-decimal list-inside">
                <li>Send a short summary of the problem / system.</li>
                <li>Share any existing flows, screenshots, or documents.</li>
                <li>Rough timeline and constraints (budget / infra).</li>
                <li>Schedule a call to align scope before any build.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 border-t border-zinc-800 pt-4 flex flex-col gap-2 text-[11px] md:flex-row md:items-center md:justify-between text-zinc-500 font-mono-dev">
          <span>
            © {new Date().getFullYear()} TECHIN JETSRIBUMRUNG · Internal Systems / Dev &amp; Ops
          </span>
          <span className="uppercase tracking-[0.18em]">
            Based in Chanthaburi · Hospital &amp; gov style systems
          </span>
        </div>
      </div>
    </section>
    </main>
  );
}
