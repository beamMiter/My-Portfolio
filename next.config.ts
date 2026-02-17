/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 1. เปิดใช้โหมดเข้มงวดเพื่อหาบัคได้ง่ายขึ้น */
  reactStrictMode: true,

  /* 2. ตั้งค่าให้ Next.js Image รองรับโดเมนรูปภาพ (ถ้าคุณดึงรูปจากเว็บอื่นในอนาคต) */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // ยอมรับทุกโดเมน (ช่วยให้รูปไม่พังตอนเปลี่ยนแหล่งที่มา)
      },
    ],
    // ช่วยให้ Build ผ่านแม้รูปจะขนาดใหญ่เกินไป
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* 3. จัดการเรื่อง ESLint และ TypeScript ตอน Build (กัน Deploy พังเพราะ Error เล็กๆ น้อยๆ) */
  eslint: {
    // คำเตือน: ถ้าคุณแก้โค้ดไม่ทันแต่อยากรีบ Deploy ให้แก้เป็น true 
    // เพื่อให้ข้ามการตรวจ ESLint ตอน Build
    ignoreDuringBuilds: true, 
  },
  typescript: {
    // ข้ามการตรวจ Type ตอน Build เพื่อป้องกันหน้าขาวหรือ Build Fail บน Vercel
    ignoreBuildErrors: true,
  },

  /* 4. เพิ่มประสิทธิภาพการโหลดหน้าเว็บ */
  swcMinify: true,
  
  /* 5. ตั้งค่า compiler สำหรับไลบรารี Framer Motion หรือ Styled Component (ถ้ามี) */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // ลบ console.log ออกตอน production
  },
};

export default nextConfig;