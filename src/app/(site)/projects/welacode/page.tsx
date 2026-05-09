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
      <div className="mx-auto max-w-[1300px] px-6 md:px-10 lg:px-16 py-10">
        {/* Header */}
        <header className="mt-16 text-center">
          <h1 className="text-[clamp(30px,5vw,54px)] font-semibold leading-tight">
            WelaCode{" "}
            <span className="text-zinc-400">Full-Stack Web Application</span>
          </h1>
        </header>

        {/* Hero Image - อัปเกรดจุดนี้ */}
        <div className="mt-10 mx-auto max-w-5xl overflow-hidden rounded-lg ring-1 ring-white/5">
          <Image
            src="/images/projects/welacode-mockup1.webp"
            alt="WelaCode visual"
            width={1920}
            height={1080}
            className="h-auto w-full transition-opacity duration-700 opacity-0"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL={blurData}
            onLoadingComplete={(img) => img.classList.remove("opacity-0")}
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
              elaCode is a comprehensive full-stack web application designed to
              bridge the gap between sophisticated user interfaces and robust
              backend systems.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              The platform provides a complete solution for project management
              and service booking, featuring a seamless integration of modern
              frontend technologies with a scalable Node.js and Express backend,
              utilizing MongoDB for flexible data management.
            </p>

            <p className="mt-7 text-sm md:text-base leading-relaxed text-zinc-300">
              With a focus on performance and security, WelaCode implements
              advanced features such as real-time notifications, secure payment
              gateways, and automated workflow management.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="my-16 border-white/10" />

        {/* What it does */}
        <section className="mt-16">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-lg font-medium tracking-wide text-zinc-100">
              What it does
            </h3>
 
            <div className="mt-6 space-y-7 leading-relaxed text-zinc-300">
              <p>
                User access is streamlined through Google Login integration,
                ensuring a secure and frictionless entry point for clients to
                manage their profiles and projects.
              </p>
 
              <p>
                The application includes a comprehensive shopping cart system,
                allowing users to browse through service offerings, manage their
                selections, and prepare for a structured checkout process.
              </p>
 
              <p>
                A built-in appointment system enables clients to schedule project
                consultations directly through the platform. This facilitates
                clear communication and initial planning for software initiatives
                between the user and the development team.
              </p>
 
              <p>
                WelaCode features a secure payment gateway integration with Omise,
                supporting both Credit Card and PromptPay transactions. This provides
                a reliable and flexible financial experience for users during the
                checkout workflow.
              </p>
 
              <p>
                The platform maintains active engagement through an automated email
                notification system, sending personalized welcome messages,
                appointment confirmations, and digital receipts for all successful
                payments.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom images */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
          <Image
            src="/images/projects/welacode-mockup2.webp"
            alt="WelaCode mockup 2"
            width={2200}
            height={1400}
            className="h-auto w-full transition-opacity duration-700 opacity-0"
            onLoadingComplete={(img) => img.classList.remove("opacity-0")}
            quality={85}
            placeholder="blur"
            blurDataURL={blurData}
          />
          <Image
            src="/images/projects/welacode-mockup3.webp"
            alt="WelaCode mockup 3"
            width={2200}
            height={1400}
            className="h-auto w-full transition-opacity duration-700 opacity-0"
            onLoadingComplete={(img) => img.classList.remove("opacity-0")}
            quality={85}
            placeholder="blur"
            blurDataURL={blurData}
          />
        </div>

        {/* Divider before Tech */}
        <hr className="my-20 border-white/10" />

        {/* Tech Stack */}
        <TechStackClean items={["Next.js", "Node.js", "Express", "MongoDB", "TypeScript", "Omise"]} />

        <div className="h-20" />

        <div className="h-20" />
      </div>
    </main>
  );
}