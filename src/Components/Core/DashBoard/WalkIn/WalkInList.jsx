import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useNavigate } from "react-router-dom";
import { FiUser, FiPhone, FiCalendar, FiActivity, FiXCircle, FiTrendingUp } from "react-icons/fi";
import { FormateDate } from "../../../../Utilities/FormateDate";
import { getAllWalkIns } from "../../../../Services.jsx/Operations/WalkInAPI";

const WalkInList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { walkIns } = useSelector((state) => state.walkIn);
  console.log(walkIns)

  useEffect(() => {
    dispatch(getAllWalkIns(token));
  }, [token, dispatch]);

  const calculateAging = (date) => {
    if (!date) return 0;
    const diff = new Date() - new Date(date);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-white p-6 md:p-12 font-sans overflow-hidden">
      
      {/* ─── Background Branding ─── */}
      <div className="absolute top-[10%] left-[-5%] select-none pointer-events-none opacity-[0.02] z-0">
        <h1 className="text-[15rem] font-bold uppercase tracking-widest leading-none">Inquiry</h1>
      </div>

      <div className="relative translate-y-6 z-10 max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              <span>CRM Terminal</span> <span className="text-emerald-500">/</span>
              <span className="text-white">Active Leads</span>
            </nav>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Walk-In Pipeline</h2>
          </div>
          <button 
            onClick={() => navigate("/dashboard/walkin/add")}
            className="px-8 py-4 bg-white text-black font-bold rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:bg-gray-200 transition-all text-xs uppercase tracking-widest active:scale-95"
          >
            + Register Inquiry
          </button>
        </div>

        {/* Ledger Table Container */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-3xl overflow-hidden shadow-3xl">
          <Table className="w-full text-left border-collapse">
            <Thead className="bg-white/[0.03] border-b border-white/5">
              <Tr>
                {["Student Profile", "Lead Aging", "Target Batch", "Timeline", "Status Protocol", "Actions"].map((head) => (
                  <Th key={head} className="p-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    {head}
                  </Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {walkIns?.length > 0 ? (
                walkIns.map((w) => {
                  const days = calculateAging(w.createdAt);
                  return (
                    <Tr key={w._id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-all group">
                      {/* Candidate Profile */}
                      <Td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-emerald-400 transition-all">
                            <FiUser size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white uppercase tracking-tight">{w.studentName}</p>
                            <p className="text-[10px] text-gray-600 font-bold uppercase">{w.phone}</p>
                            <p className="text-[7px] text-gray-600 font-bold ">{w.email}</p>
                          </div>
                        </div>
                      </Td>

                      {/* Aging Tracker */}
                      <Td className="p-6">
                        <div className="flex flex-col gap-1.5 w-24">
                          <span className={`text-[10px] font-mono font-bold ${days > 7 ? 'text-red-400' : 'text-emerald-400'}`}>
                            {days}D ACTIVE
                          </span>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${days > 7 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                              style={{ width: `${Math.min(days * 10, 100)}%` }}
                            />
                          </div>
                        </div>
                      </Td>

                      {/* Batch Info */}
                      <Td className="p-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          {w.interestedBatch?.courseName || "General Inquiry"}
                        </p>
                      </Td>

                      {/* Timeline */}
                      <Td className="p-6">
                        <div className="flex flex-col gap-1">
                          <p className="text-[10px] text-gray-600 font-bold uppercase flex items-center gap-1">
                            <FiCalendar size={10} /> Visit: {FormateDate(w.createdAt)}
                          </p>
                          <p className="text-[10px] text-emerald-500/80 font-bold uppercase flex items-center gap-1">
                            <FiActivity size={10} /> Follow: {w.followUpDate ? FormateDate(w.followUpDate) : "TBD"}
                          </p>
                        </div>
                      </Td>

                      {/* Status Protocol */}
                      <Td className="p-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] 
                          ${w.status === "Interested" ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" : 
                            w.status === "Enrolled" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : 
                            "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full bg-current ${w.status === "Interested" && "animate-pulse"}`} />
                          {w.status}
                        </div>
                      </Td>

                      {/* Actions Command */}
                      <Td className="p-6">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => navigate(`/dashboard/walkin/convert/${w._id}`)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                          >
                            <FiTrendingUp /> Enroll
                          </button>
                          
                          {days > 7 && w.status !== "Enrolled" && (
                            <button 
                              onClick={() => navigate(`/dashboard/walkin/mark-not-interested/${w._id}`)}
                              className="p-2.5 rounded-xl border border-red-500/20 text-red-500/50 hover:bg-red-500 hover:text-white transition-all"
                              title="Archive Inquiry"
                            >
                              <FiXCircle size={18} />
                            </button>
                          )}
                        </div>
                      </Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Td colSpan="6" className="p-20 text-center">
                    <FiActivity className="mx-auto text-gray-800 mb-4" size={40} />
                    <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">No active pipeline data available</p>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default WalkInList;