import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiInbox, FiZap } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetBuyedCoursesDataOfStudentForCard } from "../../../../Services.jsx/Operations/CoursesAPI";
import BuyedCourseCard from "./BuyedCourseCard";

const ActiveCourseList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { userBuyedCoursesDataForCard } = useSelector((state) => state.Course);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyedCourseData = async () => {
      try {
        await dispatch(GetBuyedCoursesDataOfStudentForCard(user._id, token));
      } catch (error) {
        console.log("Fetch Error:", error);
      }
      setLoading(false);
    };
    fetchBuyedCourseData();
  }, [dispatch, user._id, token]);

  if (loading) return (
    <div className="h-screen bg-[#000000] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-[#6A0DAD]/20 border-t-[#6A0DAD] rounded-full animate-spin" />
      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4b5563]">Syncing Active Nodes...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="flex flex-col gap-y-4 border-b border-[#ffffff]/5 pb-10">
          <div 
            className="flex gap-x-2 items-center text-[#4b5563] hover:text-[#10b981] cursor-pointer transition-colors group w-fit"
            onClick={() => navigate("/dashboard/my-profile")}
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Return to Hub</p>
          </div>
          
          <div className="flex justify-between items-end">
             <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
               Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] to-[#a78bfa]">Curriculums</span>
             </h1>
             <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#ffffff]/5 border border-[#ffffff]/10 rounded-xl">
                <FiZap className="text-[#10b981]" />
                <span className="text-[10px] font-bold text-[#ffffff] uppercase tracking-widest">
                  {userBuyedCoursesDataForCard?.courses?.length || 0} Nodes Live
                </span>
             </div>
          </div>
        </div>

        {/* Course Grid */}
        {userBuyedCoursesDataForCard?.courses?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
            {userBuyedCoursesDataForCard.courses.map((course) => (
              <BuyedCourseCard key={course._id} data={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 gap-4 border border-dashed border-[#ffffff]/10 rounded-[3rem]">
            <FiInbox size={48} className="text-[#4b5563]" />
            <div className="text-center">
              <p className="text-lg font-bold uppercase tracking-tight">No Active Enrollments</p>
              <p className="text-xs text-[#4b5563] mt-1 uppercase tracking-widest font-bold">Synchronize a course from the store to begin.</p>
            </div>
            <button 
              onClick={() => navigate("/courses")}
              className="mt-4 px-8 py-3 bg-[#ffffff] text-[#000000] font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-[#10b981] transition-all"
            >
              Visit Course Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveCourseList;