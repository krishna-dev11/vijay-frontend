import React from 'react';
// import { motion } from 'framer-motion';
import { FiUsers, FiArrowLeft, FiGlobe } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-[#000000] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Pulse Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10b981]/5 blur-[120px] rounded-full animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Animated Icon with Network Glow */}
        <div className="relative mb-10">
          <div className="absolute -inset-6 bg-[#6A0DAD]/20 blur-2xl rounded-full" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="relative bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-8 rounded-[3rem] backdrop-blur-xl shadow-2xl"
          >
            <FiUsers size={56} className="text-[#ffffff]" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#10b981] rounded-full border-4 border-[#000000] flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-[#ffffff] rounded-full animate-ping" />
            </div>
          </motion.div>
        </div>

        {/* Text Stack */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#ffffff] mb-4 tracking-tighter uppercase">
          Peer <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#6A0DAD]">Synchronization</span>
        </h1>

        <p className="text-[#6b7280] text-sm md:text-lg max-w-lg leading-relaxed font-light mb-12">
          We are currently stabilizing the global expressivity network. The **Community Node** will be accessible in the next terminal update.
        </p>

        {/* Actions */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 bg-[#ffffff] text-[#000000] px-8 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#10b981] transition-all shadow-xl"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
          Restore Connection
        </button>
      </motion.div>

      {/* Futuristic Progress Bar */}
      <div className="absolute bottom-20 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-[8px] font-bold text-[#4b5563] uppercase tracking-[0.4em]">
           <FiGlobe /> Signal Status: Engineering 
        </div>
        <div className="w-48 h-[1px] bg-[#ffffff]/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#10b981] to-[#6A0DAD]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Community;