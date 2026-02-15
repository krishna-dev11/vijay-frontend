import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FiUserPlus, FiPhone, FiMail, FiTarget, FiCalendar } from "react-icons/fi";
import { addWalkInStudent } from "../../../../Services.jsx/Operations/WalkInAPI";
import { FetchInstructorsAllCourses } from "../../../../Services.jsx/Operations/DashBoard";

const AddWalkInStudent = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (user?._id && token) dispatch(FetchInstructorsAllCourses(user._id, token));
  }, [user?._id, token, dispatch]);

  const onSubmit = (data) => {
    dispatch(addWalkInStudent(data, token));
    reset();
  };

  const inputStyle = "w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white placeholder-gray-700 focus:border-emerald-500/30 focus:outline-none transition-all text-sm";
  const labelStyle = "text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1 mb-2 block";
  // Pehle ye styles define kar lena taaki clean dikhe
// const labelStyle = "text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block px-1";
// const inputStyle = "w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-4 py-4 md:py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-600";

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-white p-6 md:p-12 overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl translate-y-6 mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <span>CRM Hub</span> <span className="text-emerald-500">/</span>
            <span className="text-white">New Inquiry</span>
          </nav>
          <h2 className="text-4xl font-bold tracking-tight">Register Walk-In</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white/[0.02] border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <label>
            <span className={labelStyle}>Full Name <span className="text-emerald-500">*</span></span>
            <div className="relative group">
              <FiUserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-400" />
              <input type="text" {...register("studentName", { required: true })} className={`${inputStyle} pl-12`} placeholder="Student name..." />
            </div>
          </label>

          <label>
            <span className={labelStyle}>Contact Number <span className="text-emerald-500">*</span></span>
            <div className="relative group">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input type="number" {...register("phone", { required: true })} className={`${inputStyle} pl-12`} placeholder="Active mobile..." />
            </div>
          </label>

          <label>
            <span className={labelStyle}>Email Protocol</span>
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input type="email" {...register("email")} className={`${inputStyle} pl-12`} placeholder="Optional email..." />
            </div>
          </label>

      // JSX Code:
<div className="flex flex-col gap-6 w-full">
  {/* Target Batch Select */}
  <label className="w-full">
    <span className={labelStyle}>Target Batch Node</span>
    <select 
      {...register("interestedBatch")} 
      className={`${inputStyle} cursor-pointer`}
    >
      <option value="" className="bg-[#0a0a0a] text-gray-400">Select Intended Course</option>
      {user?.courses?.map((c) => (
        <option key={c._id} value={c._id} className="bg-[#0a0a0a] text-white py-2">
          {c.courseName}
        </option>
      ))}
    </select>
  </label>

  {/* Responsive Grid: Mobile (1 Col) -> Laptop (3 Col) */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-6 border-t border-white/5 mt-4">
    
    {/* Follow-Up Date */}
    <label>
      <span className={labelStyle}>Follow-Up Schedule</span>
      <input 
        type="date" 
        {...register("followUpDate")} 
        className={`${inputStyle} [color-scheme:dark] cursor-pointer`} 
      />
    </label>

    {/* Initial Status Select */}
    <label>
      <span className={labelStyle}>Initial Status Node</span>
      <select 
        {...register("status")} 
        className={`${inputStyle} cursor-pointer`}
      >
        <option value="Interested" className="bg-[#0a0a0a]">Interested</option>
        <option value="Follow-Up" className="bg-[#0a0a0a]">Follow-Up</option>
        <option value="Enrolled" className="bg-[#0a0a0a]">Enrolled</option>
      </select>
    </label>

    {/* Acquisition Source Select */}
    <label>
      <span className={labelStyle}>Acquisition Source</span>
      <select 
        {...register("source")} 
        className={`${inputStyle} cursor-pointer`}
      >
        <option value="PHYSICAL_VISIT" className="bg-[#0a0a0a]">Physical Visit</option>
        <option value="CALL" className="bg-[#0a0a0a]">Call</option>
        <option value="WEBSITE" className="bg-[#0a0a0a]">Website</option>
      </select>
    </label>
  </div>
</div>

          <div className="md:col-span-2 flex justify-end pt-6">
            <button type="submit" className="px-12 py-5 bg-white text-black font-bold rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:bg-gray-200 transition-all uppercase tracking-widest text-xs active:scale-95">
              Initiate Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWalkInStudent;