// import React from "react";
// import { IoIosAdd } from "react-icons/io";
// import { FiFilter} from "react-icons/fi";
// import RenderMyCourses from "./RenderMyCourses";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCourse, setEditCourse, setStep } from "../../../../../Slices/Courses";

// const DisplayMyCourses = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   return (
//     <div className="relative min-h-screen w-full bg-[#000] text-white p-6 md:p-12 overflow-hidden font-sans">
      
//       {/* Background Watermark */}
//       <div className="absolute top-[10%] right-[-5%] select-none pointer-events-none opacity-[0.02] z-0">
//         <h1 className="text-[15rem] font-bold uppercase tracking-widest leading-none">Batches</h1>
//       </div>

//       <div className="relative z-10 max-w-6xl translate-y-6 mx-auto flex flex-col gap-10">
        
//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
//           <div>
//             <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
//               <span>Dashboard</span> <span className="text-emerald-500">/</span>
//               <span className="text-white">My Courses</span>
//             </nav>
//             <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Master Catalog</h2>
//             <p className="text-gray-500 text-sm mt-2 max-w-md">
//               Oversee your curriculum, active batches, and real-time student enrollments.
//             </p>
//           </div>

//           <div className="flex gap-x-4 items-center w-full md:w-auto">
//             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-gray-300 px-6 py-3 rounded-2xl hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest">
//               <FiFilter /> Filter
//             </button>

//             <button
//               onClick={() => {
//                 dispatch(setCourse(null));
//                 dispatch(setStep(1));
//                 dispatch(setEditCourse(false));
//                 navigate("/dashboard/add-course");
//               }}
//               className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:bg-gray-200 transition-all text-xs font-bold uppercase tracking-widest active:scale-95"
//             >
//               <IoIosAdd size={20} /> Add New Batch
//             </button>
//           </div>
//         </div>

//         {/* LISTING SECTION */}
//         <RenderMyCourses />
//       </div>
//     </div>
//   );
// };

// export default DisplayMyCourses;






import React from "react";
import { IoIosAdd } from "react-icons/io";
import { FiFilter} from "react-icons/fi";
import RenderMyCourses from "./RenderMyCourses";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCourse, setEditCourse, setStep } from "../../../../../Slices/Courses";

const DisplayMyCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-white p-4 md:p-12 overflow-hidden font-sans">
      
      {/* Background Watermark - Responsive scaling to prevent overflow */}
      <div className="absolute top-[10%] right-[-5%] select-none pointer-events-none opacity-[0.02] z-0">
        <h1 className="text-[7rem] sm:text-[10rem] md:text-[15rem] font-bold uppercase tracking-widest leading-none">Batches</h1>
      </div>

      <div className="relative z-10 max-w-6xl translate-y-6 mx-auto flex flex-col gap-8 md:gap-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
          <div className="w-full md:w-auto">
            <nav className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              <span>Dashboard</span> <span className="text-emerald-500">/</span>
              <span className="text-white">My Courses</span>
            </nav>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Master Catalog</h2>
            <p className="text-gray-500 text-xs md:text-sm mt-2 max-w-md leading-relaxed">
              Oversee your curriculum, active batches, and real-time student enrollments.
            </p>
          </div>

          {/* Buttons: Side by side on mobile with small gap */}
          <div className="flex flex-row gap-3 items-center w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-gray-300 px-4 md:px-6 py-3 rounded-2xl hover:bg-white/10 transition-all text-[10px] md:text-xs font-bold uppercase tracking-widest">
              <FiFilter /> Filter
            </button>

            <button
              onClick={() => {
                dispatch(setCourse(null));
                dispatch(setStep(1));
                dispatch(setEditCourse(false));
                navigate("/dashboard/add-course");
              }}
              className="flex-[2] md:flex-none flex items-center justify-center gap-2 bg-white text-black px-4 md:px-8 py-4 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:bg-gray-200 transition-all text-[10px] md:text-xs font-bold uppercase tracking-widest active:scale-95"
            >
              <IoIosAdd size={20} /> Add New Batch
            </button>
          </div>
        </div>

        {/* LISTING SECTION */}
        <RenderMyCourses />
      </div>
    </div>
  );
};

export default DisplayMyCourses;