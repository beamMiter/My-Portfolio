"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { markIntroRevealDone, resetIntroReveal } from "./introRevealSignal";

gsap.registerPlugin(useGSAP);

/**
 * Intro reveal — plays once on mount, after the white stage has slid in.
 *  - [data-stagger-row]: rises up out of its own line, all at once (clip-masked).
 *  - [data-fade-up]: fades in place, NO clip mask and NO y-travel — for things
 *    whose shadow or hover transform would get cut by a clip (the CTA), and
 *    where a rise would de-sync from the split-text and read as the arrow
 *    sliding up onto the label.
 *  - [data-contrib]: also a [data-stagger-row], so it rises with the same clip;
 *    additionally held at opacity 0 until that rise starts, because its faint
 *    empty cells otherwise show a hairline of tips past the clip edge during
 *    the pre-roll hold.
 *  - [data-rise-fade]: same rise as [data-stagger-row] (same distance,
 *    duration, ease and start), but faded in instead of clip-masked — the
 *    mask's hard bottom edge sliced through the name line's letters and
 *    descenders mid-rise, reading as a black band laid over it.
 *  - [data-cta-icon]: the circle arrow button — joins the end of the
 *    "VIEW PORTFOLIO" letter wave as one more item in the same stagger, so it
 *    rises in right after the last letter with the exact same motion.
 *  - [data-grid]: scales up from further back + fades — comes forward from depth,
 *    nothing covering it.
 * Honours prefers-reduced-motion.
 */

const CLIPPED = "inset(-40% -40% 100% -40%)";
/* bottom overshoots further than the sides/top (-100% instead of -40%): the
   clip and the yPercent slide run on the same tween, so a descender (g, y,
   p…) — sitting at the very bottom of the row's box — is the last thing the
   clip-bottom reaches as it sweeps down. with a -40% open target that crossing
   only happened at ~83% of the tween, reading as the tail still sitting under
   a dark edge for a beat after the rest of the letter had landed. pushing the
   open target further down moves that crossing earlier (~67%) without
   changing the settled look at all — clearProps on this tween strips the
   clip-path back off once it completes either way. */
const OPEN = "inset(-40% -40% -100% -40%)";

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
      const riseFades = gsap.utils.toArray<HTMLElement>("[data-rise-fade]", el);
      const fadeUps = gsap.utils.toArray<HTMLElement>("[data-fade-up]", el);
      const grid = el.querySelector<HTMLElement>("[data-grid]");
      const contrib = el.querySelector<HTMLElement>("[data-contrib]");
      const ctaIcon = el.querySelector<HTMLElement>("[data-cta-icon]");
      // the "VIEW PORTFOLIO" label — HoverWaveLabel renders one <span> per char
      // — with the circle button tacked on as the wave's last item
      const splitChars = gsap.utils.toArray<HTMLElement>(
        "[data-split-in] > span > span",
        el
      );
      if (ctaIcon) splitChars.push(ctaIcon);

      const show = () => gsap.set(el, { visibility: "visible" });

      resetIntroReveal();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        show();
        markIntroRevealDone();
        return;
      }

      gsap.set(rows, { yPercent: 100, clipPath: CLIPPED });
      gsap.set(riseFades, { yPercent: 100, autoAlpha: 0 });
      gsap.set(fadeUps, { autoAlpha: 0 });
      gsap.set(splitChars, { autoAlpha: 0, yPercent: 90 });
      // .circleBtn's CSS transform transition (there for its hover scale)
      // would chase every frame of the rise and trail behind the letters —
      // off for the wave, handed back by clearProps once it lands
      if (ctaIcon) gsap.set(ctaIcon, { transition: "none" });
      // faint empty cells were peeking a hairline past the clip during the
      // pre-roll hold — keep the slot fully out until its rise starts
      if (contrib) gsap.set(contrib, { autoAlpha: 0 });
      if (grid) {
        gsap.set(grid, { autoAlpha: 0, scale: 0.82, transformOrigin: "50% 50%" });
      }
      show();

      // start once the white stage has slid in (0.8s + 0.7s = lands at 1.5s)
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
      if (riseFades.length) {
        tl.to(
          riseFades,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.8,
            ease: "power3.out",
            clearProps: "transform",
          },
          0.35
        );
      }

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
      // visually done well before their 2.15 mark): the wrapper appears, then
      // "VIEW PORTFOLIO" splits in, the circle button last in the same wave.
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
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.04,
            clearProps: "transform,opacity,visibility,transition",
          },
          2.05
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
