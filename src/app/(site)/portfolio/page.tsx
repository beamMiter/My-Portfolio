// src/components/sections/AboutSection.tsx
"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-28 py-16 border-b border-white/10"
      aria-label="About"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs tracking-[.3em] text-zinc-400"
      >
        ABOUT
      </motion.p>

      <div className="mt-4 grid gap-8 md:grid-cols-[1.2fr_.8fr] items-start">
        <div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            I build <span className="text-emerald-400">real-world systems</span> 
            for hospitals & government-style ops.
          </h2>
          <p className="mt-5 max-w-2xl text-zinc-300">
            Next.js + Laravel + MySQL • Docker/CI • n8n orchestration •
            Observability • Cost-aware AI workflows. โฟกัสงานสะอาด อ่านง่าย
            มาตรฐาน ออกโปรดักชันจริงได้
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 text-sm text-zinc-300">
          <li className="rounded-xl border border-white/10 p-4">6+ โครงการภาครัฐ/รพ.</li>
          <li className="rounded-xl border border-white/10 p-4">99.9% Uptime (ops)</li>
          <li className="rounded-xl border border-white/10 p-4">CI/CD & Dockerized</li>
          <li className="rounded-xl border border-white/10 p-4">AI pipeline + n8n</li>
        </ul>
      </div>
    </section>
  );
}
