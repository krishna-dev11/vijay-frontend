import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { 
  FiArrowLeft, FiPhone, FiMail, FiCalendar, 
  FiClock, FiUsers, FiActivity, FiZap 
} from "react-icons/fi";
import { FormateDate } from "../../../Utilities/FormateDate";

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const BatchStudents = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  
  console.log(user)

  const [batch, setBatch] = useState(null);

  useEffect(() => {
    const foundBatch = user?.courses?.find((c) => c._id === batchId);
    setBatch(foundBatch);
  }, [batchId, user]);

   console.log(batch)

  if (!batch) {
    return (
      <div className="h-screen bg-[#000000] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#6A0DAD]/20 border-t-[#6A0DAD] rounded-full animate-spin" />
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4b5563]">
          Syncing Batch Data...
        </p>
      </div>
    );
  }

  const metaItems = [
    { label: "Start Protocol", val: batch.batchStartDate ? FormateDate(batch.batchStartDate) : "TBD", icon: FiCalendar },
    { label: "End Protocol", val: batch.batchEndDate ? FormateDate(batch.batchEndDate) : "TBD", icon: FiCalendar },
    { label: "Time Slot", val: batch.batchTiming || "Not Set", icon: FiClock },
    { label: "Max Capacity", val: batch.maxSeats || "∞", icon: FiUsers },
    { label: "Enrollment", val: batch.enrollmentOpen ? "Open" : "Closed", icon: FiActivity, color: batch.enrollmentOpen ? "#10b981" : "#ef4444" },
    { label: "Batch Status", val: batch.batchStatus || "Active", icon: FiZap }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-[#ffffff] p-6 md:p-10 font-sans overflow-hidden">

      {/* Background Watermark */}
      <div className="absolute top-[10%] left-[-5%] select-none pointer-events-none opacity-[0.015] z-0">
        <h1 className="text-[15rem] font-bold uppercase tracking-widest leading-none">Registry</h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-[#ffffff]/5 pb-8">
          <div className="space-y-2">
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#4b5563]">
              <span>Academy Hub</span> 
              <span className="text-[#10b981]">/</span>
              <span className="text-[#ffffff]">Batch Registry</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Students In{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] to-[#a78bfa]">
                {batch.courseName}
              </span>
            </h1>
            <p className="text-[#10b981] text-[10px] font-bold uppercase tracking-[0.2em]">
              {batch.isOfflineBatch ? "Offline Deployment" : "Online Node"}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-[#ffffff]/5 border border-[#ffffff]/10 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#ffffff]/10 transition-all"
          >
            <FiArrowLeft /> Back to Hub
          </button>
        </div>

        {/* META GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metaItems.map((item, i) => (
            <div key={i} className="bg-[#ffffff]/[0.02] border border-[#ffffff]/5 p-5 rounded-2xl flex flex-col gap-3 shadow-lg hover:border-[#ffffff]/10 transition-all">
              <div className="flex items-center gap-2 text-[#4b5563]">
                <item.icon size={14} />
                <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
              </div>
              <p className="text-sm font-bold truncate" style={{ color: item.color || "#ffffff" }}>
                {item.val}
              </p>
            </div>
          ))}
        </div>

        {/* STUDENT TABLE */}
        <div className="bg-[#ffffff]/[0.02] border border-[#ffffff]/10 rounded-[2.5rem] backdrop-blur-2xl overflow-hidden shadow-2xl">
          <Table className="w-full text-left">
            <Thead className="bg-[#ffffff]/[0.03] border-b border-[#ffffff]/5">
              <Tr>
                {["Candidate", "Contact Node", "Joined", "Financial Protocol"].map((head) => (
                  <Th key={head} className="p-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4b5563]">
                    {head}
                  </Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {batch.studentEnrolled?.length > 0 ? (
                batch.studentEnrolled.map((entry, index) => {
                  const student = entry.student;
                  const enrollment = entry.enrollment;

                  const totalFee = enrollment?.totalFee || batch.price || 0;
                  const paid = enrollment?.amountPaidSoFar;
                  const remaining = totalFee - paid;

                  return (
                    <Tr key={index} className="border-b border-[#ffffff]/[0.02] hover:bg-[#ffffff]/[0.01] transition-all group">

                      {/* Candidate */}
                      <Td className="p-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={student?.imageUrl}
                            className="w-10 h-10 rounded-xl border border-[#ffffff]/10 object-cover"
                            alt="Profile"
                          />
                          <div className="flex flex-col">
                            <p className="text-sm font-bold text-[#ffffff] uppercase tracking-tight">
                              {student?.firstName} {student?.lastName}
                            </p>
                            <p className="text-[9px] text-[#4b5563] font-bold uppercase tracking-widest">
                              Candidate #{index + 101}
                            </p>
                          </div>
                        </div>
                      </Td>

                      {/* Contact */}
                      <Td className="p-6">
                        <div className="flex flex-col gap-2 text-[#9ca3af]">
                          <div className="flex items-center gap-2 text-[10px] font-medium">
                            <FiMail className="text-[#10b981]" size={12} /> {student?.email}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-medium">
                            <FiPhone className="text-[#10b981]" size={12} />
                            {student?.additionalDetails?.contactNumber || "N/A"}
                          </div>
                        </div>
                      </Td>

                      {/* Joined */}
                      <Td className="p-6 text-[11px] font-bold text-[#4b5563] uppercase tracking-widest">
                        {enrollment?.createdAt ? FormateDate(enrollment.createdAt) : "N/A"}
                      </Td>

                      {/* Financial */}
                      <Td className="p-6">
                        <div className="bg-[#ffffff]/[0.03] p-4 rounded-2xl border border-[#ffffff]/5 space-y-3 min-w-[200px]">
                          
                          <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
                            <span className="text-[#4b5563]">Ledger Balance:</span>
                            <span className="text-[#ffffff]">₹{totalFee}</span>
                          </div>

                          <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
                            <span className="text-[#4b5563]">Paid Sync:</span>
                            <span className="text-[#10b981]">₹{paid}</span>
                          </div>

                          <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
                            <span className="text-[#4b5563]">Remaining:</span>
                            <span className="text-[#ef4444]">₹{remaining}</span>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-[#ffffff]/5">
                            <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest 
                              ${student?.paymentStatus === "Paid"
                                ? "bg-[#10b981]/10 text-[#10b981]"
                                : student?.paymentStatus === "Partial"
                                ? "bg-[#eab308]/10 text-[#eab308]"
                                : "bg-[#ef4444]/10 text-[#ef4444]"
                              }`}>
                              {student?.paymentStatus || "NOTPAID"}
                            </span>

                            <button
                              onClick={() =>
                                navigate(`/EnrolledCourses/collect-installment/${batch._id}/${student._id}`)
                              }
                              className="bg-[#ffffff] text-[#000000] px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-[#10b981] transition-all"
                            >
                              Collect Fee
                            </button>
                          </div>

                        </div>
                      </Td>

                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Td colSpan="4" className="p-20 text-center text-[#4b5563] text-[10px] font-bold uppercase tracking-[0.5em]">
                    Zero Candidates Synchronized In This Node
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

export default BatchStudents;
