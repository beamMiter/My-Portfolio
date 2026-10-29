"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Liter } from "next/font/google";
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
  SiRedis,
  SiSqlite,
  SiLinux,
  SiJenkins,
  SiNginx,
  SiGit,
  SiJquery,
} from "react-icons/si";
import Marquee from "react-fast-marquee";
import { ICON_SRC_MAP, IconName } from "@/data/icons";
import { useIntroUI } from "@/components/intro/IntroUIContext";

import PortfolioMosaic from "@/components/PortfolioMosaic";
import IntroLaneReveal from "@/components/intro/IntroLaneReveal";
import ContributionGrid from "@/components/intro/ContributionGrid";
import CalmStory from "@/components/intro/CalmStory";
import StackStory from "@/components/intro/StackStory";
import ProcessStory from "@/components/intro/ProcessStory";

import heroStyles from "@/styles/intro/hero.module.css";

const liter = Liter({
  subsets: ["latin"],
  weight: ["400"],
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
      className={`${heroStyles.fontHeading} tracking-[0.01em] uppercase font-semibold leading-none inline-flex items-center justify-center ${
        isTablet ? "" : heroStyles.ctaLabel
      }`}
      style={isTablet ? { fontSize: "1.875rem" } : undefined}
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
      className={`min-h-screen text-zinc-50 ${heroStyles.root}`}
      style={{ touchAction: "pan-y" }}
    >
      <div className={heroStyles.heroWrap}>
        {/* the white stage slides in from the left, then the grid shows on
            top of it */}
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

        <div className={heroStyles.contentShell}>
          <IntroLaneReveal>
            <div className={heroStyles.contentContainer}>
              <div className={heroStyles.leftCol}>
                <div data-grid>
                  <div
                    className={heroStyles.cubeWrap}
                    style={{ transform: "translateX(var(--cube-x))" }}
                  >
                    {/* /test mosaic, shrunk down to replace the old Rubik cube.
                        the zoom itself lives in CSS (heroStyles.mosaicZoom), not
                        here, so it can grow by breakpoint instead of being
                        pinned to one fixed value regardless of screen size */}
                    <div
                      className={`w-full md:w-auto md:shrink-0 ${heroStyles.mosaicZoom}`}
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
                      className={`mb-4 block leading-none font-normal tracking-[0.2em] text-zinc-400 uppercase ${heroStyles.kicker}`}
                    >
                      Full-Stack Software & Mobile Dev
                    </span>
                    <h1
                      className={`${heroStyles.heroTitle} ${heroStyles.headline} font-sans flex flex-col leading-tight w-full`}
                    >
                      <span
                        data-stagger-row
                        className={`text-white tracking-wide font-bold ${heroStyles.lineHello}`}
                      >
                        Hello<span className={liter.className}>,</span> I
                        <span className={liter.className}>
                          {String.fromCharCode(8217)}
                        </span>
                        m
                        {/* hand-drawn accent: a burst of strokes off the
                            top-right of "I'm" */}
                        <span className={heroStyles.burstAnchor} aria-hidden="true">
                          {/* three marker strokes fanned evenly from the m's
                              corner, each bowed a little, the middle one
                              longest */}
                          <svg className={heroStyles.burst} viewBox="0 0 32 32" fill="none">
                            <path d="M5.3 17.3 Q8.4 12.9 9.9 7.8" />
                            <path d="M9.7 20.4 Q17.3 17.8 24.2 13.6" />
                            <path d="M10.3 25.9 Q15.3 26.4 20.0 28.2" />
                          </svg>
                        </span>
                      </span>
                      <span
                        data-rise-fade
                        style={{ color: "var(--dev-accent)" }}
                        className={`mt-1 tracking-wide font-bold w-full ${heroStyles.lineName}`}
                      >
                        Techin Jetsribumrung
                      </span>
                    </h1>
                  </div>

                  <div className="mt-6 grid max-w-2xl gap-4 md:mt-8">
                    <p
                      data-stagger-row
                      className={`${heroStyles.pText} leading-relaxed text-zinc-400`}
                    >
                      I build the internal systems a team never gets to pick but still opens
                      every morning and runs on all day without a second thought
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

      <CalmStory />

      <StackStory />

      <ProcessStory />
    </main>
  );
}
