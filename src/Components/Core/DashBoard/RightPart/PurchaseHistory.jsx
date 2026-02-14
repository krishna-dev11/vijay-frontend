import React from 'react';
// import { motion } from 'framer-motion';
import { FiCreditCard, FiArrowLeft, FiActivity } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const PurchaseHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-[#000000] flex flex-col items-center justify-center px-6 relative overflow-hidden font-sans">
      
      {/* ─── 1. NEON GLOW EFFECTS ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6A0DAD]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#10b981]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* ─── 2. MAIN TERMINAL CONTENT ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Animated Financial Icon */}
        <div className="relative mb-10">
          <div className="absolute -inset-6 bg-[#6A0DAD]/20 blur-2xl rounded-full" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl"
          >
            <FiCreditCard size={56} className="text-[#ffffff] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#10b981] rounded-full border-4 border-[#000000] flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-[#ffffff] rounded-full animate-ping" />
            </div>
          </motion.div>
        </div>

        {/* Text Stack */}
        <div className="flex flex-col gap-3">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#6A0DAD]">
            Financial Protocol Status
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-[#ffffff] tracking-tighter uppercase leading-tight">
            Ledger <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#6A0DAD]">Synchronization</span>
          </h1>
          <p className="text-[#6b7280] text-sm md:text-lg max-w-lg leading-relaxed font-light mt-4">
            Our engineers are currently stabilizing the transaction data nodes. Your full financial ledger will be available in the next terminal update.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 bg-[#ffffff] text-[#000000] px-10 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#10b981] transition-all shadow-2xl active:scale-95"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
            Restore Hub Connection
          </button>
          
          <div className="flex items-center gap-2 opacity-40">
            <FiActivity className="text-[#4b5563]" size={12} />
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#4b5563]">
              Secure Transaction Node v2.4
            </span>
          </div>
        </div>
      </motion.div>

      {/* ─── 3. PROGRESS BAR LOADER ─── */}
      <div className="absolute bottom-20 w-48 h-[2px] bg-[#ffffff]/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#10b981] via-[#6A0DAD] to-[#10b981]"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
      </div>

      {/* Decorative Grid Overlays  */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
    </div>
  );
};

export default PurchaseHistory;