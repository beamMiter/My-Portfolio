// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

type LinkItem = { name: string; sectionId: string };

const LINKS: LinkItem[] = [
  { name: 'Home',      sectionId: 'home' },
  { name: 'What I do', sectionId: 'what-i-do' },
  { name: 'About',     sectionId: 'about' },
  { name: 'Portfolio', sectionId: 'portfolio' },
  { name: 'Contact',   sectionId: 'contact' },
];

const HOME_BASE = '/Home';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // shadow/blur on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  // observe sections (เฉพาะตอนอยู่หน้า /Home)
  useEffect(() => {
    if (pathname !== HOME_BASE) return;

    const ids = LINKS.map(l => l.sectionId);
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      entries => {
        const vis = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = vis[0]?.target?.id;
        if (top) setActiveSection(top);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0.1, 0.25, 0.5] }
    );

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);

  // ====== Navigation handlers ======

  const goHomePage = useCallback(() => {
    setOpen(false);
    if (pathname !== HOME_BASE) {
      router.push(HOME_BASE);
      return;
    }
    history.replaceState(null, '', `${HOME_BASE}#home`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  }, [pathname, router]);

  const goSection = useCallback(
    (sectionId: string) => {
      setOpen(false);

      if (sectionId === 'home') {
        goHomePage();
        return;
      }

      const hash = `#${sectionId}`;
      const target = `${HOME_BASE}${hash}`;

      if (pathname !== HOME_BASE) {
        router.push(target);
        return;
      }

      if (window.location.hash !== hash) {
        history.replaceState(null, '', target);
      }
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    [pathname, router, goHomePage]
  );

  const onBrandClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openGit = () => window.open('https://github.com/iMookatayou', '_blank', 'noopener,noreferrer');
  const openLinkedIn = () => window.open('https://www.linkedin.com/in/yourname', '_blank', 'noopener,noreferrer');

  return (
    <nav
      aria-label="Primary"
      className={[
        'sticky top-0 z-50 transition-all',
        'backdrop-blur supports-[backdrop-filter]:bg-black/35',
        scrolled
          ? 'bg-black/60 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,.15)]'
          : 'bg-black/45 border-b border-transparent',
      ].join(' ')}
    >
      <div className="mx-auto max-w-[1200px] h-20 px-4 md:px-6 flex items-center justify-between">
        {/* Brand → ไปหน้าแรก '/' */}
        <Link
          href="/"
          onClick={onBrandClick}
          className="relative inline-flex items-center gap-2 font-black tracking-[0.18em] text-white"
          aria-label="TECHIN — go to landing"
        >
          <span className="text-xl">TECHIN</span>
          <span className="hidden md:inline-block h-[18px] w-px bg-white/15" />
          <span className="hidden md:inline-block text-[10px] tracking-[0.3em] text-white/60">
            PORTFOLIO
          </span>
        </Link>

        {/* Center nav (desktop) */}
        <div className="hidden lg:flex">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 shadow-inner shadow-black/30">
            <ul className="flex items-center gap-1">
              {LINKS.map((item) => {
                const isActive = pathname === HOME_BASE && activeSection === item.sectionId;
                return (
                  <li key={item.sectionId}>
                    <button
                      type="button"
                      onClick={() => goSection(item.sectionId)}
                      className={[
                        'group relative inline-flex items-center px-3.5 py-2 rounded-xl transition',
                        'text-sm font-semibold uppercase tracking-wide',
                        isActive ? 'text-white' : 'text-gray-300 hover:text-white',
                      ].join(' ')}
                    >
                      <AnimatedText text={item.name} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <IconBtn label="LinkedIn" onClick={openLinkedIn}>
            <Linkedin className="h-6 w-6" />
          </IconBtn>
          <IconBtn label="GitHub" onClick={openGit}>
            <Github className="h-6 w-6" />
          </IconBtn>

          {/* mobile menu button */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(v => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:text-white transition"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          'lg:hidden overflow-hidden transition-[max-height,opacity] duration-300',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="mx-auto max-w-[1200px] px-4 pb-4">
          <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur px-3 py-3">
            <ul className="flex flex-col">
              {LINKS.map((item) => {
                const isActive = pathname === HOME_BASE && activeSection === item.sectionId;
                return (
                  <li key={item.sectionId}>
                    <button
                      type="button"
                      onClick={() => goSection(item.sectionId)}
                      className={[
                        'w-full flex items-center justify-between rounded-xl px-3 py-3 transition text-left',
                        isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white hover:bg-white/5',
                      ].join(' ')}
                    >
                      <span>{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

/** ตัวหนังสือเด้งเป็นคลื่นตอน hover (ไม่ใช้ lib เพิ่ม) */
function AnimatedText({ text }: { text: string }) {
  return (
    <span aria-hidden className="inline-block">
      {Array.from(text).map((ch, i) => {
        const char = ch === ' ' ? '\u00A0' : ch;
        const tilt = i % 2 === 0 ? '-rotate-[2deg]' : 'rotate-[2deg]';
        return (
          <span
            key={i}
            className={[
              'inline-block will-change-transform transition-transform duration-200',
              'group-hover:-translate-y-1 group-hover:scale-[1.06]',
              `group-hover:${tilt}`,
            ].join(' ')}
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

/** Small round icon button (ขยายขนาดให้พอดีกับ navbar h-20) */
function IconBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
    >
      {children}
    </button>
  );
}
