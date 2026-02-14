import { useState, useEffect } from "react";
import { Lock } from "lucide-react";

/* ================= Floating Card ================= */
const FloatCard = ({ children, className = "", delay = 0, style }) => {
  return (
    <div
      className={`absolute animate-floatCard ${className}`}
      style={{ ...style, animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

/* ================= Minimal Neon Lock ================= */
const NeonLock = () => (
  <div className="relative flex items-center justify-center w-14 h-14">
    <div className="absolute inset-0 rounded-full blur-xl bg-yellow-500/30"></div>
    <Lock size={30} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
  </div>
);

/* ================= Gradient Sphere (Globe replacement) ================= */
const GradientSphere = () => (
  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-400 blur-[0.5px]" />
);

/* ================= Minimal WASD Card ================= */
const Key = ({ label }) => (
  <div className="w-12 h-12 flex items-center justify-center rounded-xl font-bold text-white 
    bg-[#111] border border-white/10 shadow-[0_4px_12px_rgba(255,255,255,0.05)]">
    {label}
  </div>
);

/* ================= Main Component ================= */
export default function WebGeneratedHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="relative w-screen min-h-screen flex items-center justify-center overflow-hidden 
      bg-black bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_1px,_transparent_1px)] 
      bg-[size:36px_36px]"
    >
      {/* ===== Floating Decorative Cards (NO BOTS) ===== */}

      {/* Top Left — Neon Lock */}
      <FloatCard
        style={{ top: "12%", left: "18%" }}
        className="w-20 h-20 bg-[#0b0b0b] rounded-3xl border border-white/10 
        shadow-[0_10px_40px_rgba(255,255,255,0.08)] flex items-center justify-center"
      >
        <NeonLock />
      </FloatCard>

      {/* Mid Left — Gradient Sphere */}
      <FloatCard
        delay={1.2}
        style={{ top: "38%", left: "10%" }}
        className="w-24 h-24 bg-[#0a0a0a] rounded-3xl border border-white/10 
        shadow-[0_12px_44px_rgba(255,255,255,0.1)] flex items-center justify-center"
      >
        <GradientSphere />
      </FloatCard>

      {/* Bottom Left — WASD Minimal Panel */}
      <FloatCard
        delay={2.4}
        style={{ bottom: "10%", left: "18%" }}
        className="w-40 h-36 bg-[#0f0f0f] rounded-3xl border border-white/10 
        shadow-[0_12px_44px_rgba(255,255,255,0.06)] flex flex-col items-center justify-center gap-2"
      >
        <Key label="W" />
        <div className="flex gap-2">
          <Key label="A" />
          <Key label="S" />
          <Key label="D" />
        </div>
      </FloatCard>

      {/* Top Right — Glass Card */}
      <FloatCard
        delay={0.6}
        style={{ top: "14%", right: "14%" }}
        className="w-28 h-28 bg-[#0b0b0b]/80 backdrop-blur-md rounded-3xl border border-white/10 
        shadow-[0_12px_44px_rgba(255,255,255,0.08)]"
      />

      {/* Bottom Right — Soft Glow Card */}
      <FloatCard
        delay={1.8}
        style={{ bottom: "12%", right: "10%" }}
        className="w-40 h-40 bg-gradient-to-br from-[#0b0b0b] to-[#111] rounded-3xl 
        border border-white/10 shadow-[0_16px_60px_rgba(255,255,255,0.08)]"
      />

      {/* ===== CENTER CONTENT (Premium Look) ===== */}
{mounted && (
  <div className="relative z-10 text-center flex flex-col items-center gap-6 max-w-2xl px-6 animate-fadeSlideUp">
    
    <span className="text-green-400 text-sm tracking-widest uppercase">
      Why Choose Us
    </span>

    <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white tracking-tight">
      Speak English with <br /> Confidence & Clarity
    </h1>

    <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
      We don’t just teach English — we build confident communicators.  
      Through real conversations, expert mentoring, and personality training,  
      we help you transform hesitation into powerful expression.
    </p>

    <div className="flex gap-4 mt-2">
      <button
        className="px-8 py-3 bg-green-500 text-black font-semibold rounded-full 
        shadow-[0_8px_28px_rgba(34,197,94,0.25)] hover:bg-green-400 transition"
      >
        Start Learning
      </button>

      <button
        className="px-8 py-3 border border-gray-700 text-white font-medium rounded-full 
        hover:bg-gray-900 transition"
      >
        Learn More
      </button>
    </div>
  </div>
)}

    </div>
  );
}
