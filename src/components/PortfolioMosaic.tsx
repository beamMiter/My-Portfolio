"use client"

import React, { useState, useEffect, FC } from 'react';
import { ArrowUpRight, Linkedin, Github } from 'lucide-react';

// Custom CSS สำหรับแอนิเมชันลายคลื่น SVG
const wavyStyle = `
  /* Animation for diagonal pattern sliding */
  @keyframes slide-pattern-diag {
    0% { transform: translate(0, 0); }
    100% { transform: translate(30px, 30px); } /* Diagonal movement */
  }

  /* Continuous animation on hover */
  .animate-continuous-svg {
    animation: slide-pattern-diag 5s linear infinite; /* Slow and smooth movement */
  }
  
  /* Pulsing animation triggered periodically */
  .animate-pulse-svg {
    animation: slide-pattern-diag 1.5s ease-in-out alternate; /* Move back and forth once */
  }

  /* Specific SVG style: rotate and scale the internal lines within the container */
  .wavy-svg-pattern svg {
    /* Set the center point for rotation */
    transform-origin: center center;
    /* Use 45 degree rotation and scale up for dense lines */
    transform: rotate(45deg) scale(2.5); 
    overflow: visible; /* Allow lines to extend beyond viewBox boundaries */
    width: 200%;
    height: 200%;
    position: absolute;
    top: -50%;
    left: -50%;
  }

  /* Line style: very thin lines for maximum detail */
  .wavy-svg-pattern line {
    stroke: white;
    stroke-width: 0.2; /* Extra thin (100 lines) */
    stroke-opacity: 0.9;
  }
`;

// กำหนดชนิดของ Component เป็น Functional Component (FC)
const App: FC = () => {
  // กำหนดชนิดของ state เป็น boolean
  const [isWavyPulsing, setIsWavyPulsing] = useState<boolean>(false);
  const [isHoveringWavy, setIsHoveringWavy] = useState<boolean>(false);

  useEffect(() => {
      // Logic สำหรับการกระตุ้นเป็นช่วงๆ (กระตุ้น 1.5 วินาที ทุก 5 วินาที)
      const interval = setInterval(() => {
          if (!isHoveringWavy) { // กระตุ้นเฉพาะเมื่อไม่ได้วางเมาส์อยู่
            setIsWavyPulsing(true);
            const timeout = setTimeout(() => setIsWavyPulsing(false), 1500); 
            return () => clearTimeout(timeout);
          }
      }, 5000); 
      return () => clearInterval(interval);
  }, [isHoveringWavy]); // ขึ้นอยู่กับสถานะ isHoveringWavy

  // คลาสพื้นฐานสำหรับกล่องสี่เหลี่ยมที่มีความโค้ง (ปรับเพิ่มรัศมีเป็น 4rem)
  const squareBase: string = "bg-[#1c1c1c] rounded-[4rem] hover:scale-[1.02] transition-transform duration-300 border border-white/5";
  // คลาสพื้นฐานสำหรับกล่องรูปแคปซูล/วงรี (คง rounded-full ไว้)
  const pillBase: string = "bg-[#1c1c1c] rounded-full hover:scale-[1.02] transition-transform duration-300 border border-white/5 overflow-hidden";
  
  // คลาสพื้นฐานสำหรับไอคอนด้านล่าง (ปรับเพิ่มรัศมีเป็น 4rem)
  const iconOuterBase: string = "w-full h-full bg-[#1c1c1c] p-1 flex items-center justify-center group cursor-pointer hover:bg-[#252525] border border-white/5 transition-colors duration-300 rounded-[4rem]";
  // คลาสสำหรับกรอบไอคอนด้านใน (ปรับเพิ่มรัศมีเป็น 4rem)
  const iconInnerBase: string = "w-full h-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:bg-white/5 rounded-[4rem]";
  // ขนาดไอคอน (ลดจาก w-7 เป็น w-6 สำหรับ desktop)
  const iconStyle: string = "w-4 h-4 md:w-6 md:h-6 text-white group-hover:text-white transition-colors duration-300";

  const wavyAnimationClass: string = isHoveringWavy ? 'animate-continuous-svg' : (isWavyPulsing ? 'animate-pulse-svg' : '');

  // ฟังก์ชันสร้างเส้น SVG (เส้นแนวตั้งเมื่อ viewBox เป็น 0-100)
  // *** ฟังก์ชันนี้ยังคงคืนค่าเป็นสตริง (string) ของ SVG เพื่อหลีกเลี่ยง JSX/createElement ***
  const generateSVGLines = (count: number): string => {
    let svgString = '';
    if (count === 0) return svgString; // ป้องกันการหารด้วยศูนย์
    
    const step = 100 / count;
    let lineIndex = 0;

    // สร้างเส้นจำนวนมากให้ครอบคลุมพื้นที่แม้หลังจากหมุนและปรับขนาด
    for (let i = -50; i < 150; i += step) { 
      // สร้าง SVG element เป็นสตริง
      svgString += `<line 
        key="${String(lineIndex)}" 
        x1="${i}" y1="-50" 
        x2="${i}" y2="150" 
      />`;
      lineIndex++;
    }
    return svgString;
  };

  return (
    <div className="min-h-screen bg-black text-white p-0 md:p-1 flex items-center justify-center font-sans">
      
      <style>{wavyStyle}</style>

      <div className="max-w-2xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-2"> 
        
        <div className={`
          md:col-start-1 md:row-start-1 md:row-span-2 h-full 
          ${pillBase} 
          rounded-br-none /* มุมขวาล่างคม (ดูดลงขวา) */
          flex flex-col p-0 relative group
        `}>
          <div className="w-full aspect-square bg-white rounded-full flex items-center justify-center p-0 relative z-10 shrink-0"> 
             <span className="text-black font-extrabold text-sm md:text-base tracking-tight">HIRE ME!</span>
          </div>
          <div className="flex-1 bg-[#1c1c1c] group-hover:bg-[#252525] transition-colors"></div>
        </div>

        <div className={`
          md:col-start-2 md:row-start-1 
          aspect-square 
          ${squareBase} 
          rounded-br-none /* มุมขวาล่างคม */
          flex flex-col items-center justify-center p-2 hover:bg-[#252525] /* ลด padding (p-3 -> p-2) */
        `}>
          <span className="text-3xl md:text-4xl font-bold mb-0 leading-none">6</span>
          <div className="text-center mt-0.5 leading-tight"> 
            <span className="text-gray-300 text-xs font-normal block">Years</span>
            <span className="text-gray-300 text-xs font-normal block">of Experience</span>
          </div>
        </div>

        <div className={`
          md:col-start-3 md:row-start-1 
          aspect-square 
          ${squareBase} 
          rounded-bl-none /* มุมซ้ายล่างคม */
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

        <div 
          className={`
            md:col-start-2 md:row-start-2 
            aspect-square 
            ${squareBase} 
            rounded-tr-none /* มุมขวาบนคม (ดูดขึ้นขวา) */
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
              <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
                dangerouslySetInnerHTML={{ __html: generateSVGLines(100) }}
              >
              </svg>
           </div>
        </div>

        <div className={`
          md:col-start-3 md:row-start-2 md:row-span-2 h-full
          bg-[#1c1c1c] 
          /* ปรับเพิ่มรัศมีเป็น 4rem */
          rounded-tr-[4rem] rounded-br-[4rem] 
          rounded-tl-none rounded-bl-none /* ด้านซ้ายแหลมคมเหมือนเดิม */
          hover:scale-[1.02] 
          transition-transform 
          duration-300 
          border border-white/5 
          overflow-hidden 
          flex items-center justify-center relative group 
          hover:bg-[#252525]
        `}>
          <div className="-rotate-90 whitespace-nowrap text-center">
             <h2 className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-white leading-relaxed">
              IM TECH
            </h2>
             <h2 className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-gray-400 leading-relaxed">
              INFLUENCER
            </h2>
          </div>
        </div>

        <div className={`md:col-start-1 md:row-start-3 md:col-span-2 aspect-[2/1] h-full ${pillBase} rounded-br-none flex items-center p-0 group cursor-pointer hover:bg-[#252525]`}>
          <div className="h-full aspect-square bg-white rounded-full flex items-center justify-center shrink-0 p-1"> 
             <ArrowUpRight className="w-7 h-7 md:w-10 md:h-10 text-black group-hover:rotate-45 transition-transform duration-300" strokeWidth={1.5} />
          </div>
          <div className="flex-1 flex items-center justify-center pr-4"> 
            <span className="text-base md:text-lg font-bold tracking-tight text-white">MY PORTFOLIO</span>
          </div>
        </div>

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