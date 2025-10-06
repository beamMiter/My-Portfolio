// src/components/sections/ServicesSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Service = {
  iconSrc: string;
  title: string;
  subtitle: string;
  desc: string;
  alt?: string;
};

const services: Service[] = [
  {
    iconSrc: "/images/ai.png",
    title: "AI-assisted Workflows",
    subtitle: "Process design, prompts, QA gates",
    desc: "Design human-in-the-loop flows and guardrails. Keep outputs reliable and traceable for real ops.",
    alt: "AI workflow",
  },
  {
    iconSrc: "/images/database.png",
    title: "Data & APIs",
    subtitle: "Laravel, REST, validation",
    desc: "Clean Laravel APIs, strong validation, audit trails, and predictable status transitions.",
    alt: "Database & APIs",
  },
  {
    iconSrc: "/images/devops.png",
    title: "Containers",
    subtitle: "Docker & environments",
    desc: "Dockerized local/staging/prod with separated .env, backups, and migration flows.",
    alt: "DevOps / Containers",
  },
  {
    iconSrc: "/images/integration.png",
    title: "CI/CD",
    subtitle: "Build, test, deploy",
    desc: "Automated pipelines for Next.js + Laravel. Versioned releases and rollbacks.",
    alt: "CI/CD",
  },
  {
    iconSrc: "/images/frontend.png",
    title: "Frontend Engineering",
    subtitle: "Next.js + React + TS",
    desc: "Accessible, fast, and maintainable UI with Tailwind and Framer Motion.",
    alt: "Frontend",
  },
  {
    iconSrc: "/images/security.png",
    title: "Security & Ops",
    subtitle: "Least-privilege & observability",
    desc: "Role-based access, structured logs, health checks, and uptime targets.",
    alt: "Security",
  },
];

const ICON_FILTER =
  "invert sepia saturate-[700%] hue-rotate-[95deg] brightness-[1.2] contrast-[0.95]";

export default function ServicesSection() {
  return (
    <section id="what-i-do" className="scroll-mt-28 py-16 bg-[#101214]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/60 px-3 py-1 text-xs tracking-[.25em] text-zinc-400">
            MY SERVICES
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-white">
            What{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Services
            </span>{" "}
            I Provide?
          </h2>
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all hover:-translate-y-1 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-black/20"
            >
              <div className="flex items-start gap-5">
                <Image
                  src={s.iconSrc}
                  alt={s.alt || s.title}
                  width={48}
                  height={48}
                  className={`object-contain ${ICON_FILTER}`}
                  priority={i < 2}
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-0.5 text-sm text-emerald-300/90">
                    {s.subtitle}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-300">{s.desc}</p>
              <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
