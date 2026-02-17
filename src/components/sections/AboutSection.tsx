"use client";

import { motion } from "framer-motion";

type TimelineItem = {
  period: string;
  title: string;
  org: string;
  body: string[];
};

const timeline: TimelineItem[] = [
  {
    period: "2026 – Present",
    title: "Full Stack Developer",
    org: "Phrapokklao Hospital X Technology Group",
    body: [
      "I am currently developing a hospital program as a solo full-stack developer, taking ownership of the full lifecycle from requirement discovery to deployment. The goal is to deliver software that fits real operational workflows, where correctness and stability matter as much as speed of delivery.",
      "I design the database structure to keep records consistent and easy to maintain, implement backend APIs with clear business rules and predictable behavior, and build frontend interfaces that help staff complete tasks quickly with minimal friction. My approach emphasizes clean structure, readable code, and careful handling of edge cases so the system stays reliable in production.",
      "Because I build the system end-to-end, I keep a strong connection between data models, API contracts, and UI behavior. This allows the product to evolve safely over time while remaining maintainable, testable, and aligned with real usage patterns in a hospital environment.",
    ],
  },
  {
    period: "2025",
    title: "Full Stack Developer (Intern)",
    org: "Phrapokklao Hospital X Rambhai Barni Rajabhat University",
    body: [
      "I completed my internship as a Full Stack Developer at Phrapokklao Hospital in Chanthaburi. Working in a real hospital context helped me understand practical constraints such as time pressure, user adoption, and the importance of data integrity in daily operations.",
      "During the internship, I contributed across the stack by developing UI pages, implementing backend endpoints, and integrating database operations. I worked iteratively based on feedback from real users, refining flows and improving usability so staff could complete tasks faster and with fewer errors.",
      "This experience strengthened my ability to translate user needs into stable features, ship improvements safely, and build systems that match real workflow requirements rather than only technical specifications.",
    ],
  },
  {
    period: "2022 – 2024",
    title: "B.Sc. Computer Science",
    org: "Rambhai Barni Rajabhat University",
    body: [
      "I studied Computer Science at Rambhai Barni Rajabhat University in Chanthaburi, Thailand. My focus was building practical foundations that translate directly into real development work: programming fundamentals, system thinking, and database concepts.",
      "Through coursework and projects, I practiced breaking down problems into maintainable components, modeling data correctly, and implementing end-to-end applications with clear structure. This foundation supports how I build production systems today: readable code, predictable behavior, and strong attention to correctness.",
    ],
  },
];

const PROFILE = {
  name: "Techin Jetsribumrung",
  role: "Full Stack Developer",
  summary:
    "I build software that supports real operational workflows. My focus is reliability, structured backend systems, and clear user interfaces that reduce friction in daily work.",
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

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-28 py-16 bg-[#0f1115] border-b border-white/5"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs tracking-[0.3em] uppercase text-white/45"
        >
          About
        </motion.p>

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

                      <div className="mt-4 space-y-4 max-w-[80ch]">
                        {item.body.map((p, i) => (
                          <p
                            key={i}
                            className="text-[14.5px] leading-7 text-white"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
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
              <h3 className="text-sm font-medium text-white/40 mb-5">
                Skills
              </h3>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {SKILLS.map((skill, idx) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="text-[14px] text-white"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}