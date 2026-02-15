import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

const ChartDashboard = ({ courses }) => {
  const [dataType, setDataType] = useState("student");
  const [chartData, setChartData] = useState([]);
  
  // --- MOBILE RESPONSIVE LOGIC ---
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    const data = courses.map((course) => ({
      name: course.courseName,
      value: dataType === "student" ? course.totalStudentsEnrolled : course.totalAmountEarned,
    }));
    setChartData(data);

    return () => window.removeEventListener('resize', handleResize);
  }, [courses, dataType]);

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Header Section: Adjusted for mobile spacing */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2 md:px-0">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight uppercase italic text-white">
          Course Intelligence <span className="text-emerald-500 font-black">Node</span>
        </h3>
        
        {/* Modern Switch Controls */}
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 w-full md:w-auto">
           <button 
             onClick={() => setDataType("student")}
             className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${dataType === "student" ? "bg-white text-black shadow-xl" : "text-gray-500 hover:text-white"}`}
           >
             Enrollments
           </button>
           <button 
             onClick={() => setDataType("income")}
             className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${dataType === "income" ? "bg-white text-black shadow-xl" : "text-gray-500 hover:text-white"}`}
           >
             Revenue
           </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-[350px] md:h-[400px] flex items-center justify-center animate-fadeIn relative z-10">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              // Mobile par margins kam kar di taaki bar ko zyada jagah mile
              margin={{ 
                top: 20, 
                right: isMobile ? 10 : 30, 
                left: isMobile ? -10 : 20, 
                bottom: isMobile ? 60 : 20 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: isMobile ? 8 : 10, fontWeight: 'bold' }} 
                dy={15}
                // Mobile par labels ko rotate kiya taaki "Foundation English" jaise lambe naam overlap na karein
                interval={0}
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? "end" : "middle"}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 10 }} 
                // Mobile par y-axis hidden karke space bachayi ja sakti hai, but tune kaha 1% change nahi chahiye laptop pe
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                contentStyle={{ 
                  backgroundColor: '#0a0a0a', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold'
                }}
                itemStyle={{ color: '#10b981' }}
              />
              <Bar 
                dataKey="value" 
                radius={[8, 8, 0, 0]} 
                // Mobile par bar width 25px rakhi hai taaki screen ke bahar na jaye
                barSize={isMobile ? 25 : 50}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center gap-4">
             <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-gray-600 font-mono text-[10px] tracking-[0.3em] uppercase">Calculating Analytics Node...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartDashboard;