"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function SmartCursor({
  baseSize = 10,
  hoverScale = 6.2, 
  zIndex = 9999,
  preHopScale = 0.9, 
  preHopDuration = 0.12, 
  expandDuration = 0.34, 
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest(
        "a, button, input, textarea, select, [role='button'], [data-hover-expand]"
      );
      setIsHovering(Boolean(el));
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  const total = preHopDuration + expandDuration;
  const times = [0, preHopDuration / total, 1];

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x,
        y,
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex,
      }}
    >
      <motion.div
        style={{
          width: baseSize,
          height: baseSize,
          borderRadius: "9999px",
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "rgba(255,255,255,1)", // ปกติ = ขาวล้วน
          mixBlendMode: "normal",
        }}
        animate={
          isHovering
            ? {
                scale: [1, preHopScale, hoverScale],
                backgroundColor: [
                  "rgba(255,255,255,1)",
                  "rgba(255,255,255,1)",
                  "rgba(200,200,200,0.28)", // ตอนกาง = เทาโปร่งใส
                ],
              }
            : {
                scale: [hoverScale, 1],
                backgroundColor: [
                  "rgba(200,200,200,0.28)",
                  "rgba(255,255,255,1)",
                ],
              }
        }
        transition={
          isHovering
            ? {
                duration: total,
                times,
                ease: [0.16, 0.84, 0.44, 1], // smooth cubic
              }
            : { duration: 0.22, ease: "easeOut" }
        }
      />
    </motion.div>
  );
}
