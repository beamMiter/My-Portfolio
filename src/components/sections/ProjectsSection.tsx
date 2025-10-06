"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

type Project = {
  title: string;
  image: string;
  tech: string[];
  path?: string;
  href?: string;
  repo?: string;
};

const projects: Project[] = [
  {
    title: "PPK Screening & Referral System",
    image: "/images/projects/ppk-referral.jpg",
    tech: ["Next.js", "Laravel", "MySQL", "Docker", "CI/CD"],
    path: "/projects/ppk-screening",
    repo: "https://github.com/iMookatayou/PPK-Screening-Recommentdation",
  },
  {
    title: "PPK Kiosk Queue System",
    image: "/images/projects/ppk-kiosk.jpg",
    tech: ["Next.js", "React", "TypeScript", "Laravel", "MySQL", "Docker"],
    path: "/projects/ppk-kiosk",
    repo: "https://github.com/iMookatayou/PPK-Kiosk-Queue-System",
  },
  {
    title: "Realtime Chat with LINE & Facebook",
    image: "/images/projects/realtime-chat.jpg",
    tech: ["Node.js", "WebSocket", "MySQL"],
    href: "#",
  },
  {
    title: "CSGAME Website",
    image: "/images/projects/csgame.jpg",
    tech: ["PHP", "Node.js", "MySQL"],
    href: "#",
  },
  {
    title: "Special Disease Surveillance Dashboard",
    image: "/images/projects/surveillance.jpg",
    tech: ["Next.js", "n8n", "Tailwind", "CI/CD"],
    href: "#",
  },
  {
    title: "PR & Content Automation (AI+n8n)",
    image: "/images/projects/pr-automation.jpg",
    tech: ["n8n", "AI Workflow", "Laravel"],
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

export default function ProjectsSection() {
  return (
    <section
        id="portfolio"
        className="scroll-mt-28 py-16 bg-[#101214]"
        aria-label="Projects"
      >
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[.3em] text-zinc-400 text-center"
        >
          MY PORTFOLIO
        </motion.p>

        <h2 className="mt-2 text-center text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-white">
          See My Works
        </h2>

        <div className="mt-10 grid gap-6 md:gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const headingId = `project-${i}`;

            const content = (
              <>
                {/* รูป */}
                <div className="relative overflow-hidden rounded-2xl rounded-b-none">
                  <div className="relative h-56 w-full md:h-64">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      priority={i < 2}
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* เนื้อหา */}
                <div className="p-5">
                  <h3 id={headingId} className="text-white text-lg font-semibold">
                    {p.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <TechChip key={t}>{t}</TechChip>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    {p.path && (
                      <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400 group-hover:text-emerald-300">
                        View details
                      </span>
                    )}
                    {!p.path && p.href && (
                      <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400 group-hover:text-emerald-300">
                        View <ExternalLink className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </div>
              </>
            );

            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:bg-white/[0.05] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20"
              >
                {p.path ? (
                  <Link
                    href={p.path}
                    aria-labelledby={headingId}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 rounded-2xl"
                  >
                    {content}
                  </Link>
                ) : p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-labelledby={headingId}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 rounded-2xl"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="block">{content}</div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
