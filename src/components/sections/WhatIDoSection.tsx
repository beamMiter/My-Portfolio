"use client";

import { motion } from "framer-motion";
import { Server, Boxes, Cpu } from "lucide-react";

const items = [
  {
    icon: Server,
    title: "Backend/API",
    desc: "Laravel 12, Sanctum/JWT, MySQL, caching, queue, validation, audit log.",
  },
  {
    icon: Boxes,
    title: "DevOps & CI/CD",
    desc: "Docker Compose, staging/prod, auto deploy, backups, observability.",
  },
  {
    icon: Cpu,
    title: "AI Workflows",
    desc: "n8n orchestration, fallback, cost-guard, QA gate, S3/MinIO delivery.",
  },
];

export default function WhatIDoSection() {
  return (
    <section
      id="what-i-do"
      className="scroll-mt-28 py-16 border-b border-white/10 bg-[#0b0c0d]"
      aria-label="What I Do"
    >
      <p className="text-xs tracking-[.3em] text-zinc-400">WHAT I DO</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur"
          >
            <Icon className="mb-3 h-6 w-6 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-zinc-300">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
