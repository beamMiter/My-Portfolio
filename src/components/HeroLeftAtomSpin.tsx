// src/components/HeroLeftAtomOrbit.tsx
"use client";

import React from "react";

type Props = {
  className?: string;
  color?: string;         // สีเส้น/จุด
  strokeWidth?: number;   // ความหนาเส้น
  rx?: number;            // รัศมีแกน X (ความกว้างวงรี)
  ry?: number;            // รัศมีแกน Y (ความสูงวงรี)
  dotR?: number;          // ขนาดจุดอิเล็กตรอน
  topSec?: number;        // ความเร็ววงบน (วินาที)
  leftSec?: number;       // ความเร็ววงซ้าย
  rightSec?: number;      // ความเร็ววงขวา
};

const HeroLeftAtomOrbit: React.FC<Props> = ({
  className,
  color = "#8C8C8C",
  strokeWidth = 2.2,
  rx = 36,
  ry = 86,
  dotR = 8,
  topSec = 10,
  leftSec = 8,
  rightSec = 12,
}) => {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[480px] select-none ${className ?? ""}`}>
      <svg viewBox="-140 -140 280 280" className="h-full w-full">
        {/* ===== วงโคจร 3 วง (นิ่ง) ===== */}
        <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* ชี้บน */}
          <ellipse rx={rx} ry={ry} />
          {/* ชี้ซ้าย */}
          <g transform="rotate(-60)">
            <ellipse rx={rx} ry={ry} />
          </g>
          {/* ชี้ขวา */}
          <g transform="rotate(60)">
            <ellipse rx={rx} ry={ry} />
          </g>
        </g>

        {/* ===== จุดอิเล็กตรอนวิ่ง “ตามเส้น” ของกราฟิก ===== */}
        {/* วงบน (ไม่เอียง) */}
        <OrbitDot rx={rx} ry={ry} r={dotR} color={color} durationSec={topSec} />
        {/* วงซ้าย (เอียง -60) */}
        <g transform="rotate(-60)">
          <OrbitDot rx={rx} ry={ry} r={dotR} color={color} durationSec={leftSec} reverse />
        </g>
        {/* วงขวา (เอียง +60) */}
        <g transform="rotate(60)">
          <OrbitDot rx={rx} ry={ry} r={dotR} color={color} durationSec={rightSec} />
        </g>
      </svg>

      {/* keyframes เฉพาะคอมโพเนนต์นี้ */}
      <style jsx>{`
        @keyframes orbit-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default HeroLeftAtomOrbit;

/** จุดวิ่งรอบวงรี
 * เทคนิค: วางจุดที่ปลายแกน X แล้วหมุนกลุ่ม <g>
 * เพื่อให้ทางวิ่งเป็น “วงรีจริง” ให้บีบแกน Y ของกลุ่มลูกด้วย scale(1, ry/rx)
 * เคล็ดลับสำคัญ: ต้องตั้ง transform-box: fill-box + transform-origin ให้กลาง viewBox
 */
function OrbitDot({
  rx, ry, r, color, durationSec, reverse,
}: {
  rx: number; ry: number; r: number; color: string; durationSec: number; reverse?: boolean;
}) {
  const scaleY = ry / rx;

  return (
    <g
      style={{
        transformBox: "fill-box",      // <— สำคัญมากสำหรับ SVG
        transformOrigin: "50% 50%",
        animation: `orbit-spin ${durationSec}s linear infinite`,
        animationDirection: reverse ? "reverse" as const : "normal" as const,
        willChange: "transform",
      }}
    >
      <g transform={`scale(1 ${scaleY})`}>
        {/* เริ่มที่ปลายขวา แล้วหมุนรอบศูนย์ → วิ่งตามรูปวงรีเดียวกับ ellipse ที่วาด */}
        <circle cx={rx} cy={0} r={r} fill={color} />
      </g>
    </g>
  );
}
