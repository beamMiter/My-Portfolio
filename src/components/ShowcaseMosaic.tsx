"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Linkedin, Github, Music2 } from "lucide-react";
import type { ReactNode, CSSProperties } from "react";

type Props = {
  className?: string;        // ex. "max-w-[680px]"
  years?: number;            // 6
  photoSrc?: string;         // "/me.jpg"
  onHireHref?: string;       // "/contact"
  portfolioHref?: string;    // "/portfolio"
  linkedinHref?: string;
  githubHref?: string;
  tiktokHref?: string;
};

export default function ShowcaseMosaic({
  className = "max-w-[680px]",
  years = 6,
  photoSrc = "/me.jpg",
  onHireHref = "/contact",
  portfolioHref = "/portfolio",
  linkedinHref = "https://www.linkedin.com/",
  githubHref = "https://github.com/",
  tiktokHref = "https://www.tiktok.com/",
}: Props) {
  return (
    <div className={["relative w-full", className].join(" ")}>
      {/* กลิ่นไอรัศมีเบา ๆ */}
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[40px] opacity-25 blur-3xl [background:radial-gradient(60%_50%_at_10%_0%,#ffffff22,transparent_60%),radial-gradient(50%_45%_at_100%_30%,#00000033,transparent_60%)]" />

      {/* กริดหลัก 6 คอลัมน์ */}
      <div className="grid grid-cols-6 auto-rows-[96px] gap-3 rounded-[28px] p-2">
        {/* Hire me (2x3) */}
        <Tile className="col-span-2 row-span-3 rounded-[36px] bg-gradient-to-b from-zinc-900 to-zinc-950">
          <Link href={onHireHref} className="group grid h-full w-full place-items-center">
            <div className="relative grid aspect-square w-[78%] place-items-center rounded-full bg-white text-black shadow-[0_16px_40px_rgba(0,0,0,.5)]">
              <span className="text-lg font-extrabold tracking-wide">HIRE ME!</span>
            </div>
          </Link>
        </Tile>

        {/* Years (2x2) */}
        <Tile className="col-span-2 row-span-2 rounded-[34px] bg-[radial-gradient(circle_at_30%_20%,#171717,transparent_40%),linear-gradient(180deg,#0b0b0b,#101010)] ring-1 ring-white/10">
          <div className="grid h-full place-items-center text-center text-zinc-100">
            <div>
              <div className="text-5xl font-extrabold leading-none">{years}</div>
              <div className="mt-1 text-sm opacity-80">Years</div>
              <div className="-mt-0.5 text-sm opacity-80">of Experience</div>
            </div>
          </div>
        </Tile>

        {/* Photo (2x3) */}
        <Tile className="col-span-2 row-span-3 overflow-hidden rounded-[34px] ring-1 ring-white/10">
          <Image
            src={photoSrc}
            alt="Profile"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 680px"
            priority
          />
        </Tile>

        {/* Stripes (2x2) */}
        <Tile className="col-span-2 row-span-2 overflow-hidden rounded-[30px] ring-1 ring-white/10">
          <Stripes />
        </Tile>

        {/* Vertical tag (2x4) */}
        <Tile className="col-span-2 row-span-4 rounded-[40px] bg-gradient-to-b from-zinc-900 to-zinc-950 ring-1 ring-white/10">
          <div className="flex h-full items-center justify-center">
            <span className="rotate-180 [writing-mode:vertical-rl] text-[13px] font-semibold tracking-[.28em] text-zinc-200/90">
              I’M TECH INFLUENCER
            </span>
          </div>
        </Tile>

        {/* Portfolio bar (4x2) */}
        <Tile className="col-span-4 row-span-2 rounded-[36px] bg-[radial-gradient(circle_at_20%_20%,#0f0f0f,transparent_30%),linear-gradient(180deg,#0a0a0a,#101010)] ring-1 ring-white/10">
          <Link href={portfolioHref} className="group flex h-full items-center gap-5 pl-6">
            <div className="grid aspect-square w-[28%] place-items-center rounded-full bg-white text-black shadow-[0_14px_35px_rgba(0,0,0,.5)]">
              <ArrowUpRight className="h-7 w-7" />
            </div>
            <div className="text-zinc-100">
              <div className="text-xl font-extrabold tracking-wide">MY PORTFOLIO</div>
              <div className="text-[12px] opacity-70">Next.js • Laravel • MySQL • n8n automations</div>
            </div>
          </Link>
        </Tile>

        {/* Socials (3 × 2x2) */}
        <SocialTile href={linkedinHref} icon={<Linkedin className="h-6 w-6" />} />
        <SocialTile href={githubHref} icon={<Github className="h-6 w-6" />} />
        <SocialTile href={tiktokHref} icon={<Music2 className="h-6 w-6" />} />
      </div>
    </div>
  );
}

/* ---------- atoms ---------- */
function Tile({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={["bg-white/[0.03] p-1 ring-1 ring-black/40", className].join(" ")}>
      <div className="relative h-full w-full rounded-[24px]">{children}</div>
    </div>
  );
}

function SocialTile({ href, icon }: { href: string; icon: ReactNode }) {
  const isExt = href.startsWith("http");
  return (
    <Tile className="col-span-2 row-span-2 rounded-[32px] bg-[linear-gradient(180deg,#0b0b0b,#111)] ring-1 ring-white/10">
      <Link
        href={href}
        {...(isExt ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        className="group grid h-full w-full place-items-center"
        aria-label="social link"
      >
        <div className="grid size-[42%] place-items-center rounded-[16px] bg-black/30 ring-1 ring-white/10">
          <span className="text-zinc-100/90">{icon}</span>
        </div>
      </Link>
    </Tile>
  );
}

/* ลายเส้นขาวดำ */
function Stripes() {
  const style: CSSProperties = { backgroundSize: "32px 32px" };
  return (
    <div className="h-full w-full rounded-[24px] bg-[repeating-linear-gradient(45deg,#fff_0_8px,transparent_8px_16px)] mix-blend-screen opacity-[.9]" style={style} />
  );
}
