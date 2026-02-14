import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetAvgRating from '../../../Utilities/avgRating'
import { useSelector } from 'react-redux'
import ReactStars from "react-stars";

const CourseCard = ({ data }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    // Safety check: rating array exist karta hai ya nahi
    const avg = GetAvgRating(data?.ratingAndReviews || []);
    setAvgRating(avg || 0);
  }, [data]);

  // Agar data hi nahi hai toh khali div return karo crash hone ki jagah
  if (!data) return null;

  return (
    <div 
      onClick={() => token ? navigate(`/CourseDetails/${data?._id}`) : navigate("/login")}
      className='group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-4 transition-all duration-500 hover:bg-white/[0.04] hover:border-emerald-500/20 shadow-2xl cursor-pointer overflow-hidden h-full'
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-[2.5rem] blur opacity-0 group-hover:opacity-10 transition duration-500" />

      {/* Image Area */}
      <div className='relative aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-white/10 bg-richblack-800'>
        <img src={data?.thumbnail} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' alt="Node" />
        <div className='absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-emerald-400'>
           {/* FIX: _id check added */}
           Node {data?._id ? data._id.slice(-2) : "00"}
        </div>
      </div>

      {/* Content Area */}
      <div className='flex flex-col gap-3 mt-6 px-2 flex-1'>
        <h3 className='text-lg font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors line-clamp-1 uppercase'>
            {data?.courseName || "Untitled Course"}
        </h3>
        
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-gray-400 font-bold">
             {/* FIX: Instructor initial check added */}
             {data?.instructor?.firstName ? data.instructor.firstName[0] : "?"}
           </div>
           <p className='text-[10px] font-bold uppercase tracking-widest text-gray-500 italic'>
             Archived By: {data?.instructor?.firstName || "Unknown"}
           </p>
        </div>

        <div className='flex items-center gap-3 border-t border-white/5 pt-4 mt-auto'>
          <div className="flex items-center gap-1.5">
             <span className="text-emerald-400 font-bold text-sm">{avgRating.toFixed(1)}</span>
             <ReactStars count={5} edit={false} value={avgRating} size={18} color2={"#10b981"} />
          </div>
          <div className="h-3 w-[1px] bg-white/10" />
          <p className='text-sm font-black text-white'>₹{data?.price || 0}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseCard;