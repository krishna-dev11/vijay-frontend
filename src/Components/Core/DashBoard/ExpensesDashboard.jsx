import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  getExpenseByDay,
  getExpenseByWeek,
  getExpenseByMonth,
  getExpenseByYear,
  deleteExpense,
} from "../../../Services.jsx/Operations/ExpenseAPI";
import { FiPlus, FiFilter, FiDollarSign, FiPieChart, FiTrendingDown, FiTrash2, FiFileText, FiCalendar } from "react-icons/fi";
import { FormateDate } from "../../../Utilities/FormateDate";

const ExpensesDashboard = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const expenseSlice = useSelector((state) => state.expense);
  const expenseData = expenseSlice?.expenseData;

  const today = new Date();
  const [filter] = useState({
    year: today.getFullYear(),
    month: today.toLocaleString("default", { month: "long" }),
    week: `Week-${Math.ceil(today.getDate() / 7)}`,
    day: today.getDate(),
  });

  const [form, setForm] = useState({ amount: "", category: "", description: "", expenseDate: "", billNumber: "" });

  useEffect(() => {
    dispatch(getExpenseByYear(filter.year, token));
  }, [dispatch, filter.year, token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddExpense = async () => {
    await dispatch(addExpense(form, token));
    dispatch(getExpenseByYear(filter.year, token));
    setForm({ amount: "", category: "", description: "", expenseDate: "", billNumber: "" });
  };

  const inputStyle = "w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white placeholder-gray-700 focus:border-emerald-500/30 outline-none transition-all text-sm";
  const labelStyle = "text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1 mb-2 block";

  return (
    <div className="relative min-h-screen w-full bg-[#000] text-white p-6 md:p-12 font-sans overflow-hidden">
      
      {/* ─── Background Visuals ─── */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[10%] left-[-5%] select-none pointer-events-none opacity-[0.02] z-0">
        <h1 className="text-[15rem] font-bold uppercase tracking-widest leading-none">Finance</h1>
      </div>

      <div className="relative translate-y-6 z-10 max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              <span>Academy Hub</span> <span className="text-emerald-500">/</span>
              <span className="text-white">Expense Tracker</span>
            </nav>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Financial Audit</h2>
          </div>
          <div className="flex gap-3">
             <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
               <FiPieChart /> Export Report
             </button>
          </div>
        </div>

        {/* ─── SUMMARY CARDS (Bento Grid) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden group hover:bg-white/[0.04] transition-all">
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
            <FiDollarSign className="text-emerald-400 mb-4" size={24} />
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Total Outflow</p>
            <p className="text-4xl font-bold mt-2 tracking-tighter">₹{expenseData?.totalYearlyExpense ?? expenseData?.totalExpense ?? 0}</p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl group hover:bg-white/[0.04] transition-all">
            <FiFileText className="text-blue-400 mb-4" size={24} />
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Active Entries</p>
            <p className="text-4xl font-bold mt-2 tracking-tighter">{expenseData?.totalEntries || 0}</p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl group hover:bg-white/[0.04] transition-all">
            <FiCalendar className="text-purple-400 mb-4" size={24} />
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Reporting Period</p>
            <p className="text-xl font-bold mt-2 uppercase tracking-tight">
               {expenseData?.year ? `FY ${expenseData.year}` : `${filter.month} ${filter.year}`}
            </p>
          </div>
        </div>

        {/* ─── ADD EXPENSE PANEL ─── */}
        <div className="bg-white/[0.02] border border-white/10 p-10 rounded-[3rem] backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-10">
             <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
               <FiPlus size={20} />
             </div>
             <h3 className="text-xl font-bold">Log New Transaction</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <label>
              <span className={labelStyle}>Amount (INR)</span>
              <input name="amount" type="number" placeholder="0.00" value={form.amount} onChange={handleChange} className={inputStyle} />
            </label>
            <label>
              <span className={labelStyle}>Category</span>
              <select name="category" value={form.category} onChange={handleChange} className={inputStyle}>
                <option value="" className="bg-black">Select...</option>
                {["Rent", "Electricity", "Salary", "Maintenance", "Food", "Other"].map(cat => (
                  <option key={cat} value={cat} className="bg-black">{cat}</option>
                ))}
              </select>
            </label>
            <label>
              <span className={labelStyle}>Entry Date</span>
              <input type="date" name="expenseDate" value={form.expenseDate} onChange={handleChange} className={inputStyle} />
            </label>
            <label>
              <span className={labelStyle}>Voucher / Bill No.</span>
              <input name="billNumber" placeholder="Optional" value={form.billNumber} onChange={handleChange} className={inputStyle} />
            </label>
          </div>

          <div className="mt-6">
            <span className={labelStyle}>Transaction Narrative</span>
            <textarea name="description" placeholder="Describe the purpose..." value={form.description} onChange={handleChange} className={`${inputStyle} resize-none h-24`} />
          </div>

          <div className="flex justify-end mt-8">
            <button 
              onClick={handleAddExpense}
              className="px-10 py-4 bg-white text-black font-bold rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.15)] hover:bg-emerald-400 transition-all uppercase tracking-widest text-[10px] active:scale-95"
            >
              Authorize Transaction
            </button>
          </div>
        </div>

        {/* ─── FILTER & LIST ─── */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Today", fn: () => dispatch(getExpenseByDay(filter.year, filter.month, filter.day, token)) },
              { label: "Weekly", fn: () => dispatch(getExpenseByWeek(filter.year, filter.month, filter.week, token)) },
              { label: "Monthly", fn: () => dispatch(getExpenseByMonth(filter.year, filter.month, token)) },
              { label: "Annual Total", fn: () => dispatch(getExpenseByYear(filter.year, token)) },
            ].map((btn, i) => (
              <button 
                key={i} 
                onClick={btn.fn}
                className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-2xl overflow-hidden shadow-3xl">
            <table className="w-full text-left">
              <thead className="bg-white/[0.03] border-b border-white/5">
                <tr>
                  {["Timestamp", "Classification", "Narrative", "Amount", "Voucher", "Agent", "Command"].map(h => (
                    <th key={h} className="p-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expenseData?.expenses?.map((exp) => (
                  <tr key={exp._id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-all group">
                    <td className="p-6 text-sm text-white font-medium">{FormateDate(exp.expenseDate)}</td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-400">{exp.category}</span>
                    </td>
                    <td className="p-6 text-sm text-gray-500 italic max-w-[200px] truncate">{exp.description || "No narrative provided"}</td>
                    <td className="p-6 text-emerald-400 font-bold">₹{exp.amount}</td>
                    <td className="p-6 text-sm text-gray-500">{exp.billNumber || "---"}</td>
                    <td className="p-6 text-xs text-gray-400 font-bold uppercase tracking-tighter">{exp.addedBy?.firstName || "Admin"}</td>
                    <td className="p-6">
                      <button 
                        onClick={() => dispatch(deleteExpense(exp._id, token))}
                        className="p-2.5 rounded-xl border border-red-500/20 text-red-500/40 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesDashboard;