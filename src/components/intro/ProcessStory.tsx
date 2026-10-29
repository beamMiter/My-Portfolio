"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/styles/intro/aiSection.module.css";
import { inter } from "./introFonts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Section 4 of the intro, told as a journey: from a vague ask to a running
 * system, left to right.
 *
 * The section pins and scrolling carries a track sideways through it: the
 * vague ask, set faint, barely there; the four steps; and the running
 * system, which starts just as faint and comes up to full green as it
 * arrives. Each step's numeral drifts slower than its panel, and its words
 * rise in as the panel nears the middle.
 *
 * Faint-to-vivid rather than blur: blurred type reads as a rendering fault,
 * and an animated filter on big moving text can soften or flicker on some
 * GPUs and in Safari. A colour can't.
 *
 * The markup lays the panels out top to bottom; only motion switches the
 * section into the sideways journey (data-journey), so reduced motion and
 * no-JS still read every step.
 */

const STEPS = [
  {
    title: "Understand the real workflow",
    text: "Before any code, I sit with the people who'll use it and watch what they actually do: the workarounds, the double entry, and the step everyone dreads. That's the spec, not the sentence I was handed.",
  },
  {
    title: "Pick boring, proven tech",
    text: "I reach for Postgres, a plain server, and a framework I've shipped before. Easy backups and dull migrations matter more than novelty on a system people depend on all day.",
  },
  {
    title: "Ship in thin slices",
    text: "I ship one real workflow at a time and put it in front of users within a week or two. Feedback on something running beats feedback on a mockup.",
  },
  {
    title: "Leave it maintainable",
    text: "I write readable code, document the decisions, and leave a proper handover, so nobody has to reverse engineer it later, including me in six months.",
  },
];

/** scroll runs a little shorter than the track travels, so the journey
    doesn't ask for five screens of scrolling */
const SCROLL_PER_TRAVEL = 0.8;

export default function ProcessStory() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = root.current!;
        const trackEl = track.current!;
        section.dataset.journey = "";

        const distance = () => trackEl.scrollWidth - window.innerWidth;

        const travel = gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin.current,
            start: "top top",
            end: () => `+=${distance() * SCROLL_PER_TRAVEL}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const q = gsap.utils.selector(section);

        (q("[data-step]") as HTMLElement[]).forEach((panel) => {
          // the numeral lags behind its panel
          gsap.fromTo(
            panel.querySelector("[data-num]"),
            { xPercent: 30 },
            {
              xPercent: -30,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: travel,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
          // the words rise in as the panel nears the middle
          gsap.from(panel.querySelectorAll("[data-rise]"), {
            yPercent: 110,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: travel,
              start: "left 90%",
              end: "left 45%",
              scrub: true,
            },
          });
        });

        // the running system comes up from faint to full green as it
        // arrives (--fill drives the colour mix, see .fill)
        const end = q("[data-end]")[0] as HTMLElement;
        gsap.fromTo(
          q("[data-fill]"),
          { "--fill": 0 },
          {
            "--fill": 1,
            ease: "none",
            scrollTrigger: {
              trigger: end,
              containerAnimation: travel,
              start: "left 90%",
              end: "left 20%",
              scrub: true,
            },
          }
        );

        return () => {
          delete section.dataset.journey;
        };
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className={`${styles.section} ${inter.variable}`}>
      <h2 className="sr-only">From a vague ask to a running system</h2>

      <div ref={pin} className={styles.pin}>
        <div ref={track} className={styles.track}>
          <div className={`${styles.panel} ${styles.intro}`}>
            {/* the big line is set as its two lines so the brief can take
                the room beside FROM A from 1200px, its last line on A's
                baseline, without moving the big line at all; under it on
                narrower screens */}
            <div className={styles.lockup}>
              <p className={`${styles.giant} ${styles.giantFirst}`} aria-hidden="true">
                <span className={styles.dim}>From</span> a
              </p>
              <p className={`${styles.giant} ${styles.giantSecond}`} aria-hidden="true">
                <span className={styles.vague}>vague ask</span>
              </p>
              <p className={styles.brief}>
                The brief is usually one sentence and a screenshot of a
                spreadsheet.
              </p>
            </div>
          </div>

          {STEPS.map((step, i) => (
            <article
              key={step.title}
              data-step
              className={`${styles.panel} ${styles.step}`}
            >
              <span data-num className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.stepTitle}>
                <span className={styles.mask}>
                  <span data-rise className={styles.riser}>
                    {step.title}
                  </span>
                </span>
              </h3>
              <p className={styles.stepText}>
                <span className={styles.mask}>
                  <span data-rise className={styles.riser}>
                    {step.text}
                  </span>
                </span>
              </p>
            </article>
          ))}

          <div data-end className={`${styles.panel} ${styles.end}`}>
            <p className={styles.giant} aria-hidden="true">
              <span className={styles.dim}>To</span>{" "}
              <span data-fill className={styles.fill}>
                a running system
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
