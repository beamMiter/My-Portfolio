"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useIntroUI } from "./IntroUIContext";

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.85,
    filter: "blur(6px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.2 + i * 0.08,
      duration: 0.45,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

export default function IntroLangSwitch() {
  const { showLang } = useIntroUI();

  if (!showLang) return null;

  return (
    <motion.div
      className="fixed top-8 right-10 z-[80]"
      initial={{ opacity: 0, y: -8, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* ทั้งก้อนเป็นปุ่มคลีน ๆ */}
      <motion.button
        type="button"
        className="group flex flex-col items-center bg-transparent border-none outline-none cursor-pointer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        // TODO: ใส่ logic เปลี่ยนภาษาได้ทีหลัง เช่น onClick={() => setLang('en')}
      >
        {/* TEXT GROUP */}
        <motion.div
          className="flex items-center gap-3 font-heading-dev text-[13px] font-semibold tracking-[0.2em] uppercase text-zinc-200"
          initial="hidden"
          animate="visible"
        >
          <motion.span
            custom={0}
            variants={itemVariants}
            className="transition-colors group-hover:text-white"
          >
            EN
          </motion.span>

          <motion.span
            custom={1}
            variants={itemVariants}
            className="text-zinc-400 transition-colors group-hover:text-zinc-300"
          >
            /
          </motion.span>

          <motion.span
            custom={2}
            variants={itemVariants}
            className="transition-colors group-hover:text-white"
          >
            TH
          </motion.span>
        </motion.div>

        {/* UNDERLINE (ขยายตอน hover) */}
        <div className="mt-1 h-[1px] w-14 bg-zinc-500 rounded-full transition-all duration-300 group-hover:w-20 group-hover:bg-zinc-200 group-hover:h-[2px]" />
      </motion.button>
    </motion.div>
  );
}
