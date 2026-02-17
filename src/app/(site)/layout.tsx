import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import SmartCursorClient from "@/components/ux/SmartCursorClient";
import ScrollProgressToTopButton from "@/components/ux/ScrollProgressToTopButton";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative selection:bg-cyan-500/30">
      <SmartCursorClient />
      <ScrollProgressToTopButton offset={250} />
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}