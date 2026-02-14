import React, { useEffect, useState } from "react";
import { FiPlus, FiCheckCircle, FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";

const CustomInstructionsInput = ({ name, label, Placeholder, register, errors, setValue }) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);
  const { editCourse, course } = useSelector((state) => state.Course);

  useEffect(() => {
    if (editCourse) setRequirementList(course?.instructions || []);
    register(name, { required: true, validate: (v) => v.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList, name, setValue]);

  const addRequirement = () => {
    if (requirement && !requirementList.includes(requirement)) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">
            {label} <span className="text-emerald-500">*</span>
          </span>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder={Placeholder}
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:border-emerald-500/30 outline-none transition-all placeholder-gray-700"
            />
            <button
              type="button"
              onClick={addRequirement}
              className="px-6 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95"
            >
              <FiPlus size={20} className=" text-white" />
            </button>
          </div>
        </label>
        {errors[name] && (
          <p className="text-[10px] text-red-500 font-bold uppercase tracking-tighter mt-1 ml-1">
            ⚠ Missing Directives: Add at least one instruction
          </p>
        )}
      </div>

      {/* Requirement List - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {requirementList.map((req, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl group hover:border-emerald-500/30 transition-all animate-fadeSlideUp"
          >
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-emerald-500 shrink-0" />
              <span className="text-sm text-gray-300 font-light truncate max-w-[150px]">{req}</span>
            </div>
            <button
              type="button"
              onClick={() => setRequirementList(requirementList.filter((_, idx) => idx !== i))}
              className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomInstructionsInput;