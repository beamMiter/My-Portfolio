"use client";

import { useState } from "react";
import Image from "next/image";
import { PROFILE, SKILLS, timeline } from "@/data/profile";
import DownloadPdfButton from "@/components/cv/DownloadPdfButton";

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

            <div className="mt-8 flex flex-wrap gap-4">
              <DownloadPdfButton kind="cv" label="Request CV" />
              <a
                href="#contact"
                className="inline-flex h-12 min-w-[150px] items-center justify-center rounded-[6px] border border-white px-7 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
              >
                Hire Me!
              </a>
            </div>

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
