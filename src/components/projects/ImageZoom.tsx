"use client";

import { useEffect, useState } from "react";

/**
 * Wraps a case-study body image and makes it open full size in an overlay.
 *
 * The hero image at the top of each project page is deliberately left alone —
 * only the images further down (screens, mock-ups) get this. Pass the same
 * `src` the child <Image> uses; the overlay loads it at full resolution with a
 * plain <img> so nothing is downscaled.
 *
 * Closes on Escape, on a backdrop click, or on the X. Body scroll is locked
 * while it's open.
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

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          style={{ animation: "imgzoom-fade 150ms ease-out" }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition hover:bg-white/20"
          >
            &times;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
          />
          <style>{`@keyframes imgzoom-fade{from{opacity:0}to{opacity:1}}`}</style>
        </div>
      )}
    </>
  );
}
