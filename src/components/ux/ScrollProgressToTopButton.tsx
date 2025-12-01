"use client";

import { useEffect, useState } from "react";

type Props = {
  /** เริ่มโชว์หลังเลื่อนเกินกี่ px */
  offset?: number;
};

const ScrollToTopButton: React.FC<Props> = ({ offset = 200 }) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0); // 0 - 1

  useEffect(() => {
    const onScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || 0;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const p = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(Math.max(p, 0), 1));
      setVisible(scrollTop > offset);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ขนาดเล็กลง
  const size = 60; // px
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2 - 1;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  // เทาอ่อนที่ไม่กลืนกับขาว (ประมาณ zinc-300)
  const ringColor = "#d4d4d8"; // เส้นวง
  const arrowColor = "#a1a1aa"; // ลูกศร

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={[
        "fixed bottom-6 right-6 md:bottom-8 md:right-8",
        "z-50 bg-transparent border-none p-0 cursor-pointer",
        "transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      <div
        className="relative inline-flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* วง progress */}
        <svg
          width={size}
          height={size}
          className="pointer-events-none"
          style={{ transform: "rotate(-90deg)" }} // เริ่มจากด้านบน
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>

        {/* ลูกศรกลางวง (ไม่มีพื้นหลัง) */}
        <svg
          viewBox="0 0 24 24"
          className="absolute"
          style={{ width: 18, height: 18, color: arrowColor }}
          aria-hidden="true"
        >
          <path
            d="M6 15l6-6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
};

export default ScrollToTopButton;
