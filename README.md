# Techin Jetsribumrung — Portfolio

> **Calm software for real work.**

The personal site of Techin Jetsribumrung ("JetSri"), a fresh-graduate full-stack developer who builds internal software for hospital and government teams: queue systems, referral flows, repair tracking and reporting dashboards. It is where the work gets explained rather than just listed — a portfolio, a small dev log, and a place to try out interface ideas.

This repository is the source of my own site. It isn't a template or a library, so there is no setup guide here.

## What the site says

The through-line is one idea: **hospitals don't get to have a bad day.** When a queue stalls or a referral form breaks, someone's care is delayed, so the software behind it has to be boring in the best way — predictable, legible and always there. That is the world I build in, and the site is written around it.

### Two front doors

- **`/intro`** — the long-form landing page, written like a dev log. A hero with a bento mosaic (including a live GitHub contribution grid), then the philosophy ("Calm software for real work"), the stack ("How I keep systems running") and the process ("From a vague ask to a running system"). `/` redirects here.
- **`/home`** — the compact portfolio: a short hello, services, about, an endless strip of projects, and contact.

## Selected work

Each project has its own case-study page under `/projects/`.

| Project | What it is | Built with |
| --- | --- | --- |
| **WelaCode Web Service** | A full-stack platform for project management and service booking: Google login, a shopping cart, consultation appointments, card and PromptPay payments, and automated email for welcomes, confirmations and receipts. | Next.js, Node.js, Express, TypeScript · Vercel, Railway, Neon · Beam Checkout |
| **PPK Kiosk Queue System** | A hospital-lobby kiosk. A patient inserts their Thai National ID, the hospital API validates it, and a queue ticket prints with the right counter and entitlement details — no staff needed. Built for large touch targets and high contrast. Presented at AUCC Conference 2026. | Next.js, React, TypeScript, Prisma, MySQL |
| **PPK Screening Recommendation Room** | A screening tool with two modes — full intake and quick room recommendation — plus National ID reading, rule-based referral, patient history and dashboard analytics. Presented at AUCC Conference 2026. | Next.js, React, TypeScript, Laravel, PHP, MySQL |
| **PPK Asset Repair Management** | A repair-reporting and equipment-tracking platform used by the Digital Health Technology team: one timeline per report, discussion threads, staff-managed categories, live sound alerts and post-job ratings. | Laravel, PHP, MySQL, Vite |

The projects themselves live elsewhere; this repo only holds the site that describes them.

## How I work

The same four steps every time, and the site's process section says so:

1. **Understand the real workflow.** Watch what people actually do — the workarounds, the double entry, the step everyone dreads. That is the spec.
2. **Pick boring, proven tech.** Easy backups and dull migrations matter more than novelty on a system people depend on all day.
3. **Ship in thin slices.** One real workflow at a time, in front of users within a week or two.
4. **Leave it maintainable.** Readable code, decisions written down, and a handover.

## Details worth a look

- **One ground, one accent.** A single near-black (`#09090b`) across every section and one green accent (`#3edc8a`). Space Grotesk for headings, JetBrains Mono for labels, Inter for reading text.
- **The black-and-white tile isn't an image.** The marbled vortex in the hero mosaic is drawn on a canvas: a warped log-polar field evaluated per pixel, then shaded as a lit surface so the bands read as ridges.
- **The contribution grid is real data.** A server route fetches the public contribution calendar and caches it for an hour, so the browser never talks to the third-party host.
- **The mosaic keeps its shape on a phone.** The whole bento shrinks together, and every tile's corner radius scales with the tile so the proportions match the desktop layout.
- **Two looping strips, two temperaments.** The projects strip runs endlessly, pauses on hover and can be dragged; the tech wall in the stack section is purely decorative and ignores the pointer. Both stand still for visitors who prefer reduced motion.
- **Case-study screenshots open full size.** Body images on the project pages open in a lightbox; the hero image is deliberately left alone.
- **A cursor that pays attention.** A custom cursor grows over interactive elements.

## Built with

| | |
| --- | --- |
| Framework | Next.js 15 (App Router, Turbopack), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4, CSS Modules |
| Motion | Framer Motion, GSAP |
| Icons | react-icons, lucide-react |

## Where things live

```text
src/
  app/
    intro/               the long-form landing page
    (site)/home/         the compact portfolio
    (site)/projects/     the four case-study pages
    api/contributions/   cached GitHub contribution levels
    test*/               scratch pages for experiments
  components/
    intro/               contribution grid, tech wall, reveal helpers
    sections/            the sections of /home
    projects/            case-study helpers (image lightbox)
    ux/                  custom cursor, scroll-to-top
  styles/intro/          one CSS Module per intro section
public/                  images and fonts
```
