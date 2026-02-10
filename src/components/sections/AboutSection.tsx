"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

type TimelineItem = {
  period: string;
  title: string;
  org: string;
  location?: string;
  bullets: string[];
};

const timeline: TimelineItem[] = [
  {
    period: "Feb 2025 – Present",
    title: "AI Engineer",
    org: "KBTG (Mock)",
    location: "Bangkok, TH",
    bullets: [
      "Designed data + LLM pipelines for document analysis and quality checks.",
      "Shipped model-serving services with queues, retries, and monitoring.",
      "Built prompt tooling and evaluation loops to improve task accuracy.",
      "Maintained APIs with structured logs and clear error budgets.",
    ],
  },
  {
    period: "Feb 2024 – Jan 2025",
    title: "Innovation Engineer",
    org: "KBTG (Mock)",
    location: "Bangkok, TH",
    bullets: [
      "Prototyped AI features for fintech and insurtech use-cases.",
      "Containerized workloads with Docker and automated CI/CD pipelines.",
      "Optimized model serving for reliability and stability.",
      "Worked cross-functionally to ship POCs to production.",
    ],
  },
  {
    period: "2023",
    title: "Freelance Full-Stack",
    org: "Self-Employed",
    bullets: [
      "Delivered Next.js + Laravel systems with clean APIs and audit-friendly records.",
      "Implemented CI/CD, backups, and staged rollouts.",
    ],
  },
  {
    period: "2019 – 2023",
    title: "B.Eng. Computer Engineering",
    org: "Your University (Mock)",
    bullets: [
      "Focused on distributed systems, databases, and machine learning.",
    ],
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-28 py-16 bg-[#101214] border-b border-white/10"
      aria-label="About"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        {/* HEADER */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-xs tracking-[0.3em] uppercase text-white/45"
        >
          About
        </motion.p>

        <div className="mt-4 grid gap-10 md:grid-cols-[1.05fr_0.95fr] items-start">
          {/* LEFT : TIMELINE */}
          <div>
            <h3 className="mt-2 text-[clamp(22px,3vw,34px)] font-medium leading-snug tracking-[-0.01em] text-white">
              Education &amp; Experience
              <span className="ml-2 text-[#3edc8a]">Timeline</span>
            </h3>

            <p className="mt-2 text-sm text-white/60">
              Roles and systems I&apos;ve worked on, with a focus on reliability
              and real-world operations.
            </p>

            <div className="mt-7 relative">
              <div className="absolute left-[10px] top-0 bottom-0 w-px bg-white/10" />

              <ul className="space-y-10">
                {timeline.map((item, idx) => (
                  <li key={idx} className="relative pl-10">
                    <span className="absolute left-[6px] top-2 h-2.5 w-2.5 rounded-full bg-[#3edc8a] shadow-[0_0_0_3px_rgba(62,220,138,0.18)]" />

                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
                      <Calendar className="h-3.5 w-3.5 text-white/45" />
                      {item.period}
                    </div>

                    <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.045]">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h4 className="text-[15px] md:text-base font-normal text-white">
                          <span className="text-[#3edc8a]">{item.title}</span>
                        </h4>

                        <span className="text-white/45">• {item.org}</span>

                        {item.location && (
                          <span className="inline-flex items-center gap-1 text-xs text-white/45">
                            <MapPin className="h-3.5 w-3.5" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-white/65">
                        {item.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT : INTRO */}
          <div className="pt-1">
            <h2 className="text-[clamp(26px,3.8vw,44px)] font-light leading-tight tracking-[-0.02em] text-white">
              I build{" "}
              <span className="text-[#3edc8a]">real-world systems</span> for
              hospitals and public-sector workflows.
            </h2>

            <p className="mt-5 max-w-2xl text-white/65 leading-7">
              Next.js + Laravel + MySQL • Docker / CI • automation workflows •
              observability. I focus on clean, readable code and predictable
              operations that teams can trust in production.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/70">
              <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                6+ shipped projects
              </li>
              <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                99.9% uptime target
              </li>
              <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                CI/CD + Dockerized
              </li>
              <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                AI + automation
              </li>
            </ul>

            <p className="mt-6 text-xs text-white/45">
              * Entries marked “Mock” are placeholders for portfolio presentation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
