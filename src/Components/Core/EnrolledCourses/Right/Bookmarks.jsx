import React from 'react';
// import { motion } from 'framer-motion';
import { FiSettings, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-[#000000] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6A0DAD]/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Animated Icon Terminal */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-8 rounded-[2.5rem] shadow-2xl mb-10 backdrop-blur-xl"
        >
          <FiSettings size={48} className="text-[#10b981] drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold text-[#ffffff] mb-4 tracking-tighter">
          Protocol <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] to-purple-400">Optimization</span>
        </h1>

        <p className="text-[#6b7280] text-sm md:text-lg max-w-lg leading-relaxed font-light mb-12">
          We are currently engineering the Bookmark synchronization module. This node will be online in the next system update.
        </p>

        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 bg-[#ffffff] text-[#000000] px-8 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#10b981] transition-all shadow-xl active:scale-95"
        >
          <FiArrowLeft /> Return to Hub
        </button>
      </motion.div>

      {/* Progress Bar Loader */}
      <div className="absolute bottom-20 w-64 h-[1px] bg-[#ffffff]/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#6A0DAD] to-[#10b981]"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default Bookmarks;