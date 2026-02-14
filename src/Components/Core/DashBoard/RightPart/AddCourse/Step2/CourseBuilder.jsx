import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiChevronRight, FiChevronLeft, FiLayers } from "react-icons/fi";
import { AddNewSection, EditSection } from "../../../../../../Services.jsx/Operations/DashBoard";
import SectionSubsectionDispaly from "./SectionSubsectionDispaly";
import { setEditCourse, setStep } from "../../../../../../Slices/Courses";
import { SetEditSection } from "../../../../../../Slices/Section";

const CourseBuilder = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.Course);
  const { token } = useSelector((state) => state.auth);
  const { editSection } = useSelector((state) => state.section);

  // Syncing edit state
  React.useEffect(() => {
    setValue("sectionName", editSection ? editSection.sectionName : "");
  }, [editSection, setValue]);

  const onFormSubmit = (data) => {
    const formData = new FormData();
    if (editSection) {
      if (editSection.sectionName === data.sectionName) return;
      formData.append("sectionName", data.sectionName);
      formData.append("sectionId", editSection._id);
      formData.append("CourseId", course._id);
      dispatch(EditSection(formData, token));
      dispatch(SetEditSection(null));
    } else {
      formData.append("sectionName", data.sectionName);
      formData.append("courseId", course._id);
      dispatch(AddNewSection(formData, token));
    }
    setValue("sectionName", "");
  };

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto pb-10 font-sans">
      
      {/* ─── BUILDER CANVAS ─── */}
      <div className="bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <FiLayers className="text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white">Curriculum Architect</h3>
        </div>

        {/* Existing Content Display */}
        <SectionSubsectionDispaly />

        {/* Section Input Bar */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="mt-10 flex flex-col gap-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">
            Section Module Name <span className="text-emerald-500">*</span>
          </label>
          <div className="flex gap-3">
            <input
              placeholder="e.g. Introduction to Public Speaking"
              {...register("sectionName", { required: true })}
              className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white text-sm focus:border-emerald-500/30 outline-none transition-all placeholder-gray-700"
            />
            <button 
              type="submit"
              className="px-8 bg-emerald-500  text-white font-bold rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95"
            >
              <FiPlus className=" text-white " /> {editSection ? "Update" : "Add Section"}
            </button>
          </div>
          {editSection && (
            <button onClick={() => dispatch(SetEditSection(null))} className="text-xs text-gray-500 hover:text-white transition-colors w-fit ml-1 underline underline-offset-4">
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* ─── NAVIGATION ACTIONS ─── */}
      <div className="flex justify-between items-center px-4">
        <button 
          onClick={() => { dispatch(setEditCourse(true)); dispatch(setStep(1)); }}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
        >
          <FiChevronLeft size={18} /> Back Protocol
        </button>
        <button 
          onClick={() => dispatch(setStep(3))}
          className="flex items-center gap-2 px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-xs uppercase tracking-widest"
        >
          Next Phase <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CourseBuilder;