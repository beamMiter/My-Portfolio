"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { PdfKind } from "./buildPdf";

const FILES: Record<PdfKind, string> = {
  resume: "Techin-Jetsribumrung-Resume.pdf",
  cv: "Techin-Jetsribumrung-CV.pdf",
};

type State = "idle" | "busy" | "failed";

/** The solid white button of the pair; the PDF is built on click. */
export default function DownloadPdfButton({
  kind,
  label,
}: {
  kind: PdfKind;
  label: string;
}) {
  const [state, setState] = useState<State>("idle");

  const onClick = async () => {
    if (state === "busy") return;
    // a chunk that failed to load stays failed for the life of the page (no new
    // request goes out), so the only retry that can work is a fresh page
    if (state === "failed") {
      window.location.reload();
      return;
    }
    setState("busy");
    try {
      const { buildPdfBlob } = await import("./buildPdf");
      const blob = await buildPdfBlob(kind);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = FILES[kind];
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      setState("idle");
    } catch {
      setState("failed");
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state === "busy"}
      aria-live="polite"
      className="inline-flex h-12 min-w-[150px] cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-white px-7 text-[15px] text-zinc-900 transition-colors duration-200 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b] disabled:cursor-wait disabled:opacity-60"
    >
      {state === "busy" && (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      {state === "busy" ? "Preparing" : state === "failed" ? "Reload to retry" : label}
    </button>
  );
}
