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
    period: "2026",
    title: "Full Stack Software Development",
    org: "TechUp Bootcamp",
    body: [
      "I joined TechUp, an intensive bootcamp built around full stack software development, to firm up the fundamentals underneath the skills I had picked up on the job. A large part of the early weeks was deliberate review: Big O notation and reasoning about time and space complexity before committing to an approach, object-oriented design and where composition serves better than inheritance, and a broad pass over common algorithms and data structures — worked through by hand and in code until the patterns felt familiar rather than memorised.",
      "The core of the program was building three full stack web applications end to end, each with its own data model, API layer, and frontend, shipped against real deadlines and put through mentor review. Around the engineering, the camp kept steady weight on the parts of the job that are not code: communicating trade-offs clearly, giving and taking code review, presenting technical decisions to a room, and using technical terms precisely so conversations with other engineers stay short and unambiguous.",
    ],
  },
  {
    period: "2026 – Present",
    title: "Full Stack Developer",
    org: "Phrapokklao Hospital X Technology Group",
    body: [
      "This period has been one of the most formative in terms of real-world engineering experience. Working directly with stakeholders, I practice receiving briefs, clarifying requirements, and translating operational needs into software decisions. The gap between what users ask for and what they actually need became something I learned to navigate carefully through conversation and iteration.",
      "I deepened my understanding of collaborative development beyond basic version control. Working in a team environment taught me how to manage branching strategies properly, keep feature branches isolated, coordinate merges without breaking shared work, and maintain a codebase that multiple people can reason about and contribute to safely. Git became a workflow discipline rather than just a tool.",
      "On the technical side, I expanded my skills in UX and UI design with a stronger focus on system usability, not just visual polish. I developed a deeper understanding of PHP and grew more comfortable with Laravel as a production framework. I also picked up DaisyUI paired with Vite, which improved how I approach component-driven frontend development and build tooling. Alongside these, I continued strengthening my ability to design backend systems with clear logic, predictable behavior, and database structures that reflect real workflows without unnecessary complexity.",
    ],
  },
  {
    period: "2025",
    title: "Full Stack Developer",
    org: "Phrapokklao Hospital X Rambhai Barni Rajabhat University",
    body: [
      "I completed my internship as a Full Stack Developer at Phrapokklao Hospital in Chanthaburi. Working in a real hospital context helped me understand practical constraints such as time pressure, user adoption, and the importance of data integrity in daily operations. The early period was focused on understanding the codebase and the environment rather than shipping features, but I used that time to deepen my understanding of JavaScript, API parameter design, and how to structure relational databases in a way that reflects real operational relationships.",
      "As I grew into the role, I contributed across the full stack. On the backend I worked with Node.js and Express, then expanded into TypeScript to improve type safety and long-term maintainability. I learned WebSocket integration for real-time features, designed MySQL schemas, and used Docker to create consistent environments for testing before deploying to the hospital server for medical staff to use in production. I worked iteratively based on feedback from real users, refining flows and improving usability so staff could complete tasks faster and with fewer errors.",
      "I also built a Python utility to read and parse Thai national ID card data, integrating it into an internal hospital project to streamline patient identification workflows. Throughout the internship I worked closely with junior and senior developers, practiced receiving and breaking down requirements from stakeholders, and developed a clearer instinct for debugging, logic design, and building systems that hold up under real usage conditions.",
    ],
  },
  {
    period: "2024",
    title: "B.Sc. Computer Science",
    org: "Rambhai Barni Rajabhat University",
    body: [
      "My final year expanded significantly into full-stack development. I learned Laravel as a backend framework and Next.js on the frontend, spending time understanding how APIs are designed, documented, and tested using Postman. I also returned to UI/UX Design with a more structured approach, focusing on component hierarchy, user flows, and how interface decisions affect real usability rather than just aesthetics. A major focus was database architecture: designing normalized schemas, understanding indexing, and modeling real-world relationships carefully. My capstone project tied everything together with a Laravel service acting as the backend API and a Next.js frontend consuming it, giving me my first complete full-stack system built from scratch.",
    ],
  },
  {
    period: "2023",
    title: "B.Sc. Computer Science",
    org: "Rambhai Barni Rajabhat University",
    body: [
      "My second year moved into mobile development using Dart and Flutter. I built an application that connected to a real database and displayed live data inside the app, handling data fetching, state management, and UI rendering together. Alongside Flutter, I studied SQL and MySQL in depth, learning how to write queries, design schemas, and think about data relationships in a structured way. I also began using Git and GitHub as part of my daily workflow, learning how to manage source control, track changes, and collaborate on code in a more organized and professional manner.",
    ],
  },
  {
    period: "2022",
    title: "B.Sc. Computer Science",
    org: "Rambhai Barni Rajabhat University",
    body: [
      "My first year covered the fundamentals of web development through HTML, CSS, and JavaScript, alongside an introduction to UI/UX Design. I built several small projects that taught me how browsers render content, how layout systems work, and how interactivity is wired through the DOM. The design courses introduced me to thinking about users first, wireframing, visual hierarchy, and how layout choices affect how people interact with a product.",
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

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-28 py-16 bg-[#09090b] border-b border-white/5"
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
              <h3 className="text-sm font-medium text-white/40 mb-5">Skills</h3>

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
