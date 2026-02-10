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

// Icon tint → Dev Green
const ICON_FILTER =
  "invert sepia saturate-[650%] hue-rotate-[110deg] brightness-[1.1] contrast-[0.95]";

export default function ServicesSection() {
  return (
    <section id="what-i-do" className="scroll-mt-28 py-16 bg-[#101214]">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* HEADER */}
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-white/45">
            My Services
          </p>

          <h2 className="mt-3 text-[clamp(26px,3.6vw,38px)] font-medium leading-snug tracking-[-0.015em] text-white">
            What{" "}
            <span className="text-[#3edc8a]">
              Services
            </span>{" "}
            I Provide ?
          </h2>
        </div>

        {/* GRID */}
        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.025] p-7
                         transition-all hover:-translate-y-1
                         hover:bg-white/[0.04]"
            >
              <div className="flex items-start gap-5">
                <Image
                  src={s.iconSrc}
                  alt={s.alt || s.title}
                  width={44}
                  height={44}
                  className={`object-contain ${ICON_FILTER}`}
                  priority={i < 2}
                />

                <div className="flex-1">
                  <h3 className="text-[15px] font-normal text-white">
                    {s.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#3edc8a]/85">
                    {s.subtitle}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/65">
                {s.desc}
              </p>

              <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
