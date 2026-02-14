import React, { useEffect } from 'react'
import AddNewCourse from '../AddCourse/AddNewCourse'
import { useSelector, useDispatch } from 'react-redux'
import { setStep } from '../../../../../Slices/Courses';
import { FiEdit3, FiLayers } from 'react-icons/fi'; // Modern Icons

const EditPreviousCourse = () => {
  const dispatch = useDispatch();
  const { course } = useSelector(state => state.Course);

  // ✅ Step reset logic to start from Information Phase
  useEffect(() => {
    dispatch(setStep(1));
  }, [dispatch]);

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-white p-6 md:p-12 overflow-hidden font-sans">
      
      {/* 1. Background Visuals - EDIT Watermark */}
      <div className="absolute top-[5%] left-[-5%] select-none pointer-events-none opacity-[0.02] z-0">
        <h1 className="text-[18rem] font-bold uppercase tracking-widest leading-none">Modify</h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* 2. Header Section with Breadcrumbs */}
        <div className="flex flex-col gap-2 px-6">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
            <span>Academy</span> <span className="text-emerald-500">/</span>
            <span>Dashboard</span> <span className="text-emerald-500">/</span>
            <span className="text-white">Edit Protocol</span>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <FiEdit3 size={24} />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tight">Revision Mode</h2>
              <p className="text-gray-500 text-sm">
                Modifying: <span className="text-emerald-400 font-medium">{course?.courseName || "Current Batch"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* 3. Reusing the Step-by-Step Flow */}
        <div className="animate-fadeSlideUp">
            <AddNewCourse />
        </div>
      </div>

      {/* Decorative Glow for consistency */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  )
}

export default EditPreviousCourse;