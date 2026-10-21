/**
 * What the site says about me, in one place: the About section renders it and
 * the CV export is built from it, so the two can't drift apart.
 */

export type TimelineItem = {
  /** which CV section it goes under — the About timeline shows both as one */
  kind: "work" | "education";
  period: string;
  title: string;
  org: string;
  /** the story of the period in a sentence or two */
  lead: string;
  /**
   * what came out of it — short lines, optionally tagged (a year). `resume`
   * marks the ones that also go on the one-page resume; the CV carries all.
   */
  points: { tag?: string; text: string; resume?: boolean }[];
  certificate?: { src: string; label: string };
};

export const timeline: TimelineItem[] = [
  {
    kind: "education",
    period: "2026",
    title: "Full Stack Software Development",
    org: "TechUp Bootcamp",
    lead: "An intensive full stack bootcamp, taken to firm up the fundamentals underneath what I had picked up on the job, and to build with a team, end to end, against real deadlines.",
    points: [
      { text: "Big O and time/space complexity, worked out before committing to an approach", resume: true },
      { text: "Object-oriented design, and where composition serves better than inheritance", resume: true },
      { text: "Common algorithms and data structures, by hand and in code" },
      { text: "Three full stack web apps, each with its own data model, API and frontend, through mentor review", resume: true },
      { text: "Code review, presenting technical decisions, and precise technical language" },
    ],
  },
  {
    kind: "work",
    period: "2026 – Present",
    title: "Full Stack Developer",
    org: "Phrapokklao Hospital X Technology Group",
    lead: "Building internal systems with the hospital's own staff: taking briefs straight from the people who will use the software, and turning what they ask for into what they actually need.",
    points: [
      { text: "Clarifying requirements with stakeholders through conversation and iteration", resume: true },
      { text: "Team Git workflow: isolated feature branches, merges that don't break shared work" },
      { text: "UX and UI with the focus on usability, not just visual polish" },
      { text: "PHP and Laravel in production; DaisyUI with Vite on the frontend", resume: true },
      { text: "Backend logic and database structures that mirror real workflows", resume: true },
    ],
  },
  {
    kind: "work",
    period: "2025",
    title: "Full Stack Developer",
    org: "Phrapokklao Hospital X Rambhai Barni Rajabhat University",
    lead: "My internship at Phrapokklao Hospital in Chanthaburi: first learning the codebase and what a hospital demands of software, then shipping across the full stack to medical staff in production.",
    points: [
      { text: "Node.js and Express, then TypeScript for type safety and long-term maintainability", resume: true },
      { text: "WebSocket for real-time features, and MySQL schema design" },
      { text: "Docker for consistent test environments before deploying to the hospital server", resume: true },
      { text: "A Python utility that reads Thai national ID cards, built into patient identification", resume: true },
      { text: "Iterating on feedback from real users so staff finish tasks faster, with fewer errors" },
    ],
  },
  {
    kind: "education",
    period: "2022 – 2024",
    title: "B.Sc. Computer Science",
    org: "Rambhai Barni Rajabhat University",
    lead: "From the basics of the web to my first complete full stack system, built from scratch.",
    points: [
      {
        tag: "2024",
        text: "Laravel and Next.js, API design and testing with Postman, normalized schemas and indexing. Capstone: a Laravel API with a Next.js frontend",
        resume: true,
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

export const PROFILE = {
  name: "Techin Jetsribumrung",
  role: "Full Stack Developer",
  summary:
    "I build internal software for hospitals and operational teams, focused on stable architecture, clean APIs, and interfaces that make daily work less complicated.",
  accent: "#3edc8a",
};

/**
 * What I understand, not what I use — the stack is already on the intro page,
 * and the tools show up in the experience points and the projects. A multiple
 * of three so the CV's three columns come out even.
 */
export const SKILLS = [
  "Frontend Development",
  "Backend Development",
  "API Design & Testing",
  "Software Architecture",
  "Database Design",
  "Real-time Systems",
  "Containerization & Deployment",
  "Object-Oriented Design",
  "Algorithms & Data Structures",
  "UX & UI Design",
  "Requirements Analysis",
  "Version Control & Teamwork",
];

/** how to reach me — the same ones the navbar and the Contact section open */
export const PROFILE_LINKS = {
  email: "jetsribumrungtechin@gmail.com",
  github: "https://github.com/beamMiter",
  linkedin: "https://www.linkedin.com/in/techin-jetsribumrung",
};
