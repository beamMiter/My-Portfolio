"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Liter } from "next/font/google";
import localFont from "next/font/local";
import {
  Code2,
  ServerCog,
  Workflow,
  Sparkles,
  ArrowUpRight,
  Server,
  ShieldCheck,
  BrainCircuit,
  Clock3,
  MessageCircle,
  FileText,
  Globe,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiLaravel,
  SiGo,
  SiNodedotjs,
  SiExpress,
  SiSpringboot,
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
import { FaJava } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { ICON_SRC_MAP, IconName } from "@/data/icons";
import { useIntroUI } from "@/components/intro/IntroUIContext";

import PortfolioMosaic from "@/components/PortfolioMosaic";
import IntroLaneReveal from "@/components/intro/IntroLaneReveal";
import ContributionGrid from "@/components/intro/ContributionGrid";

import heroStyles from "@/styles/intro/hero.module.css";
import clamStyles from "@/styles/intro/calmSection.module.css";
import stackStyles from "@/styles/intro/stackSection.module.css";
import aiStyles from "@/styles/intro/aiSection.module.css";

const liter = Liter({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = localFont({
  src: [
    {
      path: "../../../public/fonts/Inter-VariableFont_opsz,wght.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Inter-Italic-VariableFont_opsz,wght.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
  adjustFontFallback: false,
});

const TITLES = ["Developer", "Full-stack Developer", "Software Engineer"];
const SWITCH_MS = 6500;

/**
 * One text-entrance pattern for sections 2–4: a quiet rise + fade, played
 * once (no reverse, so nothing flickers when the reader stops mid-section).
 * Each wrapper adds its own `transition` — same ease, a small `delay` to
 * stagger the blocks within a section so it reads one beat at a time.
 */
const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const revealUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
} as const;

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

function HoverWaveLabel({
  hovered,
  isTablet,
}: {
  hovered: boolean;
  isTablet: boolean;
}) {
  const TOP_LABEL = isTablet ? "VIEW WORK" : "VIEW PORTFOLIO";
  const BOTTOM_LABEL = isTablet ? "MY WORK" : "DEV PORTFOLIO";
  const maxLen = Math.max(TOP_LABEL.length, BOTTOM_LABEL.length);

  return (
    <span
      className={`${heroStyles.fontHeading} tracking-[0.01em] uppercase font-semibold leading-none inline-flex items-center justify-center`}
      style={{
        fontSize: isTablet ? "1.875rem" : "clamp(1.5rem, 3.5vw, 3rem)",
      }}
    >
      {Array.from({ length: maxLen }).map((_, index) => {
        const topChar = TOP_LABEL[index] ?? " ";
        const bottomChar = BOTTOM_LABEL[index] ?? " ";
        const delay = index * 0.035;
        const isWideChar =
          ["W", "M"].includes(topChar) || ["W", "M"].includes(bottomChar);
        return (
          <span
            key={index}
            className={`relative inline-block overflow-hidden h-[1.2em] ${isWideChar ? "w-[1.2em]" : "w-[0.85em]"
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

export default function IntroWavePage() {
  const router = useRouter();
  const [btnHovered, setBtnHovered] = useState(false);
  const [compactCTA, setCompactCTA] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const { setShowLang } = useIntroUI();

  useEffect(() => {
    setShowLang(false);
  }, [setShowLang]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setCompactCTA(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    const checkTablet = () => {
      const w = window.innerWidth;
      const isTouch = navigator.maxTouchPoints > 0;
      setIsTablet(isTouch && w >= 768);
    };
    checkTablet();
    window.addEventListener("resize", checkTablet);
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  return (
    <main
      className={`bg-[#09090b] min-h-screen text-zinc-50 ${heroStyles.root}`}
      style={{ touchAction: "pan-y" }}
    >
      <div className={heroStyles.heroWrap}>
        <div className="absolute inset-0 z-0 bg-[var(--dev-ground)]" />

        {/* second layer — the white stage slides in from the left once the
            dark curtain has landed, then the grid shows on top of it */}
        <motion.div
          className={heroStyles.heroDome}
          initial={{ x: "-100%", y: "-50%" }}
          animate={{ x: "0%", y: "-50%" }}
          transition={{ duration: 0.7, ease: [0.8, 0, 0.2, 1], delay: 0.8 }}
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

        {/* the curtain — dark stage panel pulled across from the right on load */}
        <motion.div
          className={heroStyles.stagePanel}
          initial={{ x: "110%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.1, ease: [0.8, 0, 0.2, 1] }}
        />

        <div className={heroStyles.contentShell}>
          <IntroLaneReveal>
            <div className={heroStyles.contentContainer}>
              <div className={heroStyles.leftCol}>
                <div data-grid>
                  <div
                    className={heroStyles.cubeWrap}
                    style={{ transform: "translateX(var(--cube-x))" }}
                  >
                    {/* /test mosaic, shrunk down to replace the old Rubik cube */}
                    <div
                      className="w-full md:w-auto md:shrink-0"
                      style={{ zoom: 0.9 } as React.CSSProperties}
                    >
                      <div className="w-full md:w-[672px]">
                        <PortfolioMosaic embedded />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${heroStyles.rightCol} ${heroStyles.fontSans}`}>
                <div className="subpixel-antialiased transform-gpu">
                  <div className="relative flex flex-col items-start justify-start mb-6 w-full">
                    <span
                      data-stagger-row
                      className="mb-4 block leading-none text-sm md:text-base font-normal tracking-[0.2em] text-zinc-400 uppercase"
                    >
                      Full-Stack Software & Mobile Dev
                    </span>
                    <h1
                      className={`${heroStyles.heroTitle} ${heroStyles.headline} font-sans flex flex-col leading-tight w-full`}
                    >
                      <span
                        data-stagger-row
                        className="text-white tracking-wide text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
                      >
                        Hello<span className={liter.className}>,</span> I
                        <span className={liter.className}>
                          {String.fromCharCode(8217)}
                        </span>
                        m
                      </span>
                      <span
                        data-stagger-row
                        style={{ color: "var(--dev-accent)" }}
                        className="mt-1 tracking-wide text-4xl sm:text-4xl md:text-3xl lg:text-5xl xl:text-6xl font-bold w-full"
                      >
                        Techin Jetsribumrung
                      </span>
                    </h1>
                  </div>

                  <div className="mt-6 grid max-w-2xl gap-4 md:mt-8">
                    <p
                      data-stagger-row
                      className={`${heroStyles.pText} ${inter.className} leading-relaxed text-zinc-200`}
                    >
                      Nobody picks the software they use at work — it gets{" "}
                      <span className="text-zinc-100 font-medium">
                        handed to them
                      </span>
                      . I build that kind: the{" "}
                      <span className="text-zinc-100 font-medium">
                        internal systems a team runs on every day
                      </span>
                      .
                    </p>
                  </div>

                  <div
                    data-stagger-row
                    data-contrib
                    className={heroStyles.contribSlot}
                  >
                    <ContributionGrid />
                  </div>

                  <div
                    data-fade-up
                    className="relative z-50 mt-8 w-full md:mt-12"
                  >
                    <div className={heroStyles.ctaDesktop}>
                      <button
                        type="button"
                        className="select-none cursor-pointer flex items-center bg-transparent p-0 border-0"
                        onMouseEnter={() => setBtnHovered(true)}
                        onMouseLeave={() => setBtnHovered(false)}
                        onClick={() => router.push("/home")}
                        data-cursor="link"
                      >
                        <span
                          data-split-in
                          className={heroStyles.hoverLabelScale}
                        >
                          <HoverWaveLabel
                            hovered={btnHovered}
                            isTablet={isTablet}
                          />
                        </span>
                      </button>

                      <motion.button
                        type="button"
                        onClick={() => router.push("/home")}
                        onHoverStart={() => setBtnHovered(true)}
                        onHoverEnd={() => setBtnHovered(false)}
                        className={heroStyles.circleBtn}
                        data-cta-icon
                        data-cursor="link"
                        style={{ overflow: "hidden", position: "relative" }}
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
                  </div>
                </div>
              </div>
            </div>
          </IntroLaneReveal>
        </div>
      </div>

      <section className={clamStyles.section}>
        <div className={clamStyles.inner}>
          <motion.div
            {...revealUp}
            transition={{ duration: 0.7, ease: REVEAL_EASE }}
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
              {...revealUp}
              transition={{ duration: 0.7, ease: REVEAL_EASE, delay: 0.08 }}
              className={clamStyles.leftText}
            >
              <p className={clamStyles.p1}>
                Hospitals don&apos;t get to have a bad day. When a queue
                system stalls or a referral form breaks, someone&apos;s care
                gets delayed—so the{" "}
                <span className={clamStyles.accentText}>internal software</span>{" "}
                behind it has to be boring in the best way: predictable,
                legible, and always there.
              </p>

              <p className={clamStyles.p2}>
                That&apos;s the world I build in—dashboards, queue systems,
                referrals, and reporting tools that a nurse or an officer can
                trust without thinking twice, because the moment they have to
                think about the software, it&apos;s already failed them.{" "}
                <span className={clamStyles.p2Strong}>
                  Stable and easy to maintain isn&apos;t optional here.
                </span>
              </p>

              <div className={clamStyles.ctaBlock}>
                <div className={clamStyles.focusBlock}>
                  <p className={`${clamStyles.focusLabel} font-mono-dev`}>
                    CURRENT WORK
                  </p>
                  <p className={clamStyles.focusText}>
                    Asset repair systems, referral flows, and reporting
                    dashboards for hospital teams who need fewer clicks, not
                    more features.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...revealUp}
              transition={{ duration: 0.8, ease: REVEAL_EASE, delay: 0.12 }}
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
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
                />
              </div>
            </motion.div>

            <motion.div
              {...revealUp}
              transition={{ duration: 0.7, ease: REVEAL_EASE, delay: 0.16 }}
              className={clamStyles.rightCol}
            >
              <div className={clamStyles.availBlock}>
                <p className={`${clamStyles.availLabel} font-mono-dev`}>
                  AVAILABLE
                </p>
                <p className={clamStyles.availText}>
                  Open to work like this—internal tools and systems where
                  reliability matters more than novelty.
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
                  Based in Chanthaburi, Thailand—building for teams who just
                  need their tools to work.
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
            {...revealUp}
            transition={{ duration: 0.7, ease: REVEAL_EASE }}
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
                    Software that has to run quietly for years can&apos;t be
                    built on whatever&apos;s trending this month. I pick tools
                    the same way I build the systems themselves—for what
                    holds up, not what&apos;s new—reaching for{" "}
                    <span className={stackStyles.accentText}>
                      long–lived internal systems
                    </span>{" "}
                    that have to survive years of change, not just a demo.
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
                        <Icon className={stackStyles.iconLg} color="white" />
                        <span
                          className={`${stackStyles.iconLabel} font-mono-dev`}
                        >
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className={stackStyles.blockNote}>
                    The stack I actually open every morning—frontend, APIs,
                    and the internal apps that have to keep running.
                  </p>
                </div>

                {/* BACKEND & DATA */}
                <div className={stackStyles.block}>
                  <p className={`${stackStyles.blockTitle} font-mono-dev`}>
                    BACKEND & DATA BASE
                  </p>

                  <div className={stackStyles.iconRow}>
                    {[
                      { name: "Java", Icon: FaJava },
                      { name: "Spring Boot", Icon: SiSpringboot },
                      { name: "Express", Icon: SiExpress },
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
                    Node with Express for most services, Java and Spring Boot
                    where a project calls for it—on databases picked for
                    stability first: easy backups, boring migrations.
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
                    Brought in when a project needs mobile reach, legacy
                    integration, or has to speak to something already built.
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <motion.div
                className={stackStyles.rightCol}
                {...revealUp}
                transition={{ duration: 0.7, ease: REVEAL_EASE, delay: 0.1 }}
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
                        src: "/next.svg",
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
                          viewport={{ once: true, amount: 0.4 }}
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
            {/* LEFT — the framing */}
            <motion.div
              {...revealUp}
              transition={{ duration: 0.7, ease: REVEAL_EASE }}
              className={aiStyles.leftCol}
            >
              <div className={`${aiStyles.kicker} font-mono-dev`}>
                PROCESS · HOW A BUILD GOES
              </div>

              <h2 className={`${aiStyles.title} font-heading-dev`}>
                FROM A VAGUE ASK{" "}
                <span className={aiStyles.accentText}>
                  TO A RUNNING SYSTEM
                </span>
              </h2>

              <p className={aiStyles.desc}>
                The brief is usually one sentence and a screenshot of a
                spreadsheet. The work is turning that into something a team
                logs into every morning without thinking about it. Same four
                steps every time.
              </p>
            </motion.div>

            {/* RIGHT — the steps */}
            <motion.div
              {...revealUp}
              transition={{ duration: 0.7, ease: REVEAL_EASE, delay: 0.12 }}
              className={aiStyles.rightCol}
            >
              <div className={aiStyles.rightInner}>
                <div className={aiStyles.block}>
                  <p className={`${aiStyles.blockTitle} font-mono-dev`}>
                    <span className={aiStyles.accentText}>01</span> UNDERSTAND
                    THE REAL WORKFLOW
                  </p>
                  <p className={aiStyles.blockText}>
                    Before any code, I sit with the people who&apos;ll use it
                    and watch what they actually do—the workarounds, the
                    double entry, the step everyone dreads. That&apos;s the
                    spec, not the sentence I was handed.
                  </p>
                </div>

                <div className={aiStyles.block}>
                  <p className={`${aiStyles.blockTitle} font-mono-dev`}>
                    <span className={aiStyles.accentText}>02</span> PICK BORING,
                    PROVEN TECH
                  </p>
                  <p className={aiStyles.blockText}>
                    Postgres, a plain server, a framework I&apos;ve shipped
                    before. Easy backups and dull migrations matter more than
                    novelty on a system people depend on all day.
                  </p>
                </div>

                <div className={aiStyles.block}>
                  <p className={`${aiStyles.blockTitle} font-mono-dev`}>
                    <span className={aiStyles.accentText}>03</span> SHIP IN THIN
                    SLICES
                  </p>
                  <p className={aiStyles.blockText}>
                    One real workflow at a time, in front of users within a
                    week or two. Feedback on something running beats feedback
                    on a mockup.
                  </p>
                </div>

                <div className={aiStyles.block}>
                  <p className={`${aiStyles.blockTitle} font-mono-dev`}>
                    <span className={aiStyles.accentText}>04</span> LEAVE IT
                    MAINTAINABLE
                  </p>
                  <p className={aiStyles.blockText}>
                    Readable code, decisions written down, and a handover so
                    the next person—or me in six months—isn&apos;t
                    reverse-engineering it.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
