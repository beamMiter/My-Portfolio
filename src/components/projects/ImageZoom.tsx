"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Wraps a case-study body image and makes it open full size in an overlay.
 *
 * The hero image at the top of each project page is deliberately left alone —
 * only the images further down (screens, mock-ups) get this. Pass the same
 * `src` the child <Image> uses; the overlay loads it at full resolution with a
 * plain <img> so nothing is downscaled.
 *
 * The overlay is rendered in a portal on <body> so it always covers the real
 * viewport — a page-transition transform on an ancestor would otherwise trap
 * `position: fixed` inside that box, which is what made the backdrop and the
 * close button unreachable. Closes on Escape, on any click (backdrop *or* the
 * image itself), or on the close button. Body scroll is locked while open.
 */
export default function ImageZoom({
  src,
  alt = "",
  children,
}: {
  src: string;
  alt?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // portals need the DOM; wait for the client before rendering one
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={`View ${alt || "image"} full size`}
        data-hover-expand
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="group relative block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        {children}
        <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
      </div>

      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[999] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-10"
            style={{ animation: "imgzoom-fade 150ms ease-out" }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="fixed right-4 top-4 z-[1000] flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg ring-1 ring-black/10 transition hover:scale-105 hover:bg-zinc-200 sm:right-6 sm:top-6"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-[88vh] max-w-[94vw] rounded-lg object-contain shadow-2xl"
            />
            <style>{`@keyframes imgzoom-fade{from{opacity:0}to{opacity:1}}`}</style>
          </div>,
          document.body,
        )}
    </>
  );
}
