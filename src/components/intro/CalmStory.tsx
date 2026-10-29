"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import styles from "@/styles/intro/calmSection.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

/**
 * Section 2 of the intro, told in type: the software a team works on all
 * day, what goes wrong when it fails, and what it has to be instead.
 *
 * The same three giant lines carry all four acts, so the story needs no
 * small print, and they travel as one block: while the section is pinned,
 * scrolling carries it from the left edge across to the right one, and the
 * acts play on the way. SOME SOFTWARE / NEVER GETS / A DAY OFF sets off
 * from the left. It scrambles into what goes wrong (A QUEUE STALLS / A FORM
 * BREAKS / THE WORK STOPS), greyed, then into what the software has to be
 * (PREDICTABLE / LEGIBLE / ALWAYS THERE), and last into the section's name,
 * CALM / SOFTWARE / FOR REAL WORK, the green carried down from ALWAYS THERE.
 * The name reaches the right edge, holds a beat, and runs off it.
 *
 * The story is scrubbed to scroll; with reduced motion it shows its last
 * frame. Screen readers get the sentence it tells once, not scrambling text.
 */

/* display lines, so no full stops: the line breaks do that work */
const LINES = [
  { from: "SOME SOFTWARE", noise: "A QUEUE STALLS", to: "PREDICTABLE", name: "CALM" },
  { from: "NEVER GETS", noise: "A FORM BREAKS", to: "LEGIBLE", name: "SOFTWARE" },
  { from: "A DAY OFF", noise: "THE WORK STOPS", to: "ALWAYS THERE", name: "FOR REAL WORK" },
];

/* the block at p of the way across: its own p% point p% of the way along
   the frame, so 0 is flush with the left edge and 100 with the right one,
   and it stays on screen between them however wide its text runs */
const place = (p: number) => ({ left: `${p}%`, xPercent: -p });

const LIGHT = "rgb(250, 250, 250)"; // zinc-50
const DIM = "rgb(82, 82, 91)"; // zinc-600

export default function CalmStory() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const words = q("[data-word]") as HTMLElement[];
      const accent =
        getComputedStyle(root.current!).getPropertyValue("--dev-accent").trim() ||
        "#3edc8a";

      const mm = gsap.matchMedia();

      // no movement: the last frame, still
      mm.add("(prefers-reduced-motion: reduce)", () => {
        words.forEach((w, i) => (w.textContent = LINES[i].name));
        gsap.set(words[2], { color: accent });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // the three lines rise out of their masks as the section arrives
        gsap.from(words, {
          yPercent: 105,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage.current,
            start: "top top",
            end: "+=230%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        // let the line be read before anything happens to it
        tl.to({}, { duration: 0.6 });

        // act two, the bad day: the lines scramble into what goes wrong,
        // grey
        tl.addLabel("noise");
        words.forEach((word, i) => {
          tl.to(
            word,
            {
              scrambleText: { text: LINES[i].noise, chars: "upperCase", speed: 0.5 },
              color: DIM,
              duration: 1.2,
            },
            `noise+=${i * 0.25}`
          );
        });
        tl.to({}, { duration: 0.9 });

        // act three: what the software has to be
        tl.addLabel("calm");
        words.forEach((word, i) => {
          tl.to(
            word,
            {
              scrambleText: { text: LINES[i].to, chars: "upperCase", speed: 0.6 },
              color: i === 2 ? accent : LIGHT,
              duration: 1.4,
            },
            `calm+=${i * 0.12}`
          );
        });

        tl.to({}, { duration: 0.8 });

        // act four, the name: the same lines scramble once more, into the
        // section's name (the third keeps its green)
        tl.addLabel("name");
        words.forEach((word, i) => {
          tl.to(
            word,
            {
              scrambleText: { text: LINES[i].name, chars: "upperCase", speed: 0.6 },
              duration: 1.2,
            },
            `name+=${i * 0.12}`
          );
        });
        tl.to({}, { duration: 0.6 });

        // under all four acts, the block travels from the left edge to the
        // right one at the pace of the scroll, arriving as the name is read
        tl.fromTo(stack.current, place(0), { ...place(100), duration: tl.duration() }, 0);

        // then it runs off the right edge (15% past the frame clears the
        // page's side padding at every width)
        tl.to(stack.current, { left: "115%", xPercent: 0, duration: 1.2, ease: "power2.in" });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className={styles.section}>
      <div ref={stage} className={styles.stage}>
        <div className={styles.inner}>
          <h2 className="sr-only">Calm software for real work</h2>
          <p className="sr-only">
            Some software never gets a day off. When a queue stalls or a
            form breaks, the work stops, so the software behind it has to be
            predictable, legible, and always there.
          </p>

          <div className={styles.composition}>
            <div ref={stack} className={styles.stack} aria-hidden="true">
              {LINES.map((line) => (
                <div key={line.from} className={styles.line}>
                  <span className={styles.mask}>
                    <span data-word className={styles.word}>
                      {line.from}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
