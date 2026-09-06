"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { markIntroRevealDone, resetIntroReveal } from "./introRevealSignal";

gsap.registerPlugin(useGSAP);

/**
 * Intro reveal — plays once on mount, after the curtain (stage panel) has passed.
 *  - [data-stagger-row]: rises up out of its own line, all at once (clip-masked).
 *  - [data-fade-up]: fades in place, NO clip mask and NO y-travel — for things
 *    whose shadow or hover transform would get cut by a clip (the CTA), and
 *    where a rise would de-sync from the split-text and read as the arrow
 *    sliding up onto the label.
 *  - [data-contrib]: also a [data-stagger-row], so it rises with the same clip;
 *    additionally held at opacity 0 until that rise starts, because its faint
 *    empty cells otherwise show a hairline of tips past the clip edge during
 *    the pre-roll hold.
 *  - [data-cta-icon]: the circle arrow button — its own late beat, fading in
 *    only after everything above has landed and the "VIEW PORTFOLIO" label has
 *    fully split in.
 *  - [data-grid]: scales up from further back + fades — comes forward from depth,
 *    nothing covering it.
 * Honours prefers-reduced-motion.
 */

const CLIPPED = "inset(-40% -40% 100% -40%)";
const OPEN = "inset(-40% -40% -40% -40%)";

export default function IntroLaneReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const rows = gsap.utils.toArray<HTMLElement>("[data-stagger-row]", el);
      const fadeUps = gsap.utils.toArray<HTMLElement>("[data-fade-up]", el);
      const grid = el.querySelector<HTMLElement>("[data-grid]");
      const contrib = el.querySelector<HTMLElement>("[data-contrib]");
      const ctaIcon = el.querySelector<HTMLElement>("[data-cta-icon]");
      // the "VIEW PORTFOLIO" label — HoverWaveLabel renders one <span> per char
      const splitChars = gsap.utils.toArray<HTMLElement>(
        "[data-split-in] > span > span",
        el
      );

      const show = () => gsap.set(el, { visibility: "visible" });

      resetIntroReveal();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        show();
        markIntroRevealDone();
        return;
      }

      gsap.set(rows, { yPercent: 100, clipPath: CLIPPED });
      gsap.set(fadeUps, { autoAlpha: 0 });
      gsap.set(splitChars, { autoAlpha: 0, yPercent: 90 });
      // faint empty cells were peeking a hairline past the clip during the
      // pre-roll hold — keep the slot fully out until its rise starts
      if (contrib) gsap.set(contrib, { autoAlpha: 0 });
      // the circle button gets its own beat after the label, so it can't ride
      // the wrapper fade — hold it out until then
      if (ctaIcon) gsap.set(ctaIcon, { autoAlpha: 0 });
      if (grid) {
        gsap.set(grid, { autoAlpha: 0, scale: 0.82, transformOrigin: "50% 50%" });
      }
      show();

      // start once both backdrops are in: the dark curtain (~1.1s) and the
      // white stage that slides in over it (0.8s + 0.7s = lands at 1.5s)
      const tl = gsap.timeline({ delay: 1.5, onComplete: markIntroRevealDone });
      // grid leads — it sets the stage
      if (grid) {
        tl.to(
          grid,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            clearProps: "transform",
          },
          0
        );
      }

      // text follows a beat later, while the grid is still settling
      tl.to(
        rows,
        {
          yPercent: 0,
          clipPath: OPEN,
          duration: 1.8,
          ease: "power3.out",
          clearProps: "clipPath,transform",
        },
        0.35
      );

      // the grid slot fades up in step with that rise, so opacity 0 covers the
      // hold and the first frames while the clip is still near-shut
      if (contrib) {
        tl.to(
          contrib,
          { autoAlpha: 1, duration: 0.45, ease: "power2.out" },
          0.35
        );
      }

      // the CTA comes in just as the rows above settle (power3.out has them
      // visually done well before their 2.15 mark), in three quick beats: the
      // wrapper appears, "VIEW PORTFOLIO" splits in, and only once the label is
      // fully in does the circle arrow fade up.
      tl.to(
        fadeUps,
        {
          autoAlpha: 1,
          duration: 0.25,
          ease: "power2.out",
        },
        1.95
      );
      if (splitChars.length) {
        tl.to(
          splitChars,
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.3,
            ease: "power3.out",
            stagger: 0.026,
            clearProps: "transform,opacity,visibility",
          },
          2.05
        );
      }
      if (ctaIcon) {
        tl.to(
          ctaIcon,
          {
            autoAlpha: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          2.8
        );
      }
    },
    { scope: root }
  );

  return (
    <div ref={root} style={{ width: "100%", visibility: "hidden" }}>
      {children}
    </div>
  );
}
