"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiLaravel,
  SiNodedotjs,
  SiDocker,
  SiSpringboot,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiFlutter,
  SiDart,
  SiVuedotjs,
} from "react-icons/si";
import { DiGo, DiMysql } from "react-icons/di";
import { FaJava } from "react-icons/fa";
import styles from "@/styles/intro/stackSection.module.css";
import { inter } from "./introFonts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Section 3 of the intro, told in type: why the stack is boring on purpose.
 *
 * It reads as you scroll, with no pin, a change of pace after section 2. The
 * statement is short and lights up word by word as it comes up the screen.
 * Once it sits mid-screen, a line strikes out "what's trending" and the
 * words fade back. The strike plays at its own pace rather than following
 * the scroll, so a quick scroll can't skip past it.
 *
 * Everything after it (the answer, the stack) rises out of its masks the
 * same way, and that is played too, not scrubbed, so it is seen whole
 * however fast the page moves. The stack is set in three sizes, what I open
 * every morning biggest, so the groups need no visible headings, only a
 * note each, hanging in the left column. The section's name is for screen
 * readers only; on screen the statement and the stack say it.
 *
 * The markup's own state is the finished one (lit, struck, risen), so
 * reduced motion and no-JS read it as it ends; motion sets the start.
 */

const LEAD = "SOFTWARE THAT LASTS ISN'T BUILT ON";
const STRUCK = "WHAT'S TRENDING";

/* marks, not wordmarks, wherever a project has one: the gopher rather
   than the GO lettering, the dolphin rather than the MySQL one */
const GROUPS: {
  label: string;
  size: "lg" | "md" | "sm";
  names: { name: string; Icon: IconType }[];
  note: string;
}[] = [
  {
    label: "Core stack",
    size: "lg",
    names: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Laravel", Icon: SiLaravel },
      { name: "Go", Icon: DiGo },
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Docker", Icon: SiDocker },
    ],
    note: "I open these every morning for frontends, APIs, and the internal apps that have to keep running.",
  },
  {
    label: "Backend & database",
    size: "md",
    names: [
      { name: "Java", Icon: FaJava },
      { name: "Spring Boot", Icon: SiSpringboot },
      { name: "Express", Icon: SiExpress },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MySQL", Icon: DiMysql },
      { name: "MongoDB", Icon: SiMongodb },
    ],
    note: "Node with Express runs most services, with Java and Spring Boot when a project needs them. Databases are chosen for stability first.",
  },
  {
    label: "Also used",
    size: "sm",
    names: [
      { name: "Flutter", Icon: SiFlutter },
      { name: "Dart", Icon: SiDart },
      { name: "Vue.js", Icon: SiVuedotjs },
    ],
    note: "I bring these in for mobile reach, legacy integration, or systems already in place.",
  },
];

const LIGHT = "rgb(250, 250, 250)"; // zinc-50
const UNLIT = "rgb(39, 39, 42)"; // zinc-800
const STRUCK_GREY = "rgb(63, 63, 70)"; // zinc-700

export default function StackStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const statement = q("[data-statement]")[0] as HTMLElement;
      const leadWords = q("[data-lead-word]") as HTMLElement[];
      const struckWords = q("[data-struck-word]") as HTMLElement[];
      const strikes = q("[data-strike]") as HTMLElement[];

      // a strike reaches over the space to the next word, unless that word
      // starts the next line, where the reach would hang off the line's end.
      // re-checked on every refresh (resizes included), since wraps move
      const markLineEnds = () => {
        struckWords.forEach((w, i) => {
          const next = struckWords[i + 1];
          strikes[i].dataset.last = String(!next || next.offsetTop !== w.offsetTop);
        });
      };
      markLineEnds();
      ScrollTrigger.addEventListener("refreshInit", markLineEnds);

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // the statement, read word by word as it comes up the screen
        const read = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: statement,
            start: "top 85%",
            end: "center 62%",
            scrub: true,
          },
        });
        [...leadWords, ...struckWords].forEach((w, i) => {
          read.fromTo(w, { color: UNLIT }, { color: LIGHT, duration: 1 }, i * 0.35);
        });

        // the strike plays at its own pace once the statement sits
        // mid-screen (a beat after the reading finishes at 62%), and undoes
        // itself if the reader scrolls back above that point
        const strike = gsap.timeline({ paused: true });
        strike.fromTo(
          strikes,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power2.inOut", stagger: 0.5 }
        );
        // immediateRender off: the read timeline owns these words' colour
        // until the strike actually plays
        strike.fromTo(
          struckWords,
          { color: LIGHT },
          {
            color: STRUCK_GREY,
            duration: 0.6,
            ease: "power1.out",
            stagger: 0.5,
            immediateRender: false,
          },
          0.45
        );
        ScrollTrigger.create({
          trigger: statement,
          start: "center 55%",
          onEnter: () => strike.play(),
          onLeaveBack: () => strike.reverse(),
        });

        // everything after it rises out of its masks when it arrives,
        // played rather than scrubbed so it can't be scrolled past half-seen.
        // two groups: the answer, and the whole stack (all of it at once,
        // as soon as its top arrives)
        (q("[data-rise-group]") as HTMLElement[]).forEach((group) => {
          gsap.from(group.querySelectorAll("[data-rise]"), {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: group,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      return () => ScrollTrigger.removeEventListener("refreshInit", markLineEnds);
    },
    { scope: root }
  );

  return (
    <section ref={root} className={`${styles.section} ${inter.variable}`}>
      <div className={styles.inner}>
        <h2 className="sr-only">How I keep systems running</h2>

        <p data-statement className={styles.statement}>
          {LEAD.split(" ").map((w, i) => (
            <Fragment key={i}>
              <span data-lead-word>{w}</span>{" "}
            </Fragment>
          ))}
          {/* one strike per word, so it follows the phrase onto a second
              line when it wraps; each reaches over the space after it */}
          {STRUCK.split(" ").map((w, i, all) => (
            <Fragment key={i}>
              <span data-struck-word className={styles.struckWord}>
                {w}
                <span
                  data-strike
                  data-last={i === all.length - 1}
                  className={styles.strike}
                  aria-hidden="true"
                />
              </span>
              {i < all.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </p>

        <div data-rise-group className={styles.answer}>
          <p className={styles.answerLine}>
            <span className={styles.mask}>
              <span data-rise className={styles.riser}>
                I PICK <span className={styles.accent}>WHAT HOLDS UP,</span>
              </span>
            </span>
            <span className={styles.mask}>
              <span data-rise className={styles.riser}>
                NOT WHAT&apos;S NEW
              </span>
            </span>
          </p>
          {/* its note hangs in the left column, like the groups' below */}
          <p className={styles.answerNote}>
            <span className={styles.mask}>
              <span data-rise className={styles.riser}>
                I choose tools the way I build systems, to last for years, not
                to survive a demo.
              </span>
            </span>
          </p>
        </div>

        <div data-rise-group className={styles.groups}>
          {GROUPS.map((g) => (
            <div key={g.label} className={styles.group}>
              {/* the group's name is for screen readers only: a small
                  heading over every group read as clutter, and the sizes
                  already say which matters most */}
              <h3 className="sr-only">{g.label}</h3>
              <p className={styles.names} data-size={g.size}>
                {g.names.map(({ name, Icon }) => (
                  <span key={name} className={styles.mask}>
                    <span data-rise className={styles.tech}>
                      <Icon className={styles.logo} aria-hidden="true" />
                      {name}
                    </span>
                  </span>
                ))}
              </p>
              <p className={styles.groupNote}>
                <span className={styles.mask}>
                  <span data-rise className={styles.riser}>
                    {g.note}
                  </span>
                </span>
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
