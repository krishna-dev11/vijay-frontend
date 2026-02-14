import React from 'react'
import { Outlet } from 'react-router-dom'
import EnrolledCoursesSideBar from '../Components/Core/EnrolledCourses/Left/EnrolledCoursesSideBar'

const EnrolledCourses = () => {
  return (
    <div className='flex w-full h-[calc(100vh-4rem)] bg-[#000] overflow-hidden font-sans pt-16'>
      
      {/* ─── MODERN SIDEBAR CONTAINER ─── */}
      <aside className='w-[18%] md:w-[20%] lg:w-[15%] h-full bg-white/[0.01] border-r border-white/5 backdrop-blur-3xl flex flex-col transition-all duration-500 group'>
 

                   <EnrolledCoursesSideBar />
        
        {/* Sidebar Decorative Footer */}
        <div className="mt-auto p-6 border-t border-white/5 flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
           <span className="text-[8px] font-bold uppercase text-gray-500 tracking-widest">Active Protocol</span>
        </div>
      </aside>

      {/* ─── MAIN CONTENT VIEWPORT ─── */}
      <main className='flex-1 h-full overflow-y-auto bg-transparent relative custom-scrollbar'>
        
        {/* Soft Background Glow for Content */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="p-8 md:p-12 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      
    </div>
  )
}

export default EnrolledCourses;