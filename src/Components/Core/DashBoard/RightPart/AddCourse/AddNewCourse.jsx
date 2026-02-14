import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCheck, FiZap, FiInfo } from "react-icons/fi"; // Modern Icons
import CourseInformation from "./Step1/CourseInformation";
import CourseBuilder from "./Step2/CourseBuilder";
import Publish from "./Step3/Publish";
import { setStep } from "../../../../../Slices/Courses";

const AddNewCourse = () => {
  const { Step } = useSelector((state) => state.Course);
  const { editCourse } = useSelector(state => state.Course);
  const dispatch = useDispatch();

  const StepDetails = [
    { id: 1, stepNum: 1, title: "Course Details" },
    { id: 2, stepNum: 2, title: "Content Builder" },
    { id: 3, stepNum: 3, title: "Deployment" },
  ];

  const GuidlinesData = [
    "Standard thumbnail resolution: 1024x576.",
    "Video protocols control the overview sequence.",
    "Use the Builder to organize modules and quizzes.",
    "Announcements notify all enrolled students instantly.",
    "Additional data is visible on the public batch page."
  ];

  useEffect(() => {
    dispatch(setStep(1));
  }, [dispatch]);

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-white p-6 md:p-12 overflow-hidden font-sans">
      
      {/* 1. Background Visuals */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] select-none pointer-events-none opacity-[0.02] z-0">
        <h1 className="text-[15rem] font-bold uppercase tracking-widest leading-none">Create</h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* LEFT SIDE: STEPS & FORMS */}
        <div className="flex-1 flex flex-col gap-10">
          
          {/* A. Header Section */}
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <span>Academy</span> <span className="text-emerald-500">/</span>
              <span>Dashboard</span> <span className="text-emerald-500">/</span>
              <span className="text-white">Batch Setup</span>
            </nav>
            <h2 className="text-4xl font-bold tracking-tight">
              {editCourse ? "Edit Batch Prototype" : "Initialize New Batch"}
            </h2>
          </div>

          {/* B. High-Tech Stepper */}
          <div className="relative flex justify-between items-center max-w-2xl w-full px-4 mb-10">
            {/* Connecting Line Background */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0"></div>
            
            {StepDetails.map((item) => (
              <div key={item.id} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-2xl
                  ${Step > item.stepNum 
                    ? "bg-emerald-500 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
                    : Step === item.stepNum 
                    ? "bg-black border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] scale-110" 
                    : "bg-[#0a0a0a] border-white/10 text-gray-600"}
                `}>
                  {Step > item.stepNum ? <FiCheck size={24} /> : <span className="text-sm font-bold">{item.stepNum}</span>}
                </div>
                
                <p className={`absolute -bottom-8 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest transition-colors
                  ${Step >= item.stepNum ? "text-white" : "text-gray-600"}`}>
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* C. Dynamic Step Component */}
          <div className="mt-12 animate-fadeSlideUp">
            {Step === 1 && <CourseInformation />}
            {Step === 2 && <CourseBuilder />}
            {Step === 3 && <Publish />}
          </div>
        </div>

        {/* RIGHT SIDE: FLOATING TIPS PANEL */}
        <aside className="lg:w-[380px] h-fit sticky top-28 hidden lg:block">
          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-50" />
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <FiZap className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold tracking-tight">Configuration Pro-Tips</h3>
            </div>

            <ul className="flex flex-col gap-6">
              {GuidlinesData.map((line, index) => (
                <li key={index} className="flex gap-4 group">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.8)] shrink-0 transition-transform group-hover:scale-150" />
                  <p className="text-gray-400 text-sm leading-relaxed font-light group-hover:text-gray-200 transition-colors">
                    {line}
                  </p>
                </li>
              ))}
            </ul>

            {/* Bottom Status Badge */}
            <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Live Status</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Syncing...</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default AddNewCourse;