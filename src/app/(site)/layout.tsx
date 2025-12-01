import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmartCursorClient from "@/components/ux/SmartCursorClient";
import ScrollProgressToTopButton from "@/components/ux/ScrollProgressToTopButton";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmartCursorClient />
      <ScrollProgressToTopButton offset={250} />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
