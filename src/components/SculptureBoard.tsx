"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import {
  Mail, ArrowRight, Github, Linkedin, ServerCog, Database, Boxes,
  ShieldCheck, Workflow, Cpu, Globe, TerminalSquare, Cloud, GitBranch,
  Wrench, Dock as DockerIcon, CircleDot, Code2, Network, Box,
} from "lucide-react";

/** =============================
 *  SculptureBoard — “ประติมากรรม + ความสามารถ”
 *  - เป็นส่วน Section #2 ต่อจาก Hero
 *  - มี motion ช้า ๆ ฟีลงาน art installation
 *  - ช่องด้านขวา/ล่าง เป็นสกิล/อุปกรณ์/ภาษา ที่คุณใช้
 * ============================== */

type Props = {
  className?: string;
  tilt?: boolean;                          // เอียงตามเมาส์เล็กน้อย
  emailHref?: string;
  portfolioHref?: string;
  linkedinHref?: string;
  githubHref?: string;
};

export default function SculptureBoard({
  className = "",
  tilt = true,
  emailHref = "mailto:hello@example.com",
  portfolioHref = "/portfolio",
  linkedinHref = "https://www.linkedin.com/",
  githubHref = "https://github.com/",
}: Props) {
  /** mouse tilt */
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useTransform(my, [0, 1], [6, -6]);
  const rotY = useTransform(mx, [0, 1], [-7, 7]);

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
    <section
      className={[
        "relative py-16 md:py-20 bg-black text-white",
        className,
      ].join(" ")}
      aria-label="Sculpture / Capabilities"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Header */}
        <header className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.01em]">
            Crafted like a sculpture — <span className="text-emerald-400">reliable systems</span> with real-world impact
          </h2>
          <p className="mt-2 text-zinc-300 max-w-[75ch]">
            Motion art ด้านซ้ายคือ “installation” ที่เล่าแนวคิดการทำงาน: precise, calm, dependable.
            ด้านขวาเป็นสรุปความสามารถ/อุปกรณ์/ภาษา ที่ผมใช้ทำงานจริงในไทย (hospital, PR portal, AI workflow).
          </p>
        </header>

        <motion.div
          ref={ref}
          onPointerMove={onPointerMove}
          style={tiltStyle}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_520px] gap-6"
        >
          {/* ========== LEFT: Sculpture ========== */}
          <div className="relative rounded-3xl bg-white/[0.02] ring-1 ring-white/10 overflow-hidden min-h-[56vh]">
            {/* aura */}
            <div className="pointer-events-none absolute -inset-6 -z-10 blur-3xl opacity-25 [background:radial-gradient(38%_45%_at_20%_0%,#22d3ee33,transparent_60%),radial-gradient(40%_45%_at_90%_30%,#10b98133,transparent_60%)]" />
            {/* canvas-like stage */}
            <div className="absolute inset-0 grid place-items-center">
              <ArtSculpture />
            </div>

            {/* caption */}
            <div className="absolute bottom-0 inset-x-0 p-4 md:p-5 bg-gradient-to-t from-black/70 to-black/0">
              <p className="text-sm text-zinc-300">
                “Kinetic data sculpture — steady waves, predictable orbits, safe boundaries.”
              </p>
            </div>
          </div>

          {/* ========== RIGHT: Capability / Tools Grid ========== */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Tile title="Contact" href={emailHref} icon={<Mail className="size-5" />}>
              <p className="text-xs text-zinc-300">จ้างงาน / นัดคุยรายละเอียด</p>
            </Tile>

            <Tile title="Portfolio" href={portfolioHref} icon={<ArrowRight className="size-5" />}>
              <p className="text-xs text-zinc-300">Case studies & walkthrough</p>
            </Tile>

            <Tile title="LinkedIn" href={linkedinHref} external icon={<Linkedin className="size-5" />}>
              <p className="text-xs text-zinc-300">ประวัติการทำงาน</p>
            </Tile>

            <Tile title="GitHub" href={githubHref} external icon={<Github className="size-5" />}>
              <p className="text-xs text-zinc-300">โค้ดตัวอย่าง & utilities</p>
            </Tile>

            <BadgeGroup title="Stack (Web/API)" items={[
              ["Next.js", <IconNext key="nx" />],
              ["Laravel", <IconLaravel key="lv" />],
              ["Node.js", <IconNode key="nd" />],
              ["TypeScript", <Code2 key="ts" />],
              ["React 19", <IconReact key="rc" />],
              ["Tailwind", <IconTailwind key="tw" />],
            ]} />

            <BadgeGroup title="Data/DB" items={[
              ["MySQL", <Database key="db" />],
              ["Prisma / Eloquent", <Box key="bx" />],
              ["Redis", <IconRedis key="rd" />],
            ]} />

            <BadgeGroup title="DevOps & CI/CD" items={[
              ["Docker", <IconDocker key="dk" />],
              ["Vercel / VPS", <Cloud key="cl" />],
              ["GitHub Actions", <GitBranch key="ga" />],
              ["Nginx", <Network key="ng" />],
              ["Linux (Ubuntu/Arch)", <TerminalSquare key="ln" />],
            ]} />

            <BadgeGroup title="Automation / AI" items={[
              ["n8n Orchestration", <IconN8N key="n8" />],
              ["LLM fallback/guard", <ShieldCheck key="sh" />],
              ["Webhook/API design", <ServerCog key="sv" />],
              ["Workflow", <Workflow key="wf" />],
            ]} />

            <BadgeGroup title="Security & Ops" items={[
              ["Role-based access", <Boxes key="rb" />],
              ["Audit/Logs", <CircleDot key="lg" />],
              ["Backup/Recovery", <Wrench key="bk" />],
            ]} />

            <TilePlain title="Principles" icon={<Cpu className="size-5" />}>
              <ul className="text-xs text-zinc-300 leading-relaxed list-disc pl-4 space-y-1">
                <li>Production-first, observable, cost-aware</li>
                <li>Zero-PII leak policy</li>
                <li>Simple ops for gov-style teams</li>
              </ul>
            </TilePlain>

            <TilePlain title="Services" icon={<Globe className="size-5" />}>
              <ul className="text-xs text-zinc-300 leading-relaxed list-disc pl-4 space-y-1">
                <li>Web/API development</li>
                <li>CI/CD & Containerization</li>
                <li>Automation & data pipelines</li>
              </ul>
            </TilePlain>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =======================
 *  Art Sculpture (SVG motion)
 *  - คลื่น/วงกลม/วงโคจร เคลื่อนไหวช้า ๆ
 * ======================= */
function ArtSculpture() {
  return (
    <div className="relative w-[min(680px,90vw)] aspect-[5/3]">
      {/* base plate */}
      <div className="absolute inset-0 rounded-[28px] bg-zinc-950 ring-1 ring-white/10 overflow-hidden" />

      {/* wave layers */}
      <WaveLayer delay={0} opacity={0.32} />
      <WaveLayer delay={-1.2} opacity={0.18} />
      <WaveLayer delay={-2.4} opacity={0.12} />

      {/* orbiting dots */}
      <Orbit cx="26%" cy="52%" r="32%" dur={24} />
      <Orbit cx="72%" cy="44%" r="22%" dur={18} />
      <Orbit cx="52%" cy="58%" r="15%" dur={12} />
    </div>
  );
}

function WaveLayer({ delay = 0, opacity = 0.28 }: { delay?: number; opacity?: number }) {
  return (
    <svg viewBox="0 0 400 240" className="absolute inset-0 size-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path fill="url(#g)" fillOpacity={opacity}>
        <animate
          attributeName="d"
          dur="14s"
          begin={`${delay}s`}
          repeatCount="indefinite"
          values="
            M0,160 Q100,120 200,160 T400,160 L400,240 L0,240 Z;
            M0,150 Q100,190 200,150 T400,150 L400,240 L0,240 Z;
            M0,160 Q100,120 200,160 T400,160 L400,240 L0,240 Z
          "
        />
      </path>
    </svg>
  );
}

function Orbit({ cx, cy, r, dur }: { cx: string; cy: string; r: string; dur: number }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
      <g>
        <circle cx="50" cy="50" r="0.001" fill="none" />
        <motion.circle
          r="1.2"
          fill="#e6fffb"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: [0.9, 0.5, 0.9] }}
          transition={{ duration: dur / 2, repeat: Infinity }}
        >
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={orbitPath(cx, cy, r)} />
        </motion.circle>
      </g>
    </svg>
  );
}

function orbitPath(cx: string, cy: string, r: string) {
  // ellipse path using SVG arc commands – approximate
  return `M ${cx} ${cy}
          m -${r},0
          a ${r},${r} 0 1,0 ${parseFloat(r) * 2},0
          a ${r},${r} 0 1,0 -${parseFloat(r) * 2},0`;
}

/* =======================
 * UI primitives (Tiles)
 * ======================= */
function Tile({
  title,
  icon,
  href,
  children,
  external = false,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-4 flex flex-col gap-2 hover:bg-white/[0.05] transition"
    >
      <div className="flex items-center gap-2 text-zinc-100">
        <div className="grid place-items-center size-8 rounded-xl bg-black/40 ring-1 ring-white/10">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </Link>
  );
}

function TilePlain({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/10 p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-zinc-100">
        <div className="grid place-items-center size-8 rounded-xl bg-black/40 ring-1 ring-white/10">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function BadgeGroup({
  title,
  items,
}: {
  title: string;
  items: Array<[label: string, icon?: React.ReactNode]>;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.02] ring-1 ring-white/10 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Boxes className="size-5 opacity-90" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map(([label, icon]) => (
          <span
            key={label}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[.06] px-2.5 py-1 text-[11px] text-zinc-200"
          >
            {icon ? <span className="opacity-90">{icon}</span> : null}
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* =======================
 * Minimal brand icons (SVG)
 * ======================= */
function IconNext() {
  return (
    <svg viewBox="0 0 128 128" className="size-4" aria-hidden>
      <path fill="currentColor" d="M64 12c28.7 0 52 23.3 52 52s-23.3 52-52 52S12 92.7 12 64 35.3 12 64 12Zm22.3 78.7L57.2 49v30h-6V38h6l29 44.3Z"/>
    </svg>
  );
}
function IconLaravel() {
  return (
    <svg viewBox="0 0 256 256" className="size-4" aria-hidden>
      <path fill="currentColor" d="M214 52 164 24l-50 28v56l50 28 50-28V52Zm-106 6-50 28v56l50 28 50-28V86l-50-28Z"/>
    </svg>
  );
}
function IconNode() {
  return (
    <svg viewBox="0 0 256 256" className="size-4" aria-hidden>
      <path fill="currentColor" d="M128 16 20 78v100l108 62 108-62V78L128 16Zm40 144-40 23-40-23V96l40-23 40 23v64Z"/>
    </svg>
  );
}
function IconReact() {
  return (
    <svg viewBox="0 0 256 256" className="size-4" aria-hidden>
      <circle cx="128" cy="128" r="14" fill="currentColor"/>
      <ellipse cx="128" cy="128" rx="100" ry="40" fill="none" stroke="currentColor" strokeWidth="10"/>
      <ellipse cx="128" cy="128" rx="40" ry="100" fill="none" stroke="currentColor" strokeWidth="10" transform="rotate(60 128 128)"/>
      <ellipse cx="128" cy="128" rx="40" ry="100" fill="none" stroke="currentColor" strokeWidth="10" transform="rotate(120 128 128)"/>
    </svg>
  );
}
function IconTailwind() {
  return (
    <svg viewBox="0 0 256 256" className="size-4" aria-hidden>
      <path fill="currentColor" d="M128 72c-24 0-40 12-48 36 10-12 22-16 36-12 8 2 14 8 20 16 10 16 24 24 44 24 24 0 40-12 48-36-10 12-22 16-36 12-8-2-14-8-20-16-10-16-24-24-44-24Zm-80 56c-24 0-40 12-48 36 10-12 22-16 36-12 8 2 14 8 20 16 10 16 24 24 44 24 24 0 40-12 48-36-10 12-22 16-36 12-8 2-14 8-20 16-10 16-24 24-44 24Z"/>
    </svg>
  );
}
function IconRedis() {
  return (
    <svg viewBox="0 0 256 256" className="size-4" aria-hidden>
      <path fill="currentColor" d="M128 28 16 72v112l112 44 112-44V72L128 28Zm-32 68 32 12 32-12-32-12-32 12Zm-16 40 48 18 48-18-48-18-48 18Z"/>
    </svg>
  );
}
function IconDocker() {
  return <DockerIcon className="size-4" />;
}
function IconN8N() {
  return (
    <svg viewBox="0 0 64 64" className="size-4" aria-hidden>
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
