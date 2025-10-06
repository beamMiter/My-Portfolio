// src/components/sections/WorkSection.tsx
"use client";

import { motion } from "framer-motion";
import ShowcaseMosaic from "@/components/ShowcaseMosaic";

export default function WorkSection() {
  return (
    <section
      id="portfolio"
      className="scroll-mt-28 py-16"
      aria-label="Portfolio"
    >
      <p className="text-xs tracking-[.3em] text-zinc-400">PORTFOLIO</p>
      <h2 className="mt-3 text-3xl md:text-4xl font-black">Selected Work</h2>
      <p className="mt-2 max-w-2xl text-zinc-300">
        งานจริงที่ทำทั้งระบบ: คิวคีออสก์, ฟอร์มคัดกรอง, PR portal, AI-Gen pipeline,
        และแดชบอร์ดสำหรับโรงพยาบาล/ภาครัฐ
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <ShowcaseMosaic />
      </motion.div>
    </section>
  );
}
