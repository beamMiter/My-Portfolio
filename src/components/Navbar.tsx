// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type LinkItem = { name: string; sectionId: string };

const LINKS: LinkItem[] = [
  { name: 'Home',      sectionId: 'home' },
  { name: 'What I do', sectionId: 'what-i-do' },
  { name: 'About',     sectionId: 'about' },
  { name: 'Portfolio', sectionId: 'portfolio' },
  { name: 'Contact',   sectionId: 'contact' },
];

const HOME_BASE = '/home';

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(' ');
}

/* -------------------- Reusable inner navbar (content only) -------------------- */
function NavInner({
  NavLinks,
  open,
  setOpen,
  onBrandClick,
  openGit,
  openLinkedIn,
  menuBtnRef,
}: {
  NavLinks: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onBrandClick: React.MouseEventHandler<HTMLAnchorElement>;
  openGit: () => void;
  openLinkedIn: () => void;
  menuBtnRef: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <nav
      aria-label="Primary"
      className="transition-colors duration-300 bg-transparent"
    >
      <div className="mx-auto max-w-[1200px] h-20 px-4 md:px-6 flex items-center justify-between">
        {/* Brand */}
        <Link
          href={HOME_BASE}
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
          <div
            className={cx(
              // ✅ ขอบเหลี่ยมขึ้น
              'rounded-[10px]',
              // ✅ สีพื้นหลังเทาสว่างขึ้น (จากเดิมดำจัด)
              'bg-neutral-800/70 backdrop-blur-sm',
              // ✅ ขอบ/เงาเบา ๆ คล้ายรูป
              'border border-white/10',
              'shadow-md shadow-black/40',
              // ✅ padding กล่องคงความกว้างรวมเดิม
              'px-5 py-3'
            )}
          >
            {/* ✅ เมนูชิดกันมากขึ้น */}
            <ul className="flex items-center gap-2">{NavLinks}</ul>
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
            ref={menuBtnRef}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(v => !v)}
            className={cx(
              'lg:hidden inline-flex h-10 w-10 items-center justify-center',
              // ✅ เหลี่ยมขึ้น
              'rounded-[10px]',
              // ✅ พื้นเทาสว่างขึ้น
              'bg-neutral-800/70 backdrop-blur-sm',
              'border border-white/10',
              'text-white/80 hover:text-white transition shadow-md shadow-black/40',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'
            )}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={cx(
          'lg:hidden overflow-hidden transition-[max-height,opacity] duration-300',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="mx-auto max-w-[1200px] px-4 pb-4">
          <div
            className={cx(
              // ✅ เหลี่ยมขึ้น
              'rounded-[10px]',
              // ✅ พื้นเทาสว่างขึ้น
              'bg-neutral-800/80 backdrop-blur-sm',
              'border border-white/10',
              'px-3 py-3',
              'shadow-md shadow-black/40'
            )}
          >
            <ul className="flex flex-col">{NavLinks}</ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ---------------------------------- Main ---------------------------------- */
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  // แยกมั่นใจว่า "home" คือ path ไหน
  const isHome = pathname === HOME_BASE;

  // fixed layer state (โผล่หลังหลุด hero)
  const [showFixed, setShowFixed] = useState<boolean>(!isHome);
  const [anim, setAnim] = useState(false);

  /* ---------- สลับ static/fixed ด้วย IntersectionObserver ---------- */
  useEffect(() => {
    if (!isHome) {
      // หน้าอื่นไม่มี hero ก็ให้ fixed โชว์ตลอด
      setShowFixed(true);
      setAnim(true);
      return;
    }

    const hero = document.getElementById('home');
    if (!hero) {
      setShowFixed(true);
      setAnim(true);
      return;
    }

    // ตอนเริ่มต้นบน hero → ยังไม่โชว์ fixed
    setShowFixed(false);
    setAnim(false);

    const io = new IntersectionObserver(
      ([entry]) => {
        const out = !entry.isIntersecting; // หลุดจอ = true
        if (out) {
          setShowFixed(true);
          // ให้ fixed ไหลลงมา
          requestAnimationFrame(() => setAnim(true));
        } else {
          // เลื่อนกลับขึ้นไปเห็น hero → fixed ค่อยไหลออก
          setAnim(false);
          setTimeout(() => setShowFixed(false), 250);
        }
      },
      {
        // เผื่อให้รู้สึกพ้น hero ประมาณสูง navbar
        rootMargin: '-80px 0px 0px 0px',
        threshold: 0,
      }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, [isHome]);

  /* ---------- ไฮไลต์เมนูตาม section เฉพาะหน้า home ---------- */
  useEffect(() => {
    if (!isHome) return;

    const els = LINKS.map(l => document.getElementById(l.sectionId)).filter(
      Boolean
    ) as HTMLElement[];
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target?.id;
        if (id) setActiveSection(id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.12, 0.3, 0.5] }
    );

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [isHome]);

  /* ---------- Navigation handlers ---------- */
  const goHomeTop = useCallback(() => {
    if (!isHome) {
      router.push(`${HOME_BASE}#home`);
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  }, [isHome, router]);

  const goSection = useCallback(
    (sectionId: string) => {
      setOpen(false);
      const hash = `#${sectionId}`;

      if (!isHome) {
        router.push(`${HOME_BASE}${hash}`);
        return;
      }

      if (sectionId === 'home') {
        goHomeTop();
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.location.hash !== hash) window.location.hash = hash;
      }
    },
    [isHome, goHomeTop, router]
  );

  const onBrandClick: React.MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    if (!isHome) {
      router.push(HOME_BASE);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openGit = () =>
    window.open('https://github.com/iMookatayou', '_blank', 'noopener,noreferrer');
  const openLinkedIn = () =>
    window.open('https://www.linkedin.com/in/yourname', '_blank', 'noopener,noreferrer');

  const currentSectionId = isHome ? activeSection : null;

  const NavLinks = useMemo(
    () =>
      LINKS.map(item => {
        const isActive = isHome && currentSectionId === item.sectionId;
        return (
          <li key={item.sectionId}>
            <button
              type="button"
              onClick={() => goSection(item.sectionId)}
              className={cx(
                'group relative inline-flex items-center',
                // ✅ เมนูชิดกันมากขึ้น (ลด padding)
                'px-2.5 py-1.5 rounded-[8px] transition',
                // ✅ ฟอนต์คงโทนเดิม แต่ไม่แตะ animation
                'text-sm font-semibold tracking-[0.02em]',
                // (ยังคง uppercase ตามของเดิมไว้ ถ้าคุณอยากให้เหมือนภาพมากขึ้นให้ลบ uppercase เองได้)
                'uppercase',
                isActive ? 'text-white' : 'text-gray-300 hover:text-white'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* ✅ ไม่ลบ AnimatedText ตามที่สั่ง */}
              <AnimatedText text={item.name} />
            </button>
          </li>
        );
      }),
    [currentSectionId, goSection, isHome]
  );

  return (
    <>
      {/* ชั้นที่ 1: Static/Absolute ติดกับ hero (เฉพาะหน้า /home) */}
      {isHome && (
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
          <div className="pointer-events-auto">
            <NavInner
              NavLinks={NavLinks}
              open={open}
              setOpen={setOpen}
              onBrandClick={onBrandClick}
              openGit={openGit}
              openLinkedIn={openLinkedIn}
              menuBtnRef={menuBtnRef}
            />
          </div>
        </div>
      )}

      {/* ชั้นที่ 2: Fixed ลอยหัวจอเมื่อเลื่อนพ้น hero */}
      {showFixed && (
        <div
          className={cx(
            'fixed top-0 left-0 right-0 z-40',
            'transition-all duration-300 ease-out',
            anim ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
          )}
        >
          <NavInner
            NavLinks={NavLinks}
            open={open}
            setOpen={setOpen}
            onBrandClick={onBrandClick}
            openGit={openGit}
            openLinkedIn={openLinkedIn}
            menuBtnRef={menuBtnRef}
          />
        </div>
      )}
    </>
  );
}

function AnimatedText({ text }: { text: string }) {
  return (
    <span aria-hidden className="inline-block">
      {Array.from(text).map((ch, i) => {
        const char = ch === ' ' ? '\u00A0' : ch;
        const tilt = i % 2 === 0 ? '-rotate-[2deg]' : 'rotate-[2deg]';
        return (
          <span
            key={i}
            className={cx(
              'inline-block will-change-transform transition-transform duration-200',
              'group-hover:-translate-y-1 group-hover:scale-[1.06]',
              `group-hover:${tilt}`
            )}
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

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
      className={cx(
        'inline-flex h-10 w-10 items-center justify-center rounded-full',
        'bg-neutral-800/70 backdrop-blur-sm',
        'border border-white/10',
        'text-white/80 hover:text-white transition',
        'shadow-md shadow-black/40',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'
      )}
    >
      {children}
    </button>
  );
}
