"use client";
import {
  Mail,
  Instagram,
  Linkedin,
  Github,
  Briefcase,
} from "lucide-react";

type ContactIcon = {
  icon: React.ElementType;
  label: string;
  href: string;
};

const contacts: ContactIcon[] = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:jetsribumrungtechin@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fenyb",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/iMookatayou",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/fenyb_",
  },
  {
    icon: Briefcase,
    label: "Freelance",
    href: "https://your-freelance-link.com", // อย่าลืมแก้ลิงก์จริง
  },
];

export default function ContactSection() {
  return (
    // แก้ไขตรงนี้: ลบ bg-[#101214] ออก
    <section id="contact" className="scroll-mt-28 py-20">
      <div className="mx-auto max-w-[900px] px-6 text-center">
        
        {/* เพิ่มเส้นคั่นด้านบนให้เหมือน Footer (Optional: ถ้าอยากให้มีขอบเขตชัดเจน) */}
        {/* <div className="h-px bg-white/15 mb-16 mx-auto max-w-xs" /> */}

        {/* Header */}
        <p className="text-xs tracking-[0.3em] uppercase text-white/50">
          Get in Touch
        </p>
        <h2 className="mt-3 text-[clamp(26px,3.6vw,38px)] font-medium tracking-[-0.015em] text-white">
          Contact <span className="text-white">Me</span>
        </h2>

        {/* Icons only */}
        <div className="mt-12 flex items-center justify-center gap-8">
          {contacts.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? "_self" : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={label}
              title={label}
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <Icon
                size={22}
                // สีเริ่มต้นขาวจางๆ (white/60) -> โฮเวอร์แล้วขาวจั๊วะ (white)
                className="text-white/60 hover:text-white transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}