// import React from "react";
// import ProgressBar from "@ramonak/react-progress-bar";
// import { PiCertificateFill } from "react-icons/pi";
// import { FiPlay, FiClock } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// const BuyedCourseCard = ({ data }) => {
//   const navigate = useNavigate();

//   // Navigation Logic
//   const handleStartCourse = () => {
//     if (data.courseContent?.[0]) {
//       navigate(`/course/${data._id}/section/${data.courseContent[0]._id}/subSection/${data.courseContent[0].subSections[0]}`);
//     }
//   };

//   return (
//     <div className="group relative flex flex-col w-full max-w-[21rem] bg-[#ffffff]/[0.02] border border-[#ffffff]/5 rounded-[2.5rem] p-4 transition-all duration-500 hover:bg-[#ffffff]/[0.05] hover:border-[#10b981]/20 shadow-2xl">
      
//       {/* 1. Thumbnail Area with Play Overlay */}
//       <div 
//         className="relative aspect-video rounded-[2rem] overflow-hidden border border-[#ffffff]/10 cursor-pointer"
//         onClick={handleStartCourse}
//       >
//         <img src={data.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Thumbnail" />
//         <div className="absolute inset-0 bg-[#000000]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//           <div className="w-12 h-12 rounded-full bg-[#10b981] flex items-center justify-center text-[#000000] shadow-[0_0_20px_rgba(16,185,129,0.5)]">
//             <FiPlay size={24} />
//           </div>
//         </div>
//       </div>

//       {/* 2. Course Info */}
//       <div className="flex flex-col gap-3 mt-5 px-2">
//         <div className="flex flex-col">
//           <h3 className="text-lg font-bold text-[#ffffff] tracking-tight group-hover:text-[#10b981] transition-colors truncate">
//             {data.courseName}
//           </h3>
//           <p className="text-[10px] text-[#4b5563] font-bold uppercase tracking-widest mt-1">
//             Lead: {data.instructor?.firstName} {data.instructor?.lastName}
//           </p>
//         </div>

//         {/* 3. Progress Protocol [Image of a modern linear progress bar in a dark UI] */}
//         <div className="mt-2 space-y-2">
//           <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-[#4b5563]">
//             <span>Fluency Sync</span>
//             <span className="text-[#10b981]">60%</span>
//           </div>
//           <ProgressBar
//             completed={60}
//             isLabelVisible={false}
//             baseBgColor="#ffffff0d"
//             bgColor="#10b981"
//             height="4px"
//             animateOnRender
//           />
//         </div>

//         {/* 4. Meta Info Footer */}
//         <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#ffffff]/5">
//           <div className="flex items-center gap-2 text-[#4b5563]">
//             <FiClock size={12} />
//             <p className="text-[10px] font-bold uppercase tracking-widest">
//               Status: <span className="text-[#10b981]">Lifetime</span>
//             </p>
//           </div>
//           <div className="relative group/cert">
//             <div className="absolute -inset-2 bg-[#6A0DAD]/20 blur-lg rounded-full opacity-0 group-hover/cert:opacity-100 transition-opacity" />
//             <PiCertificateFill size={24} className="text-[#ffffff]/20 group-hover/cert:text-[#6A0DAD] transition-all relative z-10" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyedCourseCard;










import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { PiCertificateFill } from "react-icons/pi";
import { FiPlay, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BuyedCourseCard = ({ data }) => {
  const navigate = useNavigate();

  const handleStartCourse = () => {
    if (data.courseContent?.[0]) {
      navigate(`/course/${data._id}/section/${data.courseContent[0]._id}/subSection/${data.courseContent[0].subSections[0]}`);
    }
  };

  return (
    <div className="
      group relative flex flex-col w-full 
      max-w-full sm:max-w-[21rem] 
      bg-white/[0.02] border border-white/5 
      rounded-2xl sm:rounded-[2.5rem] 
      p-3 sm:p-4 
      transition-all duration-300 
      hover:bg-white/[0.05] hover:border-[#10b981]/20
    ">
      
      {/* Thumbnail */}
      <div 
        className="relative aspect-video rounded-xl sm:rounded-[2rem] overflow-hidden border border-white/10 cursor-pointer"
        onClick={handleStartCourse}
      >
        <img 
          src={data.thumbnail} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          alt="Thumbnail" 
        />

        {/* Always visible play button on mobile */}
        <div className="
          absolute inset-0 
          bg-black/30 
          flex items-center justify-center 
          opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
          transition-opacity
        ">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#10b981] flex items-center justify-center text-black">
            <FiPlay size={20} />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 sm:gap-3 mt-4 px-1 sm:px-2">

        <div className="flex flex-col">
          <h3 className="text-sm sm:text-lg font-bold text-white truncate group-hover:text-[#10b981]">
            {data.courseName}
          </h3>
          <p className="text-[9px] sm:text-[10px] text-[#4b5563] font-bold uppercase tracking-widest mt-1">
            Lead: {data.instructor?.firstName} {data.instructor?.lastName}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-1 sm:mt-2 space-y-1 sm:space-y-2">
          <div className="flex justify-between text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-[#4b5563]">
            <span>Progress</span>
            <span className="text-[#10b981]">60%</span>
          </div>

          <ProgressBar
            completed={60}
            isLabelVisible={false}
            baseBgColor="#ffffff0d"
            bgColor="#10b981"
            height="4px"
            animateOnRender
          />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5">
          
          <div className="flex items-center gap-1 sm:gap-2 text-[#4b5563]">
            <FiClock size={12} />
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
              Lifetime
            </p>
          </div>

          <div className="relative">
            <PiCertificateFill 
              size={20} 
              className="text-white/30 sm:text-white/20 sm:hover:text-[#6A0DAD] transition-all" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyedCourseCard;