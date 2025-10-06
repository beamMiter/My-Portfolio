// app/components/RubikHero.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, Linkedin, Github, Music2 } from "lucide-react";

type RubikHeroProps = {
  imgSrc?: string;            // รูปโปรไฟล์
  years?: number;             // ปีประสบการณ์
  portfolioHref?: string;     // ลิงก์พอร์ต
  linkedinHref?: string;
  githubHref?: string;
  tiktokHref?: string;
};

export default function RubikHero({
  imgSrc = "/images/me-hero.png",
  years = 6,
  portfolioHref = "/portfolio",
  linkedinHref = "https://www.linkedin.com/",
  githubHref = "https://github.com/",
  tiktokHref = "https://www.tiktok.com/",
}: RubikHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useTransform(my, [0, 1], [8, -8]);    // tilt up/down
  const rotY = useTransform(mx, [0, 1], [-10, 10]);  // tilt left/right

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <section className="bg-[#0b0c0d] text-zinc-50">
      <div className="mx-auto max-w-[880px] px-3 py-8 md:py-10">
        <motion.div
          ref={ref}
          onPointerMove={onPointerMove}
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          className="relative mx-auto w-full max-w-[720px] perspective-[1200px]"
        >
          {/* subtle aurora */}
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] opacity-20 blur-2xl [background:radial-gradient(60%_50%_at_15%_0%,#22d3ee33,transparent_60%),radial-gradient(50%_45%_at_100%_30%,#10b9812e,transparent_60%)]" />

          {/* 3x3 cube */}
          <div className="grid grid-cols-3 gap-1.5 rounded-[22px] bg-black/40 p-1.5 ring-1 ring-white/5">
            {/* R1C1: Profile */}
            <Sticker>
              <div className="relative size-full overflow-hidden rounded-[18px] ring-1 ring-white/[0.08]">
                <Image
                  src={imgSrc}
                  alt="Profile"
                  fill
                  sizes="200px"
                  className="object-cover"
                  priority
                />
              </div>
            </Sticker>

            {/* R1C2: Years */}
            <Sticker>
              <div className="grid size-full place-items-center rounded-[18px] bg-white/[0.03] ring-1 ring-white/[0.08]">
                <div className="text-center leading-none">
                  <div className="text-3xl font-extrabold">{years}</div>
                  <div className="mt-1 text-[11px] text-zinc-400">
                    <div>Years</div>
                    <div>of Experience</div>
                  </div>
                </div>
              </div>
            </Sticker>

            {/* R1C3: Stripes */}
            <Sticker>
              <div className="size-full overflow-hidden rounded-[18px] bg-white">
                <Stripes />
              </div>
            </Sticker>

            {/* R2C1: Hire */}
            <Sticker>
              <div className="grid size-full place-items-center rounded-[18px] bg-[linear-gradient(180deg,#0f0f11,#0b0c0d)] ring-1 ring-white/[0.08]">
                <div className="grid aspect-square w-[78%] place-items-center rounded-full bg-zinc-100 text-zinc-900 shadow-[0_8px_26px_rgba(0,0,0,.35)]">
                  <span className="text-[12px] font-black tracking-wide">HIRE&nbsp;ME!</span>
                </div>
              </div>
            </Sticker>

            {/* R2C2: Portfolio */}
            <Sticker>
              <Link
                href={portfolioHref}
                className="group grid size-full place-items-center rounded-[18px] bg-white/[0.03] ring-1 ring-white/[0.08] focus:outline-none"
              >
                <div className="grid aspect-square w-[58%] place-items-center rounded-full bg-zinc-100 text-zinc-900 ring-1 ring-black/10 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-6" />
                </div>
                <span className="sr-only">Open portfolio</span>
              </Link>
            </Sticker>

            {/* R2C3: Vertical text */}
            <Sticker>
              <div className="grid size-full place-items-center rounded-[18px] bg-[linear-gradient(180deg,#0f0f11,#0b0c0d)] ring-1 ring-white/[0.08]">
                <span className="rotate-180 [writing-mode:vertical-rl] text-[11px] font-black tracking-[.18em] text-zinc-200/90">
                  I&apos;M&nbsp;TECH&nbsp;INFLUENCER
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
      </div>
    </section>
  );
}

/* ========================= atoms & parts ========================= */

function Sticker({ children }: { children: React.ReactNode }) {
  return (
    <div className="aspect-square overflow-hidden rounded-[20px] bg-white/[0.02] p-1 ring-1 ring-black/40">
      <div className="size-full rounded-[18px]">{children}</div>
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
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      aria-label={label}
      className="group grid size-full place-items-center rounded-[18px] bg-white/[0.03] ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
    >
      <div className="grid size-[58%] place-items-center rounded-[14px] ring-1 ring-white/10 bg-black/30 group-hover:bg-black/20">
        <div className="opacity-90 group-hover:opacity-100">{children}</div>
      </div>
    </Link>
  );
}

function Stripes() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none" role="img" aria-label="abstract stripes">
      <defs>
        <pattern id="rubik-stripes" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(10)">
          <rect width="5" height="10" fill="black" />
          <animateTransform attributeName="patternTransform" type="translate" from="0 0" to="40 0" dur="6s" repeatCount="indefinite" />
        </pattern>
        <filter id="rubik-warp">
          <feTurbulence type="fractalNoise" baseFrequency="0.009 0.02" numOctaves="1" seed="2">
            <animate attributeName="baseFrequency" values="0.009 0.02;0.013 0.03;0.009 0.02" dur="8s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="12" />
        </filter>
      </defs>
      <rect width="110" height="110" x="-5" y="-5" fill="url(#rubik-stripes)" filter="url(#rubik-warp)" />
    </svg>
  );
}
