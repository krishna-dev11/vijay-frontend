import React from "react";
import { useSelector } from "react-redux";
import { BuyedCoursessidebarLinks } from "../../../../data/dashboard-links";
import { useNavigate, NavLink } from "react-router-dom";
import SlideBarButton from "../../DashBoard/LeftPart/SlideBarButton";
import { FaStore } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const EnrolledCoursesSideBar = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]  border-r border-[#ffffff]/5 py-8 justify-between">
      
      {/* ─── TOP: NAVIGATION NODE ─── */}
      <div className="flex flex-col gap-y-1 px-4">
        <div className="flex flex-col mb-6 ml-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4b5563]">Scholar Hub</p>
          <div className="h-[1px] w-8 bg-[#6A0DAD] mt-1" />
        </div>

        <div className="flex flex-col text-white gap-y-2">
          {BuyedCoursessidebarLinks.map((link, index) => (
            <SlideBarButton 
              key={index}
              path={link.path} 
              name={link.name} 
              icon={link.icon} 
            />
          ))}
        </div>
      </div>

      {/* ─── BOTTOM: SYSTEM ACTIONS & USER IDENTITY ─── */}
      <div className="flex flex-col gap-y-6 px-6">
        
        {/* Market Terminal Button */}
        <button 
          onClick={() => navigate("/courses")}
          className="flex gap-x-3 bg-[#ffffff]/5 border border-[#ffffff]/10 rounded-2xl py-3 justify-center items-center hover:bg-[#10b981] hover:text-[#000000] transition-all group shadow-[0_0_20px_rgba(0,0,0,0.4)]"
        >
          <FaStore className="group-hover:scale-110  translate-x-2 text-white  transition-transform" />
          <p className="text-[10px] font-bold uppercase  text-white tracking-[0.2em]">Visit Academy Store</p>
        </button>

        {/* User Identity Node */}
        <div 
          className="flex gap-x-3 items-center cursor-pointer p-2.5 rounded-2xl bg-[#ffffff]/[0.02] border border-[#ffffff]/5 hover:border-[#ffffff]/10 hover:bg-[#ffffff]/5 transition-all group"
          onClick={() => navigate("/dashboard/my-profile")}
        >
          <div className="relative shrink-0">
            {user?.imageUrl ? (
               <img 
                 src={user.imageUrl} 
                 className="w-10 h-10 rounded-xl border border-[#ffffff]/10 object-cover group-hover:border-[#10b981]/50 transition-colors" 
                 alt="Profile" 
               />
            ) : (
               <div className="w-10 h-10 rounded-xl bg-[#ffffff]/5 flex items-center justify-center border border-[#ffffff]/10">
                 <FiUser className="text-[#4b5563]" />
               </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#10b981] border-2 border-[#0a0a0a] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>

          <div className="flex flex-col overflow-hidden">
            <p className="text-xs font-bold text-[#ffffff] uppercase tracking-tighter truncate leading-tight">
              {user?.firstName || "Unknown"} {user?.lastName || "Node"}
            </p>
            <p className="text-[9px] font-bold  text-white uppercase tracking-widest mt-0.5">
              {user?.accountType || "Guest"} Account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCoursesSideBar;