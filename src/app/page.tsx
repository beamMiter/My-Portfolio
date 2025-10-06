// app/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import RubikCubeMini from "@/components/RubikCubeMini";
import { motion, AnimatePresence } from "framer-motion";

/** ===== Config ===== */
const TITLES = [
  "TECHIN JETSRIBUMRUNG",
  "Full-stack Developer",
  "DevOps Engineer",
  "AI Workflow Architect",
];
const SWITCH_MS = 4000; // ความถี่ในการสลับข้อความ (ช้าลง)

/** =========================
 *  VerticalTicker — แบบเดิม (slide) แต่กันโดนกิน + baseline ตรง
 * ========================= */
function VerticalTicker({ items = TITLES, interval = SWITCH_MS }: { items?: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval]);

  // ใช้ em เพื่อให้สัดส่วนสัมพันธ์กับฟอนต์
  const line = "1.3em"; // ความสูงบรรทัดคงที่
  const padTop = "0.05em"; // กันโดนเฉือนหัวนิดหน่อย

  return (
    <span
      className="relative inline-block overflow-hidden align-baseline"
      style={{
        height: line,
        lineHeight: line,
        verticalAlign: "baseline",
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={items[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // นุ่มขึ้นเล็กน้อย
          className="accent-text font-semibold inline-block will-change-transform"
          style={{ lineHeight: line, paddingTop: padTop }}
        >
          {items[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** =========================
 *   PAGE
 * ========================= */
export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 20);
    return () => clearTimeout(t);
  }, []);

  const highlights = useMemo(
    () => ["Hospitals", "PR portals", "AI workflows"],
    []
  );

  return (
    <main className="bg-black text-white min-h-screen">
      {/* global styles & accent gradient */}
      <style jsx global>{`
        .headline { line-height: 1.06; letter-spacing: -0.02em; }
        .accent-text {
          background: linear-gradient(90deg, #10b981, #22d3ee);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move { background-size: 200% 200%; animation: gradient-move 8s linear infinite; }
      `}</style>
      <header className={`relative ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-16 min-h-[72svh] flex items-center">
          <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[440px_minmax(0,1fr)]">
            {/* LEFT */}
            <aside className="self-start">
              <RubikCubeMini
                className="max-w-[460px] mx-auto lg:mx-0"
                years={6}
                portfolioHref="/portfolio"
                linkedinHref="https://www.linkedin.com/in/yourname"
                githubHref="https://github.com/yourname"
                tiktokHref="https://www.tiktok.com/@yourname"
                emailHref="mailto:hello@example.com"
                tilt
              />
            </aside>

            {/* RIGHT */}
            <div className="flex flex-col justify-center lg:pl-2">
              {/* ให้ baseline ตรงกับ ticker: ใช้ leading เท่ากัน */}
              <p className="mb-3 text-[18px] md:text-2xl text-zinc-300 leading-[1.3] flex items-baseline gap-1">
                <span className="relative -top-[1px]">Hello, I&apos;m</span>
                <VerticalTicker />
              </p>

              <h1 className="headline text-[clamp(32px,6.2vw,58px)] font-semibold max-w-[22ch]">
                I build <span className="accent-text font-semibold">real-world systems</span> for {highlights.join(", ")} in Thailand.
              </h1>

              <p className="mt-5 text-[15px] leading-relaxed text-zinc-300 max-w-[68ch]">
                Next.js + Laravel + MySQL • Docker/CI • n8n orchestration • Secure automation for government-style ops.
              </p>

              <div className="mt-8 border-t border-white/10" />
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
