import React from "react";
import type { Metadata } from "next";
import SmartCursorClient from "@/components/ux/SmartCursorClient";
import ScrollProgressToTopButton from "@/components/ux/ScrollProgressToTopButton";

export const metadata: Metadata = {
  title: "Intro | TECHIN",
};

export default function IntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-black text-white">
      {children}
      <SmartCursorClient />
      <ScrollProgressToTopButton offset={250} />
    </section>
  );
}
