// import React from 'react'
import { useSelector } from 'react-redux'
import CourseSlider from './CourseSlider'
import { FiLayers, FiFileText, FiMessageCircle, FiBox, FiArrowRight } from 'react-icons/fi'
import FrequentCourses from './FrequentCourses'

const CategoryWiseCoursesPageTopPart = () => {
  const { CategoryWiseCourses } = useSelector(state => state.Category)
  const categoryName = CategoryWiseCourses.selectedCategory.name;

  return (
    <div className='relative min-h-screen bg-[#000] text-white font-sans overflow-hidden'>
      {/* ─── Watermark & Glow ─── */}
      <div className="absolute top-[5%] left-[-5%] select-none pointer-events-none opacity-[0.02] z-0">
        <h1 className="text-[20rem] font-bold uppercase tracking-widest">{categoryName.split(" ")[0]}</h1>
      </div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full -z-10" />

      {/* ─── SPECIFICATIONS GLASS PANEL ─── */}
      <div className='relative z-10 bg-white/[0.02] backdrop-blur-3xl border-b border-white/5 py-16 px-10'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10'>
          <div className='flex flex-col gap-4 max-w-3xl'>
            <nav className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500'>
              Home <span className='text-emerald-500'>/</span> Catalog <span className='text-emerald-500'>/</span> <span className='text-white'>{categoryName}</span>
            </nav>
            <h1 className='text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase'>{categoryName}</h1>
            <p className='text-gray-400 text-lg font-light leading-relaxed max-w-xl'>{CategoryWiseCourses.selectedCategory.description}</p>
          </div>

          <div className='flex flex-col gap-6 min-w-[250px] bg-white/5 p-8 rounded-[2.5rem] border border-white/10'>
            <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400'>Deep Learning Resources</p>
            <div className='grid grid-cols-1 gap-3'>
              {[
                { icon: FiFileText, label: `Docs: ${categoryName.split(" ")[0]}` },
                { icon: FiLayers, label: "Cheatsheets" },
                { icon: FiMessageCircle, label: "Community" },
                { icon: FiBox, label: "Live Projects" }
              ].map((res, i) => (
                <button key={i} className='flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all group'>
                  <res.icon className="text-emerald-500 group-hover:scale-110 transition-transform" /> {res.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── COURSES SECTION ─── */}
      <div className='relative z-10 max-w-7xl mx-auto flex flex-col gap-24 py-20 px-6'>
        
        {/* Selected Category */}
        <div className='flex flex-col gap-8'>
          <div className="flex items-end justify-between px-4">
             <h2 className='text-4xl font-bold tracking-tight'>Active Curriculum</h2>
             <span className="text-[10px] font-bold uppercase text-gray-600 tracking-widest">Handpicked for your profile</span>
          </div>
          <CourseSlider data={CategoryWiseCourses.selectedCategory.course} />
        </div>

        {/* Top Selling */}
        <div className='flex flex-col gap-8'>
           <div className="flex items-end justify-between px-4 border-l-2 border-emerald-500/30 pl-8">
             <div>
                <h2 className='text-4xl font-bold tracking-tight'>Market Protocols</h2>
                <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">High-demand learning nodes</p>
             </div>
             <FiArrowRight className="text-gray-700" size={32} />
          </div>
          <CourseSlider data={CategoryWiseCourses.TopSellingCourses} speed={3000} />
        </div>

        {/* Frequent Section */}
        <div className='flex flex-col gap-8'>
          <h2 className='text-4xl font-bold tracking-tight px-4'>Ecosystem Bundles</h2>
          <FrequentCourses data={CategoryWiseCourses.RandomCategory.course} />
        </div>

      </div>
    </div>
  )
}

export default CategoryWiseCoursesPageTopPart;