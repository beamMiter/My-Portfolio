import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PPK Asset Repair Management System Case Study",
  description:
    "Hospital repair and asset management system for reporting issues, triaging work, and tracking service history.",
};

export default function PpkAssetRepairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
