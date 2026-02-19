"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Liter, Inter } from "next/font/google"; // เพิ่ม Inter
import {
  Code2,
  ServerCog,
  Workflow,
  Sparkles,
  ArrowUpRight,
  Server,
  ShieldCheck,
  BrainCircuit,
  Mail,
  MapPin,
  Clock3,
  MessageCircle,
  FileText,
  Phone,
  Globe,
  Github,
  Linkedin,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiLaravel,
  SiGo,
  SiNodedotjs,
  SiDocker,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiSqlite,
  SiLinux,
  SiJenkins,
  SiNginx,
  SiGit,
  SiFlutter,
  SiDart,
  SiVuedotjs,
  SiJquery,
} from "react-icons/si";
import Marquee from "react-fast-marquee";
import { ICON_SRC_MAP, IconName } from "@/data/icons";
import Wave from "react-wavify";
import { useIntroUI } from "@/components/intro/IntroUIContext";

import IntroCube from "@/components/intro/IntroCube";

import heroStyles from "@/styles/intro/hero.module.css";
import clamStyles from "@/styles/intro/calmSection.module.css";
import stackStyles from "@/styles/intro/stackSection.module.css";
import aiStyles from "@/styles/intro/aiSection.module.css";
import contactStyles from "@/styles/intro/contactSection.module.css";

// ตั้งค่าฟอนต์ Liter
const liter = Liter({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// ตั้งค่าฟอนต์ Inter
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const TITLES = ["Developer", "Full-stack Developer", "Software Engineer"];
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
      style={{ height: line, lineHeight: line, verticalAlign: "baseline" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={items[i]}
          initial={{ y: -32, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 520,
              damping: 18,
              mass: 0.7,
            },
          }}
          exit={{
            y: -18,
            opacity: 0,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
          className={`${heroStyles.fontHeading} inline-block will-change-transform normal-case tracking-[0.04em] sm:tracking-[0.05em] lg:tracking-[0.06em]`}
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
    <span
      className={`${heroStyles.fontHeading} text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.03em] uppercase font-semibold leading-none inline-flex items-center justify-center`}>
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

            <motion.span
              initial={false}
              animate={
                hovered
                  ? { y: "0%", opacity: bottomChar === " " ? 0 : 1 }
                  : { y: "100%", opacity: bottomChar === " " ? 0 : 1 }
              }
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
              className="absolute inset-0 flex items-center justify-center will-change-transform bg-transparent"
              style={{ color: "var(--dev-accent)" }}
            >
              {bottomChar === " " ? "\u00A0" : bottomChar}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden block w-full align-top"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-zinc-950"
        initial={{ x: "0%" }}
        animate={{ x: "103%" }}
        transition={{ delay, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        style={{ transformOrigin: "left" }}
      />
      <span className="relative block w-full">{children}</span>
    </motion.div>
  );
}

export default function IntroWavePage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [showStage, setShowStage] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [compactCTA, setCompactCTA] = useState(false);

  const { setShowLang } = useIntroUI();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 30);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const stageTimer = setTimeout(() => setShowStage(true), 2800);
    const contentTimer = setTimeout(() => {
      setShowContent(true);
      setShowLang(false);
    }, 3800);

    return () => {
      clearTimeout(stageTimer);
      clearTimeout(contentTimer);
    };
  }, [setShowLang]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setCompactCTA(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  return (
    <main
      className={`bg-[#0b0b0b] min-h-screen text-zinc-50 ${heroStyles.root}`}
    >
      <div
        className={`${heroStyles.heroWrap} ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <div className={heroStyles.heroBg} />

        <motion.div
          className={heroStyles.heroBlob}
          initial={{ y: "80%" }}
          animate={{ y: "-10%" }}
          transition={{ duration: 4.5, ease: [0.25, 1, 0.28, 1] }}
        />

        <div className={`${heroStyles.linesRow} ${heroStyles.lineRow}`}>
          <div className="flex gap-6 opacity-60">
            {Array.from({ length: 11 }).map((_, idx) => (
              <div
                key={idx}
                className="h-px flex-1 bg-zinc-500/70 rounded-full"
              />
            ))}
          </div>
        </div>

        {showStage && (
          <motion.div
            className={heroStyles.stagePanel}
            initial={{ x: "110%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.1, ease: [0.8, 0, 0.2, 1] }}
          />
        )}

        {showContent && (
          <div className={heroStyles.contentShell}>
            <div className={heroStyles.contentContainer}>
              <div className={heroStyles.leftCol}>
                <motion.div
                  initial={{
                    scale: 0.06,
                    opacity: 0,
                    rotateZ: 0,
                    x: 0,
                  }}
                  animate={{
                    scale: 0.9,
                    opacity: 1,
                    rotateZ: 360,
                    x: "var(--cube-x)",
                  }}
                  transition={{
                    delay: 0.55,
                    duration: 1.4,
                    ease: [0.18, 0.9, 0.2, 1],
                  }}
                  className={heroStyles.cubeWrap}
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

              <div className={`${heroStyles.rightCol} ${heroStyles.fontSans}`}>
                <div className="subpixel-antialiased transform-gpu">
                  <RevealLine delay={0.35}>
                    <div className="relative flex flex-col items-start justify-start mb-6 w-full">
                      <span className="mb-4 block leading-none text-xs md:text-sm font-normal tracking-[0.2em] text-zinc-400 uppercase">
                        Developer & Web Developer
                      </span>
                      <h1 className={`${heroStyles.heroTitle} ${heroStyles.headline} font-sans flex flex-col leading-tight w-full`}>
                        <span className="text-white tracking-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                          Hello
                          <span className={liter.className}>,</span> I
                          <span className={liter.className}>’</span>m
                        </span>
                        <span
                          style={{ color: "var(--dev-accent)" }}
                          className="mt-1 tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold break-words w-full"
                        >
                          Techin Jetsribumrung
                        </span>
                      </h1>
                    </div>
                  </RevealLine>

                  <div className={heroStyles.paragraphGroup}>
                    <RevealLine delay={0.7}>
                      <p className={`${heroStyles.pText} ${inter.className} leading-relaxed text-zinc-200`}>
                        Designing high-performance internal platforms and
                        mission-critical software for hospitals and enterprise
                        organizations is where I focus my expertise in
                        reliability and security.
                      </p>
                    </RevealLine>
                    <RevealLine delay={1.0}>
                      <p className={`${heroStyles.pText} ${inter.className} leading-relaxed text-zinc-200`}>
                        My commitment lies in eliminating operational complexity
                        through intelligent automation and stable full-stack
                        architecture to ensure that your technical foundation
                        supports sustainable growth.
                      </p>
                    </RevealLine>
                    <RevealLine delay={1.3}>
                      <p className={`${heroStyles.pText} ${inter.className} leading-relaxed text-zinc-200`}>
                        Each project is driven by the goal of delivering
                        measurable business impact by transforming complex
                        technology into a strategic advantage that empowers
                        teams and streamlines core workflows.
                      </p>
                    </RevealLine>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.15, duration: 0.8, ease: "easeOut" }}
                    className={heroStyles.ctaWrap}
                  >
                    <div className={heroStyles.ctaDesktop}>
                      <button
                        type="button"
                        className="select-none cursor-pointer hover:opacity-80 transition-opacity duration-300 flex items-center bg-transparent p-0 border-0"
                        onMouseEnter={() => setBtnHovered(true)}
                        onMouseLeave={() => setBtnHovered(false)}
                        onClick={() => router.push("/home")}
                        data-cursor="link"
                      >
                        <span className={heroStyles.hoverLabelScale}>
                          <HoverWaveLabel hovered={btnHovered} />
                        </span>
                      </button>

                      <motion.button
                        type="button"
                        onClick={() => router.push("/home")}
                        onHoverStart={() => setBtnHovered(true)}
                        onHoverEnd={() => setBtnHovered(false)}
                        className={heroStyles.circleBtn}
                        data-cursor="link"
                        style={{ overflow: "hidden" }}
                      >
                        <motion.div
                          animate={
                            btnHovered
                              ? { x: 18, y: -18, opacity: 0 }
                              : { x: 0, y: 0, opacity: 1 }
                          }
                          transition={{
                            duration: 0.22,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{ position: "absolute" }}
                        >
                          <ArrowUpRight className="w-6 h-6 text-zinc-900" />
                        </motion.div>

                        <motion.div
                          animate={
                            btnHovered
                              ? { x: 0, y: 0, opacity: 1 }
                              : { x: -18, y: 18, opacity: 0 }
                          }
                          transition={{
                            duration: 0.22,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{ position: "absolute" }}
                        >
                          <ArrowUpRight className="w-6 h-6 text-zinc-900" />
                        </motion.div>
                      </motion.button>
                    </div>

                    <button
                      type="button"
                      onClick={() => router.push("/home")}
                      className={heroStyles.ctaMobileBtn}
                      data-cursor="link"
                    >
                      <span className={heroStyles.ctaMobileText}>
                        View Portfolio
                      </span>
                      <span className={heroStyles.ctaMobileIcon}>
                        <ArrowUpRight className="w-5 h-5" />
                      </span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className={clamStyles.section}>
        <div className={clamStyles.inner}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.45 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={clamStyles.head}
          >
            <div className={`${clamStyles.kickerRow} font-mono-dev`}>
              <span className={clamStyles.kickerLeft}>
                INTERNAL SOFTWARE · DEVELOPMENT
              </span>
              <span className={clamStyles.kickerRight}>
                HOSPITAL & GOV PROJECTS
              </span>
            </div>

            <h2 className={`${clamStyles.title} font-heading-dev`}>
              CALM <span className={clamStyles.accentText}>SOFTWARE</span> FOR
              REAL WORK
            </h2>
          </motion.div>

          <div className={clamStyles.grid}>
            <motion.div
              initial={{ opacity: 0, x: -60, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={clamStyles.leftText}
            >
              <p className={clamStyles.p1}>
                I build{" "}
                <span className={clamStyles.accentText}>internal software</span>{" "}
                that teams use every day—clear UI, reliable APIs, and features
                designed around real workflows.
              </p>

              <p className={clamStyles.p2}>
                Many of my projects are for hospitals and government
                units—dashboards, queue systems, referrals, and data-driven
                tools that must remain{" "}
                <span className={clamStyles.p2Strong}>
                  stable and easy to maintain.
                </span>
              </p>

              <div className={clamStyles.ctaBlock}>
                <div className={clamStyles.focusBlock}>
                  <p className={`${clamStyles.focusLabel} font-mono-dev`}>
                    CURRENT WORK
                  </p>
                  <p className={clamStyles.focusText}>
                    Hospital internal systems: asset repair, referral flows,
                    reporting dashboards, and workflow improvements.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={clamStyles.midWrap}
            >
              <div className={clamStyles.card}>
                <div className={`${clamStyles.cardTopbar} font-mono-dev`}>
                  <div className={clamStyles.dots}>
                    <span
                      className={`${clamStyles.dot} ${clamStyles.dotRed}`}
                    />
                    <span
                      className={`${clamStyles.dot} ${clamStyles.dotAmber}`}
                    />
                    <span
                      className={`${clamStyles.dot} ${clamStyles.dotGreen}`}
                    />
                  </div>
                  <span>/ppk/internal · product.systems</span>
                </div>

                <div className={clamStyles.cardLine} />
                <div className={clamStyles.cardInset} />

                <div className={clamStyles.cardContent}>
                  <div className={clamStyles.bars}>
                    <div className={clamStyles.barA} />
                    <div className={clamStyles.barB} />
                    <div className={clamStyles.barC} />
                  </div>

                  <div className={clamStyles.list}>
                    {[
                      "Asset Repair Dashboard",
                      "Service & Request Tracking",
                      "Referral / Form Workflows",
                      "Monitoring & Reporting",
                      "Internal Dashboards & Queues",
                    ].map((label, i) => (
                      <div key={i} className={clamStyles.row}>
                        <span className={clamStyles.rowTick} />
                        <span className={clamStyles.rowLine} />
                        <span
                          className={`${clamStyles.rowLabel} font-mono-dev`}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  className={clamStyles.cardWipe}
                  initial={{ x: "0%" }}
                  whileInView={{ x: "105%" }}
                  viewport={{ once: false, amount: 0.55 }}
                  transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={clamStyles.rightCol}
            >
              <div className={clamStyles.availBlock}>
                <p className={`${clamStyles.availLabel} font-mono-dev`}>
                  AVAILABLE
                </p>
                <p className={clamStyles.availText}>
                  Open to software development work—web apps, internal tools,
                  and systems that improve daily operations.
                </p>
              </div>

              <div className={clamStyles.periodCard}>
                <p className={`${clamStyles.periodLabel} font-mono-dev`}>
                  ACTIVE PERIOD
                </p>
                <p className={`${clamStyles.periodYear} font-heading-dev`}>
                  2025 — 2026
                </p>
                <p className={clamStyles.periodNote}>
                  Based in Chanthaburi, Thailand — building systems that fit
                  existing workflows and support real teams.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={stackStyles.section}>
        <div className={stackStyles.bg} />

        <div className={stackStyles.inner}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`${stackStyles.topRow} font-mono-dev`}>
              <span className={stackStyles.topLeft}>
                STACK · LANGUAGES · PLATFORMS
              </span>
              <span className={stackStyles.topRight}>
                TYPESCRIPT · PHP · GO
              </span>
            </div>

            <div className={stackStyles.grid}>
              {/* LEFT COLUMN */}
              <div className={stackStyles.leftCol}>
                <div className={stackStyles.leadBlock}>
                  <p className={`${stackStyles.leadKicker} font-mono-dev`}>
                    DAILY TOOLING · HOW I PICK MY STACK
                  </p>
                  <p className={stackStyles.leadText}>
                    I prefer a small, well–understood stack over chasing every
                    new framework. These are the tools I actually reach for when
                    building{" "}
                    <span className={stackStyles.accentText}>
                      long–lived internal systems
                    </span>{" "}
                    — things that have to survive years of change, not just a
                    demo.
                  </p>
                </div>

                {/* CORE STACK */}
                <div className={stackStyles.block}>
                  <p className={`${stackStyles.blockTitle} font-mono-dev`}>
                    CORE STACK
                  </p>

                  <div className={stackStyles.iconRow}>
                    {[
                      { name: "React", Icon: SiReact },
                      { name: "Next.js", Icon: SiNextdotjs },
                      { name: "TypeScript", Icon: SiTypescript },
                      { name: "Laravel", Icon: SiLaravel },
                      { name: "Go", Icon: SiGo },
                      { name: "Node.js", Icon: SiNodedotjs },
                      { name: "Docker", Icon: SiDocker },
                    ].map(({ name, Icon }) => (
                      <div key={name} className={stackStyles.iconItem}>
                        <Icon className={stackStyles.iconLg} />
                        <span
                          className={`${stackStyles.iconLabel} font-mono-dev`}
                        >
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className={stackStyles.blockNote}>
                    This is where I spend most of my time — frontend, APIs, and
                    long–running internal web apps.
                  </p>
                </div>

                {/* BACKEND & DATA */}
                <div className={stackStyles.block}>
                  <p className={`${stackStyles.blockTitle} font-mono-dev`}>
                    BACKEND & DATA
                  </p>

                  <div className={stackStyles.iconRow}>
                    {[
                      { name: "PostgreSQL", Icon: SiPostgresql },
                      { name: "MySQL", Icon: SiMysql },
                      { name: "MongoDB", Icon: SiMongodb },
                    ].map(({ name, Icon }) => (
                      <div key={name} className={stackStyles.iconItemWide}>
                        <Icon className={stackStyles.iconMd} />
                        <span
                          className={`${stackStyles.iconLabelCenter} font-mono-dev`}
                        >
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className={stackStyles.blockNote}>
                    Picked for stability first: easy backups, boring migrations,
                    and good tooling on Linux servers.
                  </p>
                </div>

                {/* ALSO USED */}
                <div className={stackStyles.block}>
                  <p className={`${stackStyles.blockTitle} font-mono-dev`}>
                    ALSO USED / TOUCHED
                  </p>

                  <div className={stackStyles.iconRow}>
                    {[
                      { name: "Flutter", Icon: SiFlutter },
                      { name: "Dart", Icon: SiDart },
                      { name: "Vue.js", Icon: SiVuedotjs },
                    ].map(({ name, Icon }) => (
                      <div key={name} className={stackStyles.iconItem}>
                        <Icon className={stackStyles.iconMd} />
                        <span
                          className={`${stackStyles.iconLabel} font-mono-dev`}
                        >
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className={stackStyles.blockNote}>
                    Not the main stack, but useful when a project needs mobile,
                    legacy integration, or a specific frontend style.
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <motion.div
                className={stackStyles.rightCol}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.05,
                }}
              >
                <div className={stackStyles.rightHead}>
                  <h2 className={`${stackStyles.rightTitle} font-heading-dev`}>
                    HOW I{" "}
                    <span className={stackStyles.accentTextInline}>
                      KEEP SYSTEMS RUNNING
                    </span>
                  </h2>
                  <p className={`${stackStyles.rightSub} font-mono-dev`}>
                    RUNTIME · FRAMEWORKS · DATABASES
                  </p>
                </div>

                <div className={stackStyles.orbitWrap}>
                  <div className={stackStyles.orbitBox}>
                    {[
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
                        name: "git",
                        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
                        top: "80%",
                        left: "34%",
                        delay: 1.12,
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
                          ? stackStyles.orbitLg
                          : icon.size === "md"
                            ? stackStyles.orbitMd
                            : icon.size === "sm"
                              ? stackStyles.orbitSm
                              : stackStyles.orbitXs;

                      return (
                        <motion.div
                          key={`${icon.name}-${idx}`}
                          className={stackStyles.orbitItem}
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

      <section className={aiStyles.section}>
        <div className={aiStyles.bg} />

        <div className={aiStyles.inner}>
          <div className={aiStyles.grid}>
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={aiStyles.leftCol}
            >
              <div className={`${aiStyles.kicker} font-mono-dev`}>
                AI · TOOLCHAIN · DAILY USE
              </div>

              <h2 className={`${aiStyles.title} font-heading-dev`}>
                <span className={aiStyles.titleBlock}>
                  HOW I{" "}
                  <span className={aiStyles.accentText}>USE MULTIPLE AI</span>
                </span>
              </h2>

              <p className={aiStyles.desc}>
                Each model in this stack plays a different role. I don&apos;t
                treat AI as one big tool — I use them as specialists. Some focus
                on code, some on reasoning, some on backend logic, and some on
                polishing or refactoring existing work.
              </p>

              <div className={aiStyles.aiList}>
                {[
                  {
                    name: "ChatGPT",
                    role: "Coding · Ideas · System Guidance",
                    image: "/images/ai/Chatgpt.png",
                    desc: "Main assistant for system design, generating backend/frontend code, technical brainstorming, and refining UI/UX copy.",
                    needsInvert: true,
                  },
                  {
                    name: "Gemini",
                    role: "Logic · Math · Structured Thinking",
                    image: "/images/ai/Gemini.png",
                    desc: "Great when a problem needs strict step-by-step reasoning, mathematics, algorithms, or validating complex data flows.",
                    needsInvert: false,
                  },
                  {
                    name: "Claude",
                    role: "Long-form Coding · Refactoring",
                    image: "/images/ai/Claude.png",
                    desc: "Best for large files and deep refactors: controllers, service layers, and long pieces of structured, maintainable code.",
                    needsInvert: false,
                  },
                  {
                    name: "Deepseek",
                    role: "Backend · Logic · Statistics",
                    image: "/images/ai/Deepseek.png",
                    desc: "Backend-oriented work: query design, Go/Laravel optimization, and statistical reasoning.",
                    needsInvert: false,
                  },
                  {
                    name: "GitCopilot",
                    role: "Inline Fixes · Refactor · Optimize",
                    image: "/images/ai/Gitcopilot.png",
                    desc: "Lives inside the editor: autocomplete, small fixes, refactors, and clean-up.",
                    needsInvert: true,
                  },
                ].map((ai) => (
                  <div key={ai.name} className={aiStyles.aiItem}>
                    <img
                      src={ai.image}
                      alt={ai.name}
                      className={aiStyles.aiImage}
                      style={
                        ai.needsInvert
                          ? { filter: "brightness(0) invert(1)" }
                          : {}
                      }
                    />

                    <div className={aiStyles.aiContent}>
                      <div className={aiStyles.aiHead}>
                        <span className={aiStyles.aiName}>{ai.name}</span>
                        <span className={`${aiStyles.aiRole} font-mono-dev`}>
                          {ai.role}
                        </span>
                      </div>
                      <p className={aiStyles.aiDesc}>{ai.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.05,
              }}
              className={aiStyles.rightCol}
            >
              <div className={aiStyles.rightInner}>
                {/* Section 1: Focus on Web Dev Workflow */}
                <div className={aiStyles.block}>
                  <p className={`${aiStyles.blockTitle} font-mono-dev`}>
                    AI-DRIVEN WEB DEVELOPMENT
                  </p>
                  <p className={aiStyles.blockText}>
                    In building modern web applications, I treat AI as a core
                    development partner. From architecting complex system
                    structures to writing scalable clean code, integrating AI
                    allows me to accelerate the delivery of robust full-stack
                    solutions while maintaining high engineering standards.
                  </p>
                </div>

                {/* Section 2: Learning & Methodology (Replaced bullets with prose) */}
                <div className={aiStyles.block}>
                  <p className={`${aiStyles.cardTitle} font-mono-dev`}>
                    LEARNING & COLLABORATION
                  </p>
                  <p className={aiStyles.blockText}>
                    Beyond just code generation, I leverage AI to deconstruct
                    new technologies and compare industry best practices. This
                    collaborative approach focuses on understanding the
                    &quot;why&quot; behind the logic, ensuring a
                    human-in-the-loop process where AI offloads routine tasks
                    and deepens my technical reasoning.
                  </p>
                </div>

                {/* Section 3: Tool Specifics */}
                <div className={aiStyles.block}>
                  <p className={`${aiStyles.blockTitle} font-mono-dev`}>
                    MULTI-MODEL STRATEGY
                  </p>
                  <p className={aiStyles.blockText}>
                    My workflow involves a strategic mix of models: ChatGPT for
                    high-level architecture and database schema design, Gemini
                    and Deepseek for backend logic and complex debugging, and
                    Claude for long-form refactoring and polishing code
                    readability.
                  </p>
                </div>

                {/* Section 4: The Impact */}
                <div className={aiStyles.block}>
                  <p className={`${aiStyles.highlightTitle} font-mono-dev`}>
                    WHY MULTI-AI WORKS BETTER
                  </p>
                  <p className={aiStyles.blockText}>
                    No single model is a silver bullet. By combining different
                    AI strengths, I achieve stronger logic, fewer mistakes, and
                    significantly faster iteration cycles. This method empowers
                    me to stay at the forefront of the ever-evolving web
                    development landscape.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className={contactStyles.section}>
        <div className={contactStyles.inner}>
          {/* HEADER */}
          <div className={contactStyles.header}>
            <p className={`${contactStyles.kicker} font-mono-dev`}>CONTACT</p>

            <h2 className={`${contactStyles.title} font-heading-dev`}>
              Get in touch
            </h2>

            <p className={contactStyles.desc}>
              If you are building custom internal systems, management tools, or
              scalable operational platforms and need end-to-end implementation,
              feel free to reach out.
            </p>
          </div>

          {/* CONTACT GRID */}
          <div className={contactStyles.grid}>
            <div className={contactStyles.contactItem}>
              <Mail className={contactStyles.icon} />
              <div>
                <p className={`${contactStyles.label} font-mono-dev`}>Email</p>
                <p className={contactStyles.value}>
                  jetsribumrungtechin@gmail.com
                </p>
              </div>
            </div>

            <div className={contactStyles.contactItem}>
              <Phone className={contactStyles.icon} />
              <div>
                <p className={`${contactStyles.label} font-mono-dev`}>Phone</p>
                <p className={contactStyles.value}>(+66) 095-9611-859</p>
              </div>
            </div>

            <div className={contactStyles.contactItem}>
              <MapPin className={contactStyles.icon} />
              <div>
                <p className={`${contactStyles.label} font-mono-dev`}>
                  Location
                </p>
                <p className={contactStyles.value}>Chanthaburi, Thailand</p>
              </div>
            </div>
          </div>

          {/* LINKS */}
          <div className={contactStyles.linksWrap}>
            <p className={`${contactStyles.linksTitle} font-mono-dev`}>Links</p>

            <div className={contactStyles.linksRow}>
              <a
                href="https://github.com/iMookatayou"
                className={contactStyles.linkItem}
              >
                <Github className={contactStyles.linkIcon} />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/techin-jetsribumrung-9a4069364/"
                className={contactStyles.linkItem}
              >
                <Linkedin className={contactStyles.linkIcon} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* FOOTER */}
          <div className={`${contactStyles.footer} font-mono-dev`}>
            © {new Date().getFullYear()} Techin Jetsribumrung
          </div>
        </div>
      </section>
    </main>
  );
}
