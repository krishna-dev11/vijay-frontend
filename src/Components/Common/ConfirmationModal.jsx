// import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const ConfirmationModal = ({ data }) => {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-3xl overflow-hidden p-10 flex flex-col items-center text-center gap-y-6">
        
        {/* Accent Glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
        
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
          <FiAlertTriangle size={32} />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">{data.heading}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{data.text1}</p>
        </div>

        <div className="flex gap-4 w-full mt-4">
          <button 
            className="flex-1 py-4 bg-white text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            onClick={data.btn1Onclick}
          >
            {data.button1Text}
          </button>
          <button 
            className="flex-1 py-4 bg-white/5 border border-white/10 text-gray-400 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
            onClick={data.btn2Onclick}
          >
            {data.button2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;