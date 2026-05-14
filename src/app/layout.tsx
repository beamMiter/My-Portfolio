import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "JetSri - Dev",
  description: "Personal portfolio of Techin Jetsribumrung",
  icons: {
    icon: "/favicon-square.png",
    shortcut: "/favicon-square.png",
    apple: "/favicon-square.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}