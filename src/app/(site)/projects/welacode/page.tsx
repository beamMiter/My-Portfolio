"use client";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// หมายเหตุ: Metadata ต้องอยู่ใน Server Component หรือแยกไฟล์ 
// ถ้าไฟล์นี้เป็น "use client" ให้ย้าย Metadata ออกไปไว้ที่ layout หรือไฟล์ page หลัก

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <h3 className="text-lg font-medium tracking-wide text-zinc-100">
        {title}
      </h3>
      <div className="mt-6 text-zinc-300 leading-relaxed">{children}</div>
    </section>
  );
}

function TechStackClean({ items }: { items: string[] }) {
  return (
    <section className="mt-16">
      <div className="mx-auto max-w-4xl text-center">
        <h3 className="text-lg font-medium tracking-wide text-zinc-100">
          Tech Stack
        </h3>

        <div className="mt-6 flex flex-wrap justify-center items-center text-sm text-zinc-300">
          {items.map((tech, index) => (
            <div key={tech} className="flex items-center">
              <span className="px-4">{tech}</span>
              {index !== items.length - 1 && (
                <span className="h-4 w-px bg-white/15" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WelaCodePage() {
  // ตัวอย่าง Base64 ของรูปเบลอ (ปกติจะใช้เครื่องมือ gen หรือดึงจากระบบหลังบ้าน)
  const blurData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+ZNPQAIXwMwFByNxgAAAABJRU5ErkJggg==";

  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-14 py-10">
        {/* Header */}
        <header className="mt-16 text-center">
          <h1 className="text-[clamp(30px,5vw,54px)] font-semibold leading-tight">
            WelaCode{" "}
            <span className="text-zinc-400">Software Interface Initiative</span>
          </h1>
        </header>

        {/* Hero Image - อัปเกรดจุดนี้ */}
        <div className="mt-10 overflow-hidden rounded-lg ring-1 ring-white/5 bg-zinc-900">
          <Image
            src="/images/projects/welacode.avif"
            alt="WelaCode visual"
            width={1920}
            height={1080}
            className="h-auto w-full transition-opacity duration-500" // เพิ่ม Transition ให้ตอนรูปจริงมาแล้วไม่กระชาก
            priority // สำคัญมากสำหรับรูปบนสุด
            placeholder="blur" // เปิดโหมดเบลอ
            blurDataURL={blurData} // รูปจิ๋วที่จะให้โชว์ก่อน
            onLoadingComplete={(img) => img.classList.remove("opacity-0")} // ค่อยๆ เฟดเข้า
          />
        </div>

        {/* Intro */}
        <section className="mt-16">
          <div className="mx-auto max-w-4xl text-zinc-200">
            <p className="text-base md:text-lg leading-relaxed">
              <span
                className="float-left mr-4 mt-1 text-white font-medium leading-none text-[clamp(42px,4.4vw,60px)]"
                style={{ lineHeight: "2.5rem" }}
              >
                W
              </span>
              elaCode is currently focused on building structured and reliable
              user interface systems using modern web technologies.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              The purpose of this initiative is to design and demonstrate
              scalable interface architecture and maintainable frontend
              engineering patterns.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              Future development will expand the project toward full system
              integration including backend services and transaction handling.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="my-16 border-white/10" />

        <Section title="Current Scope">
          <p>
            Focused on structured UI architecture, responsive layout systems,
            and reusable component design.
          </p>
        </Section>

        <Section title="Future Development">
          <p>
            Planned expansion includes secure backend integration, data
            persistence, and scalable API infrastructure.
          </p>
        </Section>

        {/* Divider before Tech */}
        <hr className="my-20 border-white/10" />

        {/* Tech Stack */}
        <TechStackClean items={["Next.js", "TypeScript"]} />

        {/* Bottom Divider + Link */}
        <div className="mt-16">
          <hr className="border-white/10" />
          <div className="mt-4 flex justify-end">
            <Link
              href="https://wela-code.vercel.app/"
              target="_blank"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition"
            >
              wela-code.vercel.app
            </Link>
          </div>
        </div>

        <div className="h-20" />
      </div>
    </main>
  );
}