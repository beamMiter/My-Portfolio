// app/layout.tsx
import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmartCursorClient from "@/components/ux/SmartCursorClient";

export const metadata: Metadata = {
  title: "TECHIN",
  description: "Portfolio • Systems • Workflows",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* เคอร์เซอร์พิเศษ */}
        <SmartCursorClient />

        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
