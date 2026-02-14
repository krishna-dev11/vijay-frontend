import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowLeft, FiCheckCircle, FiShield, FiDollarSign, FiCreditCard, FiMail, FiFileText } from "react-icons/fi";
import { convertWalkInToEnrollment } from "../../../../Services.jsx/Operations/WalkInAPI";
import { FormateDate } from "../../../../Utilities/FormateDate";

const ConvertWalkInToEnrollment = () => {
  const { walkInId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { walkIns = [] } = useSelector((state) => state.walkIn || {});

  const walkIn = walkIns.find((w) => w._id === walkInId);

  const [form, setForm] = useState({
    email: "",
    courseId: "",
    paymentMode: "EMI",
    totalAmount: "",
    paidAmount: "",
    remarks: "",
  });

  useEffect(() => {
    if (walkIn?.interestedBatch?._id) {
      setForm((f) => ({
        ...f,
        courseId: walkIn.interestedBatch._id,
        totalAmount: walkIn.interestedBatch.price || "",
      }));
    }
  }, [walkIn]);

  const handleConvert = () => {
    if (!form.courseId || !form.totalAmount || !form.email) {
      return alert("Login Email, Batch and Fee are required");
    }

    const payload = {
      email: form.email,
      batchId: form.courseId,
      totalFee: Number(form.totalAmount),
      paymentMode: form.paymentMode,
      paidAmount: // Changed key name to match backend expectation (totalPaid instead of paidAmount)
        form.paymentMode === "Full"
          ? Number(form.totalAmount)
          : Number(form.paidAmount || 0),
      remarks: form.remarks,
    };

    
    dispatch(convertWalkInToEnrollment(walkInId, payload, token, navigate));
  };

  const inputStyle = "w-full bg-[#ffffff]/[0.03] border border-[#ffffff]/5 rounded-2xl px-5 py-4 text-[#ffffff] focus:border-[#10b981]/30 outline-none transition-all text-sm placeholder-[#4b5563]";
  const labelStyle = "text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-2 block ml-1 flex items-center gap-1";

  if (!walkIn)
    return (
      <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#10b981]/20 border-t-[#10b981] rounded-full animate-spin" />
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4b5563]">Loading Protocol...</p>
      </div>
    );

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-[#ffffff] p-6 md:p-12 font-sans overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#10b981]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header Node */}
        <div className="flex justify-between items-end mb-12 border-b border-[#ffffff]/5 pb-8">
          <div className="flex flex-col gap-4">
             <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#4b5563] hover:text-[#ffffff] transition-colors">
               <FiArrowLeft /> Back to Pipeline
             </button>
             <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">Convert to <span className="text-[#10b981]">Enrollment</span></h2>
          </div>
          <div className="text-right hidden md:block">
             <p className="text-[#6b7280] text-[10px] font-bold uppercase tracking-[0.2em]">Candidate Identity</p>
             <p className="text-xl font-bold">{walkIn.studentName}</p>
             <p className="text-[#10b981] text-xs font-mono">{walkIn.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Summary Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
               <span className={labelStyle}>Proposed Curriculum</span>
               <p className="text-white font-bold text-lg mb-6">{walkIn.interestedBatch?.courseName || "General Protocol"}</p>
               
               <div className="space-y-4">
                 <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest border-b border-[#ffffff]/5 pb-2">
                   <span className="text-[#4b5563]">Lead Source:</span>
                   <span>{walkIn.source || "Direct Walk-in"}</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                   <span className="text-[#4b5563]">Created:</span>
                   <span>{FormateDate(walkIn.createdAt)}</span>
                 </div>
               </div>
            </div>

            <div className="p-6 rounded-[2rem] bg-[#10b981]/5 border border-[#10b981]/10 flex items-start gap-4">
               <FiShield className="text-[#10b981] mt-1 shrink-0" />
               <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b7280] leading-relaxed">
                 Action Protocol: This will generate a permanent student login and financial record.
               </p>
            </div>
          </div>

          {/* Configuration Column */}
          <div className="lg:col-span-2 bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-10 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            
            {/* Corner Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/5 blur-2xl rounded-full -mr-10 -mt-10 pointer-events-none" />

            <div className="flex items-center gap-3 mb-10 relative z-10">
              <div className="p-2 bg-[#10b981]/10 rounded-lg text-[#10b981]">
                 <FiCheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold tracking-tight uppercase">Enrollment Configuration</h3>
            </div>

            <div className="flex flex-col gap-8 relative z-10">
              
              <label>
                <span className={labelStyle}><FiMail /> Student Login Email (Essential)</span>
                <input 
                  type="email" 
                  placeholder="student.email@example.com" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  className={`${inputStyle} border-[#10b981]/20 bg-[#10b981]/[0.02] font-mono`} 
                />
              </label>

              <div className="h-[1px] w-full bg-[#ffffff]/5" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label>
                  <span className={labelStyle}><FiCreditCard /> Payment Architecture</span>
                  <select 
                    value={form.paymentMode} 
                    onChange={(e) => setForm({ ...form, paymentMode: e.target.value })} 
                    className={`${inputStyle} appearance-none cursor-pointer bg-[#0a0a0a]`}
                  >
                    <option value="Full">Full Settlement</option>
                    <option value="EMI">Installment Protocol (EMI)</option>
                  </select>
                </label>
                <label>
                  <span className={labelStyle}><FiDollarSign /> Total Fee (INR)</span>
                  <input 
                    type="number" 
                    value={form.totalAmount} 
                    onChange={(e) => setForm({ ...form, totalAmount: e.target.value })} 
                    className={inputStyle} 
                    placeholder="0.00"
                  />
                </label>
              </div>

              {form.paymentMode === "EMI" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeSlideUp">
                  <label>
                    <span className={labelStyle}><FiDollarSign /> Immediate Disbursement</span>
                    <input 
                      type="number" 
                      value={form.paidAmount} 
                      onChange={(e) => setForm({ ...form, paidAmount: e.target.value })} 
                      className={`${inputStyle} border-[#10b981]/20`} 
                      placeholder="Enter amount paid today..." 
                    />
                  </label>
                  <div className="flex flex-col justify-end p-5 rounded-2xl bg-[#ffffff]/[0.03] border border-dashed border-[#ffffff]/10">
                     <span className="text-[9px] font-bold uppercase tracking-widest text-[#4b5563]">Pending Balance:</span>
                     <p className="text-2xl font-black text-[#ef4444]">₹{Number(form.totalAmount) - Number(form.paidAmount || 0)}</p>
                  </div>
                </div>
              )}

              <label>
                <span className={labelStyle}><FiFileText /> System Remarks / Admin Notes</span>
                <textarea 
                  value={form.remarks} 
                  onChange={(e) => setForm({ ...form, remarks: e.target.value })} 
                  className={`${inputStyle} resize-none h-24`} 
                  placeholder="Append specific enrollment observations..." 
                />
              </label>

              <button 
                onClick={handleConvert}
                className="w-full py-6 bg-[#ffffff] text-[#000000] font-black rounded-[2rem] uppercase tracking-[0.3em] text-[10px] hover:bg-[#10b981] transition-all shadow-2xl active:scale-[0.98] group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                   <FiCheckCircle className="group-hover:scale-110 transition-transform" /> Execute Enrollment Sync
                </span>
                <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-[#10b981] to-[#059669] transition-all duration-300 group-hover:w-full z-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertWalkInToEnrollment;