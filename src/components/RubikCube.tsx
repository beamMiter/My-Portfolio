// src/components/RubikCubeSolo.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { ArrowRight, Linkedin, Github, Music2, Mail } from "lucide-react";

type Props = {
  className?: string;         // คุมขนาดจากภายนอกได้ เช่น "max-w-[520px]"
  tilt?: boolean;             // เปิด/ปิดเอียง 3D
  years?: number;             // ใช้โชว์ใน label
  portfolioHref?: string;
  linkedinHref?: string;
  githubHref?: string;
  tiktokHref?: string;
  emailHref?: string;
};

export default function RubikCubeSolo({
  className = "",
  tilt = true,
  years = 6,
  portfolioHref = "/portfolio",
  linkedinHref = "https://www.linkedin.com/",
  githubHref = "https://github.com/",
  tiktokHref = "https://www.tiktok.com/",
  emailHref = "mailto:hello@example.com",
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
      className={[
        "relative w-full perspective-[1200px] max-w-[480px]", // <<< ขยายขนาดตั้งต้น
        className,
      ].join(" ")}
    >
      {/* aurora เบา ๆ */}
      <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[26px] opacity-20 blur-2xl [background:radial-gradient(60%_50%_at_15%_0%,#22d3ee33,transparent_60%),radial-gradient(50%_45%_at_100%_30%,#10b9812e,transparent_60%)]" />

      {/* กริด 3×3 */}
      <div className="grid grid-cols-3 gap-2 rounded-[22px] bg-black/40 p-2 ring-1 ring-white/5">
        {/* R1C1: Monogram ring */}
        <Sticker>
          <div className="grid size-full place-items-center rounded-[16px] ring-1 ring-white/10 bg-[radial-gradient(60%_60%_at_50%_40%,#22d3ee22_0%,transparent_60%)]">
            <div className="relative grid aspect-square w-[62%] place-items-center rounded-full bg-black">
              <div className="absolute -inset-[1px] rounded-full bg-[conic-gradient(from_0deg,#22d3ee,transparent_35%,#10b981_65%,transparent)] opacity-70 blur-[8px]" />
              <span className="relative text-[22px] font-extrabold tracking-wide">
                T<span className="opacity-80">J</span>
              </span>
            </div>
          </div>
        </Sticker>

        {/* R1C2: Service chips */}
        <Sticker>
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-[16px] bg-white/[0.03] ring-1 ring-white/10">
            <Chip>Web</Chip>
            <Chip>API</Chip>
            <Chip>Automate</Chip>
          </div>
        </Sticker>

        {/* R1C3: Gradient Flow (มินิมอล) */}
        <Sticker>
          <GradientFlowBox />
        </Sticker>

        {/* R2C1: Contact */}
        <Sticker>
          <Link
            href={emailHref}
            className="group grid size-full place-items-center rounded-[16px] bg-[linear-gradient(180deg,#0f0f11,#0b0c0d)] ring-1 ring-white/10"
          >
            <div className="grid aspect-square w-[56%] place-items-center rounded-full bg-zinc-100 text-zinc-900 shadow-[0_8px_20px_rgba(0,0,0,.35)]">
              <Mail className="size-5" />
            </div>
            <span className="sr-only">Contact</span>
          </Link>
        </Sticker>

        {/* R2C2: Portfolio — arrow ใหม่ */}
        <Sticker>
          <Link
            href={portfolioHref}
            className="group grid size-full place-items-center rounded-[16px] bg-white/[0.03] ring-1 ring-white/10"
          >
            <div className="grid aspect-square w-[50%] place-items-center rounded-[12px] bg-zinc-100 text-zinc-900 ring-1 ring-black/10 transition group-hover:translate-x-0.5">
              <ArrowRight className="size-5" />
            </div>
            <span className="sr-only">Open portfolio</span>
          </Link>
        </Sticker>

        {/* R2C3: Vertical label */}
        <Sticker>
          <div className="grid size-full place-items-center rounded-[16px] bg-[linear-gradient(180deg,#0f0f11,#0b0c0d)] ring-1 ring-white/10">
            <span className="rotate-180 [writing-mode:vertical-rl] text-[11px] font-black tracking-[.22em] text-zinc-200/90">
              THAILAND • {years}Y
            </span>
          </div>
        </Sticker>

        {/* R3: Socials */}
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
    </motion.div>
  );
}

/* atoms */
function Sticker({ children }: { children: React.ReactNode }) {
  return (
    <div className="aspect-square overflow-hidden rounded-[18px] bg-white/[0.02] p-1 ring-1 ring-black/40">
      <div className="size-full rounded-[16px]">{children}</div>
    </div>
  );
}

function Social({
  href,
  label,
  children,
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
      className="group grid size-full place-items-center rounded-[16px] bg-white/[0.03] ring-1 ring-white/10 transition hover:bg-white/[0.05]"
    >
      <div className="grid size-[44%] place-items-center rounded-[12px] ring-1 ring-white/10 bg-black/30 group-hover:bg-black/20">
        <div className="opacity-90 group-hover:opacity-100">{children}</div>
      </div>
    </Link>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[.05] px-2.5 py-1 text-[11px] text-zinc-300">
      {children}
    </span>
  );
}

/* ===== Minimal Motion: Gradient Flow ===== */
function GradientFlowBox() {
  return (
    <div className="h-full w-full rounded-[16px] bg-gradient-to-tr from-[#10b981]/45 via-[#22d3ee]/45 to-transparent animate-gradient-move" />
  );
}

/* tailwind-global CSS ที่ต้องมี (ใส่ครั้งเดียวที่ไหนก็ได้ เช่นใน globals.css หรือ style jsx global)
@keyframes gradient-move {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient-move {
  background-size: 200% 200%;
  animation: gradient-move 8s linear infinite;
}
*/
