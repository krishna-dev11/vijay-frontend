import React, { useEffect, useState } from "react";
import { FiX, FiHash } from "react-icons/fi"; // Modern icons
import { useSelector } from "react-redux";

const CustomTagInput = ({ name, lable, register, Placeholder, errors, setValue }) => {
  const [Chip, setChip] = useState([]);
  const { editCourse, course } = useSelector((state) => state.Course);

  useEffect(() => {
    if (editCourse) setChip(course?.tag || []);
    register(name, { required: true, validate: (v) => v.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, Chip);
  }, [Chip, name, setValue]);

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
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">
          {lable} <span className="text-emerald-500">*</span>
        </span>
        
        {/* Modern Glass Input */}
        <div className="relative group">
          <FiHash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-400 transition-colors" />
          <input
            type="text"
            placeholder={Placeholder}
            onKeyDown={handleKeyDown}
            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-white text-sm focus:border-emerald-500/30 outline-none transition-all placeholder-gray-700 shadow-inner"
          />
        </div>
      </label>

      {/* Modern Chip Cloud */}
      <div className="flex flex-wrap gap-2">
        {Chip.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-xl group animate-fadeSlideUp"
          >
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">{c}</span>
            <button
              type="button"
              onClick={() => setChip(Chip.filter((_, idx) => idx !== i))}
              className="text-gray-500 hover:text-red-400 transition-colors"
            >
              <FiX size={14} />
            </button>
          </div>
        ))}
      </div>

      {errors[name] && (
        <p className="text-[10px] text-red-500 font-bold uppercase tracking-tighter mt-1 ml-1 animate-pulse">
          ⚠ Protocol Error: Tags are mandatory
        </p>
      )}
    </div>
  );
};

export default CustomTagInput;