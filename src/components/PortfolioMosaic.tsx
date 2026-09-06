"use client"

import { useEffect, useRef } from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

/**
 * Marbled optical vortex — a signed field evaluated per pixel onto a canvas.
 *
 * A strong domain warp turns the bands into flowing, marbled walls; log-polar
 * spacing winds the centre into a tight spiral while the outside stays open for
 * the angular ribs to draw the big bands.
 *
 * `shaded` re-renders the exact same field as a lit surface: pass one fills a
 * height buffer, pass two derives the normal from the neighbouring heights and
 * shades it with an orbiting light + specular — so the bands read as ridges,
 * and the field is still only evaluated once per pixel.
 */
function TunnelCanvas({ shaded = false, className = "" }: { shaded?: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const RES = 200;
    canvas.width = RES;
    canvas.height = RES;

    const img = ctx.createImageData(RES, RES);
    const data = img.data;
    for (let i = 3; i < data.length; i += 4) data[i] = 255; // alpha, set once

    // the shared field, in roughly -1..1 space centred on the tile
    const field = (x: number, y: number, t: number) => {
      const wx = x + 0.2 * Math.sin(y * 4.6 + t * 0.65);
      const wy = y + 0.2 * Math.sin(x * 4.1 - t * 0.5);
      const r = Math.hypot(wx, wy);
      const a = Math.atan2(wy, wx);
      const depth = Math.log(r + 0.035) * 7.5;
      const rings = Math.sin(depth * 3.4 - t * 2.2);
      const ribs = Math.sin(a * 12 + depth * 1.1 + t * 0.35);
      const fade = Math.min(1, Math.max(0, (r - 0.025) / 0.075));
      return (rings * 0.8 + ribs * 0.2) * fade;
    };

    // flat: soft-threshold straight to black or white
    const drawFlat = (t: number) => {
      let i = 0;
      for (let py = 0; py < RES; py++) {
        const y = (py / RES) * 2 - 1;
        for (let px = 0; px < RES; px++) {
          const x = (px / RES) * 2 - 1;
          let v = field(x, y, t) * 7 + 0.5;
          v = v < 0 ? 0 : v > 1 ? 1 : v;
          const c = 255 - v * 255;
          data[i] = c;
          data[i + 1] = c;
          data[i + 2] = c;
          i += 4;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    // relief: read the field as a height map and light it
    const H = shaded ? new Float32Array(RES * RES) : null;
    const RELIEF = 26;
    const GLOSS = 30;

    const drawShaded = (t: number) => {
      let h = 0;
      for (let py = 0; py < RES; py++) {
        const y = (py / RES) * 2 - 1;
        for (let px = 0; px < RES; px++) H![h++] = field((px / RES) * 2 - 1, y, t);
      }

      // the light orbits — that's most of what sells the surface as solid
      let lx = Math.cos(t * 0.35) * 0.72;
      let ly = Math.sin(t * 0.35) * 0.72;
      let lz = 0.62;
      const li = 1 / Math.hypot(lx, ly, lz);
      lx *= li; ly *= li; lz *= li;

      // Blinn-Phong half-vector, viewer straight on
      let hx = lx, hy = ly, hz = lz + 1;
      const hi = 1 / Math.hypot(hx, hy, hz);
      hx *= hi; hy *= hi; hz *= hi;

      let i = 0;
      for (let py = 0; py < RES; py++) {
        const y = (py / RES) * 2 - 1;
        for (let px = 0; px < RES; px++) {
          const k = py * RES + px;
          const xm = px > 0 ? H![k - 1] : H![k];
          const xp = px < RES - 1 ? H![k + 1] : H![k];
          const ym = py > 0 ? H![k - RES] : H![k];
          const yp = py < RES - 1 ? H![k + RES] : H![k];

          let nx = -(xp - xm) * 0.5 * RELIEF;
          let ny = -(yp - ym) * 0.5 * RELIEF;
          let nz = 1;
          const ni = 1 / Math.hypot(nx, ny, nz);
          nx *= ni; ny *= ni; nz *= ni;

          const diff = Math.max(0, nx * lx + ny * ly + nz * lz);
          const sp = Math.max(0, nx * hx + ny * hy + nz * hz);
          const spec = Math.pow(sp, GLOSS);

          // push the vortex centre into shadow so it reads as depth
          const x = (px / RES) * 2 - 1;
          const depthShade = 0.3 + 0.7 * Math.min(1, Math.hypot(x, y) * 1.7);

          let lum = (0.08 + 0.8 * diff) * depthShade + 0.9 * spec;
          lum = lum < 0 ? 0 : lum > 1 ? 1 : lum;

          const c = lum * 255;
          data[i] = c;
          data[i + 1] = c;
          data[i + 2] = c;
          i += 4;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    const draw = shaded ? drawShaded : drawFlat;

    draw(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { rootMargin: "120px" }
    );
    io.observe(canvas);

    const STEP = 1000 / 30; // the bands are chunky enough that 30fps reads smooth
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let clock = 0;

    const frame = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      if (visible) {
        clock += dt / 1000;
        acc += dt;
        if (acc >= STEP) {
          acc = 0;
          draw(clock);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [shaded]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

const App = ({ embedded = false }: { embedded?: boolean }) => {
  // Base Classes (ใส่ค่า 6rem โดยตรงเพื่อให้ Tailwind ทำงานได้ถูกต้อง)
  const squareBase = "bg-[#1c1c1c] rounded-[6rem] hover:scale-[1.02] transition-transform duration-300 border border-white/5";
  const pillBase = "bg-[#1c1c1c] rounded-full hover:scale-[1.02] transition-transform duration-300 border border-white/5 overflow-hidden";
  const iconOuterBase = "w-full h-full bg-[#1c1c1c] p-1 flex items-center justify-center group cursor-pointer hover:bg-[#252525] border border-white/5 transition-colors duration-300 rounded-[6rem]";
  const iconInnerBase = "w-full h-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/5 rounded-[6rem]";
  const iconStyle = "w-5 h-5 md:w-7 md:h-7 text-white group-hover:text-white transition-colors duration-300";

  return (
    <div
      className={
        embedded
          ? "w-full text-white font-sans"
          : "min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center font-sans overflow-hidden"
      }
    >
      <div className="max-w-2xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-2">
        
        {/* Hire Me Pill */}
        <a
          href="/home#contact"
          aria-label="Hire me — go to contact"
          data-hover-expand
          className={`
          md:col-start-1 md:row-start-1 md:row-span-2 h-32 md:h-auto
          ${pillBase}
          rounded-br-none /* ขวาล่างคม */
          flex flex-col p-0 relative group cursor-pointer hover:bg-[#252525]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
        `}>
          <div className="h-full w-auto aspect-square mx-auto md:mx-0 md:h-auto md:w-full bg-white rounded-full flex items-center justify-center p-0 relative z-10 shrink-0">
             <span className="text-black font-extrabold text-sm md:text-base tracking-tight">HIRE ME!</span>
          </div>
          {/* transparent — lets the pill's own bg show, so hover lightens as one piece */}
          <div className="flex-1"></div>
        </a>

        {/* Experience Box */}
        <div
          data-hover-expand
          className={`
          md:col-start-2 md:row-start-1
          aspect-square
          ${squareBase}
          rounded-br-none /* ขวาล่างคม */
          flex flex-col items-center justify-center p-2 hover:bg-[#252525]
        `}>
          <span className="text-3xl md:text-4xl font-bold mb-0 leading-none">2</span>
          <div className="text-center mt-2.5 leading-snug">
            <span className="text-gray-300 text-sm font-normal block">Years</span>
            <span className="text-gray-300 text-sm font-normal block">of Experience</span>
          </div>
        </div>

        {/* Profile Image Box */}
        <div
          data-hover-expand
          className={`
          md:col-start-3 md:row-start-1
          aspect-square
          ${squareBase}
          rounded-bl-none /* ซ้ายล่างคม */
          overflow-hidden
          relative
          group
        `}>
            <div className="absolute inset-0 bg-[#5C3A33]"></div>
            <img
              src="/images/maomao.jpeg"
              alt="Profile"
              className="w-full h-full object-cover object-center opacity-90 group-hover:scale-110 transition-transform duration-500"
            />
        </div>

        {/* --- Pattern box (เดิมคือกล่อง gif ม้าลาย) --- */}
        <div
          data-hover-expand
          className={`
          md:col-start-2 md:row-start-2
          aspect-square
          ${squareBase}
          /* กล่องนี้ ขวาบนคม (ดูดขึ้น) ที่เหลือมนตามเดิม */
          rounded-tr-none

          overflow-hidden
          relative
          bg-black
          border border-[#333]
        `}>
           <TunnelCanvas className="absolute inset-0 w-full h-full" />
        </div>

        {/* IM Tech Vertical Box */}
        <div
          data-hover-expand
          className={`
          md:col-start-3 md:row-start-2 md:row-span-2 h-32 md:h-full
          bg-[#1c1c1c]
          rounded-[6rem] /* ใส่ค่าตรงๆ */
          rounded-tr-[6rem] rounded-br-[6rem]
          rounded-tl-none rounded-bl-none /* ซ้ายคมตลอดแนว */
          hover:scale-[1.02] 
          transition-transform 
          duration-300 
          border border-white/5 
          overflow-hidden 
          flex items-center justify-center relative group 
          hover:bg-[#252525]
        `}>
          <div className="md:-rotate-90 whitespace-nowrap text-center">
             <h2 className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-white leading-relaxed">
              FULLSTACK
            </h2>
             <h2 className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-gray-400 leading-relaxed">
              SOFTWARE DEVELOPMENT
            </h2>
          </div>
        </div>

        {/* Portfolio Link — same layout as before, disc icon swapped for the gif */}
        <div
          data-hover-expand
          className={`
          md:col-start-1 md:row-start-3 md:col-span-2
          aspect-[2/1] h-24 md:h-full
          ${pillBase}
          rounded-br-none /* ขวาล่างคม */
          flex items-center p-0 group cursor-pointer hover:bg-[#252525]
        `}>
          <div className="h-full aspect-square bg-white rounded-full overflow-hidden flex items-center justify-center shrink-0">
             <img
               src="/images/maomao.gif"
               alt=""
               className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
             />
          </div>
          <div className="flex-1 flex items-center justify-center pr-4">
            <span className="text-lg md:text-xl font-bold tracking-wide text-white">猫をなでて</span>
          </div>
        </div>

        {/* Social Icons — hrefs mirror the Contact section.
            mobile: their own 3-across row; md+: md:contents drops this wrapper
            so each tile sits in its own grid cell again. */}
        <div className="grid grid-cols-3 gap-2 md:contents">
          <div className="md:col-start-1 md:row-start-4 aspect-square">
             <a
               href="https://www.linkedin.com/in/techin-jetsribumrung-9a4069364/"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="LinkedIn"
               className={`${iconOuterBase} rounded-tr-none`}
             >
               <div className={`${iconInnerBase} rounded-tr-none`}>
                 <Linkedin className={iconStyle} strokeWidth={0} fill="currentColor" />
               </div>
             </a>
          </div>

          <div className="md:col-start-2 md:row-start-4 aspect-square">
             <a
               href="https://github.com/beamMiter"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="GitHub"
               className={`${iconOuterBase} rounded-tl-none rounded-tr-none`}
             >
               <div className={`${iconInnerBase} rounded-tl-none rounded-tr-none`}>
                 <Github className={iconStyle} strokeWidth={0} fill="currentColor" />
               </div>
             </a>
          </div>

          {/* Icon3 (Email) */}
          <div className="md:col-start-3 md:row-start-4 aspect-square">
             <a
               href="mailto:jetsribumrungtechin@gmail.com"
               aria-label="Email"
               className={`${iconOuterBase} rounded-tl-none`}
             >
               <div className={`${iconInnerBase} rounded-tl-none`}>
                 <Mail className={iconStyle} strokeWidth={1.75} />
               </div>
             </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;