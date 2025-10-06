"use client";

import {
  Mail,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Github,
  Zap,
} from "lucide-react";

export default function ContactSection() {
  const contacts = [
    { icon: Mail, label: "Email", href: "mailto:jetsribumrungtechin@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/fenyb" },
    { icon: Github, label: "GitHub", href: "https://github.com/iMookatayou" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/fenyb_" },
    { icon: Twitter, label: "Twitter (X)", href: "https://twitter.com/fenyb_" },
    { icon: Facebook, label: "Facebook", href: "https://facebook.com/fenyb" },
    { icon: Zap, label: "Fastwork", href: "https://fastwork.co/user/fenyb_" },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-28 py-20 bg-[#0d0f11] border-t border-white/10"
    >
      <div className="mx-auto max-w-[900px] px-6">
        <h2 className="text-3xl md:text-4xl font-black text-white text-center">
          Contact
        </h2>

        {/* ===== รายการพร้อมเส้นแบ่ง ===== */}
        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {contacts.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-4 hover:bg-white/5 px-2 md:px-4 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-emerald-300" />
                <span className="text-zinc-200 hover:text-white">{label}</span>
              </div>
              <span className="text-zinc-500 text-sm">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
