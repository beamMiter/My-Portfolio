/** the work shown in My Works, and listed in the CV export */

export type Project = {
  title: string;
  image: string;
  tech: string[];
  path?: string;
  href?: string;
  logo?: string;
  /** false keeps it off the CV's Selected Projects; My Works still shows it */
  cv?: boolean;
};

export const projects: Project[] = [
  {
    title: "PPK Screening Recommendation",
    image: "/images/projects/ppk-screening-mockup1.webp",
    tech: ["Next.js", "Laravel", "MySQL"],
    path: "/projects/ppk-screening",
    logo: "/images/aucc_logo.png",
  },
  {
    title: "PPK Kiosk Queue",
    image: "/images/projects/ppk-kiosk-mockup1.webp",
    tech: ["Next.js", "Laravel", "Prisma", "MySQL"],
    path: "/projects/ppk-kiosk",
    logo: "/images/aucc_logo.png",
  },
  {
    title: "Home Service",
    image: "/images/projects/home-service-mockup1.webp",
    tech: ["Flutter", "GoLang", "PostgreSQL"],
    href: "#",
    cv: false,
  },
  {
    title: "PPK Asset Repair Management",
    image: "/images/projects/ppk-asset-repair-management-mockup1.webp",
    tech: ["Laravel", "MySQL"],
    path: "/projects/ppk-asset-repair",
  },
  {
    title:
      "PR Integrated Policy, Performance and Knowledge Governance for Public Relations",
    image:
      "/images/projects/pr-integrated-policy-performance-and-knowledge-governance-for-public-relations1.webp",
    tech: ["Next.js", "Laravel", "MySQL", "n8n"],
    href: "#",
    cv: false,
  },
  {
    title: "WelaCode",
    image: "/images/projects/welacode-mockup1.webp",
    tech: ["Next.js", "Node.js", "Express", "Neon", "Railway"],
    href: "/projects/welacode",
  },
];
