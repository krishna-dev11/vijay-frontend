import React, { useEffect, useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import { useSelector } from "react-redux";

const CourseBenifitsInput = ({ name, lable, register, setValue, errors }) => {
  const [Chip, setChip] = useState([]);
  const { editCourse, course } = useSelector((state) => state.Course);

  useEffect(() => {
    if (editCourse) setChip(course.whatYouWillLearn);
    register(name, { required: true, validate: (v) => v.length > 0 });
  }, []);

  useEffect(() => { setValue(name, Chip); }, [Chip]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = e.target.value.trim();
      if (val && !Chip.includes(val)) {
        setChip([...Chip, val]);
        e.target.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">{lable}</span>
        <input 
          type="text" 
          placeholder="Add benefit & hit Enter" 
          onKeyDown={handleKeyDown}
          className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:border-emerald-500/30 outline-none transition-all" 
        />
      </label>

      <div className="flex flex-wrap gap-2">
        {Chip.map((c, i) => (
          <div key={i} className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl group animate-fadeSlideUp">
            <FiCheck className="text-emerald-400 text-xs" />
            <span className="text-xs text-emerald-200 font-medium">{c}</span>
            <FiX className="cursor-pointer text-gray-500 hover:text-red-400 transition-colors" onClick={() => setChip(Chip.filter((_, idx) => idx !== i))} />
          </div>
        ))}
      </div>
      {errors[name] && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1 ml-1">Selection Required</p>}
    </div>
  );
};

export default CourseBenifitsInput;