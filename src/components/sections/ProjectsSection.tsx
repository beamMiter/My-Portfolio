"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";

type Project = {
  title: string;
  image: string;
  tech: string[];
  path?: string;
  href?: string;
  logo?: string;
};

const projects: Project[] = [
  {
    title: "PPK Screening Recommendation",
    image: "/images/projects/ppk-screening.avif",
    tech: ["Next.js", "Laravel", "MySQL"],
    path: "/projects/ppk-screening",
    logo: "/images/aucc_logo.png",
  },
  {
    title: "PPK Kiosk Queue",
    image: "/images/projects/ppk-kiosk.avif",
    tech: ["Next.js", "Laravel", "Prisma", "MySQL"],
    path: "/projects/ppk-kiosk",
    logo: "/images/aucc_logo.png",
  },
  {
    title: "Home Service",
    image: "/images/projects/home-service.avif",
    tech: ["Flutter", "GoLang", "PostgreSQL"],
    href: "#",
  },
  {
    title: "PPK Asset Repair Management",
    image: "/images/projects/ppk-repair.avif",
    tech: ["Laravel", "MySQL"],
    path: "/projects/ppk-asset-repair",
  },
  {
    title:
      "PPK PR Integrated Policy, Performance and Knowledge Governance for Public Relations",
    image: "/images/projects/ppk-pr.avif",
    tech: ["Next.js", "Laravel", "MySQL", "n8n"],
    href: "#",
  },
  {
    title: "WelaCode",
    image: "/images/projects/welacode.avif",
    tech: ["Next.js"],
    href: "/projects/welacode",
  },
];

// Base64 Placeholder แบบโปร่งแสงสำหรับสร้าง Effect ตอนโหลดรูป
const BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

function TechChip({ children, canHover = true }: { children: React.ReactNode; canHover?: boolean }) {
  if (!canHover) {
    return (
      <span className="text-[13px] font-medium text-zinc-500">
        {children}
      </span>
    );
  }
  
  return (
    <span className="relative text-[13px] font-medium text-zinc-500 transition-all duration-300 group-hover:text-emerald-400 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 group-hover:after:w-full">
      {children}
    </span>
  );
}

function hasValidHref(href?: string) {
  if (!href) return false;
  const v = href.trim();
  if (!v || v === "#") return false;
  return true;
}

export default function ProjectsSection() {
  const router = useRouter();

  const openProject = (p: Project) => {
    if (p.path) {
      router.push(p.path);
      return;
    }

    if (hasValidHref(p.href)) {
      window.location.href = p.href!;
    }
  };

  const onCardKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    p: Project,
    canOpen: boolean
  ) => {
    if (!canOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProject(p);
    }
  };

  return (
    <section
      id="portfolio"
      className="scroll-mt-28 py-16 relative z-10 text-white"
      aria-label="Projects"
    >
      <div className="mx-auto max-w-[1500px] px-8">
        <p className="text-center text-xs tracking-[0.3em] uppercase text-white/45">
          MY PORTFOLIO
        </p>

        <h2 className="mt-3 text-center text-[clamp(26px,3.6vw,38px)] font-medium leading-snug tracking-[-0.015em] text-white">
          See My Works
        </h2>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const headingId = `project-${i}`;
            const canOpen = !!p.path || hasValidHref(p.href);

            return (
              <article
                key={p.title}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm",
                  "min-h-[440px] flex flex-col",
                  canOpen
                    ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                    : "cursor-default",
                ].join(" ")}
                aria-labelledby={headingId}
                role={canOpen ? "button" : undefined}
                tabIndex={canOpen ? 0 : -1}
                onClick={() => canOpen && openProject(p)}
                onKeyDown={(e) => onCardKeyDown(e, p, canOpen)}
              >
                <div className="relative h-72 w-full overflow-hidden bg-zinc-800">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    priority={i < 2}
                    // เพิ่มเทคนิคการโหลดภาพ
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                  
                  {p.logo && (
                    <div className="absolute top-4 right-4 z-20 drop-shadow-md">
                      <div className="relative w-[90px] h-[45px]">
                        <Image
                          src={p.logo}
                          alt="Project Logo"
                          fill
                          className="object-contain object-right-top opacity-100"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 id={headingId} className="text-xl font-semibold text-white transition-colors">
                    {p.title}
                  </h3>

                  <div className="mt-auto pt-5">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      {p.tech.map((t, idx) => (
                        <TechChip key={`${t}-${idx}`} canHover={canOpen}>{t}</TechChip>
                      ))}
                    </div>

                    <div className="mt-6">
                      {canOpen ? (
                        <div
                          className="inline-flex items-center gap-1.5 text-sm text-emerald-400 transition-colors hover:text-emerald-300 font-medium"
                        >
                          View <ExternalLink className="h-4 w-4" />
                        </div>
                      ) : (
                        <span className="text-sm text-zinc-600 font-medium italic">Internal / Coming soon</span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}