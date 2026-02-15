// import React from "react";
// import { Link, matchPath, useLocation } from "react-router-dom";
// import * as FaIcons from "react-icons/fa";
// import * as IoIcons from "react-icons/io";
// import * as RiIcons from "react-icons/ri";

// const SlideBarButton = ({ icon, path, name, onClick }) => {
//   const Icon = FaIcons[icon] || IoIcons[icon] || RiIcons[icon];
//   const location = useLocation();
//   const isActive = matchPath({ path }, location.pathname);

//   return (
//     <Link to={path} className="relative group" onClick={onClick}>
//       <div
//         className={`w-full flex items-center justify-center md:justify-start gap-x-3 px-3 py-3 md:py-2 rounded-xl transition-all duration-300 relative
//           ${
//             isActive
//               ? "bg-white/5 border border-white/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.08)]"
//               : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
//           }
//         `}
//       >
//         {/* Active Side Indicator */}
//         <div className={`absolute left-0 w-[3px] h-4 bg-emerald-500 rounded-r-full transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}></div>

//         {Icon ? (
//           <Icon
//             className={`${
//               isActive ? "text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]" : "text-gray-600 group-hover:text-gray-400"
//             } text-[1.2rem] md:text-[1.1rem] transition-all duration-300`}
//           />
//         ) : (
//           <span className="text-red-500">⚠️</span>
//         )}

//         {/* --- MOBILE HIDE TEXT LOGIC --- */}
//         <span className={`hidden md:block text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${isActive ? "text-white" : "group-hover:translate-x-0.5"}`}>
//           {name}
//         </span>
        
//         {/* Tooltip for mobile (Icon-only mode) */}
//         <span className="md:hidden absolute left-full ml-4 px-2 py-1 bg-emerald-500 text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
//           {name}
//         </span>
//       </div>
//     </Link>
//   );
// };

// export default SlideBarButton;





import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

const SlideBarButton = ({ icon, path, name, onClick }) => {
  const Icon = FaIcons[icon] || IoIcons[icon] || RiIcons[icon];
  const location = useLocation();
  const isActive = matchPath({ path }, location.pathname);

  return (
    <Link to={path} className="relative group" onClick={onClick}>
      <div
        className={`w-full flex items-center justify-center md:justify-start gap-x-3 px-3 py-3 md:py-2 rounded-xl transition-all duration-300 relative
          ${
            isActive
              ? "bg-white/5 border border-white/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.08)]"
              : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
          }
        `}
      >
        {/* Active Indicator */}
        <div className={`absolute left-0 w-[3px] h-4 bg-emerald-500 rounded-r-full transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}></div>

        {Icon ? (
          <Icon
            className={`${
              isActive ? "text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]" : "text-gray-600 group-hover:text-gray-400"
            } text-[1.4rem] md:text-[1.1rem] transition-all duration-300`}
          />
        ) : (
          <span className="text-red-500">⚠️</span>
        )}

        {/* --- ICON ONLY FOR MOBILE --- */}
        {/* 'hidden md:block' ensures text only shows on laptops/tablets */}
        <span className={`hidden md:block text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${isActive ? "text-white" : "group-hover:translate-x-0.5"}`}>
          {name}
        </span>
      </div>
    </Link>
  );
};

export default SlideBarButton;