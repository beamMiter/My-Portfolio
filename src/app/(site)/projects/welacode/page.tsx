import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WelaCode Group",
  description:
    "WelaCode is a software interface initiative built with Next.js and TypeScript.",
};

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

        {/* Hero Image */}
        <div className="mt-10 overflow-hidden rounded-lg ring-1 ring-white/5">
          <Image
            src="/images/projects/welacode1.png"
            alt="WelaCode visual"
            width={1920}
            height={1080}
            className="h-auto w-full"
            priority
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