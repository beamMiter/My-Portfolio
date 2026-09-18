"use client";

import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiLaravel,
  SiGo,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiLinux,
  SiGit,
  SiFlutter,
  SiDart,
  SiVuedotjs,
  SiClerk,
  SiSupabase,
  SiRailway,
  SiVercel,
} from "react-icons/si";

import styles from "@/styles/intro/stackSection.module.css";

/** react-icons 5.5 doesn't ship the Neon mark yet, so this is the Simple Icons
 *  path inlined — one 24×24 shape, coloured by currentColor like the rest */
const SiNeon: IconType = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 0V24l-9.365-8.045V24H0V0ZM2.942 21.087h8.751V9.563l9.365 8.204V2.919L2.942 2.914Z" />
  </svg>
);

type Row = { icons: IconType[]; speed: number; dir: 1 | -1 };

/** three short rows running opposite ways, so the wall never reads as one long
 *  strip. speeds are px per second. */
const ROWS: Row[] = [
  {
    icons: [
      SiReact,
      SiNextdotjs,
      SiTypescript,
      SiNodedotjs,
      SiLaravel,
      SiGo,
      SiVuedotjs,
    ],
    speed: 30,
    dir: 1,
  },
  {
    icons: [
      SiPostgresql,
      SiMysql,
      SiMongodb,
      SiRedis,
      SiNeon,
      SiSupabase,
      SiClerk,
    ],
    speed: 24,
    dir: -1,
  },
  {
    icons: [
      SiDocker,
      SiLinux,
      SiGit,
      SiVercel,
      SiRailway,
      SiFlutter,
      SiDart,
    ],
    speed: 34,
    dir: 1,
  },
];

/** one loop period is the row twice over: a single pass of 7 icons (~640px)
 *  can still fall short of a phone-width box, and the wrap only stays
 *  invisible if a period is at least as wide as the viewport */
const REPEAT = 2;
/** three periods so the row can wrap seamlessly in either direction */
const COPIES = 3;

/**
 * One row of the stack wall — the same loop as the My Works strip: a scroll
 * container whose scrollLeft is parked inside the middle copy, so crossing a
 * seam jumps by exactly one period and it runs endlessly. Unlike My Works it
 * ignores the pointer completely: no hover-pause, no drag, nothing to click.
 */
function LoopRow({ icons, speed, dir }: Row) {
  const scroller = useRef<HTMLDivElement>(null);

  const period = icons.length * REPEAT;
  const cells = Array.from({ length: COPIES * REPEAT }, () => icons).flat();

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let pos = 0;
    let ready = false;
    let visible = true;

    // the intro page is already busy — don't tick rows nobody can see
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    const frame = (now: number) => {
      // clamp so a backgrounded tab doesn't resume with one huge jump
      const dt = Math.min(now - last, 50) / 1000;
      last = now;

      const a = el.children[0] as HTMLElement | undefined;
      const b = el.children[period] as HTMLElement | undefined;
      const w = a && b ? b.offsetLeft - a.offsetLeft : 0;

      if (visible && w > 0) {
        if (!ready) {
          pos = w;
          ready = true;
        }
        if (!reduce) pos += dir * speed * dt;
        if (pos >= w * 2) pos -= w;
        else if (pos < w * 0.5) pos += w;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [dir, speed, period]);

  return (
    <div
      ref={scroller}
      className={styles.loopRow}
    >
      {cells.map((Icon, i) => (
        <div key={i} className={styles.loopCell}>
          <Icon className={styles.loopIcon} />
        </div>
      ))}
    </div>
  );
}

/** the tech wall that fills the box on the right of the stack section */
export default function StackIconLoop() {
  return (
    <div className={styles.loopBox} aria-hidden="true">
      {ROWS.map((row, i) => (
        <LoopRow key={i} {...row} />
      ))}
    </div>
  );
}
