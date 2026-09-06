"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/intro/contribGrid.module.css";
import { whenIntroRevealDone } from "./introRevealSignal";

/**
 * GitHub contribution grid under the hero deck — real data only.
 *
 * There is deliberately no generated stand-in pattern. A green square grid on a
 * developer's site reads as a claim about real output, so the three states are:
 *   loading — an empty grid, holding its space, claiming nothing
 *   live    — the real levels
 *   failed  — nothing rendered at all
 * Inventing squares to fill the gap would be inventing a credential.
 *
 * The upstream call lives in /api/contributions so it is cached server-side.
 * Days arrive oldest-first starting on a Sunday, and the grid fills column by
 * column down the 7 day-rows, so seven consecutive entries make one week.
 *
 * This sits in the hero on [data-stagger-row], so it rises behind the same clip
 * mask as the text. That mask only seals a stable box — if the fetch lands
 * mid-reveal the green would render into a half-open clip and read as leaking
 * out. So the fetched levels are held until IntroLaneReveal signals its whole
 * timeline has finished (whenIntroRevealDone); until then the empty grid rides
 * the mask up exactly like the text lines, and the colour then fades in via
 * the cells' background-color transition as the intro's closing beat.
 */

const DAYS = 7;
/**
 * Weeks shown, out of the 53 upstream returns.
 *
 * .contribSlot bleeds this past the column to the viewport's right edge, so
 * the width is no longer the column's ~540px — it grows with the screen
 * (~760px at a 1512px viewport, ~964px at 1920). That run is set by the
 * screen, so week count is the size dial: more weeks in the same run means
 * smaller squares.
 *   at 1512px with a 3px gap:  40 -> 16.1px   45 -> 14.0px   53 -> 11.4px
 * 53 is the ceiling — it's the whole year upstream sends, so past this point
 * the only way further down is capping the grid's width instead.
 * Newest week sits on the right, as on GitHub.
 */
const DEFAULT_WEEKS = 53;

type Status = "loading" | "live" | "failed";

export default function ContributionGrid({
  levels,
  weeks = DEFAULT_WEEKS,
}: {
  /** supply levels directly (0-4, oldest first) to skip the fetch */
  levels?: number[];
  weeks?: number;
}) {
  const cellCount = weeks * DAYS;
  const [fetched, setFetched] = useState<number[] | null>(null);
  const [status, setStatus] = useState<Status>(levels ? "live" : "loading");

  useEffect(() => {
    if (levels) return;

    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    const apply = (next: number[]) => {
      if (cancelled) return;
      setFetched(next);
      setStatus("live");
    };

    fetch("/api/contributions")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((data: { levels?: unknown }) => {
        if (cancelled) return;
        const next = data.levels;
        if (Array.isArray(next) && next.length) {
          const parsed = next.map((n) => Number(n) || 0);
          // hold the colour until the whole intro reveal has finished, then
          // let it fade in as the closing beat
          unsubscribe = whenIntroRevealDone(() => apply(parsed));
        } else {
          setStatus("failed");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("failed");
      });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [levels]);

  if (status === "failed") return null;

  // keep the most recent weeks; the upstream year is longer than the grid
  const source = (levels ?? fetched)?.slice(-cellCount);
  const cells = Array.from({ length: cellCount }, (_, i) => source?.[i] ?? 0);

  return (
    <div
      className={styles.grid}
      style={{ "--weeks": weeks } as React.CSSProperties}
      aria-hidden="true"
    >
      {cells.map((level, i) => (
        <span key={i} className={styles.cell} data-level={level} />
      ))}
    </div>
  );
}
