"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";

type Project = {
  title: string;
  image: string;
  tech: string[];
  path?: string;
  href?: string;
  logo?: string;
};

const projects: Project[] = [
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
  },
  {
    title: "WelaCode",
    image: "/images/projects/welacode-mockup1.webp",
    tech: ["Next.js", "Node.js", "Express", "Neon", "Railway"],
    href: "/projects/welacode",
  },
];

const isOpenable = (p: Project) => !!p.path || hasValidHref(p.href);

/**
 * Anything still "Internal / Coming soon" sinks to the end, so the strip always
 * leads with work you can actually open. Sort is stable, so each group keeps
 * the order written above — and a future placeholder drops back on its own.
 */
const ordered = [...projects].sort(
  (a, b) => Number(isOpenable(b)) - Number(isOpenable(a))
);

/** three copies so the strip can wrap seamlessly in either direction */
const COPIES = 3;
const loopItems = Array.from({ length: COPIES }, () => ordered).flat();

/** marquee speed in px per second — time-based, so it runs the same on a
 *  60Hz and a 120Hz screen */
const SPEED = 45;

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

/** fades both ends into the page instead of a solid-colour overlay, so it
 *  doesn't need to know the section's background */
const EDGE_FADE =
  "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)";

function TechChip({
  children,
  canHover = true,
}: {
  children: React.ReactNode;
  canHover?: boolean;
}) {
  if (!canHover) {
    return (
      <span className="text-[13px] font-medium text-zinc-500">{children}</span>
    );
  }

  return (
    <span className="relative text-[13px] font-medium text-zinc-500 transition-all duration-300 group-hover:text-emerald-400 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 group-hover:after:w-full">
      {children}
    </span>
  );
}

function hasValidHref(href?: string) {
  if (!href) return false;
  const v = href.trim();
  if (!v || v === "#") return false;
  return true;
}

/**
 * Projects marquee — normal-height section, no pinning, no scroll runway.
 *
 * It's a real scroll container rather than a CSS ticker, so the reader can take
 * over at any time: hovering stops the run, and from there it can be dragged,
 * flicked, trackpad-scrolled or swiped, then it picks the run back up on the
 * way out. The list is rendered three times and scrollLeft is parked inside the
 * middle copy, so crossing a seam jumps by exactly one set's width and is
 * invisible — it loops forever both ways. No dots, arrows or labels: the motion
 * and the faded edges are the only cue.
 */
export default function ProjectsSection() {
  const router = useRouter();
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const ready = useRef(false);
  const drag = useRef({ on: false, startX: 0, startLeft: 0, moved: false });

  const openProject = (p: Project) => {
    if (p.path) {
      router.push(p.path);
      return;
    }
    if (hasValidHref(p.href)) {
      window.location.href = p.href!;
    }
  };

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const setWidth = () => {
      const a = el.children[0] as HTMLElement | undefined;
      const b = el.children[projects.length] as HTMLElement | undefined;
      return a && b ? b.offsetLeft - a.offsetLeft : 0;
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      // clamp so a backgrounded tab doesn't resume with one huge jump
      const dt = Math.min(now - last, 50) / 1000;
      last = now;

      const w = setWidth();
      if (w > 0) {
        if (!ready.current) {
          el.scrollLeft = w;
          ready.current = true;
        }
        if (!paused.current && !drag.current.on && !reduce) {
          el.scrollLeft += SPEED * dt;
        }
        // keep the viewport parked inside the middle copy
        if (el.scrollLeft >= w * 2) el.scrollLeft -= w;
        else if (el.scrollLeft < w * 0.5) el.scrollLeft += w;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // no setPointerCapture here — capturing on pointerdown retargets pointerup to
  // the scroller, so a plain press on a card never synthesises a `click` and
  // the project won't open. A drag is still tracked purely from coordinates.
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current.moved = false;
    if (e.pointerType !== "mouse") return;
    const el = scroller.current;
    if (!el) return;
    drag.current = {
      on: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.on) return;
    const el = scroller.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    if (drag.current.moved) el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = () => {
    drag.current.on = false;
  };

  return (
    <section
      id="portfolio"
      className="scroll-mt-28 py-16 relative z-10 text-white"
      aria-label="Projects"
    >
      <div className="mx-auto max-w-[1500px] px-8">
        <p className="text-center text-[clamp(12px,1vw,15px)] uppercase tracking-[0.3em] text-white/45">
          MY PORTFOLIO
        </p>
        <h2 className="mt-3 text-center text-[clamp(26px,3.6vw,38px)] font-medium leading-snug tracking-[-0.015em] text-white">
          See My Works
        </h2>
      </div>

      <div
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={() => {
          paused.current = false;
          endDrag();
        }}
        onMouseEnter={() => (paused.current = true)}
        style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
        className="mt-12 flex gap-7 overflow-x-auto overscroll-x-contain px-7 pb-2 cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loopItems.map((p, i) => {
          const copy = Math.floor(i / projects.length);
          const isClone = copy > 0;
          const headingId = `project-${i}`;
          const canOpen = isOpenable(p);

          return (
            <article
              key={`${p.title}-${copy}`}
              aria-hidden={isClone || undefined}
              /* SmartCursor keys off this — the clones carry no role (so AT
                 doesn't read the list three times), and without it the cursor
                 stayed flat over most of the strip. */
              data-hover-expand={canOpen || undefined}
              className={[
                "group relative shrink-0 select-none overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm",
                "flex h-[430px] w-[78vw] max-w-[340px] flex-col sm:w-[340px] lg:w-[380px]",
                canOpen
                  ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                  : "cursor-default",
              ].join(" ")}
              aria-labelledby={isClone ? undefined : headingId}
              role={canOpen && !isClone ? "button" : undefined}
              tabIndex={canOpen && !isClone ? 0 : -1}
              onClick={() => {
                if (drag.current.moved || !canOpen) return;
                openProject(p);
              }}
              onKeyDown={(e) => {
                if (canOpen && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  openProject(p);
                }
              }}
            >
              <div className="relative h-60 w-full overflow-hidden bg-zinc-800">
                <Image
                  src={p.image}
                  alt={isClone ? "" : p.title}
                  fill
                  draggable={false}
                  className="object-cover opacity-0 transition-opacity duration-700"
                  onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                  sizes="(min-width:1024px) 380px, (min-width:640px) 340px, 78vw"
                  priority={i < 3}
                  quality={85}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />

                {p.logo && (
                  <div className="absolute right-4 top-4 z-20 drop-shadow-md">
                    <div className="relative h-[45px] w-[90px]">
                      <Image
                        src={p.logo}
                        alt=""
                        fill
                        draggable={false}
                        className="object-contain object-right-top opacity-0 transition-opacity duration-700"
                        onLoad={(e) =>
                          e.currentTarget.classList.remove("opacity-0")
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="flex flex-grow flex-col p-6">
                <h3
                  id={isClone ? undefined : headingId}
                  title={p.title}
                  className="line-clamp-2 text-base font-semibold text-white sm:text-lg"
                >
                  {p.title}
                </h3>

                <div className="mt-auto pt-5">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    {p.tech.map((t, idx) => (
                      <TechChip key={`${t}-${idx}`} canHover={canOpen}>
                        {t}
                      </TechChip>
                    ))}
                  </div>

                  <div className="mt-6">
                    {canOpen ? (
                      <div className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400">
                        View <ExternalLink className="h-4 w-4" />
                      </div>
                    ) : (
                      <span className="text-sm font-medium italic text-zinc-600">
                        Internal / Coming soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
