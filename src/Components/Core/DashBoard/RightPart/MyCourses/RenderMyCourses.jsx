// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { DeleteInstructorCourses, FetchInstructorsAllCourses } from "../../../../../Services.jsx/Operations/DashBoard";
// import { FiClock, FiCheckCircle, FiEdit3, FiTrash2, FiUsers, FiCalendar, FiBookOpen } from "react-icons/fi";
// import ConfirmationModal from "../../../../Common/ConfirmationModal";
// import { setCourse, setEditCourse, setStep } from "../../../../../Slices/Courses";
// import { useNavigate } from "react-router-dom";
// import { FormateDate } from "../../../../../Utilities/FormateDate";

// const RenderMyCourses = () => {
//   const [deleteModal, setDeleteModal] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);

//   useEffect(() => {
//     if (user?._id && token) {
//       dispatch(FetchInstructorsAllCourses(user._id, token));
//     }
//   }, [user?._id, token, dispatch]);

//   const updateCourse = (course) => {
//     dispatch(setEditCourse(true));
//     dispatch(setCourse(course));
//     dispatch(setStep(1));
//     navigate("/dashboard/edit-course");
//   };

//   return (
//     <div className="flex flex-col gap-6">
//       {user?.courses?.length > 0 ? (
//         user.courses.map((course, index) => (
//           /* MODERN COURSE CARD */
//           <div key={index} className="group relative flex flex-col lg:flex-row gap-8 bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500">
            
//             {/* Thumbnail Area */}
//             <div className="relative w-full lg:w-72 aspect-video lg:aspect-[4/3] rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl">
//               <img src={course.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//               <div className="absolute top-4 left-4">
//                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${course.isOfflineBatch ? "bg-blue-500 text-white" : "bg-emerald-500 text-white"}`}>
//                   {course.isOfflineBatch ? "Offline" : "Online"}
//                 </span>
//               </div>
//             </div>

//             {/* Info Area */}
//             <div className="flex-1 flex flex-col justify-between py-2">
//               <div>
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
//                     {course.courseName}
//                   </h3>
//                   <p className="text-xl font-bold text-white tracking-tighter">₹{course.price}</p>
//                 </div>
//                 <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
//                   <span className="flex items-center gap-1"><FiCalendar /> Created {FormateDate(course.createdAt)}</span>
//                   <span className="flex items-center gap-1"><FiClock /> {course.batchTiming || "Self-Paced"}</span>
//                 </div>
//               </div>

//               {/* Status & Batch Info Bento */}
//               <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
//                   <p className="text-[9px] text-gray-600 uppercase mb-1">Status</p>
//                   <div className={`flex items-center gap-2 text-xs font-bold ${course.status === "Draft" ? "text-pink-400" : "text-emerald-400"}`}>
//                     {course.status === "Draft" ? <FiClock /> : <FiCheckCircle />} {course.status}
//                   </div>
//                 </div>
//                 {course.isOfflineBatch && (
//                   <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
//                     <p className="text-[9px] text-gray-600 uppercase mb-1">Enrollment</p>
//                     <p className={`text-xs font-bold ${course.enrollmentOpen ? "text-emerald-400" : "text-red-400"}`}>
//                       {course.enrollmentOpen ? "Active" : "Closed"}
//                     </p>
//                   </div>
//                 )}
//                 {/* View Students CTA */}
//                 {course.isOfflineBatch && (
//                   <button 
//                     onClick={() => navigate(`/EnrolledCourses/batch-students/${course._id}`)}
//                     className="md:col-span-2 flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
//                   >
//                     <FiUsers /> Students Directory
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Actions Panel */}
//             <div className="flex flex-row lg:flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
//               <button onClick={() => updateCourse(course)} className="flex-1 lg:flex-none w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
//                 <FiEdit3 size={18} />
//               </button>
//               <button 
//                 onClick={() => setDeleteModal({
//                   heading: "Confirm Deletion?",
//                   text1: "This batch and its student data will be permanently wiped.",
//                   button1Text: "Delete", button2Text: "Cancel",
//                   btn1Onclick: () => dispatch(DeleteInstructorCourses(course.instructor, course._id, token)),
//                   btn2Onclick: () => setDeleteModal(null)
//                 })}
//                 className="flex-1 lg:flex-none w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
//               >
//                 <FiTrash2 size={18} />
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="py-20 text-center bg-white/[0.02] border border-white/5 rounded-[2.5rem] backdrop-blur-xl">
//           <FiBookOpen className="mx-auto text-gray-700 mb-4" size={40} />
//           <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No active batches in catalog</p>
//         </div>
//       )}

//       {deleteModal && <ConfirmationModal data={deleteModal} />}
//     </div>
//   );
// };

// export default RenderMyCourses;









import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteInstructorCourses, FetchInstructorsAllCourses } from "../../../../../Services.jsx/Operations/DashBoard";
import { FiClock, FiCheckCircle, FiEdit3, FiTrash2, FiUsers, FiCalendar, FiBookOpen } from "react-icons/fi";
import ConfirmationModal from "../../../../Common/ConfirmationModal";
import { setCourse, setEditCourse, setStep } from "../../../../../Slices/Courses";
import { useNavigate } from "react-router-dom";
import { FormateDate } from "../../../../../Utilities/FormateDate";

const RenderMyCourses = () => {
  const [deleteModal, setDeleteModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (user?._id && token) {
      dispatch(FetchInstructorsAllCourses(user._id, token));
    }
  }, [user?._id, token, dispatch]);

  const updateCourse = (course) => {
    dispatch(setEditCourse(true));
    dispatch(setCourse(course));
    dispatch(setStep(1));
    navigate("/dashboard/edit-course");
  };

  return (
    <div className="flex flex-col gap-6">
      {user?.courses?.length > 0 ? (
        user.courses.map((course, index) => (
          /* MODERN COURSE CARD: Stacked on Mobile, Row on Laptop */
          <div key={index} className="group relative flex flex-col lg:flex-row gap-6 md:gap-8 bg-white/[0.02] border border-white/5 p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500">
            
            {/* Thumbnail Area */}
            <div className="relative w-full lg:w-72 aspect-video rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <img src={course.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="thumbnail" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 left-3 md:top-4 md:left-4">
                <span className={`px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest ${course.isOfflineBatch ? "bg-blue-500 text-white" : "bg-emerald-500 text-white"}`}>
                  {course.isOfflineBatch ? "Offline" : "Online"}
                </span>
              </div>
            </div>

            {/* Info Area */}
            <div className="flex-1 flex flex-col justify-between py-1 md:py-2">
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3 md:mb-2">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors leading-tight">
                    {course.courseName}
                  </h3>
                  <p className="text-lg md:text-xl font-bold text-white tracking-tighter shrink-0">₹{course.price}</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <span className="flex items-center gap-1.5"><FiCalendar /> Created {FormateDate(course.createdAt)}</span>
                  <span className="flex items-center gap-1.5"><FiClock /> {course.batchTiming || "Self-Paced"}</span>
                </div>
              </div>

              {/* Status & Batch Info Bento: 2 cols on mobile */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <p className="text-[8px] md:text-[9px] text-gray-600 uppercase mb-1">Status</p>
                  <div className={`flex items-center gap-2 text-[10px] md:text-xs font-bold ${course.status === "Draft" ? "text-pink-400" : "text-emerald-400"}`}>
                    {course.status === "Draft" ? <FiClock /> : <FiCheckCircle />} {course.status}
                  </div>
                </div>
                {course.isOfflineBatch && (
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                    <p className="text-[8px] md:text-[9px] text-gray-600 uppercase mb-1">Enrollment</p>
                    <p className={`text-[10px] md:text-xs font-bold ${course.enrollmentOpen ? "text-emerald-400" : "text-red-400"}`}>
                      {course.enrollmentOpen ? "Active" : "Closed"}
                    </p>
                  </div>
                )}
                
                {/* Students Directory: Full width on mobile grid */}
                {course.isOfflineBatch && (
                  <button 
                    onClick={() => navigate(`/EnrolledCourses/batch-students/${course._id}`)}
                    className="col-span-2 flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all text-[10px] md:text-xs font-bold uppercase tracking-widest py-3 md:py-0"
                  >
                    <FiUsers /> Students Directory
                  </button>
                )}
              </div>
            </div>

            {/* Actions Panel: Horizontal on mobile, Vertical on Laptop */}
            <div className="flex flex-row lg:flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-5 md:pt-6 lg:pt-0 lg:pl-8">
              <button onClick={() => updateCourse(course)} className="flex-1 lg:flex-none w-full lg:w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <FiEdit3 size={18} />
              </button>
              <button 
                onClick={() => setDeleteModal({
                  heading: "Confirm Deletion?",
                  text1: "This batch and its student data will be permanently wiped.",
                  button1Text: "Delete", button2Text: "Cancel",
                  btn1Onclick: () => dispatch(DeleteInstructorCourses(course.instructor, course._id, token)),
                  btn2Onclick: () => setDeleteModal(null)
                })}
                className="flex-1 lg:flex-none w-full lg:w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="py-20 text-center bg-white/[0.02] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] backdrop-blur-xl mx-2">
          <FiBookOpen className="mx-auto text-gray-700 mb-4" size={40} />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">No active batches in catalog</p>
        </div>
      )}

      {deleteModal && <ConfirmationModal data={deleteModal} />}
    </div>
  );
};

export default RenderMyCourses;