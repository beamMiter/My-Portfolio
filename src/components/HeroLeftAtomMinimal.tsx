// src/components/HeroLeftAtomMinimal.tsx
"use client";

import React from "react";

type Props = {
  className?: string;
  color?: string;       // สีเส้น/จุด
  strokeWidth?: number; // ความหนาเส้น
  rx?: number;          // รัศมีแกน X (ทำให้ “แคบ/กว้าง”)
  ry?: number;          // รัศมีแกน Y (ทำให้ “ยาว/สั้น”)
  dotR?: number;        // ขนาดจุดอิเล็กตรอน
};

const HeroLeftAtomMinimal: React.FC<Props> = ({
  className,
  color = "#8C8C8C",      // เทาเข้ม
  strokeWidth = 2.2,
  rx = 36,                // แคบ
  ry = 86,                // ยาว (ชี้บน)
  dotR = 8,
}) => {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[480px] select-none ${className ?? ""}`}>
      <svg viewBox="-140 -140 280 280" className="h-full w-full">
        {/* วงโคจร 3 วง: ชี้บน / ชี้ซ้าย / ชี้ขวา */}
        <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* ชี้บน (ไม่เอียง) */}
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

        {/* จุดอิเล็กตรอน 3 จุดที่ปลายวง */}
        <g fill={color} stroke="none">
          {/* บนสุดของวงชี้บน */}
          <circle cx={0} cy={-ry} r={dotR} />
          {/* ปลายซ้ายของวงชี้ซ้าย */}
          <g transform="rotate(-60)">
            <circle cx={-rx} cy={0} r={dotR} />
          </g>
          {/* ปลายขวาของวงชี้ขวา */}
          <g transform="rotate(60)">
            <circle cx={rx} cy={0} r={dotR} />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default HeroLeftAtomMinimal;
