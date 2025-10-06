// components/Background.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function Background() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if ('ontouchstart' in window) setEnabled(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = Math.max(0, Math.min(w, e.clientX));
      const y = Math.max(0, Math.min(h, e.clientY));
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          document.documentElement.style.setProperty('--mx', `${x}px`);
          document.documentElement.style.setProperty('--my', `${y}px`);
        });
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled]);

  return (
    <div ref={rootRef} className="bg-stage">
      <div className="bg-spot" />
    </div>
  );
}
