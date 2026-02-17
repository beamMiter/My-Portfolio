"use client";

import React, { useEffect, useRef, useState } from "react";

type FaceKey = "front" | "top" | "bottom";

interface TrackConfig {
  id: FaceKey;
  title: string;
  artist: string;
  src: string;
  start?: number;
  end?: number;
}

const TRACKS: Record<FaceKey, TrackConfig> = {
  front: {
    id: "front",
    title: "Intro Wave · DEV",
    artist: "Techin Jetsribumrung",
    src: "/audio/dev_intro.mp3",
    start: 30,
    end: 50,
  },
  top: {
    id: "top",
    title: "Focus Mode · Night Code",
    artist: "Techin",
    src: "/audio/focus_night.mp3",
    start: 10,
    end: 35,
  },
  bottom: {
    id: "bottom",
    title: "Portfolio Theme · Wave",
    artist: "Techin",
    src: "/audio/portfolio_theme.mp3",
    start: 45,
    end: 70,
  },
};

function SeaWaveFace() {
  return (
    <svg
      viewBox="0 0 400 160"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      {/* คลื่นลูกหลัง (ลูกใหญ่) - ดำสนิท */}
      <path 
        fill="#000000" 
        d="M0,110 Q80,80 160,100 T320,110 T400,105 L400,160 L0,160 Z" 
      />

      {/* คลื่นลูกหน้า (ลูกเล็ก) - เทาเข้ม เพื่อให้ตัดกับสีดำด้านหลัง */}
      <path 
        fill="#444444" 
        d="M0,90 Q80,60 160,85 T320,95 T400,90 L400,160 L0,160 Z" 
      />
    </svg>
  );
}

// ===== ZEBRA WAVES (LEFT FACE – ตามรูปที่ 2) ============
function ZebraLinesFace({ dur = 18 }: { dur?: number }) {
  return (
    <svg
      className="zebra-waves-svg"
      viewBox="0 0 400 400"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <path id="zebraWavePath">
          <animate
            attributeName="d"
            dur={`${dur}s`}
            repeatCount="indefinite"
            values={`
              M-40 200
              C 40 150, 140 180, 220 160
              S 360 180, 440 150;
              M-40 200
              C 40 250, 140 220, 220 240
              S 360 220, 440 250;
              M-40 200
              C 40 150, 140 180, 220 160
              S 360 180, 440 150;
            `}
          />
        </path>
      </defs>

      <g className="zebra-waves-lines" stroke="#f9fafb" fill="none">
        {Array.from({ length: 46 }).map((_, i) => {
          const offset = (i - 23) * 6;
          const opacity = 0.25 + (i / 46) * 0.6;
          const width = 2.4 + (i / 46) * 1.6;
          return (
            <use
              key={i}
              xlinkHref="#zebraWavePath"
              y={offset}
              className="zebra-wave-line"
              style={{
                opacity,
                strokeWidth: width,
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}

export default function IntroCube() {
  const [rotation, setRotation] = useState({ x: -18, y: -32 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<TrackConfig | null>(null);
  const [playingId, setPlayingId] = useState<FaceKey | null>(null);
  const [progress, setProgress] = useState(0);

  // ==== AUDIO ============================================
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      const t = currentTrackRef.current;
      const a = audioRef.current;
      if (!t || !a) return;

      const start = t.start ?? 0;
      const end = (t.end ?? a.duration) || 0;

      if (end > start) {
        const p = (a.currentTime - start) / (end - start);
        setProgress(Math.max(0, Math.min(1, p)));
      } else if (a.duration > 0) {
        setProgress(a.currentTime / a.duration);
      }

      if (typeof t.end === "number" && a.currentTime >= t.end) {
        a.pause();
        a.currentTime = t.end;
        setPlayingId(null);
      }
    };

    const handleEnded = () => {
      setPlayingId(null);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const playTrack = async (face: FaceKey) => {
    const track = TRACKS[face];
    const audio = audioRef.current;
    if (!audio) return;

    // toggle ถ้ากดหน้าเดิม
    if (playingId === face) {
      if (audio.paused) {
        await audio.play().catch(() => {});
      } else {
        audio.pause();
      }
      return;
    }

    currentTrackRef.current = track;
    setPlayingId(face);
    setProgress(0);

    audio.src = track.src;
    audio.currentTime = track.start ?? 0;

    try {
      await audio.play();
    } catch {
      // autoplay policy
    }
  };

  // ==== AUTO ROTATE ======================================
  useEffect(() => {
    let frame: number;

    const rotate = () => {
      if (!isDragging.current) {
        setRotation((prev) => ({
          x: prev.x,
          y: prev.y + 0.06,
        }));
      }
      frame = requestAnimationFrame(rotate);
    };

    rotate();
    return () => cancelAnimationFrame(frame);
  }, []);

  // ==== DRAG ROTATE ======================================
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;

    lastPos.current = { x: e.clientX, y: e.clientY };

    setRotation((prev) => ({
      x: prev.x + dy * 0.4,
      y: prev.y + dx * 0.4,
    }));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // ==== RENDER ===========================================
  return (
    <div
      className="intro-cube-scene"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        className="intro-cube"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* FRONT – MEMPHIS ABSTRACT LINES (เหมือนเดิม) */}
        <div className="intro-cube__face intro-cube__face--front">
          <div
            className={`face-inner face-inner--frontMemphis ${
              playingId === "front" ? "is-playing" : ""
            }`}
            role="button"
            tabIndex={0}
            onClick={() => playTrack("front")}
          >
            <svg
              className="front-memphis-svg"
              viewBox="0 0 400 400"
              aria-hidden
            >
              <g className="front-memphis-group">
                {/* เส้นงอ ๆ หลายเส้น */}
                <path d="M40 80 C 80 40, 140 40, 180 80" />
                <path d="M220 70 C 260 110, 320 110, 360 70" />
                <path d="M30 200 C 80 230, 120 180, 170 210" />
                <path d="M230 210 C 280 240, 320 190, 370 220" />
                <path d="M80 310 C 120 270, 160 270, 200 310" />
                <path d="M210 310 C 250 350, 310 350, 350 310" />

                {/* แท่งตรง */}
                <line x1="60" y1="130" x2="130" y2="130" />
                <line x1="250" y1="140" x2="340" y2="140" />
                <line x1="70" y1="260" x2="140" y2="260" />
                <line x1="240" y1="255" x2="320" y2="255" />

                {/* จุด-วงกลม-ครึ่งวงกลม */}
                <circle cx="70" cy="70" r="14" />
                <circle cx="330" cy="60" r="10" />
                <circle cx="320" cy="300" r="14" />
                <circle cx="80" cy="330" r="10" />

                <path d="M190 145 A 16 16 0 0 1 222 145" />
                <path d="M190 155 A 16 16 0 0 0 222 155" />

                {/* สี่เหลี่ยมเล็กตรงกลาง ๆ */}
                {Array.from({ length: 3 }).map((_, row) =>
                  Array.from({ length: 3 }).map((_, col) => (
                    <rect
                      key={`${row}-${col}`}
                      x={180 + col * 10}
                      y={190 + row * 10}
                      width="6"
                      height="6"
                      rx="1"
                    />
                  )),
                )}
              </g>

              {/* เส้น progress ด้านล่าง */}
              <line
                className="front-memphis-progress"
                x1="60"
                y1="350"
                x2={60 + 280 * progress}
                y2="350"
              />
            </svg>
          </div>
        </div>

        {/* TOP – หน้าที่มึงแคปมา ลบจุดกลมออก และเอา Animation ออกให้นิ่งสนิท */}
        <div className="intro-cube__face intro-cube__face--top">
          <div
            className="face-inner face-inner--topVortex"
            role="button"
            onClick={() => playTrack("top")}
            style={{ background: "#f9fafb" }}
          >
            <svg className="top-vortex-svg" viewBox="0 0 400 400">
              <g className="top-vortex-group-static">
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = i * 15;
                  const isLight = i % 2 === 0;
                  return (
                    <path
                      key={i}
                      fill={isLight ? "#ffffff" : "#000000"}
                      /* ลบจุดกลมๆ ออกจากปลายเส้น (Vortex Ray) */
                      d="M200 200 L400 210 Q310 230 240 270 Q210 290 200 320 Z"
                      transform={`rotate(${angle} 200 200)`}
                    />
                  );
                })}
              </g>
              {/* Progress Bar นิ่งๆ ตามสถานะเพลง */}
              <path
                className="top-vortex-progress"
                style={{ stroke: "#0ea5e9", fill: "none", strokeWidth: 4 }}
                d={`M 80 300 A 150 150 0 0 1 ${80 + 240 * progress} 300`}
              />
            </svg>
          </div>
        </div>

        {/* BACK – เปลี่ยนหน้าอนิเมะเป็นกราฟิกเส้นนิ่งๆ (Static) */}
        <div className="intro-cube__face intro-cube__face--back">
          <div
            className="face-inner"
            style={{ background: "#000", padding: 0 }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <g stroke="#fff" strokeLinecap="round">
                {Array.from({ length: 80 }).map((_, i) => {
                  const angle = (i * 360) / 80;
                  const rad = (angle * Math.PI) / 180;
                  const len = 100 + (i % 8) * 20;
                  return (
                    <line
                      key={i}
                      x1="200"
                      y1="200"
                      x2={200 + Math.cos(rad) * len}
                      y2={200 + Math.sin(rad) * len}
                      strokeWidth={i % 4 === 0 ? 2.5 : 0.8}
                      opacity="0.8"
                    />
                  );
                })}
              </g>
              <circle cx="200" cy="200" r="35" fill="#000" />
            </svg>
          </div>
        </div>

        {/* RIGHT – SEA WAVE (B&W VERSION) */}
        <div className="intro-cube__face intro-cube__face--right">
          <div className="face-inner face-inner--seaWave" style={{ background: '#fff' }}>
            <SeaWaveFace />
          </div>
        </div>

        {/* LEFT – ZEBRA WAVES (รูปที่ 2) */}
        <div className="intro-cube__face intro-cube__face--left">
          <div className="face-inner face-inner--zebra">
            <ZebraLinesFace dur={26} />
          </div>
        </div>

        {/* TOP – VORTEX / SPEED LINES */}
        <div className="intro-cube__face intro-cube__face--top">
          <div
            className={`face-inner face-inner--topVortex ${
              playingId === "top" ? "is-playing" : ""
            }`}
            role="button"
            tabIndex={0}
            onClick={() => playTrack("top")}
          >
            <svg className="top-vortex-svg" viewBox="0 0 400 400" aria-hidden>
              <g className="top-vortex-group">
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = i * 15;
                  const isLight = i % 2 === 0;
                  return (
                    <path
                      key={i}
                      className={
                        "top-vortex-ray " +
                        (isLight
                          ? "top-vortex-ray--light"
                          : "top-vortex-ray--dark")
                      }
                      d="M200 200 L400 210 Q310 230 240 270 Q210 290 200 320 Z"
                      transform={`rotate(${angle} 200 200)`}
                    />
                  );
                })}
              </g>

              {/* progress เป็นวงโค้งด้านนอก */}
              <path
                className="top-vortex-progress"
                d={`
                  M 80 300
                  A 150 150 0 0 1 ${80 + 240 * progress} 300
                `}
              />
            </svg>
          </div>
        </div>

        {/* BOTTOM – ORGANIC BLOBS (ตามรูปที่ 1) */}
        <div className="intro-cube__face intro-cube__face--bottom">
          <div
            className={`face-inner face-inner--bottomOrganic ${
              playingId === "bottom" ? "is-playing" : ""
            }`}
            role="button"
            tabIndex={0}
            onClick={() => playTrack("bottom")}
          >
            <svg
              className="bottom-organic-svg"
              viewBox="0 0 400 400"
              aria-hidden
            >
              {/* ก้อนดำใหญ่ ๆ */}
              <g className="bottom-organic-blobs">
                <path d="M40 120 C 20 60, 90 30, 150 60 C 210 90, 190 150, 150 170 C 110 190, 60 180, 40 120 Z" />
                <path d="M230 80 C 260 40, 340 40, 360 100 C 380 150, 340 190, 300 185 C 260 180, 210 150, 230 80 Z" />
                <path d="M70 250 C 40 230, 40 290, 80 320 C 120 350, 190 360, 210 320 C 230 280, 170 260, 140 255 C 110 250, 100 260, 70 250 Z" />
                <path d="M250 230 C 280 210, 330 210, 350 240 C 370 270, 360 310, 320 330 C 280 350, 235 345, 220 315 C 205 285, 220 250, 250 230 Z" />
              </g>

              {/* เส้นสั้น / จุดข้างใน + รอบ ๆ */}
              <g className="bottom-organic-details">
                {/* เส้นใน blob ซ้ายบน */}
                <path d="M80 105 Q 95 95 115 100" />
                <path d="M70 135 Q 90 130 110 138" />
                <path d="M95 155 Q 115 150 135 160" />

                {/* เส้นใน blob ขวาบน */}
                <path d="M260 90 Q 280 80 300 88" />
                <path d="M255 118 Q 280 112 305 120" />
                <path d="M270 140 Q 290 138 315 145" />

                {/* เส้นใน blob ล่างซ้าย */}
                <path d="M95 270 Q 115 268 135 278" />
                <path d="M110 295 Q 135 295 155 305" />
                <path d="M135 320 Q 165 322 185 335" />

                {/* เส้นใน blob ล่างขวา */}
                <path d="M255 255 Q 280 250 305 258" />
                <path d="M255 282 Q 285 282 310 292" />
                <path d="M260 305 Q 285 310 305 320" />

                {/* จุดเล็ก ๆ */}
                <circle cx="60" cy="210" r="4" />
                <circle cx="190" cy="210" r="4" />
                <circle cx="210" cy="60" r="4" />
                <circle cx="335" cy="205" r="4" />
                <circle cx="310" cy="335" r="4" />
                <circle cx="95" cy="60" r="4" />
              </g>

              {/* เส้น progress ด้านล่าง */}
              <line
                className="bottom-organic-progress"
                x1="60"
                y1="365"
                x2={60 + 280 * progress}
                y2="365"
              />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ===== BASE SCENE ===== */
        .intro-cube-scene {
          --cube-size: min(340px, 40vw);
          width: var(--cube-size);
          height: var(--cube-size);
          perspective: 1200px;
          cursor: grab;
          -webkit-user-select: none;
          user-select: none;
        }

        .intro-cube-scene *,
        .intro-cube-scene *::before,
        .intro-cube-scene *::after {
          -webkit-user-select: none;
          user-select: none;
        }

        @media (min-width: 1024px) {
          .intro-cube-scene {
            --cube-size: 360px;
          }
        }

        .intro-cube-scene:active {
          cursor: grabbing;
        }

        .intro-cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.03s linear;
        }

        .intro-cube__face {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
        }

        /* POSITIONS */
        .intro-cube__face--front {
          transform: rotateY(0deg) translateZ(calc(var(--cube-size) / 2));
        }
        .intro-cube__face--back {
          transform: rotateY(180deg) translateZ(calc(var(--cube-size) / 2));
        }
        .intro-cube__face--right {
          transform: rotateY(90deg) translateZ(calc(var(--cube-size) / 2));
        }
        .intro-cube__face--left {
          transform: rotateY(-90deg) translateZ(calc(var(--cube-size) / 2));
        }
        .intro-cube__face--top {
          transform: rotateX(90deg) translateZ(calc(var(--cube-size) / 2));
        }
        .intro-cube__face--bottom {
          transform: rotateX(-90deg) translateZ(calc(var(--cube-size) / 2));
        }

        .face-inner {
          width: 100%;
          height: 100%;
          padding: clamp(18px, 6vw, 26px);
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          border-radius: 0;
        }

        /* ===== ANIM KEYFRAMES ===== */
        @keyframes memphisDrift {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-6px, 4px) rotate(-2deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }

        @keyframes memphisDriftStrong {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-10px, 8px) rotate(-4deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }

        @keyframes vortexSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes circlePulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
          }
        }

        @keyframes circlePulseStrong {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.12);
          }
        }

        @keyframes zebraLinesDrift {
          0% {
            transform: translate3d(-8px, -12px, 0) scale(1.02);
          }
          50% {
            transform: translate3d(4px, 8px, 0) scale(1.04);
          }
          100% {
            transform: translate3d(-6px, 4px, 0) scale(1.02);
          }
        }

        @keyframes blobDrift {
          0% {
            transform: translate3d(0, 0, 0);
          }
          33% {
            transform: translate3d(-6px, -4px, 0) rotate(-1deg);
          }
          66% {
            transform: translate3d(4px, 6px, 0) rotate(1deg);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes blobDriftStrong {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-10px, -8px, 0) rotate(-2deg) scale(1.02);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes detailFlicker {
          0%,
          100% {
            opacity: 0.85;
          }
          50% {
            opacity: 1;
          }
        }

        /* ===== FRONT – MEMPHIS ===== */
        .face-inner--frontMemphis {
          background: #020617;
          cursor: pointer;
        }

        .front-memphis-svg {
          width: 100%;
          height: 100%;
        }

        .front-memphis-group {
          fill: #f9fafb;
          stroke: #f9fafb;
          stroke-width: 8;
          stroke-linecap: round;
          stroke-linejoin: round;
          transform-origin: 50% 50%;
          animation: memphisDrift 18s ease-in-out infinite;
        }

        .face-inner--frontMemphis.is-playing .front-memphis-group {
          animation: memphisDriftStrong 10s ease-in-out infinite;
        }

        .front-memphis-group path {
          fill: none;
        }

        .front-memphis-group line {
          stroke-width: 10;
        }

        .front-memphis-progress {
          stroke: #22c55e;
          stroke-width: 4;
          stroke-linecap: round;
          opacity: 0.9;
        }

        /* ===== TOP – VORTEX ===== */
        .face-inner--topVortex {
          background: #f9fafb;
          cursor: pointer;
        }

        .top-vortex-svg {
          width: 100%;
          height: 100%;
        }

        .top-vortex-group {
          transform-origin: 50% 50%;
          animation: vortexSpin 80s linear infinite;
        }

        .face-inner--topVortex.is-playing .top-vortex-group {
          animation-duration: 30s;
        }

        .top-vortex-ray {
          stroke-width: 0;
        }

        .top-vortex-ray--light {
          fill: #ffffff;
        }

        .top-vortex-ray--dark {
          fill: #000000;
        }

        .top-vortex-progress {
          fill: none;
          stroke: #0ea5e9;
          stroke-width: 4;
          stroke-linecap: round;
          opacity: 0.7;
        }

        /* ===== BOTTOM – ORGANIC BLOBS (รูป 1) ===== */
        .face-inner--bottomOrganic {
          background: #ffffff;
          cursor: pointer;
        }

        .bottom-organic-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .bottom-organic-blobs {
          fill: #020617;
          animation: blobDrift 22s ease-in-out infinite;
          transform-origin: 50% 50%;
        }

        .face-inner--bottomOrganic.is-playing .bottom-organic-blobs {
          animation: blobDriftStrong 12s ease-in-out infinite;
        }

        .bottom-organic-details {
          stroke: #020617;
          stroke-width: 5;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          animation: detailFlicker 16s ease-in-out infinite;
        }

        .bottom-organic-details circle {
          fill: #020617;
        }

        .bottom-organic-progress {
          stroke: #020617;
          stroke-width: 4;
          stroke-linecap: round;
          opacity: 0.9;
        }

        /* ===== BACK – PHOTO ===== */
        .face-inner--photoFull {
          padding: 0;
          background: #020617;
        }

        .photo-full-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ===== RIGHT – SEA WAVE ===== */
        .face-inner--seaWave {
          background: radial-gradient(
            circle at 50% 0%,
            #0f172a,
            #020617 70%,
            #000000 100%
          );
          position: relative;
          overflow: hidden;
        }

        .face-inner--seaWave svg {
          width: 130%;
          height: 70%;
          position: absolute;
          bottom: -4%;
          left: -10%;
        }

        .face-inner--seaWave::after {
          content: "";
          position: absolute;
          inset: -12%;
          background-image: radial-gradient(
            circle at 50% 20%,
            rgba(248, 250, 252, 0.85) 0,
            transparent 60%
          );
          mix-blend-mode: screen;
          opacity: 0.3;
          pointer-events: none;
        }

        /* ===== LEFT – ZEBRA WAVES (รูป 2) ===== */
        .face-inner--zebra {
          padding: 0;
          background: #020617;
          position: relative;
          overflow: hidden;
        }

        .zebra-waves-svg {
          width: 120%;
          height: 120%;
          display: block;
          transform: translate(-10%, -10%);
        }

        .zebra-waves-lines {
          animation: zebraLinesDrift 26s ease-in-out infinite alternate;
          transform-origin: 50% 50%;
        }

        .zebra-wave-line {
          stroke-linecap: round;
        }
      `}</style>
    </div>
  );
}
