"use client"

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Linkedin, Github } from 'lucide-react';

// Custom CSS สำหรับแอนิเมชัน
const wavyStyle = `
  @keyframes slide-pattern-diag {
    0% { transform: translate(0, 0); }
    100% { transform: translate(20px, 20px); }
  }

  .animate-continuous-svg {
    animation: slide-pattern-diag 4s linear infinite;
  }
  
  .animate-pulse-svg {
    animation: slide-pattern-diag 1.5s ease-in-out alternate;
  }

  /* ปรับแต่ง SVG ให้อยู่กึ่งกลางและขยายให้เต็มพื้นที่ */
  .wavy-svg-pattern svg {
    width: 200%;
    height: 200%;
    position: absolute;
    top: -50%;
    left: -50%;
    transform: rotate(-10deg) scale(1.2); /* เอียงเล็กน้อย */
  }
`;

const App = () => {
  const [isWavyPulsing, setIsWavyPulsing] = useState(false);
  const [isHoveringWavy, setIsHoveringWavy] = useState(false);

  useEffect(() => {
      const interval = setInterval(() => {
          if (!isHoveringWavy) {
            setIsWavyPulsing(true);
            const timeout = setTimeout(() => setIsWavyPulsing(false), 1500); 
            return () => clearTimeout(timeout);
          }
      }, 5000); 
      return () => clearInterval(interval);
  }, [isHoveringWavy]);

  // Base Classes (ใส่ค่า 6rem โดยตรงเพื่อให้ Tailwind ทำงานได้ถูกต้อง)
  const squareBase = "bg-[#1c1c1c] rounded-[6rem] hover:scale-[1.02] transition-transform duration-300 border border-white/5";
  const pillBase = "bg-[#1c1c1c] rounded-full hover:scale-[1.02] transition-transform duration-300 border border-white/5 overflow-hidden";
  const iconOuterBase = "w-full h-full bg-[#1c1c1c] p-1 flex items-center justify-center group cursor-pointer hover:bg-[#252525] border border-white/5 transition-colors duration-300 rounded-[6rem]";
  const iconInnerBase = "w-full h-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/5 rounded-[6rem]";
  const iconStyle = "w-4 h-4 md:w-6 md:h-6 text-white group-hover:text-white transition-colors duration-300";

  const wavyAnimationClass = isHoveringWavy ? 'animate-continuous-svg' : (isWavyPulsing ? 'animate-pulse-svg' : '');

  // ฟังก์ชันสร้างลายม้าลาย (Zebra Pattern) แบบเส้นละเอียด (Fine Lines) เหมือนเดิม
  const generateZebraPaths = () => {
    const paths = [];
    // ปรับระยะห่างลดลงเพื่อให้เส้นละเอียดและถี่ขึ้น
    for (let i = -100; i < 350; i += 3) { 
      paths.push(
        <path
          key={i}
          d={`M ${i} 200 Q ${i - 30} 100 ${i + 80} -50`}
          stroke="white"
          strokeWidth="1.2"
          strokeOpacity="0.8"
          fill="none"
        />
      );
    }
    return paths;
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center font-sans overflow-hidden">
      
      <style>{wavyStyle}</style>

      <div className="max-w-2xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-2"> 
        
        {/* Hire Me Pill */}
        <div className={`
          md:col-start-1 md:row-start-1 md:row-span-2 h-32 md:h-auto
          ${pillBase} 
          rounded-br-none /* ขวาล่างคม */
          flex flex-col p-0 relative group
        `}>
          <div className="w-full aspect-square bg-white rounded-full flex items-center justify-center p-0 relative z-10 shrink-0"> 
             <span className="text-black font-extrabold text-sm md:text-base tracking-tight">HIRE ME!</span>
          </div>
          <div className="flex-1 bg-[#1c1c1c] group-hover:bg-[#252525] transition-colors"></div>
        </div>

        {/* Experience Box (6 Years) */}
        <div className={`
          md:col-start-2 md:row-start-1 
          aspect-square 
          ${squareBase} 
          rounded-br-none /* ขวาล่างคม */
          flex flex-col items-center justify-center p-2 hover:bg-[#252525]
        `}>
          <span className="text-3xl md:text-4xl font-bold mb-0 leading-none">6</span>
          <div className="text-center mt-0.5 leading-tight"> 
            <span className="text-gray-300 text-xs font-normal block">Years</span>
            <span className="text-gray-300 text-xs font-normal block">of Experience</span>
          </div>
        </div>

        {/* Profile Image Box */}
        <div className={`
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
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
              alt="Profile" 
              className="w-full h-full object-cover object-center opacity-90 group-hover:scale-110 transition-transform duration-500"
            />
        </div>

        {/* --- Zebra Animation Box (กล่องม้าลาย) --- */}
        <div 
          className={`
            md:col-start-2 md:row-start-2 
            aspect-square 
            ${squareBase} 
            /* กล่องนี้ ขวาบนคม (ดูดขึ้น) ที่เหลือมนตามเดิม */
            rounded-tr-none 
            
            overflow-hidden 
            relative 
            group 
            bg-black 
            border border-[#333]
            flex items-center justify-center
          `}
          onMouseEnter={() => setIsHoveringWavy(true)}
          onMouseLeave={() => setIsHoveringWavy(false)}
        >
           <div className={`
             absolute inset-0 
             wavy-svg-pattern 
             ${wavyAnimationClass}
           `}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                 {generateZebraPaths()}
              </svg>
           </div>
        </div>

        {/* IM Tech Vertical Box */}
        <div className={`
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
              IM TECH
            </h2>
             <h2 className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-gray-400 leading-relaxed">
              INFLUENCER
            </h2>
          </div>
        </div>

        {/* Portfolio Link */}
        <div className={`
          md:col-start-1 md:row-start-3 md:col-span-2 
          aspect-[2/1] h-24 md:h-full 
          ${pillBase} 
          rounded-br-none /* ขวาล่างคม */
          flex items-center p-0 group cursor-pointer hover:bg-[#252525]
        `}>
          <div className="h-full aspect-square bg-white rounded-full flex items-center justify-center shrink-0 p-1"> 
             <ArrowUpRight className="w-7 h-7 md:w-10 md:h-10 text-black group-hover:rotate-45 transition-transform duration-300" strokeWidth={1.5} />
          </div>
          <div className="flex-1 flex items-center justify-center pr-4"> 
            <span className="text-base md:text-lg font-bold tracking-tight text-white">MY PORTFOLIO</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="md:col-start-1 md:row-start-4 aspect-square">
           <div className={`${iconOuterBase} rounded-tr-none`}>
             <div className={`${iconInnerBase} rounded-tr-none`}> 
               <Linkedin className={iconStyle} strokeWidth={0} fill="currentColor" />
             </div>
           </div>
        </div>

        <div className="md:col-start-2 md:row-start-4 aspect-square">
           <div className={`${iconOuterBase} rounded-tl-none rounded-tr-none`}>
             <div className={`${iconInnerBase} rounded-tl-none rounded-tr-none`}> 
               <Github className={iconStyle} strokeWidth={0} fill="currentColor" />
             </div>
           </div>
        </div>

        {/* Icon3 (Twitter) */}
        <div className="md:col-start-3 md:row-start-4 aspect-square">
           <div className={`${iconOuterBase} rounded-tl-none`}>
             <div className={`${iconInnerBase} rounded-tl-none`}> 
               <svg viewBox="0 0 24 24" className={iconStyle.replace('text-white', 'fill-white').replace('group-hover:text-white', 'group-hover:fill-white')} xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
               </svg>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default App;