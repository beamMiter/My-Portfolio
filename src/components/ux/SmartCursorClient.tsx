// src/components/ux/SmartCursorClient.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";

// โหลดแบบ dynamic เพื่อหลีกเลี่ยง SSR error ใน Server Component (layout.tsx)
const SmartCursor = dynamic(
  () => import("./SmartCursor").then((m) => m.default),
  { ssr: false }
);

// ใช้ React.FC เพื่อให้ type JSX ชัดเจน
const SmartCursorClient: React.FC = () => {
  return <SmartCursor />;
};

export default SmartCursorClient;
