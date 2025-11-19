// src/components/ux/SmartCursor.tsx
"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SmartCursorProps {
  baseSize?: number;        // starting dot size in px
  hoverScale?: number;      // how many times larger on hover
  baseColor?: string;       // dot color
  expandColor?: string;     // color when expanded
  zIndex?: number;
  stiffness?: number;       // spring stiffness for follow
  damping?: number;         // spring damping for follow
  preHopScale?: number;     // tiny dip before expanding (motion effect)
  preHopDuration?: number;  // seconds
  expandDuration?: number;  // seconds
}

/**
 * SmartCursor — single-layer, centered expand with pre-motion
 * - Keeps OS cursor visible
 * - Always follows pointer with spring smoothing
 * - On hover, plays a tiny "dip" then expands into a larger grey/white disc
 */
export default function SmartCursor({
  baseSize = 10,
  hoverScale = 3.4,             // a bit larger as requested
  baseColor = "rgba(255,255,255,0.28)",
  expandColor = "rgba(255,255,255,0.22)",
  zIndex = 9999,
  stiffness = 420,
  damping = 34,
  preHopScale = 0.88,
  preHopDuration = 0.08,
  expandDuration = 0.22,
}: SmartCursorProps) {
  // Motion values pinned to real cursor position
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness, damping, mass: 0.8 });
  const y = useSpring(my, { stiffness, damping, mass: 0.8 });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move: (e: MouseEvent) => void = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const onOver: (e: MouseEvent) => void = (e) => {
      const el = (e.target as HTMLElement | null)?.closest(
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
  }, []); 
  // Build keyframes for the pre-motion + expand sequence
  const totalDuration = preHopDuration + expandDuration;
  const timesHover = [0, preHopDuration / totalDuration, 1];

  return (
    <motion.div
      aria-hidden
      style={{ x, y, position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex }}
    >
      {/* Single layer disc. Centered at pointer so scale grows from the middle. */}
      <motion.div
        style={{
          width: baseSize,
          height: baseSize,
          borderRadius: 9999,
          translateX: "-50%",
          translateY: "-50%",
          background: baseColor,
          boxShadow: "0 0 12px rgba(0,0,0,0.12)",
          willChange: "transform, background-color",
        }}
        animate={
          isHovering
            ? {
                scale: [1, preHopScale, hoverScale],
                backgroundColor: [baseColor, baseColor, expandColor],
              }
            : {
                scale: [hoverScale, 1],
                backgroundColor: [expandColor, baseColor],
              }
        }
        transition={
          isHovering
            ? { duration: totalDuration, times: timesHover, ease: "easeOut" }
            : { duration: 0.18, ease: "easeOut" }
        }
      />
    </motion.div>
  );
}

/* Usage:
   - Create src/components/ux/SmartCursorClient.tsx with:

"use client";
import dynamic from "next/dynamic";
const SmartCursor = dynamic(() => import("./SmartCursor"), { ssr: false });
export default function SmartCursorClient(){ return <SmartCursor />; }

   - Then place <SmartCursorClient /> inside app/layout.tsx <body>.
*/
