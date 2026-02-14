import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTestimonial } from "../../../../Services.jsx/Operations/TestimonialAPI";
import { FiStar, FiUser, FiLayers, FiMessageSquare, FiActivity } from "react-icons/fi";
import Upload from "../RightPart/AddCourse/Step1/Upload";
import { useNavigate } from "react-router-dom";

const AddTestimonial = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [isVideo, setIsVideo] = useState(false);

  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm({
    defaultValues: { rating: 5, status: "Active" }
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === "mediaFile") formData.append("media", data[key]);
      else formData.append(key, data[key]);
    });
    formData.append("isVideo", isVideo);
    dispatch(addTestimonial(formData, token, navigate));
  };

  const inputStyle = "w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white placeholder-gray-700 focus:border-emerald-500/30 outline-none transition-all text-sm";
  const labelStyle = "text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1 mb-2 block";

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-white p-6 md:p-12 font-sans overflow-hidden">
      <div className="absolute top-0  right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative translate-y-6 z-10 max-w-5xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <span>Dashboard</span> <span className="text-emerald-500">/</span>
            <span className="text-white">Feedback Entry</span>
          </nav>
          <h2 className="text-4xl font-bold tracking-tight">Add Success Story</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white/[0.02] border border-white/10 p-10 rounded-[3rem] backdrop-blur-2xl shadow-3xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Details */}
          <div className="flex flex-col gap-6">
            <label>
              <span className={labelStyle}>Student Identity</span>
              <div className="relative group">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-400" />
                <input type="text" {...register("studentName", { required: true })} className={`${inputStyle} pl-12`} placeholder="Full name..." />
              </div>
            </label>

            <label>
              <span className={labelStyle}>Enrolled Batch</span>
              <div className="relative group">
                <FiLayers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <select {...register("studentBatch", { required: true })} className={`${inputStyle} pl-12 appearance-none`}>
                  <option value="" className="bg-black">Select Batch</option>
                  {user?.courses.map(c => <option key={c._id} value={c._id} className="bg-black">{c.courseName}</option>)}
                </select>
              </div>
            </label>

            <label>
              <span className={labelStyle}>Rating Score</span>
              <div className="flex gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                {[1, 2, 3, 4, 5].map((num) => (
                  <FiStar
                    key={num}
                    size={24}
                    className="cursor-pointer transition-all active:scale-125"
                    fill={watch("rating") >= num ? "#10b981" : "none"}
                    color={watch("rating") >= num ? "#10b981" : "#333"}
                    onClick={() => setValue("rating", num)}
                  />
                ))}
              </div>
            </label>

            <label>
              <span className={labelStyle}>Testimonial Narrative</span>
              <div className="relative group">
                <FiMessageSquare className="absolute left-4 top-5 text-gray-600" />
                <textarea {...register("message", { required: true })} rows={4} className={`${inputStyle} pl-12 resize-none`} placeholder="Student experience..." />
              </div>
            </label>
          </div>

          {/* Right Column: Media */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className={labelStyle}>Media Type Protocol</span>
              <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                <button type="button" onClick={() => setIsVideo(false)} className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${!isVideo ? "bg-white text-black shadow-xl" : "text-gray-500 hover:text-white"}`}>Image</button>
                <button type="button" onClick={() => setIsVideo(true)} className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isVideo ? "bg-white text-black shadow-xl" : "text-gray-500 hover:text-white"}`}>Video</button>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] min-h-[300px] flex flex-col justify-center">
               <Upload name="mediaFile" label={isVideo ? "Video Clip" : "Success Photo"} register={register} setValue={setValue} errors={errors} video={isVideo} />
            </div>

            <label>
              <span className={labelStyle}>Live Status</span>
              <select {...register("status")} className={inputStyle}>
                <option value="Active" className="bg-black text-emerald-400">Published (Active)</option>
                <option value="Inactive" className="bg-black text-red-400">Draft (Inactive)</option>
              </select>
            </label>
          </div>

          <div className="lg:col-span-2 flex justify-end border-t border-white/5 pt-8">
            <button type="submit" className="px-12 py-5 bg-white text-black font-bold rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.15)] hover:bg-gray-200 transition-all uppercase tracking-widest text-xs active:scale-95">
              Deploy Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestimonial;