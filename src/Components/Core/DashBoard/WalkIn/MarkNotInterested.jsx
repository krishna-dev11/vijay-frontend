import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { markWalkInNotInterested } from "../../../../Services.jsx/Operations/WalkInAPI";
import { FormateDate } from "../../../../Utilities/FormateDate";


const MarkNotInterested = () => {
  const { walkInId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [reason, setReason] = useState("");

  const walkIn = user?.walkIns?.find(w => w._id === walkInId);

  if (!walkIn) {
    return <p className="text-center mt-10 text-richblack-5">Loading Walk-In Data...</p>;
  }

  const handleSubmit = () => {
    if (!reason.trim()) {
      return alert("Please select or write a reason");
    }
    dispatch(markWalkInNotInterested(walkInId, reason, token, navigate));
  };

  return (
    <div className="px-8 py-8 bg-richblack-900 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-2xl text-richblack-5 font-semibold">
            Mark as Not Interested
          </p>
          <p className="text-richblack-300 text-sm">
            {walkIn.studentName} • {walkIn.phone}
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-x-2 bg-richblack-700 px-3 py-2 rounded-md text-richblack-5"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      {/* WALK-IN INFO CARD */}
      <div className="bg-richblack-800 p-4 rounded-md border border-richblack-700 mb-6 grid grid-cols-3 gap-4 text-richblack-5">
        <p>📅 First Visit: {FormateDate(walkIn.createdAt)}</p>
        <p>📞 Phone: {walkIn.phone}</p>
        <p>📧 Email: {walkIn.email || "N/A"}</p>
        <p>🎯 Interested Batch: {walkIn.interestedBatch?.courseName || "Not Selected"}</p>
        <p>🔄 Current Status: {walkIn.status}</p>
        <p>📅 Follow-Up: {walkIn.followUpDate ? FormateDate(walkIn.followUpDate) : "Not Set"}</p>
      </div>

      {/* REASON FORM */}
      <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700 space-y-4">

        <h3 className="text-lg text-richblack-5 font-semibold">
          Select / Write Reason
        </h3>

        <select
          className="w-full bg-richblack-700 p-2 rounded-md text-richblack-5"
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="">Choose a reason</option>
          <option value="Not financially ready">Not financially ready</option>
          <option value="Joined another institute">Joined another institute</option>
          <option value="Course not suitable">Course not suitable</option>
          <option value="Will decide later">Will decide later</option>
          <option value="Other">Other (write below)</option>
        </select>

        <textarea
          placeholder="Write additional notes (optional)..."
          className="w-full bg-richblack-700 p-2 rounded-md text-richblack-5"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-red-600 text-white px-4 py-2 rounded-md mt-4"
        >
          Mark as Not Interested
        </button>
      </div>
    </div>
  );
};

export default MarkNotInterested;
