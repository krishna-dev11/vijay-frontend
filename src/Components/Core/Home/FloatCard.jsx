import { useState, useEffect } from "react";
import { Lock, Sparkles, MoveRight } from "lucide-react";
import would from "../../../Utilities/couldVsWould.png"
import nervous from "../../../Utilities/nervious.png"
import Yellow from "../../../Utilities/yellow.jpg"
import Sir from "../../../Utilities/sir-removebg-preview.png"

/* ================= Floating Card ================= */
const FloatCard = ({ children, className = "", delay = 0, style }) => (


  <div
    className={`absolute animate-floatCard hidden md:flex ${className}`}
    style={{ ...style, animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

/* ================= Modern Icons ================= */
const Key = ({ label }) => (
  <div className="w-12 h-12 flex items-center justify-center rounded-xl font-bold text-gray-700 
    bg-gradient-to-br from-white to-gray-200 shadow-[4px_4px_10px_rgba(0,0,0,0.2)] border border-white/20">
    {label}
  </div>
);

const GoldenLock = () => (
  <div className="relative flex items-center justify-center w-12 h-12">
    <div className="absolute inset-0 rounded-full blur-xl bg-yellow-400/30"></div>
    <Lock size={28} className="text-yellow-400 drop-shadow-lg" />
  </div>
);

/* ================= Main Component ================= */
export default function WebGeneratedHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex bg-[#000] text-white items-center justify-center overflow-hidden font-sans">
      
      {/* ─── Background Elements ─── */}
      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-floatCard { animation: floatCard 5s ease-in-out infinite; }
        .animate-fadeSlideUp { animation: fadeSlideUp 0.8s ease-out forwards; }
      `}</style>

      {/* Top Teal Glow - Synced with Contact Page */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* ─── Desktop Floating Elements ─── */}
      <FloatCard style={{ top: "15%", left: "15%" }} className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md items-center justify-center">
        <GoldenLock />
      </FloatCard>

      <FloatCard style={{ top: "40%", left: "8%" }} delay={1.5} className="  shadow-2xl items-center justify-center">

        <img alt="pixar" className="w-24 rounded-md bg-gradient-to-br from-pink-500 to-purple-600  "  src={nervous}/>
      </FloatCard>

      <FloatCard style={{ bottom: "12%", left: "18%" }} delay={2.5} className="w-44  overflow-hidden h-40 bg-white/10 border border-white/5 backdrop-blur-2xl rounded-[3rem] flex flex-col items-center justify-center gap-3">
          <img alt="sir" src={Sir} />
      </FloatCard>

      <FloatCard style={{ top: "18%", right: "12%" }} delay={0.8} className="w-32 h-32 bg-indigo-600/20 border border-white/10 rounded-[2.5rem] backdrop-blur-xl items-center justify-center">

        <img alt="pixar" className="w-20 bg-indigo-500 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.5)]" src={Yellow}/>
      </FloatCard>

      <FloatCard style={{ bottom: "15%", right: "10%" }} delay={2} className="w-28 bg-emerald-500/20 border border-white/5 rounded-[3rem] backdrop-blur-xl items-center justify-center">
        <div > <img className=" bg-emerald-400 rounded-3xl rotate-12 shadow-[0_0_40px_rgba(52,211,153,0.3)]"  alt="pixar" src={would} /></div>
      </FloatCard>

      {/* ─── Main Improved Content ─── */}
      {mounted && (
        <div className="relative z-10 text-center flex flex-col items-center gap-8 max-w-4xl px-6 animate-fadeSlideUp">
          
          {/* Top Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="text-emerald-400" size={16} />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-gray-300">
              Transform Your Communication
            </span>
          </div>

          {/* Heading - Improved for English Academy */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-white tracking-tighter">
            Speak Boldly. <br />
<span className="bg-gradient-to-r from-[#10b981] to-[#6A0DAD] bg-clip-text text-transparent font-bold">
  Lead Globally.
</span>
          </h1>

          {/* Description - Modern & Punchy */}
          <p className="text-gray-400 max-w-2xl text-base md:text-xl leading-relaxed">
            Don't just learn grammar—master the art of expression. Join <span className="text-white font-semibold">SpeakSmart Academy</span> to build unshakable confidence and unlock global career opportunities.
          </p>

          {/* CTA Buttons - Responsive Stacking */}
          <div className="flex flex-col sm:flex-row gap-5 mt-4 w-full sm:w-auto">
            <button className="group px-10 py-5 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
              Start Speaking  <MoveRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-10 py-5 border border-white/10 text-white font-bold rounded-2xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all active:scale-95">
              Explore More
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-center gap-8 opacity-50">
            <p className="text-[10px] font-bold tracking-widest uppercase">✓ 3000+ Fluent Students</p>
            <p className="text-[10px] font-bold tracking-widest uppercase">✓ Expert Mentorship</p>
            <p className="text-[10px] font-bold tracking-widest uppercase">✓ Lifetime Community</p>
          </div>
        </div>
      )}

    </div>
  );
}