import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addInstallmentAPI } from "../../../../Services.jsx/Operations/EnrollmentAPI";

// Simple SVG Icons for UI enhancement without adding new libraries
const MoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
    <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.315.155-.71.546-1.003zM12.75 15.75v-2.795c.29.083.56.214.785.394.394.313.547.682.547 1.004 0 .315-.155.71-.547 1.003-.227.18-.495.311-.785.394z" />
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 12c.77 0 1.477.246 2.074.666.697.488 1.176 1.29 1.176 2.25 0 .96-.479 1.762-1.176 2.25-.597.42-1.304.666-2.074.666v1.5a.75.75 0 01-1.5 0v-1.5c-.77 0-1.477-.246-2.074-.666-.697-.488-1.176-1.29-1.176-2.25 0-.96.479-1.762 1.176-2.25.597-.42 1.304-.666 2.074-.666v-1.5a.75.75 0 011.5 0v1.5zm0-6.75c.77 0 1.477.246 2.074.666.697.488 1.176 1.29 1.176 2.25 0 .96-.479 1.762-1.176 2.25-.597.42-1.304.666-2.074.666v1.5a.75.75 0 01-1.5 0v-1.5c-.77 0-1.477-.246-2.074-.666-.697-.488-1.176-1.29-1.176-2.25 0-.96.479-1.762 1.176-2.25.597-.42 1.304-.666 2.074-.666v-1.5a.75.75 0 011.5 0v1.5z" clipRule="evenodd" />
  </svg>
);

const NoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
    <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.75c-.042-.1-.08-.2-.115-.3a3.73 3.73 0 00-.645-1.357 3.73 3.73 0 00-1.357-.644c-.1-.036-.2-.073-.3-.115v2.416h2.417zM9.75 12a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM9.75 15.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
  </svg>
);

const Spinner = () => (
  <svg className="animate-spin h-8 w-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);


const CollectInstallment = () => {
  const { batchId, studentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  // 🔥 SAFE ObjectId comparison
  const batch = user?.courses?.find(
    (c) => c._id?.toString() === batchId
  );

  const studentEntry = batch?.studentEnrolled?.find(
    (entry) => entry.student?._id?.toString() === studentId
  );

  const student = studentEntry?.student;
  const enrollment = studentEntry?.enrollment;

  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");

  if (!enrollment || !student) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          <p className="text-emerald-500 font-medium tracking-wide animate-pulse">Loading Details...</p>
        </div>
      </div>
    );
  }

  const totalFee = enrollment.totalFee || 0;
  const totalPaid = student.totalPaid || 0;
  const remaining = totalFee - totalPaid;

  const handleSubmit = () => {
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      alert("Enter valid amount");
      return;
    }

    if (numericAmount > remaining) {
      alert("Amount exceeds remaining balance");
      return;
    }

    dispatch(
      addInstallmentAPI(
        {
          userId: user._id,
          enrollmentId: enrollment._id,
          amountPaid: numericAmount,
          remark,
        },
        token,
        navigate
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex justify-center items-center p-4">
      {/* Modern Glassmorphism Card */}
      <div className="bg-[#18181b]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl shadow-black/50">
        
        {/* Header */}
        <div className="mb-8 text-center">
           <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Collect Installment
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Process payment for <span className="text-emerald-400 font-medium">{student.firstName} {student.lastName}</span>
          </p>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-[#27272a]/50 border border-white/5 p-3 rounded-2xl text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total</p>
            <p className="font-bold text-lg">₹{totalFee}</p>
          </div>
          <div className="bg-[#27272a]/50 border border-white/5 p-3 rounded-2xl text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Paid</p>
            <p className="font-bold text-lg text-emerald-400">₹{totalPaid}</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-2xl text-center">
            <p className="text-xs text-red-300 uppercase tracking-wider font-semibold">Due</p>
            <p className="font-bold text-lg text-red-400">₹{remaining}</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Amount Input Field with Icon */}
          <div className="relative group">
            <label className="text-xs font-medium text-gray-400 mb-1.5 block pl-1 uppercase tracking-wide">
              Payment Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MoneyIcon />
              </div>
              <input
                type="number"
                placeholder="Enter Amount (e.g., 5000)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#27272a] border border-white/5 text-white rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all outline-none placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Remark Textarea with Icon */}
          <div className="relative group">
             <label className="text-xs font-medium text-gray-400 mb-1.5 block pl-1 uppercase tracking-wide">
              Transaction Note
            </label>
            <div className="relative">
               <div className="absolute top-4 left-4 flex items-start pointer-events-none">
                <NoteIcon />
              </div>
              <textarea
                placeholder="Add a remark (optional)"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#27272a] border border-white/5 text-white rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all outline-none placeholder:text-gray-500 min-h-[100px] resize-none"
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] mt-4 text-lg tracking-wide"
          >
            Collect Payment
          </button>
        </div>

      </div>
    </div>
  );
};

export default CollectInstallment;