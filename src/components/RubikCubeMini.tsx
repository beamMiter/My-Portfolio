// src/components/RubikCubeMini.tsx
"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { ArrowRight, Linkedin, Github, Music2, Mail } from "lucide-react";

/* ========== PROPS ========== */
type Props = {
  className?: string;     // ex. "max-w-[560px]"
  tilt?: boolean;
  years?: number;
  portfolioHref?: string;
  linkedinHref?: string;
  githubHref?: string;
  tiktokHref?: string;
  emailHref?: string;
  showExtraRow?: boolean; // แสดง 5 กล่องเสริมซ้ายล่าง
};

export default function RubikCubeMini({
  className = "",
  tilt = true,
  years = 6,
  portfolioHref = "/portfolio",
  linkedinHref = "https://www.linkedin.com/",
  githubHref = "https://github.com/",
  tiktokHref = "https://www.tiktok.com/",
  emailHref = "mailto:hello@example.com",
  showExtraRow = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useTransform(my, [0, 1], [7, -7]);
  const rotY = useTransform(mx, [0, 1], [-8, 8]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tilt) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const tiltStyle: MotionStyle | undefined = tilt
    ? { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }
    : undefined;

  return (
    <motion.div
      ref={ref}
      onPointerMove={tilt ? onPointerMove : undefined}
      style={tiltStyle}
      className={["relative w-full perspective-[1200px] max-w-full", className].join(" ")}
    >
      {/* aura */}
      <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[26px] opacity-20 blur-2xl [background:radial-gradient(60%_50%_at_15%_0%,#ffffff22,transparent_60%),radial-gradient(50%_45%_at_100%_30%,#00000033,transparent_60%)]" />

      {/* ===== GRID 3-cols: 9 กล่องหลัก ===== */}
      <div className="grid grid-cols-3 gap-2 rounded-[22px] bg-black/40 p-2 ring-1 ring-white/5">
        <Sticker>
          <WaveMono dur={12} delay={0}    baseOpacity={0.30} overlayOpacity={0.18} />
        </Sticker>
        <Sticker>
          <WaveWithText chips={["Web", "API", "Automate"]} dur={13} delay={-0.8} baseOpacity={0.26} overlayOpacity={0.15}/>
        </Sticker>
        <Sticker>
          <WaveMono dur={14} delay={-1.6} baseOpacity={0.22} overlayOpacity={0.12} />
        </Sticker>

        <Sticker>
          <Link href={emailHref} className="group grid size-full place-items-center rounded-[16px] bg-gradient-to-b from-zinc-900 to-zinc-950 ring-1 ring-white/10">
            <div className="grid aspect-square w-[56%] place-items-center rounded-full bg-white text-black shadow-[0_8px_20px_rgba(0,0,0,.35)]">
              <Mail className="size-5" />
            </div>
            <span className="sr-only">Contact</span>
          </Link>
        </Sticker>
        <Sticker>
          <Link href={portfolioHref} className="group grid size-full place-items-center rounded-[16px] bg-white/[0.03] ring-1 ring-white/10">
            <div className="grid aspect-square w-[50%] place-items-center rounded-[12px] bg-white text-black ring-1 ring-black/10 transition group-hover:translate-x-0.5">
              <ArrowRight className="size-5" />
            </div>
            <span className="sr-only">Open portfolio</span>
          </Link>
        </Sticker>
        <Sticker>
          <div className="grid size-full place-items-center rounded-[16px] bg-gradient-to-b from-zinc-900 to-zinc-950 ring-1 ring-white/10">
            <span className="rotate-180 [writing-mode:vertical-rl] text-[11px] font-medium tracking-[.22em] text-zinc-200/90">
              THAILAND • {years}Y
            </span>
          </div>
        </Sticker>

        <Sticker>
          <Social href={linkedinHref} label="LinkedIn">
            <Linkedin className="size-5" />
          </Social>
        </Sticker>
        <Sticker>
          <Social href={githubHref} label="GitHub">
            <Github className="size-5" />
          </Social>
        </Sticker>
        <Sticker>
          <Social href={tiktokHref} label="TikTok">
            <Music2 className="size-5" />
          </Social>
        </Sticker>
      </div>

      {showExtraRow && (
        <div
          className="
            mt-3 grid grid-cols-5 gap-2
            md:max-w-[66%] w-full   /* กว้างเท่ากับ 2/3 = 2 คอลัมน์แรก */
          "
        >
          <ExtraSquare href="/portfolio#cases" label="Cases">
            <span className="text-[12px] font-semibold tracking-wide">Cases</span>
          </ExtraSquare>

          <ExtraSquare href="/automation" label="n8n">
            <IconN8N className="h-6 w-6 opacity-95" />
          </ExtraSquare>

          <ExtraSquare href="/what-i-do#devops" label="CI/CD">
            <span className="text-[12px] font-semibold">CI/CD</span>
          </ExtraSquare>

          <ExtraSquare href="/what-i-do#mysql" label="SQL">
            <span className="text-[12px] font-semibold">SQL</span>
          </ExtraSquare>

          <ExtraSquare href="/contact" label="Contact">
            <Mail className="h-6 w-6" />
          </ExtraSquare>
        </div>
      )}
    </motion.div>
  );
}

/* ========== ATOMS ========== */
function Sticker({ children }: { children: React.ReactNode }) {
  return (
    <div className="aspect-square overflow-hidden rounded-[18px] bg-white/[0.02] p-1 ring-1 ring-black/40">
      <div className="relative size-full rounded-[16px]">{children}</div>
    </div>
  );
}

function Social({
  href, label, children,
}: { href: string; label: string; children: React.ReactNode }) {
  const ext = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(ext ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      aria-label={label}
      className="group grid size-full place-items-center rounded-[16px] bg-white/[0.03] ring-1 ring-white/10 transition hover:bg-white/[0.05]"
    >
      <div className="grid size-[44%] place-items-center rounded-[12px] ring-1 ring-white/10 bg-black/30 group-hover:bg-black/20">
        <div className="opacity-90 group-hover:opacity-100">{children}</div>
      </div>
    </Link>
  );
}

/* ========== EXTRA SQUARE (เท่ากับกล่องหลัก) ========== */
function ExtraSquare({
  href, label, children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const ext = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(ext ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      aria-label={label}
      className="
        group relative grid aspect-square
        place-items-center overflow-hidden rounded-[18px]
        bg-white/[0.03] p-1 ring-1 ring-black/40
      "
    >
      <div className="grid size-full place-items-center rounded-[16px] bg-black/40 ring-1 ring-white/10">
        <div className="text-zinc-100 opacity-90 group-hover:opacity-100">
          {children}
        </div>
      </div>
    </Link>
  );
}

/* ========== n8n ICON (minimal SVG) ========== */
function IconN8N({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="20" r="6" />
        <circle cx="48" cy="20" r="6" />
        <circle cx="32" cy="44" r="6" />
        <path d="M22 20h20" />
        <path d="M28 24l-6 14" />
        <path d="M36 24l6 14" />
      </g>
    </svg>
  );
}

/* ========== CHIPS & WAVES ========== */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[.06] px-2.5 py-1 text-[11px] text-zinc-200">
      {children}
    </span>
  );
}

function WaveMono({
  dur = 12,
  delay = 0,
  baseOpacity = 0.28,
  overlayOpacity = 0.16,
}: {
  dur?: number;
  delay?: number;
  baseOpacity?: number;
  overlayOpacity?: number;
}) {
  return (
    <svg viewBox="0 0 400 120" className="absolute inset-0 h-full w-full rounded-[16px] bg-black" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="monoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fafafa" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>
      </defs>
      <path fill="url(#monoGrad)" fillOpacity={baseOpacity}>
        <animate attributeName="d" dur={`${dur}s`} repeatCount="indefinite" begin={`${delay}s`}
          values={`M0,70 Q100,40 200,70 T400,70 L400,120 L0,120 Z; M0,60 Q100,90 200,60 T400,60 L400,120 L0,120 Z; M0,70 Q100,40 200,70 T400,70 L400,120 L0,120 Z`} />
      </path>
      <path fill="url(#monoGrad)" fillOpacity={overlayOpacity}>
        <animate attributeName="d" dur={`${dur}s`} repeatCount="indefinite" begin={`${delay}s`}
          values={`M0,55 Q100,25 200,55 T400,55 L400,120 L0,120 Z; M0,65 Q100,95 200,65 T400,65 L400,120 L0,120 Z; M0,55 Q100,25 200,55 T400,55 L400,120 L0,120 Z`} />
      </path>
    </svg>
  );
}

function WaveWithText({
  chips,
  dur = 13,
  delay = -0.8,
  baseOpacity = 0.26,
  overlayOpacity = 0.15,
}: {
  chips: string[];
  dur?: number;
  delay?: number;
  baseOpacity?: number;
  overlayOpacity?: number;
}) {
  return (
    <div className="relative size-full rounded-[16px]">
      <WaveMono dur={dur} delay={delay} baseOpacity={baseOpacity} overlayOpacity={overlayOpacity} />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 px-2">
        <div className="flex flex-col items-center gap-2">
          {chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
