// src/components/sections/AboutSection.tsx
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
      "Designed data/LLM pipelines to automate document analysis and QA.",
      "Shipped microservices for CV/YOLO-style models with queuing & retries.",
      "Built prompt tooling and evaluation loops to improve task-specific LLMs.",
      "Maintained APIs & services with observability and error budgets.",
    ],
  },
  {
    period: "Feb 2024 – Jan 2025",
    title: "Innovation Engineer",
    org: "KBTG (Mock)",
    location: "Bangkok, TH",
    bullets: [
      "Prototyped AI features for banking/insurtech use-cases.",
      "Containerized workloads with Docker and GitLab CI/CD.",
      "Optimized model-serving (Python/TensorFlow/TorchServe) for reliability.",
      "Collaborated with cross-functional teams to deliver POCs to production.",
    ],
  },
  {
    period: "2023",
    title: "Freelance Full-Stack",
    org: "Self-Employed",
    bullets: [
      "Delivered Next.js + Laravel systems with clean APIs and audits.",
      "Implemented CI/CD, backups, and staged rollouts for clients.",
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
      className="scroll-mt-28 py-16 bg-black border-b border-white/10"
      aria-label="About"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[.3em] text-zinc-500"
        >
          ABOUT
        </motion.p>

        <div className="mt-4 grid gap-10 md:grid-cols-[1.05fr_0.95fr] items-start">
          {/* LEFT: Timeline */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/60 px-3 py-1 text-xs tracking-[.28em] text-zinc-400">
              MY RESUME
            </div>

            <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-[#10B981]">
              Education &amp; Experience
            </h3>

            <div className="mt-6 relative">
              <div className="absolute left-[10px] top-0 bottom-0 w-px bg-white/10" />

              <ul className="space-y-10">
                {timeline.map((item, idx) => (
                  <li key={idx} className="relative pl-10">
                    <span className="absolute left-[6px] top-2 h-2.5 w-2.5 rounded-full bg-[#10B981] shadow-[0_0_0_3px_rgba(16,185,129,0.2)]" />

                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      {item.period}
                    </div>

                    <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h4 className="text-lg font-semibold text-[#10B981]">
                          {item.title}
                        </h4>
                        <span className="text-zinc-400">[ {item.org} ]</span>
                        {item.location && (
                          <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                            <MapPin className="h-3.5 w-3.5" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-zinc-300">
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

          {/* RIGHT: Intro */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-[#10B981]">
              I build{" "}
              <span className="text-[#34D399]">real-world systems</span>{" "}
              for hospitals &amp; government-style ops.
            </h2>

            <p className="mt-5 max-w-2xl text-zinc-300">
              Next.js + Laravel + MySQL • Docker/CI • n8n orchestration •
              Observability • Cost-aware AI workflows. I focus on clean,
              readable code and standards that ship to production with
              confidence.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-zinc-300">
              <li className="rounded-xl border border-white/10 p-4">
                6+ real projects
              </li>
              <li className="rounded-xl border border-white/10 p-4">
                99.9% uptime goal
              </li>
              <li className="rounded-xl border border-white/10 p-4">
                CI/CD &amp; Dockerized
              </li>
              <li className="rounded-xl border border-white/10 p-4">
                AI pipeline + n8n
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
