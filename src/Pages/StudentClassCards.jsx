import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiVideo, FiArrowRight, FiClock, FiActivity } from "react-icons/fi";

export default function StudentClassCards() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  const liveClassUrl = "https://yourliveclasslink.com";

  return (
    <div className="relative min-h-[400px] w-full flex items-center justify-center p-6 font-sans overflow-hidden">
      
      {/* ─── Background Cyber-Glow  ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* ─── CLASS TERMINAL CARD ─── */}
      <div className="relative z-10 w-full max-w-md bg-white/[0.02] border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl shadow-3xl flex flex-col items-center gap-8 group hover:border-emerald-500/20 transition-all duration-500">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-b-full opacity-40" />

        {/* Live Indicator Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400">Class Active</span>
        </div>

        {/* Visual Icon Section */}
        <div className="relative">
          <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="relative w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shadow-2xl">
            <FiVideo size={36} />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tighter text-white">Join Session</h2>
          <p className="text-gray-500 text-sm font-light leading-relaxed max-w-[250px] mx-auto">
            Your instructor is ready. Initialize your <span className="text-emerald-400 font-medium">Spoken English</span> protocol.
          </p>
        </div>

        {/* Meta Info Bento  */}
        <div className="w-full grid grid-cols-2 gap-3">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex flex-col items-center gap-1">
             <FiClock className="text-gray-600" size={14} />
             <span className="text-[9px] font-bold uppercase text-gray-400 tracking-widest">Duration</span>
             <span className="text-xs font-bold text-white">60 Mins</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex flex-col items-center gap-1">
             <FiActivity className="text-gray-600" size={14} />
             <span className="text-[9px] font-bold uppercase text-gray-400 tracking-widest">Status</span>
             <span className="text-xs font-bold text-white">Online</span>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="w-full flex flex-col gap-4">
          <a
            href={liveClassUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:bg-emerald-400 transition-all active:scale-95 group/btn"
          >
            Enter Classroom <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </a>
          
          <button 
            onClick={() => navigate(`/EnrolledCourses/${user?.firstName}`)}
            className="text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:text-white transition-colors"
          >
            View Batch Schedule
          </button>
        </div>

      </div>
    </div>
  );
}