import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // เพิ่มบรรทัดนี้
  images: {
    unoptimized: true, // แนะนำให้ใส่ด้วย เพราะ GitHub Pages ไม่รองรับ Image Optimization ของ Next.js
  },
  basePath: '/intro', 
};

export default nextConfig;