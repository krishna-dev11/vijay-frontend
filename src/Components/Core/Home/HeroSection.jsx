import React from 'react'
import group from "../../../Utilities/perosnsremove.png"
import EliteTextSwiper from './EliteTextSwiper'

const HeroSection = () => {
  return (
      <div className="relative  z-10 mx-auto flex flex-col h-[60vh] md:h-[95vh] w-[95%] md:w-[98%] max-w-[1800px] border border-[#ffffff]/10 bg-[#ffffff]/[0.02] backdrop-blur-3xl rounded-[2rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden">
        
        

        {/* ─── CONTENT AREA (LAYERED) ─── */}
        <div className="relative flex-1 flex flex-col">
          
          {/* Swiper: Positioned specifically above the heads */}
          <div className="absolute top-[8%] left-0 right-0 z-20 flex justify-center pointer-events-none">
            <div className="pointer-events-auto w-full">
              <EliteTextSwiper />
            </div>
          </div>

          {/* Image Node: Maximized and anchored to bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[80%] flex justify-center items-end">
            {/* Subtle light effect behind heads */}
            <div className="absolute top-1/4 w-[60%] h-[40%] bg-gradient-to-b from-[#10b981]/10 to-transparent blur-3xl opacity-50" />
            
            <img 
              className="w-full h-full object-contain object-bottom z-10 transition-all duration-1000 scale-105 md:scale-110 drop-shadow-[0_-30px_60px_rgba(0,0,0,0.8)]" 
              alt="Elite Candidates" 
              src={group} 
            />
            
            {/* Bottom blend to hide image edges */}
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#000000]/80 to-transparent z-20" />
          </div>

        </div>

      </div>
  )
}

export default HeroSection




// import React, { useState, useEffect } from 'react';

// const HeroSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       eyebrow: "Academy Protocol Activated",
//       heading: "Your Way to",
//       pill: "English",
//       pillColor: "pill-emerald",
//       desc: "Vijayvargiya's — 22 years of glorious success. Where hesitation ends and confidence begins."
//     },
//     {
//       eyebrow: "Elite Protocol Activated",
//       heading: "Build Your",
//       pill: "Personality",
//       pillColor: "pill-violet",
//       desc: "Engineers of confidence, architects of your persona. Personality Development that lasts a lifetime."
//     },
//     {
//       eyebrow: "Craft Protocol Activated",
//       heading: "Master the Art of",
//       pill: "Handwriting",
//       pillColor: "pill-gold",
//       desc: "Improve Hindi & English handwriting with scientific methods. Leave a mark before you even speak."
//     },
//     {
//       eyebrow: "Fluent Protocol Activated",
//       heading: "Own Every",
//       pill: "Stage & Mic",
//       pillColor: "pill-coral",
//       desc: "Remove stage fear. Master public speaking, GD, debates & interviews with our Situational Method."
//     }
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const goTo = (idx) => {
//     setCurrentSlide(idx);
//   };

//   return (
//     <>
//       <style>{`
//         :root {
//           --bg: #12151c;
//           --emerald: #10b981;
//           --gold: #f59e0b;
//           --coral: #f97316;
//           --violet: #8b5cf6;
//           --sky: #06b6d4;
//           --rose: #fb7185;
//           --lime: #84cc16;
//           --white: #f1f5f9;
//           --muted: #64748b;
//         }

//         .hero-container {
//           background: var(--bg);
//           min-height: 100vh;
//           font-family: 'DM Sans', sans-serif;
//           overflow: hidden;
//           display: flex;
//           flex-direction: column;
//         }

//         .hero {
//           flex: 1;
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           padding: 0 0 0 48px;
//           align-items: center;
//           position: relative;
//         }

//         .blob { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
//         .blob-1 { width: 350px; height: 350px; background: rgba(16,185,129,0.1); top: -80px; left: -80px; }
//         .blob-2 { width: 280px; height: 280px; background: rgba(139,92,246,0.09); bottom: 20px; left: 200px; }

//         .left { position: relative; z-index: 5; padding-right: 40px; padding-bottom: 40px; }
        
//         .swiper-wrap { position: relative; min-height: 220px; margin-bottom: 24px; }
//         .slide { position: absolute; inset: 0; opacity: 0; transform: translateY(16px); transition: all .8s ease; pointer-events: none; }
//         .slide.active { opacity: 1; transform: translateY(0); pointer-events: auto; position: relative; }

//         .slide-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase; color: var(--emerald); margin-bottom: 14px; }
//         .slide-eyebrow::before { content: ''; width: 20px; height: 1px; background: var(--emerald); opacity: 0.6; }

//         .slide-heading { font-family: 'Syne', sans-serif; font-size: clamp(36px, 4.5vw, 62px); font-weight: 800; line-height: 1.08; color: var(--white); letter-spacing: -0.02em; margin-bottom: 16px; }
//         .pill-word { display: inline-block; padding: 2px 16px; border-radius: 99px; margin-left: 6px; font-style: normal; }
//         .pill-emerald { background: rgba(16,185,129,0.18); color: var(--emerald); }
//         .pill-gold { background: rgba(245,158,11,0.18); color: var(--gold); }
//         .pill-violet { background: rgba(139,92,246,0.18); color: var(--violet); }
//         .pill-coral { background: rgba(249,115,22,0.18); color: var(--coral); }

//         .slide-desc { font-size: 15px; color: var(--muted); font-weight: 300; line-height: 1.7; max-width: 420px; }

//         .cta-row { display: flex; gap: 14px; align-items: center; margin-bottom: 36px; }
//         .btn-primary { background: var(--emerald); color: white; padding: 13px 30px; border-radius: 99px; border: none; font-size: 14px; cursor: pointer; box-shadow: 0 0 28px rgba(16,185,129,0.4); transition: all .25s; }
//         .btn-secondary { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--white); padding: 13px 30px; border-radius: 99px; font-size: 14px; cursor: pointer; }

//         .dots-row { display: flex; gap: 8px; margin-bottom: 40px; }
//         .dot { height: 3px; width: 22px; border-radius: 99px; background: rgba(255,255,255,0.1); cursor: pointer; position: relative; overflow: hidden; }
//         .dot.active { width: 36px; }
//         .dot.active::after { content:''; position:absolute; left:0; top:0; height:100%; background: var(--emerald); animation: dotFill 5s linear forwards; }
//         @keyframes dotFill { from{width:0%} to{width:100%} }

//         .stats-row { display: flex; gap: 32px; align-items: center; }
//         .stat-num { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: var(--white); }
//         .stat-num span { color: var(--emerald); }
//         .stat-label { font-size: 11px; color: var(--muted); margin-top: 3px; }
//         .stat-sep { width: 1px; height: 36px; background: rgba(255,255,255,0.08); }

//         .meets-chip { display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 99px; padding: 8px 16px; margin-top: 24px; }
//         .meets-icon { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg,#10b981,#059669); display:flex; align-items:center; justify-content:center; }

//         .right { height: 100vh; display: flex; gap: 14px; padding-right: 20px; align-items: flex-start; }
//         .col { display: flex; flex-direction: column; gap: 14px; flex: 1; }
//         .col:nth-child(1) { margin-top: 60px; }
//         .col:nth-child(2) { margin-top: -20px; }
//         .col:nth-child(3) { margin-top: 100px; }

//         .pill-card { border-radius: 200px; overflow: hidden; position: relative; cursor: pointer; transition: all .35s ease; }
//         .pill-card:hover { transform: scale(1.04) translateY(-6px); }
//         .tall { height: 220px; } .mid { height: 170px; } .short { height: 130px; }

//         .c-emerald { background: linear-gradient(160deg, #065f46, #10b981); }
//         .c-gold { background: linear-gradient(160deg, #78350f, #f59e0b); }
//         .c-violet { background: linear-gradient(160deg, #3b0764, #8b5cf6); }
//         .c-sky { background: linear-gradient(160deg, #0c4a6e, #06b6d4); }
//         .c-coral { background: linear-gradient(160deg, #7c2d12, #f97316); }
//         .c-rose { background: linear-gradient(160deg, #881337, #fb7185); }
//         .c-lime { background: linear-gradient(160deg, #365314, #84cc16); }
//         .c-indigo { background: linear-gradient(160deg, #1e1b4b, #6366f1); }

//         .pill-tag { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); white-space: nowrap; background: rgba(0,0,0,0.45); backdrop-filter: blur(8px); border-radius: 99px; padding: 4px 12px; font-size: 9px; color: white; text-transform: uppercase; }

//         .col-scroll-1 { animation: scrollUp 18s linear infinite; }
//         .col-scroll-2 { animation: scrollDown 22s linear infinite; }
//         .col-scroll-3 { animation: scrollUp 20s linear infinite; animation-delay: -5s; }
//         @keyframes scrollUp { 0% { transform: translateY(0); } 100% { transform: translateY(-40%); } }
//         @keyframes scrollDown { 0% { transform: translateY(-40%); } 100% { transform: translateY(0); } }
//         .right:hover .col { animation-play-state: paused; }
//       `}</style>

//       <div className="hero-container">
//         <div className="hero">
//           <div className="blob blob-1"></div>
//           <div className="blob blob-2"></div>

//           {/* LEFT CONTENT */}
//           <div className="left">
//             <div className="swiper-wrap">
//               {slides.map((slide, index) => (
//                 <div key={index} className={`slide ${currentSlide === index ? 'active' : ''}`}>
//                   <div className="slide-eyebrow">{slide.eyebrow}</div>
//                   <h1 className="slide-heading">
//                     {slide.heading}<br />
//                     <span className={`pill-word ${slide.pillColor}`}>{slide.pill}</span>
//                   </h1>
//                   <p className="slide-desc">{slide.desc}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="dots-row">
//               {slides.map((_, index) => (
//                 <div 
//                   key={index} 
//                   className={`dot ${currentSlide === index ? 'active' : ''}`}
//                   onClick={() => goTo(index)}
//                 ></div>
//               ))}
//             </div>

//             <div className="cta-row">
//               <button className="btn-primary">Book Free Demo →</button>
//               <button className="btn-secondary">Explore Courses</button>
//             </div>

//             <div className="stats-row">
//               <div className="stat">
//                 <div className="stat-num">22<span>+</span></div>
//                 <div className="stat-label">Years Experience</div>
//               </div>
//               <div className="stat-sep"></div>
//               <div className="stat">
//                 <div className="stat-num">5K<span>+</span></div>
//                 <div className="stat-label">Happy Students</div>
//               </div>
//               <div className="stat-sep"></div>
//               <div className="stat">
//                 <div className="stat-num">98<span>%</span></div>
//                 <div className="stat-label">Success Rate</div>
//               </div>
//             </div>

//             <div className="meets-chip">
//               <div className="meets-icon">📍</div>
//               <div className="meets-text">
//                 <strong>Ujjain, M.P.</strong>
//                 GDC College Road, Freeganj • 9826705035
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SCROLLING PILLS */}
//           <div className="right">
//             {/* Column 1 */}
//             <div className="col col-scroll-1">
//               <div className="pill-card tall c-emerald">
//                 <div className="pill-tag">Foundation English</div>
//               </div>
//               <div className="pill-card mid c-coral">
//                 <div className="pill-tag">Public Speaking</div>
//               </div>
//               <div className="pill-card short c-lime">
//                 <div className="pill-tag">Fluent English</div>
//               </div>
//               {/* Duplicates for seamless loop */}
//               <div className="pill-card tall c-emerald" style={{ opacity: 0.7 }}></div>
//             </div>

//             {/* Column 2 */}
//             <div className="col col-scroll-2">
//               <div className="pill-card mid c-violet">
//                 <div className="pill-tag">Personality Dev</div>
//               </div>
//               <div className="pill-card tall c-sky">
//                 <div className="pill-tag">Expert Mentor</div>
//               </div>
//               <div className="pill-card short c-rose">
//                 <div className="pill-tag">Business English</div>
//               </div>
//               <div className="pill-card mid c-violet" style={{ opacity: 0.7 }}></div>
//             </div>

//             {/* Column 3 */}
//             <div className="col col-scroll-3">
//               <div className="pill-card short c-gold">
//                 <div className="pill-tag">Handwriting</div>
//               </div>
//               <div className="pill-card tall c-indigo">
//                 <div className="pill-tag">Interview Prep</div>
//               </div>
//               <div className="pill-card mid c-sky">
//                 <div className="pill-tag">GD & Debates</div>
//               </div>
//               <div className="pill-card short c-gold" style={{ opacity: 0.7 }}></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HeroSection;


// import React, { useState, useEffect } from 'react';
// import { FiArrowRight } from "react-icons/fi";

// const HeroSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       eyebrow: "Academy Protocol Activated",
//       heading: "Confidence Is Just",
//       highlight: "The Beginning",
//       desc: "Vijayvargiya's — 22 years of glorious success. Where hesitation ends and confidence begins."
//     },
//     {
//       eyebrow: "Elite Protocol Activated",
//       heading: "Master The Art of",
//       highlight: "Handwriting",
//       desc: "Improve Hindi & English handwriting with scientific methods. Leave a mark before you even speak."
//     },
//     {
//       eyebrow: "Fluent Protocol Activated",
//       heading: "Own Every",
//       highlight: "Stage & Mic",
//       desc: "Remove stage fear. Master public speaking, GD, and interviews with our Situational Method."
//     }
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   return (
//     <div className="relative min-h-screen w-full bg-[#0f1115] text-white flex items-center justify-center px-6 md:px-12 lg:px-20 py-20 overflow-hidden font-sans">
      
//       {/* --- INLINE ANIMATION STYLES (No Config Needed) --- */}
//       <style>{`
//         @keyframes slowBounceUp {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-25px); }
//         }
//         @keyframes slowBounceDown {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(25px); }
//         }
//         .animate-slow-up { animation: slowBounceUp 8s ease-in-out infinite; }
//         .animate-slow-down { animation: slowBounceDown 10s ease-in-out infinite; }
//         .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.3); color: transparent; }
//       `}</style>

//       {/* Background Glows */}
//       <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
//       <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

//       <main className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
//         {/* --- LEFT CONTENT: SWIPER --- */}
//         <section className="flex flex-col gap-8 text-center lg:text-left h-[450px] justify-center">
//           <div className="relative h-[220px] md:h-[280px]">
//             {slides.map((slide, index) => (
//               <div 
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   currentSlide === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'
//                 }`}
//               >
//                 <span className="inline-block text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-[#10b981] mb-6 px-4 py-2 bg-[#10b981]/5 border border-[#10b981]/10 rounded-full">
//                   {slide.eyebrow}
//                 </span>
//                 <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic mb-6">
//                   {slide.heading} 
//                   <span className="block text-blue-500 mt-2">{slide.highlight}</span>
//                 </h1>
//                 <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[500px] mx-auto lg:mx-0 font-medium">
//                   {slide.desc}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
//             <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
//               Start Today! <FiArrowRight size={18} />
//             </button>
//             <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all text-sm uppercase tracking-widest active:scale-95">
//               Registration
//             </button>
//           </div>

//           {/* Stats Bar */}
//           <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12 pt-10 border-t border-white/5">
//             <div className="flex flex-col gap-1">
//               <span className="text-3xl font-black tracking-tighter text-white italic">22<span className="text-emerald-500">+</span></span>
//               <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Success Years</span>
//             </div>
//             <div className="flex flex-col gap-1">
//               <span className="text-3xl font-black tracking-tighter text-white italic">5K<span className="text-emerald-500">+</span></span>
//               <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Scholars</span>
//             </div>
//             <div className="flex flex-col gap-1">
//               <span className="text-3xl font-black tracking-tighter text-white italic">98<span className="text-emerald-500">%</span></span>
//               <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Result Rate</span>
//             </div>
//           </div>
//         </section>

//         {/* --- RIGHT: STADIUM GALLERY (The "Regs" Style) --- */}
//         <section className="hidden md:flex gap-4 lg:gap-6 h-[600px] items-center justify-end">
          
//           {/* Column 1 - Bouncing Up */}
//           <div className="w-32 lg:w-40 flex flex-col gap-4 lg:gap-6 animate-slow-up">
//             <div className="h-[280px] lg:h-[320px] rounded-full bg-orange-500 overflow-hidden border border-white/10 shadow-2xl">
//               <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80" alt="S1" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" />
//             </div>
//             <div className="h-[180px] lg:h-[220px] rounded-full bg-sky-500 border border-white/10" />
//           </div>

//           {/* Column 2 - Bouncing Down (Offset) */}
//           <div className="w-32 lg:w-40 flex flex-col gap-4 lg:gap-6 pt-20 animate-slow-down">
//             <div className="h-[180px] lg:h-[220px] rounded-full bg-purple-600 border border-white/10 shadow-2xl" />
//             <div className="h-[280px] lg:h-[320px] rounded-full bg-emerald-500 overflow-hidden border border-white/10 shadow-2xl">
//               <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="S2" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" />
//             </div>
//           </div>

//           {/* Column 3 - Bouncing Up */}
//           <div className="w-32 lg:w-40 flex flex-col gap-4 lg:gap-6 animate-slow-up">
//             <div className="h-[280px] lg:h-[320px] rounded-full bg-pink-500 overflow-hidden border border-white/10 shadow-2xl">
//               <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" alt="S3" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" />
//             </div>
//             <div className="h-[180px] lg:h-[220px] rounded-full bg-blue-500 border border-white/10" />
//           </div>

//         </section>

//       </main>
//     </div>
//   );
// };

// export default HeroSection;



