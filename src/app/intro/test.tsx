"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import type { MotionValue } from "framer-motion";

import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Clock3,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";
import { useIntroUI } from "@/components/intro/IntroUIContext";
import IntroCube from "@/components/intro/IntroCube";

// Section 3 icons
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
  SiFlutter,
  SiDart,
  SiVuedotjs,
} from "react-icons/si";

/* =========================
   Helpers
   ========================= */

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
    const id = setInterval(() => setI((v) => (v + 1) % items.length), interval);
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

/* =========================
   Scroll utilities / Scene
   ========================= */

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function sceneProgress(globalP: number, start: number, end: number) {
  return clamp01((globalP - start) / (end - start));
}

function Scene({
  heightVh,
  children,
}: {
  heightVh: number;
  children: React.ReactNode;
}) {
  return (
    <section style={{ height: `${heightVh}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">{children}</div>
    </section>
  );
}

function RevealLineScroll({
  children,
  lp,
  inStart,
  inEnd,
}: {
  children: React.ReactNode;
  lp: MotionValue<number>;
  inStart: number;
  inEnd: number;
}) {
  const opacity = useTransform(lp, [inStart, inEnd], [0, 1]);
  const y = useTransform(lp, [inStart, inEnd], [22, 0]);
  const wipeX = useTransform(lp, [inStart, inEnd], ["0%", "103%"]);

  return (
    <motion.div
      className="relative overflow-hidden inline-block align-top will-change-transform"
      style={{ opacity, y }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-zinc-950"
        style={{ x: wipeX, transformOrigin: "left" }}
      />
      <span className="relative inline-block">{children}</span>
    </motion.div>
  );
}

/* =========================
   Section 3: Icon Cloud data
   ========================= */

type CloudIcon = {
  name: string;
  src: string;
  top: string;
  left: string;
  size: "xs" | "sm" | "md" | "lg";
};

const ICON_LIST: CloudIcon[] = [
  {
    name: "react",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    top: "34%",
    left: "26%",
    size: "md",
  },
  { name: "nextjs", src: "/icons/nextjs.svg", top: "30%", left: "50%", size: "md" },
  {
    name: "typescript",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    top: "34%",
    left: "74%",
    size: "md",
  },
  {
    name: "laravel",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg",
    top: "52%",
    left: "30%",
    size: "md",
  },
  {
    name: "go",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg",
    top: "52%",
    left: "69%",
    size: "md",
  },
  {
    name: "nodejs",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    top: "45%",
    left: "50%",
    size: "lg",
  },

  {
    name: "postgresql",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
    top: "20%",
    left: "36%",
    size: "sm",
  },
  {
    name: "mysql",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
    top: "18%",
    left: "64%",
    size: "sm",
  },
  {
    name: "mongodb",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    top: "64%",
    left: "26%",
    size: "sm",
  },
  {
    name: "redis",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg",
    top: "66%",
    left: "52%",
    size: "sm",
  },

  {
    name: "docker",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
    top: "12%",
    left: "50%",
    size: "md",
  },
  {
    name: "linux",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg",
    top: "30%",
    left: "14%",
    size: "sm",
  },
  {
    name: "nginx",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg",
    top: "30%",
    left: "86%",
    size: "sm",
  },
  {
    name: "git",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
    top: "80%",
    left: "34%",
    size: "sm",
  },
  {
    name: "jenkins",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg",
    top: "80%",
    left: "66%",
    size: "sm",
  },

  {
    name: "flutter",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg",
    top: "10%",
    left: "28%",
    size: "xs",
  },
  {
    name: "dart",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dart/dart-original.svg",
    top: "10%",
    left: "72%",
    size: "xs",
  },
  {
    name: "vuejs",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg",
    top: "88%",
    left: "50%",
    size: "xs",
  },
];

// ✅ FIX: ห้ามเรียก useTransform ใน .map() => แตกเป็น component ย่อย
function IconBubble({
  lp,
  icon,
  idx,
}: {
  lp: MotionValue<number>;
  icon: CloudIcon;
  idx: number;
}) {
  const appear = 0.40 + idx * 0.02;

  const opacity = useTransform(lp, [appear, appear + 0.12], [0, 1]);
  const scale = useTransform(lp, [appear, appear + 0.12], [0.78, 1]);
  const yIn = useTransform(lp, [appear, appear + 0.12], [16, 0]);

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
      className="absolute"
      style={{
        top: icon.top,
        left: icon.left,
        transform: "translate(-50%, -50%)",
        opacity,
        scale,
        y: yIn,
        willChange: "transform, opacity",
      }}
      animate={{
        y: [0, -6, 0],
        x: [0, idx % 2 === 0 ? 4 : -4, 0],
        rotate: [0, idx % 2 === 0 ? 2 : -2, 0],
        transition: {
          duration: 8 + idx * 0.2,
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
}

function IconCloudScroll({
  lp,
  icons = ICON_LIST,
}: {
  lp: MotionValue<number>;
  icons?: CloudIcon[];
}) {
  return (
    <div className="w-full max-w-sm md:max-w-md mt-[-40px] md:mt-[-50px]">
      <div className="relative aspect-[4/3] md:aspect-[5/4] max-h-[420px] mx-auto md:ml-auto">
        {icons.map((icon, idx) => (
          <IconBubble key={`${icon.name}-${idx}`} lp={lp} icon={icon} idx={idx} />
        ))}
      </div>
    </div>
  );
}

/* =========================
   Page: Main เดียว + Scene1..Scene5
   ========================= */

export default function IntroWavePage() {
  const router = useRouter();
  const [btnHovered, setBtnHovered] = useState(false);
  const { setShowLang } = useIntroUI();

  useEffect(() => {
    setShowLang(true);
  }, [setShowLang]);

  const rootRef = useRef<HTMLDivElement | null>(null);

  const scenes = useMemo(
    () => [
      { id: "hero", heightVh: 180 },
      { id: "calm", heightVh: 150 },
      { id: "stack", heightVh: 160 },
      { id: "ai", heightVh: 150 },
      { id: "contact", heightVh: 170 },
    ],
    []
  );

  const ranges = useMemo(() => {
    const total = scenes.reduce((s, x) => s + x.heightVh, 0);
    let acc = 0;
    return scenes.map((s) => {
      const start = acc / total;
      acc += s.heightVh;
      const end = acc / total;
      return { ...s, start, end };
    });
  }, [scenes]);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  const lp1 = useTransform(p, (v: number) =>
    sceneProgress(v, ranges[0].start, ranges[0].end)
  );
  const lp2 = useTransform(p, (v: number) =>
    sceneProgress(v, ranges[1].start, ranges[1].end)
  );
  const lp3 = useTransform(p, (v: number) =>
    sceneProgress(v, ranges[2].start, ranges[2].end)
  );
  const lp4 = useTransform(p, (v: number) =>
    sceneProgress(v, ranges[3].start, ranges[3].end)
  );
  const lp5 = useTransform(p, (v: number) =>
    sceneProgress(v, ranges[4].start, ranges[4].end)
  );

  return (
    <main ref={rootRef} className="bg-[#0b0b0b] min-h-screen text-zinc-50">
      <style jsx global>{`
        :root {
          --font-sans-dev: system-ui, -apple-system, BlinkMacSystemFont,
            "SF Pro Text", "Segoe UI", sans-serif;
          --font-heading-dev: "Space Grotesk", system-ui, -apple-system,
            BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
          --font-mono-dev: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo,
            Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          --dev-accent: #30bb64;
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
        .accent-text {
          color: var(--dev-accent);
        }
      `}</style>

      {/* SCENE 1 */}
      <Scene heightVh={scenes[0].heightVh}>
        <HeroScene
          lp={lp1}
          btnHovered={btnHovered}
          setBtnHovered={setBtnHovered}
          onGoHome={() => router.push("/home")}
        />
      </Scene>

      {/* SCENE 2 */}
      <Scene heightVh={scenes[1].heightVh}>
        <CalmScene lp={lp2} onContact={() => router.push("/contact")} />
      </Scene>

      {/* SCENE 3 */}
      <Scene heightVh={scenes[2].heightVh}>
        <StackScene lp={lp3} />
      </Scene>

      {/* SCENE 4 */}
      <Scene heightVh={scenes[3].heightVh}>
        <AiScene lp={lp4} />
      </Scene>

      {/* SCENE 5 */}
      <Scene heightVh={scenes[4].heightVh}>
        <ContactScene lp={lp5} />
      </Scene>
    </main>
  );
}

/* =========================
   Scene 1: HERO
   ========================= */

function HeroScene({
  lp,
  btnHovered,
  setBtnHovered,
  onGoHome,
}: {
  lp: MotionValue<number>;
  btnHovered: boolean;
  setBtnHovered: (v: boolean) => void;
  onGoHome: () => void;
}) {
  const waveY = useTransform(lp, [0, 0.35], ["80%", "-10%"]);
  const panelX = useTransform(lp, [0.18, 0.35], ["110%", "0%"]);
  const contentOpacity = useTransform(lp, [0.22, 0.38], [0, 1]);
  const contentY = useTransform(lp, [0.22, 0.38], [18, 0]);
  const cubeScale = useTransform(lp, [0.26, 0.42], [0.06, 0.9]);
  const cubeOpacity = useTransform(lp, [0.26, 0.42], [0, 1]);
  const cubeRotate = useTransform(lp, [0.26, 0.42], [0, 360]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black z-0" />

      <motion.div
        className="pointer-events-none absolute inset-x-[-20%] bottom-[-45%] h-[170%] bg-[#e8e8e2] z-10"
        style={{
          borderTopLeftRadius: "55% 45%",
          borderTopRightRadius: "55% 45%",
          willChange: "transform",
          y: waveY,
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-[14%] px-10 md:px-20 line-row z-20">
        <div className="flex gap-6 opacity-60">
          {Array.from({ length: 11 }).map((_, idx) => (
            <div key={idx} className="h-px flex-1 bg-zinc-500/70 rounded-full" />
          ))}
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[60%] bg-zinc-950 z-30"
        style={{ x: panelX, transformOrigin: "right", willChange: "transform" }}
      />

      <motion.div
        className="relative z-40 flex min-h-screen items-center"
        style={{ opacity: contentOpacity, y: contentY, willChange: "transform, opacity" }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col md:flex-row items-center gap-10 lg:gap-14 px-4 md:px-8 lg:px-10">
          <div className="w-full md:w-[40%] lg:w-[38%] flex items-center justify-center md:justify-start md:pr-4">
            <motion.div
              className="-translate-x-20 md:-translate-x-24 lg:-translate-x-50 -translate-y-6"
              style={{
                scale: cubeScale,
                opacity: cubeOpacity,
                rotateZ: cubeRotate,
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

          <div className="w-full md:w-[60%] lg:w-[62%] max-w-[44rem] font-sans-dev text-white md:pl-4 lg:pl-8">
            <RevealLineScroll lp={lp} inStart={0.30} inEnd={0.40}>
              <div className="relative inline-block">
                <h1 className="headline font-heading-dev flex items-center gap-3 text-[clamp(40px,5vw,60px)] font-semibold leading-[1.08] whitespace-nowrap">
                  <span className="text-white">Hello, I&apos;m</span>
                  <span
                    className="tracking-[0.28em] translate-y-[3px] inline-block"
                    style={{ color: "var(--dev-accent)" }}
                  >
                    <VerticalTicker />
                  </span>
                </h1>
                <div className="relative z-[50] mt-3 h-[1px] w-full bg-white/30" />
              </div>
            </RevealLineScroll>

            <div className="mt-8 space-y-4 max-w-[42rem]">
              <RevealLineScroll lp={lp} inStart={0.36} inEnd={0.48}>
                <div className="py-1">
                  <p className="text-[16px] md:text-[17px] leading-relaxed text-zinc-200">
                    I build internal platforms and mission-critical software used
                    across hospitals, government units, and high-responsibility
                    organizations in Thailand.
                  </p>
                </div>
              </RevealLineScroll>

              <RevealLineScroll lp={lp} inStart={0.42} inEnd={0.54}>
                <div className="py-1">
                  <p className="text-[16px] md:text-[17px] leading-relaxed text-zinc-200">
                    My work focuses on creating systems that reduce operational
                    complexity, improve reliability, and support long-term
                    organizational growth through automation, stable architecture,
                    and strong technical foundations.
                  </p>
                </div>
              </RevealLineScroll>

              <RevealLineScroll lp={lp} inStart={0.48} inEnd={0.60}>
                <div className="py-1">
                  <p className="text-[16px] md:text-[17px] leading-relaxed text-zinc-200">
                    I care about designing software that delivers measurable
                    business value — empowering teams, streamlining workflows, and
                    making technology an advantage rather than a burden.
                  </p>
                </div>
              </RevealLineScroll>
            </div>

            <motion.div
              className="mt-12 w-full flex items-center justify-start pl-2 relative z-50"
              style={{
                opacity: useTransform(lp, [0.52, 0.66], [0, 1]),
                y: useTransform(lp, [0.52, 0.66], [20, 0]),
                willChange: "transform, opacity",
              }}
            >
              <div
                className="select-none cursor-pointer hover:opacity-80 transition-opacity duration-300 flex items-center"
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                onClick={onGoHome}
              >
                <HoverWaveLabel hovered={btnHovered} />
              </div>

              <motion.button
                type="button"
                onClick={onGoHome}
                onHoverStart={() => setBtnHovered(true)}
                onHoverEnd={() => setBtnHovered(false)}
                className="ml-6 group relative flex items-center justify-center w-[70px] h-[70px] aspect-square rounded-full bg-zinc-50 shadow-xl border border-white/60 hover:bg-white hover:scale-[1.07] transition-all duration-300 ease-out"
              >
                <ArrowUpRight className="w-6 h-6 text-zinc-900 group-hover:-translate-y-[6px] group-hover:translate-x-[6px] transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================
   Scene 2: CALM SYSTEMS (Scroll-driven)
   ========================= */

function CalmScene({
  lp,
  onContact,
}: {
  lp: MotionValue<number>;
  onContact: () => void;
}) {
  const headingOpacity = useTransform(lp, [0.08, 0.25], [0, 1]);
  const headingY = useTransform(lp, [0.08, 0.25], [40, 0]);

  const leftOpacity = useTransform(lp, [0.18, 0.40], [0, 1]);
  const leftX = useTransform(lp, [0.18, 0.40], [-60, 0]);
  const leftY = useTransform(lp, [0.18, 0.40], [20, 0]);

  const monitorOpacity = useTransform(lp, [0.24, 0.48], [0, 1]);
  const monitorY = useTransform(lp, [0.24, 0.48], [70, 0]);

  const curtainX = useTransform(lp, [0.32, 0.62], ["0%", "105%"]);

  const rightOpacity = useTransform(lp, [0.30, 0.54], [0, 1]);
  const rightX = useTransform(lp, [0.30, 0.54], [60, 0]);
  const rightY = useTransform(lp, [0.30, 0.54], [20, 0]);

  return (
    <div className="relative h-screen overflow-hidden bg-[#050507]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-[46%] opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,#ffffff_0,transparent_0)] [background-size:16px_16px]" />
      </div>

      <div className="relative z-10 h-full w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-32 flex flex-col justify-center">
        <motion.div
          className="mb-10 md:mb-14"
          style={{ opacity: headingOpacity, y: headingY, willChange: "transform, opacity" }}
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

        <div className="grid gap-y-10 gap-x-10 md:gap-y-14 md:grid-cols-[1.35fr_1.1fr_0.9fr] md:items-center">
          <motion.div
            className="space-y-4 lg:space-y-5"
            style={{
              opacity: leftOpacity,
              x: leftX,
              y: leftY,
              willChange: "transform, opacity",
            }}
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

            <div className="pt-1.5 space-y-3">
              <button
                type="button"
                onClick={onContact}
                className="group inline-flex items-center gap-3 rounded-full border border-zinc-600/80 px-6 py-2.5 font-mono-dev text-[11px] md:text-[12px] uppercase tracking-[0.28em] text-zinc-50 bg-transparent hover:border-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>CONTACT / COLLAB</span>
              </button>

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

          <motion.div
            className="relative w-full max-w-md lg:max-w-lg mx-auto md:mx-0"
            style={{
              opacity: monitorOpacity,
              y: monitorY,
              willChange: "transform, opacity",
            }}
          >
            <div className="relative aspect-[4/4.6] overflow-hidden rounded-[1.9rem] border border-zinc-700/70 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 shadow-[0_22px_70px_rgba(0,0,0,0.9)]">
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

              <motion.div
                className="pointer-events-none absolute inset-0 bg-zinc-950"
                style={{
                  x: curtainX,
                  transformOrigin: "left",
                  willChange: "transform",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-between gap-8 md:items-end"
            style={{
              opacity: rightOpacity,
              x: rightX,
              y: rightY,
              willChange: "transform, opacity",
            }}
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
    </div>
  );
}

/* =========================
   Scene 3: TECH STACK (Scroll-driven)
   ========================= */

function StackScene({ lp }: { lp: MotionValue<number> }) {
  const topOpacity = useTransform(lp, [0.05, 0.18], [0, 1]);
  const topY = useTransform(lp, [0.05, 0.18], [40, 0]);

  const leftOpacity = useTransform(lp, [0.15, 0.40], [0, 1]);
  const leftX = useTransform(lp, [0.15, 0.40], [-60, 0]);
  const leftY = useTransform(lp, [0.15, 0.40], [20, 0]);

  const rightOpacity = useTransform(lp, [0.28, 0.50], [0, 1]);
  const rightX = useTransform(lp, [0.28, 0.50], [60, 0]);
  const rightY = useTransform(lp, [0.28, 0.50], [20, 0]);

  return (
    <div className="relative h-screen overflow-hidden bg-[#050507]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-[55%] bg-[#050507]" />
        <div className="absolute inset-y-0 right-0 w-[45%] bg-white" />
      </div>

      <div className="relative z-10 h-full w-full px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40 flex flex-col justify-center">
        <motion.div
          className="mb-10"
          style={{ opacity: topOpacity, y: topY, willChange: "transform, opacity" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] md:text-[11px] font-mono-dev mb-8">
            <span className="tracking-[0.26em] uppercase text-zinc-400">
              STACK · LANGUAGES · PLATFORMS
            </span>
            <span className="tracking-[0.22em] uppercase text-zinc-500">
              TYPESCRIPT · LARAVEL · GO · DEVOPS
            </span>
          </div>

          <div className="grid items-start gap-12 md:gap-16 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1.05fr)]">
            {/* LEFT COLUMN */}
            <motion.div
              className="space-y-10 text-zinc-50"
              style={{
                opacity: leftOpacity,
                x: leftX,
                y: leftY,
                willChange: "transform, opacity",
              }}
            >
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
                  This is where I spend most of my time — frontend, APIs, and long–running internal web apps.
                </p>
              </div>

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
                  Picked for stability first: easy backups, boring migrations, and good tooling on Linux servers.
                </p>
              </div>

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
                  Not the main stack, but useful when a project needs mobile, legacy integration, or a specific frontend style.
                </p>
              </div>
            </motion.div>

            {/* RIGHT COLUMN */}
            <motion.div
              className="flex flex-col items-start md:items-end gap-8 md:gap-10"
              style={{
                opacity: rightOpacity,
                x: rightX,
                y: rightY,
                willChange: "transform, opacity",
              }}
            >
              <div className="space-y-2 md:text-right">
                <h2 className="font-heading-dev text-[clamp(32px,5.6vw,80px)] leading-[1.04] tracking-[-0.06em] uppercase text-zinc-900">
                  HOW I{" "}
                  <span className="accent-text inline-block">KEEP SYSTEMS RUNNING</span>
                </h2>
                <p className="text-[11px] md:text-[12px] font-mono-dev tracking-[0.22em] uppercase text-zinc-500">
                  RUNTIME · FRAMEWORKS · DATABASES
                </p>
              </div>

              <IconCloudScroll lp={lp} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* =========================
   Scene 4: AI TOOLCHAIN (Scroll-driven)
   ========================= */

function AiScene({ lp }: { lp: MotionValue<number> }) {
  const leftOpacity = useTransform(lp, [0.08, 0.26], [0, 1]);
  const leftX = useTransform(lp, [0.08, 0.26], [-40, 0]);
  const leftY = useTransform(lp, [0.08, 0.26], [16, 0]);

  const headingOpacity = useTransform(lp, [0.12, 0.30], [0, 1]);
  const headingY = useTransform(lp, [0.12, 0.30], [18, 0]);

  const introOpacity = useTransform(lp, [0.16, 0.34], [0, 1]);
  const introY = useTransform(lp, [0.16, 0.34], [16, 0]);

  const listOpacity = useTransform(lp, [0.20, 0.38], [0, 1]);
  const listY = useTransform(lp, [0.20, 0.38], [16, 0]);

  const rightOpacity = useTransform(lp, [0.20, 0.40], [0, 1]);
  const rightX = useTransform(lp, [0.20, 0.40], [40, 0]);
  const rightY = useTransform(lp, [0.20, 0.40], [16, 0]);

  const aiItems = [
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
  ];

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-full bg-white lg:w-[55%]" />
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[45%] bg-[#050507]" />
      </div>

      <div className="relative z-10 h-full w-full px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40 flex items-center">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16 items-start w-full">
          <motion.div
            className="max-w-xl text-zinc-900"
            style={{
              opacity: leftOpacity,
              x: leftX,
              y: leftY,
              willChange: "transform, opacity",
            }}
          >
            <motion.div
              className="mb-4 text-[10px] md:text-[11px] font-mono-dev tracking-[0.26em] uppercase text-zinc-500"
              style={{ opacity: headingOpacity, y: headingY, willChange: "transform, opacity" }}
            >
              AI · TOOLCHAIN · DAILY USE
            </motion.div>

            <motion.h2
              className="font-heading-dev text-[clamp(32px,5.6vw,82px)] leading-[1.05] tracking-[-0.05em] text-zinc-900 uppercase"
              style={{ opacity: headingOpacity, y: headingY, willChange: "transform, opacity" }}
            >
              <span className="block">
                HOW I <span className="accent-text inline-block">USE MULTIPLE AI</span>
              </span>
            </motion.h2>

            <motion.p
              className="text-[13px] md:text-[14px] leading-relaxed text-zinc-700 mb-8"
              style={{ opacity: introOpacity, y: introY, willChange: "transform, opacity" }}
            >
              Each model in this stack plays a different role. I don’t treat AI as one big tool —
              I use them as specialists. Some focus on code, some on reasoning, some on backend
              logic, and some on polishing or refactoring existing work.
            </motion.p>

            <motion.div
              className="space-y-6"
              style={{ opacity: listOpacity, y: listY, willChange: "transform, opacity" }}
            >
              {aiItems.map((ai, idx) => (
                <AiRow key={ai.name} lp={lp} idx={idx} ai={ai} />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:block"
            style={{
              opacity: rightOpacity,
              x: rightX,
              y: rightY,
              willChange: "transform, opacity",
            }}
          >
            <div className="rounded-3xl border border-zinc-800/70 bg-[#050507] text-zinc-100 p-8 shadow-[0_22px_70px_rgba(0,0,0,0.55)] max-w-xl ml-auto">
              <p className="font-mono-dev text-[11px] uppercase tracking-[0.26em] text-zinc-500">
                AI WORKFLOW
              </p>
              <h3 className="mt-3 font-heading-dev text-[28px] tracking-[-0.05em]">
                “Specialists, not one model.”
              </h3>
              <ul className="mt-5 space-y-2 text-zinc-300 text-[13px] leading-relaxed">
                <li>• Use reasoning-first models to validate flows & edge cases</li>
                <li>• Use code-first models to ship UI/API faster</li>
                <li>• Use long-context models for refactors on large files</li>
                <li>• Keep output consistent with tests + linters</li>
              </ul>
              <div className="mt-6 pt-5 border-t border-zinc-800 text-zinc-400 text-[12px]">
                Goal: reduce iteration cycles while keeping architecture stable.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AiRow({
  lp,
  idx,
  ai,
}: {
  lp: MotionValue<number>;
  idx: number;
  ai: { name: string; role: string; image: string; desc: string };
}) {
  const start = 0.28 + idx * 0.06;
  const end = start + 0.16;

  const opacity = useTransform(lp, [start, end], [0, 1]);
  const x = useTransform(lp, [start, end], [-18, 0]);
  const y = useTransform(lp, [start, end], [10, 0]);

  return (
    <motion.div
      className="flex items-start gap-4"
      style={{ opacity, x, y, willChange: "transform, opacity" }}
    >
      <img
        src={ai.image}
        alt={ai.name}
        className="h-10 w-10 md:h-11 md:w-11 object-contain select-none pointer-events-none"
      />
      <div className="space-y-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-[14px] md:text-[15px] font-semibold">{ai.name}</span>
          <span className="font-mono-dev text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-zinc-500">
            {ai.role}
          </span>
        </div>
        <p className="text-[12px] md:text-[13px] leading-relaxed text-zinc-700">
          {ai.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* =========================
   Scene 5: CONTACT (Scroll-driven)
   ========================= */

function ContactScene({ lp }: { lp: MotionValue<number> }) {
  const topOpacity = useTransform(lp, [0.06, 0.18], [0, 1]);
  const topY = useTransform(lp, [0.06, 0.18], [24, 0]);

  const leftOpacity = useTransform(lp, [0.14, 0.32], [0, 1]);
  const leftX = useTransform(lp, [0.14, 0.32], [-40, 0]);
  const leftY = useTransform(lp, [0.14, 0.32], [16, 0]);

  const rightOpacity = useTransform(lp, [0.22, 0.40], [0, 1]);
  const rightX = useTransform(lp, [0.22, 0.40], [40, 0]);
  const rightY = useTransform(lp, [0.22, 0.40], [16, 0]);

  const bottomOpacity = useTransform(lp, [0.60, 0.78], [0, 1]);
  const bottomY = useTransform(lp, [0.60, 0.78], [14, 0]);

  return (
    <div className="relative h-screen overflow-hidden bg-[#050507] text-zinc-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#050507]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,#3f3f46_0,transparent_0)] [background-size:18px_18px]" />
      </div>

      <div className="relative z-10 mx-auto h-full w-full max-w-6xl px-6 md:px-10 lg:px-14 flex flex-col justify-center">
        <motion.div
          className="mb-10 md:mb-12 flex flex-wrap items-center justify-between gap-4 text-[11px] md:text-[12px] font-mono-dev"
          style={{ opacity: topOpacity, y: topY, willChange: "transform, opacity" }}
        >
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
        </motion.div>

        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1.6fr_1.4fr] items-start">
          <motion.div
            className="space-y-8 max-w-xl"
            style={{
              opacity: leftOpacity,
              x: leftX,
              y: leftY,
              willChange: "transform, opacity",
            }}
          >
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

            <div className="grid gap-3 sm:grid-cols-3 text-[12px] md:text-[13px]">
              <ContactItem
                icon={<Mail className="mt-0.5 h-4 w-4 text-zinc-300" />}
                label="Email"
                value="your.email@example.com"
              />
              <ContactItem
                icon={<Phone className="mt-0.5 h-4 w-4 text-zinc-300" />}
                label="Phone"
                value="(+66) xxx-xxx-xxx"
              />
              <ContactItem
                icon={<MapPin className="mt-0.5 h-4 w-4 text-zinc-300" />}
                label="Location"
                value="Chanthaburi, Thailand · UTC+7"
              />
            </div>

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
          </motion.div>

          <motion.div
            className="space-y-8 text-[12px] md:text-[13px]"
            style={{
              opacity: rightOpacity,
              x: rightX,
              y: rightY,
              willChange: "transform, opacity",
            }}
          >
            <ContactList
              title="Project types"
              items={[
                "• Maintenance / asset repair systems",
                "• Internal dashboards and queue systems",
                "• Referral and form-based patient flows",
                "• Reporting and overview tools for management",
              ]}
            />

            <ContactList
              title="Tech focus"
              items={[
                "• Next.js / React with TypeScript",
                "• Laravel / PHP for gov-style backends",
                "• Go / Node.js for services and APIs",
                "• MySQL / PostgreSQL / Redis",
              ]}
            />

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
          </motion.div>
        </div>

        <motion.div
          className="mt-10 border-t border-zinc-800 pt-4 flex flex-col gap-2 text-[11px] md:flex-row md:items-center md:justify-between text-zinc-500 font-mono-dev"
          style={{ opacity: bottomOpacity, y: bottomY, willChange: "transform, opacity" }}
        >
          <span>
            © {new Date().getFullYear()} TECHIN JETSRIBUMRUNG · Internal Systems /
            Dev &amp; Ops
          </span>
          <span className="uppercase tracking-[0.18em]">
            Based in Chanthaburi · Hospital &amp; gov style systems
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <p className="font-mono-dev text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          {label}
        </p>
        <p className="mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function ContactList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="pb-2 border-b border-zinc-800 mb-2">
        <p className="font-mono-dev text-[11px] uppercase tracking-[0.22em] text-zinc-500">
          {title}
        </p>
      </div>
      <ul className="space-y-1.5 text-zinc-300">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
