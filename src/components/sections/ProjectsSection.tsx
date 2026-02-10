"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

type Project = {
  title: string;
  image: string;
  tech: string[];
  path?: string;
  href?: string;
};

const projects: Project[] = [
  {
    title: "PPK Screening Recommendation",
    image: "/images/projects/ppk-screening.png",
    tech: ["Next.js", "Laravel", "MySQL"],
    path: "/projects/ppk-screening",
  },
  {
    title: "PPK Kiosk Queue",
    image: "/images/projects/ppk-kiosk4.png",
    tech: ["Next.js", "Laravel", "Prisma"],
    path: "/projects/ppk-kiosk",
  },
  {
    title: "Home Service",
    image: "/images/projects/realtime-chat.jpg",
    tech: ["Flutter", "Golang", "PostgreSQL"],
    href: "#",
  },
  {
    title: "PPK Asset Repair",
    image: "/images/projects/ppk-repair.png",
    tech: ["Laravel", "MySQL"],
    path: "/projects/ppk-asset-repair",
  },
  {
    title: "Special Disease Surveillance Dashboard",
    image: "/images/projects/surveillance.jpg",
    tech: ["Next.js", "Node.js", "MySQL"],
    href: "#",
  },
  {
    title: "PPK PR",
    image: "/images/projects/pr-automation.jpg",
    tech: ["Next.js", "Laravel", "MySQL", "n8n"],
    href: "#",
  },
];

function TechChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-300">
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
      window.open(p.href, "_blank", "noopener,noreferrer");
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
      className="scroll-mt-28 bg-[#101214] py-16"
      aria-label="Projects"
    >
      <div className="mx-auto max-w-[1300px] px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs tracking-[.3em] text-zinc-400"
        >
          MY PORTFOLIO
        </motion.p>

        <h2 className="mt-2 text-center text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
          See My Works
        </h2>

        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const headingId = `project-${i}`;
            const canOpen = !!p.path || hasValidHref(p.href);

            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]",
                  "transition-colors hover:bg-white/[0.05]",
                  canOpen ? "cursor-pointer" : "cursor-default",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60",
                ].join(" ")}
                aria-labelledby={headingId}
                role={canOpen ? "button" : undefined}
                tabIndex={canOpen ? 0 : -1}
                onClick={() => canOpen && openProject(p)}
                onKeyDown={(e) => onCardKeyDown(e, p, canOpen)}
              >
                <div className="relative">
                  <div className="relative h-60 w-full md:h-64 lg:h-64">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      priority={i < 2}
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h3
                    id={headingId}
                    className="text-lg font-semibold text-white"
                  >
                    {p.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t, idx) => (
                      <TechChip key={`${t}-${idx}`}>{t}</TechChip>
                    ))}
                  </div>

                  <div className="mt-4">
                    {p.path ? (
                      <Link
                        href={p.path}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-sm text-emerald-400 transition-colors hover:text-emerald-300"
                        aria-label={`View project: ${p.title}`}
                      >
                        View <ExternalLink className="h-4 w-4" />
                      </Link>
                    ) : hasValidHref(p.href) ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-sm text-emerald-400 transition-colors hover:text-emerald-300"
                        aria-label={`Open project: ${p.title}`}
                      >
                        View <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="text-sm text-zinc-500">Coming soon</span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
