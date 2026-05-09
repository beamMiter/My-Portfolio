"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type Service = {
  iconSrc: string;
  title: string;
  desc: string;
  alt?: string;
};

const services: Service[] = [
  {
    iconSrc: "/images/api.png",
    title: "Web Development",
    desc: "I've created comprehensive web applications and large-scale systems, including chatbot platforms and interactive live chat solutions for businesses and general users.",
    alt: "Web Development",
  },
  {
    iconSrc: "/images/database.png",
    title: "Database & API Design",
    desc: "Architect efficient database schemas with optimized indexing, normalization strategies, and query performance tuning. Build robust RESTful and GraphQL APIs with proper authentication, rate limiting, and scalable backend architectures.",
    alt: "Database & API Design",
  },
  {
    iconSrc: "/images/ux-design.png",
    title: "UX/UI Design",
    desc: "Design end-to-end user experiences from research, personas, and user flows to pixel-perfect interfaces with attention to typography, color theory, and visual hierarchy. Focus on usability testing and iterative improvements.",
    alt: "UX/UI Design",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="what-i-do"
      className="scroll-mt-28 py-16 relative z-10 border-b border-white/5"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-white/45">
            My Services
          </p>
          <h2 className="mt-3 text-[clamp(26px,3.6vw,38px)] font-medium leading-snug tracking-[-0.015em] text-white">
            My <span className="text-[#3edc8a]">Expertise</span>
          </h2>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-zinc-900/20 border border-white/5 backdrop-blur-sm px-8 py-10 min-h-[340px] hover:bg-zinc-900/40 transition-colors duration-300"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                  <Image
                    src={s.iconSrc}
                    alt={s.alt || s.title}
                    width={48}
                    height={48}
                    className="object-contain"
                    priority={i < 2}
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(79%) sepia(27%) saturate(835%) hue-rotate(84deg) brightness(101%) contrast(92%)",
                    }}
                  />
                </div>
                <h3 className="text-[18px] font-semibold text-white">
                  {s.title}
                </h3>
              </div>
              
              <p className="text-[15px] leading-relaxed text-zinc-400">
                {s.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}