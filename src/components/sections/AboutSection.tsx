"use client";

import { useState } from "react";
import Image from "next/image";

type TimelineItem = {
  period: string;
  title: string;
  org: string;
  /** the story of the period in a sentence or two */
  lead: string;
  /** what came out of it — short lines, optionally tagged (a year) */
  points: { tag?: string; text: string }[];
  certificate?: { src: string; label: string };
};

const timeline: TimelineItem[] = [
  {
    period: "2026",
    title: "Full Stack Software Development",
    org: "TechUp Bootcamp",
    lead: "An intensive full stack bootcamp, taken to firm up the fundamentals underneath what I had picked up on the job, and to build with a team, end to end, against real deadlines.",
    points: [
      { text: "Big O and time/space complexity, worked out before committing to an approach" },
      { text: "Object-oriented design, and where composition serves better than inheritance" },
      { text: "Common algorithms and data structures, by hand and in code" },
      { text: "Three full stack web apps, each with its own data model, API and frontend, through mentor review" },
      { text: "Code review, presenting technical decisions, and precise technical language" },
    ],
  },
  {
    period: "2026 – Present",
    title: "Full Stack Developer",
    org: "Phrapokklao Hospital X Technology Group",
    lead: "Building internal systems with the hospital's own staff: taking briefs straight from the people who will use the software, and turning what they ask for into what they actually need.",
    points: [
      { text: "Clarifying requirements with stakeholders through conversation and iteration" },
      { text: "Team Git workflow: isolated feature branches, merges that don't break shared work" },
      { text: "UX and UI with the focus on usability, not just visual polish" },
      { text: "PHP and Laravel in production; DaisyUI with Vite on the frontend" },
      { text: "Backend logic and database structures that mirror real workflows" },
    ],
  },
  {
    period: "2025",
    title: "Full Stack Developer",
    org: "Phrapokklao Hospital X Rambhai Barni Rajabhat University",
    lead: "My internship at Phrapokklao Hospital in Chanthaburi: first learning the codebase and what a hospital demands of software, then shipping across the full stack to medical staff in production.",
    points: [
      { text: "Node.js and Express, then TypeScript for type safety and long-term maintainability" },
      { text: "WebSocket for real-time features, and MySQL schema design" },
      { text: "Docker for consistent test environments before deploying to the hospital server" },
      { text: "A Python utility that reads Thai national ID cards, built into patient identification" },
      { text: "Iterating on feedback from real users so staff finish tasks faster, with fewer errors" },
    ],
  },
  {
    period: "2022 – 2024",
    title: "B.Sc. Computer Science",
    org: "Rambhai Barni Rajabhat University",
    lead: "From the basics of the web to my first complete full stack system, built from scratch.",
    points: [
      {
        tag: "2024",
        text: "Laravel and Next.js, API design and testing with Postman, normalized schemas and indexing. Capstone: a Laravel API with a Next.js frontend",
      },
      {
        tag: "2023",
        text: "Flutter and Dart on a live database, SQL and MySQL in depth, Git and GitHub every day",
      },
      {
        tag: "2022",
        text: "HTML, CSS and JavaScript, how browsers render and lay out a page, and UI/UX basics: wireframes and visual hierarchy",
      },
    ],
  },
];

const PROFILE = {
  name: "Techin Jetsribumrung",
  role: "Full Stack Developer",
  summary:
    "I build internal software for hospitals and operational teams, focused on stable architecture, clean APIs, and interfaces that make daily work less complicated.",
  accent: "#3edc8a",
};

const SKILLS = [
  "Web Application Development",
  "Mobile Application Development",
  "API & Backend Architecture",
  "Database Design",
  "Docker & Containerization",
  "Workflow Automation",
];

/**
 * A certificate scan, opening full size in a new tab. Until the file is in
 * public/, development shows a marked empty frame where it will sit and
 * production shows nothing.
 */
function Certificate({ src, label }: { src: string; label: string }) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div className="flex aspect-[1.414/1] w-full max-w-[360px] flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/15 text-center">
        <span className="text-sm text-white/60">{label}</span>
        <span className="text-[12px] text-white/35">public{src}</span>
      </div>
    );
  }

  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block aspect-[1.414/1] w-full max-w-[360px] overflow-hidden rounded-xl border border-white/10 bg-zinc-900/30 transition-colors hover:border-white/25"
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes="360px"
        className="object-contain"
        onError={() => setMissing(true)}
      />
    </a>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-28 py-16 bg-[#09090b] border-b border-white/5"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="text-[clamp(12px,1vw,15px)] tracking-[0.3em] uppercase text-white/45">
          About
        </p>

        <div className="mt-4 grid gap-10 md:grid-cols-[1.05fr_0.95fr] items-start">
          <div>
            <h3 className="mt-2 text-[clamp(22px,3vw,34px)] font-medium text-white">
              Education & Experience
              <span className="ml-2 text-[#3edc8a]">Timeline</span>
            </h3>

            <div className="mt-8">
              <ul className="relative space-y-16">
                <div className="absolute left-[14px] top-[9px] bottom-[9px] w-px bg-white/10" />

                {timeline.map((item, idx) => (
                  <li key={idx} className="grid grid-cols-[28px_1fr] gap-x-8">
                    <div className="flex justify-center">
                      <span className="mt-[6px] h-2.5 w-2.5 rounded-full bg-[#3edc8a]" />
                    </div>

                    <div>
                      <div className="text-[12px] text-white/55">
                        {item.period}
                      </div>

                      <h4 className="mt-3 text-[26px] font-medium text-white">
                        {item.title}
                      </h4>

                      <div className="mt-2 text-sm text-white/60">
                        [{item.org}]
                      </div>

                      <p className="mt-4 max-w-[80ch] text-[14.5px] leading-7 text-white">
                        {item.lead}
                      </p>

                      <ul className="mt-4 max-w-[80ch] space-y-2">
                        {item.points.map((pt, i) =>
                          pt.tag ? (
                            <li
                              key={i}
                              className="grid grid-cols-[3rem_1fr] gap-x-3 text-[14.5px] leading-7 text-white/75"
                            >
                              <span className="text-[12px] leading-7 text-white/55">
                                {pt.tag}
                              </span>
                              <span>{pt.text}</span>
                            </li>
                          ) : (
                            <li
                              key={i}
                              className="relative pl-5 text-[14.5px] leading-7 text-white/75 before:absolute before:left-0 before:top-[14px] before:h-px before:w-2.5 before:bg-[#3edc8a]/70"
                            >
                              {pt.text}
                            </li>
                          )
                        )}
                      </ul>

                      {item.certificate && (
                        <div className="mt-6">
                          <Certificate
                            src={item.certificate.src}
                            label={item.certificate.label}
                          />
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* stays in view while the timeline scrolls past, so the column
              doesn't run out after the skills and leave the rest of it bare */}
          <div className="md:sticky md:top-28">
            <h2 className="text-[clamp(32px,4vw,48px)] font-light text-white leading-tight">
              I&apos;m{" "}
              <span style={{ color: PROFILE.accent }} className="font-medium">
                {PROFILE.name}
              </span>
              <br />
              <span className="text-white">{PROFILE.role}</span>
            </h2>

            <p className="mt-6 text-white leading-7 max-w-[60ch]">
              {PROFILE.summary}
            </p>

            <div className="mt-12">
              <h3 className="text-sm font-medium text-white/40 mb-5">Skills</h3>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {SKILLS.map((skill) => (
                  <div key={skill} className="text-[14px] text-white">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
