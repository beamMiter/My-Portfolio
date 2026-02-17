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
    image: "/images/projects/ppk-screening.png",
    tech: ["Next.js", "Laravel", "MySQL"],
    path: "/projects/ppk-screening",
    logo: "/images/aucc_logo.png",
  },
  {
    title: "PPK Kiosk Queue",
    image: "/images/projects/ppk-kiosk4.png",
    tech: ["Next.js", "Laravel", "Prisma", "MySQL"],
    path: "/projects/ppk-kiosk",
    logo: "/images/aucc_logo.png",
  },
  {
    title: "Home Service",
    image: "/images/projects/home-service.png",
    tech: ["Flutter", "GoLang", "PostgreSQL"],
    href: "#",
  },
  {
    title: "PPK Asset Repair Management",
    image: "/images/projects/ppk-repair.png",
    tech: ["Laravel", "MySQL"],
    path: "/projects/ppk-asset-repair",
  },
  {
    title: "PPK PR Integrated Policy",
    image: "/images/projects/ppk-pr.png",
    tech: ["Next.js", "Laravel", "MySQL", "n8n"],
    href: "#",
  },
  {
    title: "WelaCode",
    image: "/images/projects/welacode1.png",
    tech: ["Next.js"],
    href: "/projects/welacode",
  },
];

function TechChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[13px] font-medium text-zinc-500 transition-colors group-hover:text-emerald-400">
      {children}
    </span>
  );
}

export default function ProjectsSection() {
  const router = useRouter();

  const handleNavigation = (p: Project) => {
    if (p.path) {
      router.push(p.path);
    } else if (p.href && p.href !== "#") {
      router.push(p.href);
    }
  };

  return (
    <section id="portfolio" className="py-16 relative z-10 text-white bg-[#0b0b0b]">
      <div className="mx-auto max-w-[1500px] px-8">
        <p className="text-center text-xs tracking-[0.3em] uppercase text-white/45">MY PORTFOLIO</p>
        <h2 className="mt-3 text-center text-[clamp(26px,3.6vw,38px)] font-medium text-white">See My Works</h2>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const canOpen = !!p.path || (!!p.href && p.href !== "#");

            return (
              <article
                key={p.title}
                onClick={() => canOpen && handleNavigation(p)}
                className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm flex flex-col min-h-[440px] ${canOpen ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  {/* แก้บัคโลโก้ AUCC ตรงนี้ */}
                  {p.logo && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="relative w-24 h-12">
                        <Image
                          src={p.logo}
                          alt="Logo"
                          fill
                          className="object-contain object-right"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold group-hover:text-emerald-400 transition-colors">{p.title}</h3>
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-4">
                      {p.tech.map((t) => <TechChip key={t}>{t}</TechChip>)}
                    </div>
                    <div className="mt-5">
                      {canOpen ? (
                        <div className="inline-flex items-center gap-1.5 text-sm text-emerald-400 font-medium">
                          View <ExternalLink className="h-4 w-4" />
                        </div>
                      ) : (
                        <span className="text-sm text-zinc-600 font-medium">Internal / Coming soon</span>
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