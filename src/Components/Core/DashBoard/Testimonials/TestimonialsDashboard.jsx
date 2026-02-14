import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTestimonials, deleteTestimonial } from "../../../../Services.jsx/Operations/TestimonialAPI";
import { FiStar, FiTrash2, FiPlay, FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import { FormateDate } from "../../../../Utilities/FormateDate";

const TestimonialsDashboard = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { testimonials, pagination } = useSelector((state) => state.testimonial);
  const [filter, setFilter] = useState({ page: 1, status: "All" });

  useEffect(() => {
    dispatch(getAllTestimonials(filter.page, 9, filter.status, token));
  }, [filter.page, filter.status, dispatch, token]);

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-white p-6 md:p-12 font-sans overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute top-[10%] left-[-5%] select-none pointer-events-none opacity-[0.02] z-0">
        <h1 className="text-[18rem] font-bold uppercase tracking-widest leading-none">Reviews</h1>
      </div>

      <div className="relative z-10 translate-y-6 max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">Student Testimonials</h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
              <FiFilter /> Monitoring Public Social Proof
            </p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {["All", "Active", "Inactive"].map((s) => (
              <button key={s} onClick={() => setFilter({ ...filter, status: s, page: 1 })}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${filter.status === s ? "bg-white text-black shadow-lg" : "text-gray-500 hover:text-white"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((t) => (
            <div key={t._id} className="group relative bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-500 flex flex-col gap-6 shadow-2xl">
              
              {/* Media Preview Area */}
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black">
                {t.mediaType === "Image" ? (
                  <img src={t.mediaUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Review" />
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <video className="w-full h-full object-cover opacity-60">
                      <source src={t.mediaUrl} type="video/mp4" />
                    </video>
                    <div className="absolute w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl"><FiPlay fill="currentColor" /></div>
                  </div>
                )}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase text-white tracking-widest">
                  {t.mediaType}
                </div>
              </div>

              {/* Text Area */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">{t.studentName}</h3>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <FiStar key={i} size={12} fill={i < t.rating ? "#10b981" : "none"} color={i < t.rating ? "#10b981" : "#333"} />)}
                  </div>
                </div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Batch: {t.studentBatch?.courseName}</p>
                <p className="text-sm text-gray-400 font-light italic leading-relaxed line-clamp-3">"{t.message}"</p>
              </div>

              {/* Bottom Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${t.status === "Active" ? "text-emerald-500" : "text-red-500"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full bg-current ${t.status === "Active" && "animate-ping"}`} /> {t.status}
                </div>
                <button onClick={() => dispatch(deleteTestimonial(t._id, token))} className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* High-Tech Pagination */}
        <div className="flex justify-center items-center gap-6 mt-12 pb-10">
          <button disabled={filter.page === 1} onClick={() => setFilter({ ...filter, page: filter.page - 1 })}
            className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white disabled:opacity-20 transition-all"><FiChevronLeft /></button>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400">Phase {filter.page} <span className="text-gray-600">/ {pagination.totalPages || 1}</span></span>
          <button disabled={filter.page === pagination.totalPages} onClick={() => setFilter({ ...filter, page: filter.page + 1 })}
            className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white disabled:opacity-20 transition-all"><FiChevronRight /></button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsDashboard;