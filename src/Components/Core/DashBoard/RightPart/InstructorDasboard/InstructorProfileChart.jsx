import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

const ChartDashboard = ({ courses }) => {
  const [dataType, setDataType] = useState("student");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const data = courses.map((course) => ({
      name: course.courseName,
      value: dataType === "student" ? course.totalStudentsEnrolled : course.totalAmountEarned,
    }));
    setChartData(data);
  }, [courses, dataType]);

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h3 className="text-2xl font-bold tracking-tight">Course Intelligence</h3>
        
        {/* Modern Switch Controls */}
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
           <button 
             onClick={() => setDataType("student")}
             className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${dataType === "student" ? "bg-white text-black shadow-xl" : "text-gray-500 hover:text-white"}`}
           >
             Enrollments
           </button>
           <button 
             onClick={() => setDataType("income")}
             className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${dataType === "income" ? "bg-white text-black shadow-xl" : "text-gray-500 hover:text-white"}`}
           >
             Revenue
           </button>
        </div>
      </div>

      <div className="w-full h-[350px] flex items-center justify-center animate-fadeIn">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 'bold' }} 
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 10 }} 
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                contentStyle={{ backgroundColor: '#0a0a0a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px' }}
              />
              <Bar 
                dataKey="value" 
                radius={[8, 8, 0, 0]} 
                barSize={50}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-600 font-mono">CALCULATING ANALYTICS...</p>
        )}
      </div>
    </div>
  );
};

export default ChartDashboard;