'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type LinkItem = { name: string; sectionId: string };

const LINKS: LinkItem[] = [
  { name: 'Home', sectionId: 'home' },
  { name: 'What I do', sectionId: 'what-i-do' },
  { name: 'About', sectionId: 'about' },
  { name: 'Portfolio', sectionId: 'portfolio' },
  { name: 'Contact', sectionId: 'contact' },
];

const HOME_BASE = '/home';
const NAV_BG = '#161616';
const DEV_GREEN = '#22c55e';

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(' ');
}

type NavInnerProps = {
  NavLinks: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onBrandClick: React.MouseEventHandler<HTMLAnchorElement>;
  openGit: () => void;
  openLinkedIn: () => void;
  menuBtnRef: React.RefObject<HTMLButtonElement | null>;
};

function WaveText({ text, active }: { text: string; active: boolean }) {
  return (
    <span className={cx('inline-flex', active ? 'text-white' : 'text-white/80')} aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className="wave-char inline-block"
          style={{ animationDelay: `${i * 22}ms` }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

function NavInner({
  NavLinks,
  open,
  setOpen,
  onBrandClick,
  openGit,
  openLinkedIn,
  menuBtnRef,
}: NavInnerProps) {
  return (
    <nav aria-label="Primary">
      <div className="mx-auto max-w-[1500px] h-20 px-4 sm:px-6 md:px-10 lg:px-12 flex items-center justify-between">
        <Link
          href="/intro"
          onClick={onBrandClick}
          className="relative inline-flex items-center"
          aria-label="Jetsribumrung — go to intro"
        >
          <Image
            src="/images/jetsribumrung.png"
            alt="Jetsribumrung Logo"
            width={160}
            height={50}
            priority
            className="h-28 w-auto object-contain transition-opacity duration-700 opacity-0"
            onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
          />
        </Link>

        <div className="hidden lg:flex flex-1 justify-center">
          <div
            className="rounded-[6px] py-3 w-[min(920px,100%)] px-10 xl:px-16"
            style={{ backgroundColor: NAV_BG }}
          >
            <ul className="flex items-center justify-center gap-5 xl:gap-7">{NavLinks}</ul>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <button
            type="button"
            aria-label="LinkedIn"
            onClick={openLinkedIn}
            className="transition-all duration-300 hover:scale-110"
          >
            <Image
              src="/svg/linkedin.svg"
              alt="LinkedIn"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </button>
 
          <button
            type="button"
            aria-label="GitHub"
            onClick={openGit}
            className="transition-all duration-300 hover:scale-110"
          >
            <Image
              src="/svg/github-svgrepo-com.svg"
              alt="GitHub"
              width={44}
              height={44}
              className="h-11 w-11"
            />
          </button>

          <button
            ref={menuBtnRef}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(v => !v)}
            className={cx(
              'lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md transition',
              'text-white/80 hover:text-white',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40'
            )}
            style={{ backgroundColor: NAV_BG }}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cx(
          'lg:hidden overflow-hidden transition-[max-height,opacity] duration-300',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10 pb-4">
          <div className="rounded-[6px] px-4 py-3" style={{ backgroundColor: NAV_BG }}>
            <ul className="flex flex-col gap-1">{NavLinks}</ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  const isHome = pathname === HOME_BASE;

  const [showFixed, setShowFixed] = useState<boolean>(!isHome);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (!isHome) {
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

    setShowFixed(false);
    setAnim(false);

    const io = new IntersectionObserver(
      ([entry]) => {
        const out = !entry.isIntersecting;
        if (out) {
          setShowFixed(true);
          requestAnimationFrame(() => setAnim(true));
        } else {
          setAnim(false);
          setTimeout(() => setShowFixed(false), 250);
        }
      },
      { rootMargin: '-80px 0px 0px 0px', threshold: 0 }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, [isHome]);

  const goSection = useCallback(
    (sectionId: string) => {
      setOpen(false);
      setActiveSection(sectionId);

      const hash = `#${sectionId}`;

      if (!isHome) {
        router.push(`${HOME_BASE}${hash}`);
        return;
      }

      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [isHome, router]
  );

  const onBrandClick: React.MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    setOpen(false);
    // เปลี่ยนตรงนี้ให้ไปที่หน้า /intro แทนการเลื่อนขึ้น
    router.push('/intro');
  };

  const openGit = () => window.open('https://github.com/beamMiter', '_blank', 'noopener,noreferrer');

  const openLinkedIn = () =>
    window.open('https://www.linkedin.com/in/techin-jetsribumrung-9a4069364/', '_blank', 'noopener,noreferrer');

  const NavLinks = useMemo(
    () =>
      LINKS.map(item => {
        const isActive = activeSection === item.sectionId;

        return (
          <li key={item.sectionId}>
            <button
              type="button"
              onClick={() => goSection(item.sectionId)}
              className="nav-item group relative text-[14px] font-medium px-0.5 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40 rounded"
              aria-label={item.name}
            >
              <WaveText text={item.name} active={isActive} />
            </button>
          </li>
        );
      }),
    [activeSection, goSection]
  );

  return (
    <>
      <style jsx global>{`
        .nav-item:hover .wave-char {
          animation-name: textWaveOnce;
          animation-duration: 320ms;
          animation-timing-function: ease-out;
          animation-iteration-count: 1;
          color: ${DEV_GREEN};
        }

        @keyframes textWaveOnce {
          0% { transform: translateY(0); }
          45% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
      `}</style>

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

      {showFixed && (
        <div
          className={cx(
            'fixed top-0 left-0 right-0 z-40',
            'transition-all duration-300 ease-out',
            anim ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
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

type IconBtnProps = {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
};

function IconBtn({ label, onClick, children }: IconBtnProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      title={label}
      className={cx(
        'inline-flex h-12 w-12 items-center justify-center rounded-full',
        'border border-white/10 bg-black/30',
        'text-white/70',
        'hover:text-white',
        'hover:bg-white/5 hover:border-white/20',
        'transition duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20'
      )}
    >
      {children}
    </button>
  );
}