import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstructorCoursesForDashboardData, getInstructorDashboardData } from "../../../../../Services.jsx/Operations/DashBoard";
import CourseSlider from "../../../Catalog/CourseSlider";
import ChartDashboard from "./InstructorProfileChart";
import { FiBook, FiUsers, FiDollarSign, FiTrendingUp, FiClock, FiActivity } from "react-icons/fi";

const StatCard = ({ icon: Icon, label, value, color, growth }) => (
  <div className="bg-white/[0.02] border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl relative overflow-hidden group hover:bg-white/[0.04] transition-all">
    <div className={`absolute top-[-20%] right-[-10%] w-24 h-24 blur-3xl rounded-full opacity-10 ${color}`} />
    <Icon className={`mb-4 text-2xl ${color.replace('bg-', 'text-')}`} />
    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">{label}</p>
    <div className="flex items-baseline gap-2 mt-1">
      <p className="text-3xl font-bold tracking-tighter">{value}</p>
      {growth && <span className="text-[10px] text-emerald-400 font-bold">+{growth}%</span>}
    </div>
  </div>
);

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { InstructorDashboardData, InstructorCoursesData, user, dashboardExtras } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      await dispatch(getInstructorDashboardData(token));
      await dispatch(getInstructorCoursesForDashboardData(token));
      setLoading(false);
    };
    getDashboardData();
  }, []);

  const totalAmount = InstructorDashboardData?.reduce((acc, curr) => acc + curr.totalAmountEarned, 0);
  const totalStudents = InstructorDashboardData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center font-mono text-emerald-500">INITIATING DATA SYNC...</div>;

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-white p-6 md:p-12 font-sans overflow-hidden">
      <div className="absolute top-[10%] left-[-5%] select-none pointer-events-none opacity-[0.02] z-0">
        <h1 className="text-[15rem] font-bold uppercase tracking-widest">Insight</h1>
      </div>

      <div className="relative z-10 translate-y-6 max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-white/5 pb-8">
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight">System Intel, {user.firstName}</h2>
           <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
             <FiActivity className="text-emerald-500 animate-pulse" /> Real-time Performance Metrics
           </p>
        </div>

        {/* ─── KPI BENTO GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={FiBook} label="Total Assets" value={InstructorCoursesData.length} color="bg-blue-500" />
          <StatCard icon={FiUsers} label="Enrollments" value={totalStudents} color="bg-emerald-500" />
          <StatCard icon={FiDollarSign} label="Net Revenue" value={`₹${totalAmount}`} color="bg-yellow-500" growth={dashboardExtras?.revenueGrowth} />
          <StatCard icon={FiActivity} label="Active Batches" value={dashboardExtras?.activeBatches || 0} color="bg-purple-500" />
        </div>

        {/* ─── ANALYTICS CORE ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 p-8 rounded-[3rem] backdrop-blur-2xl shadow-3xl">
             <ChartDashboard courses={InstructorDashboardData} />
          </div>
          
          <div className="flex flex-col gap-6">
             <div className="bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] flex flex-col gap-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Operational Summary</p>
                <div className="flex justify-between border-b border-white/5 pb-4">
                   <span className="text-sm text-gray-400">Pending Demos</span>
                   <span className="text-sm font-bold text-orange-400">{dashboardExtras?.pendingDemos}</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-sm text-gray-400">Monthly Profit</span>
                   <span className="text-sm font-bold text-emerald-400">₹{dashboardExtras?.netProfit}</span>
                </div>
             </div>
             
             <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[2.5rem] relative overflow-hidden group">
                <FiTrendingUp className="text-emerald-500 text-4xl mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-bold text-white">Efficiency Protocol</h4>
                <p className="text-xs text-emerald-300/60 mt-2">Optimization of current batch schedules recommended for maximum ROI.</p>
             </div>
          </div>
        </div>

        {/* ─── ASSET REPOSITORY ─── */}
        <div className="mt-10">
           <div className="flex items-center justify-between mb-8 px-4">
              <h3 className="text-2xl font-bold tracking-tight">Deployed Curriculum</h3>
              <button className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 border-b border-emerald-500/30 pb-1">View Full Catalog</button>
           </div>
           <CourseSlider data={InstructorCoursesData} count={2} />
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;