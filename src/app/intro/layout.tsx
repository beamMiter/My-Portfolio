import React from "react";
import type { Metadata } from "next";
import SmartCursorClient from "@/components/ux/SmartCursorClient";
import ScrollProgressToTopButton from "@/components/ux/ScrollProgressToTopButton";
import { IntroUIProvider } from "@/components/intro/IntroUIContext";
import IntroLangSwitch from "@/components/intro/IntroLangSwitch";

export const metadata: Metadata = {
  title: "JETSRI DEV LOG",
};

export default function IntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IntroUIProvider>
      <section className="min-h-screen bg-[#0b0b0b] text-zinc-50 relative">
        {children}
        <IntroLangSwitch />
        <SmartCursorClient />
        <ScrollProgressToTopButton offset={250} />
      </section>
    </IntroUIProvider>
  );
}
