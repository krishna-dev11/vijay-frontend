// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { GetWholeCourseDetails } from "../Services.jsx/Operations/CoursesAPI";
// import { FiGlobe, FiClock, FiLayers, FiShare2, FiUser, FiCheckCircle, FiShield } from "react-icons/fi";
// import OverviewofLectures from "../Components/Core/CourseDetails/OverviewofLectures";
// import "swiper/css";
// import "swiper/css/pagination";
// import toast from "react-hot-toast";
// import { AddNewCouseInCart } from "../Services.jsx/Operations/CartAPI";
// import GetAvgRating from "../Utilities/avgRating";
// import copy from "copy-to-clipboard";
// // import calculateTotalCourseDuration from "../Utilities/CalculateDuration";
// import ReactStars from "react-stars";
// import ModernFooter from "../Components/Core/Home/ModernFooter";

// const ONECourseDetail = () => {
//   const { courseDetails } = useSelector((state) => state.Category);
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { CourseId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [totalLectures, setTotalLectures] = useState(0);
//   const [averageRating, setAverageRating] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       await dispatch(GetWholeCourseDetails(CourseId));
//       setLoading(false);
//     };
//     fetchData();
//   }, [CourseId, dispatch]);

//   useEffect(() => {
//     if (courseDetails) {
//       const avg = GetAvgRating(courseDetails.ratingAndReviews);
//       setAverageRating(avg || 0);

//       if (courseDetails.courseContent) {
//         const count = courseDetails.courseContent.reduce(
//           (acc, sec) => acc + (sec.subSections?.length || 0), 
//           0
//         );
//         setTotalLectures(count);
//       }
//     }
//   }, [courseDetails]);

//   const handleShare = () => {
//     copy(window.location.href);
//     toast.success("Link Copied to Clipboard");
//   };

//   const handleAddCourseInCart = () => {
//     if (!token) {
//       toast.error("Please Login to Add to Cart");
//       return navigate("/login");
//     }
//     // Check if course already purchased
//     if (user?.courses?.includes(CourseId)) {
//       toast.error("Course already in your collection");
//       return;
//     }
//     dispatch(AddNewCouseInCart(CourseId, user._id, token, navigate));
//   };

//   if (loading) return (
//     <div className="h-screen bg-[#000000] flex flex-col items-center justify-center gap-4">
//       <div className="w-12 h-12 border-4 border-[#10b981]/20 border-t-[#10b981] rounded-full animate-spin" />
//       <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4b5563]">Loading Course Details...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#000000] text-[#ffffff] font-sans pt-16">
      
//       {/* ─── SIMPLE HERO SECTION ─── */}
//       <div className="relative py-16 px-6 md:px-12 border-b border-[#ffffff]/5">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start relative z-10">
          
//           {/* Left Info */}
//           <div className="lg:col-span-2 flex flex-col gap-6">
//             <nav className="text-[10px] font-bold uppercase tracking-widest text-[#4b5563]">
//                Catalog / <span className="text-[#10b981]">{courseDetails?.category?.name || "Course"}</span>
//             </nav>
            
//             <div className="space-y-4">
//               <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#ffffff]">
//                 {courseDetails.courseName}
//               </h1>
//               <p className="text-[#9ca3af] text-base font-light leading-relaxed max-w-2xl">
//                 {courseDetails.courseDescription}
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-8 items-center pt-2">
//               <div className="flex items-center gap-3">
//                 <span className="text-[#10b981] font-bold text-xl">{averageRating.toFixed(1)}</span>
//                 <ReactStars count={5} edit={false} value={averageRating} size={20} color2={"#10b981"} />
//               </div>
//               <div className="flex items-center gap-2 text-xs font-medium text-[#6b7280]">
//                 <FiUser className="text-[#10b981]" /> {courseDetails.studentEnrolled?.length || 0} Students Enrolled
//               </div>
//               <div className="flex items-center gap-2 text-xs font-medium text-[#6b7280]">
//                 <FiGlobe className="text-[#10b981]" /> English Node
//               </div>
//             </div>

//             <div className="flex items-center gap-3 pt-6">
//                <img src={courseDetails.instructor?.imageUrl} className="w-10 h-10 rounded-full object-cover border border-[#ffffff]/10" alt="Instructor" />
//                <p className="text-sm font-medium text-[#9ca3af]">
//                  By <span className="text-[#ffffff]">{courseDetails.instructor?.firstName} {courseDetails.instructor?.lastName}</span>
//                </p>
//             </div>
//           </div>

//           {/* ─── ACTION CARD (Simplified) ─── */}
//           <div className="lg:col-span-1">
//             <div className="bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-6 rounded-3xl shadow-xl flex flex-col gap-6">
//               <img src={courseDetails.thumbnail} className="w-full aspect-video rounded-2xl object-cover border border-[#ffffff]/10" alt="Thumbnail" />

//               <div className="flex justify-between items-center">
//                 <p className="text-4xl font-bold text-[#ffffff]">₹{courseDetails.price}</p>
//                 <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] text-[10px] font-bold rounded-lg uppercase">Full Access</span>
//               </div>

//               <div className="flex flex-col gap-3">
//                 {user?.courses?.includes(courseDetails._id) ? (
//                   <button onClick={() => navigate("/EnrolledCourses/active-Courses")} className="w-full py-4 bg-[#10b981] text-[#000000] font-bold rounded-xl text-xs uppercase tracking-widest hover:brightness-110 transition-all">Go to Dashboard</button>
//                 ) : (
//                   <button onClick={handleAddCourseInCart} className="w-full py-4 bg-[#ffffff] text-[#000000] font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-[#10b981] transition-all">Add to Cart</button>
//                 )}
//                 <button onClick={handleShare} className="w-full py-3 border border-[#ffffff]/10 text-[#6b7280] font-bold rounded-xl text-[10px] uppercase tracking-widest hover:text-[#ffffff] transition-all flex items-center justify-center gap-2">
//                   <FiShare2 /> Share Course
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ─── CONTENT GRID ─── */}
//       <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
//         <div className="lg:col-span-2 space-y-16">
          
//           {/* Objectives */}
//           <section className="bg-[#ffffff]/[0.01] border border-[#ffffff]/5 p-8 rounded-3xl">
//             <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
//                <FiShield className="text-[#10b981]" /> What you'll learn
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                {courseDetails.whatYouWillLearn?.map((item, i) => (
//                  <div key={i} className="flex gap-3">
//                     <FiCheckCircle className="text-[#10b981] shrink-0 mt-1" size={14} />
//                     <p className="text-[#9ca3af] text-sm leading-relaxed">{item}</p>
//                  </div>
//                ))}
//             </div>
//           </section>

//           {/* Curriculum */}
//           <section className="space-y-6">
//             <div className="flex justify-between items-end">
//               <h3 className="text-2xl font-bold">Curriculum</h3>
//               <div className="text-[10px] text-[#4b5563] font-bold uppercase tracking-widest flex gap-4">
//                 <span><FiLayers className="inline mr-1" /> {courseDetails.courseContent?.length} Sections</span>
//                 <span><FiClock className="inline mr-1" /> {totalLectures} Lectures</span>
//               </div>
//             </div>
//             <div className="bg-[#ffffff]/[0.02] border border-[#ffffff]/5 rounded-2xl overflow-hidden">
//                <OverviewofLectures data={courseDetails.courseContent} />
//             </div>
//           </section>

//         </div>
//       </div>

//       <ModernFooter />
//     </div>
//   );
// };

// export default ONECourseDetail;




// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { GetWholeCourseDetails } from "../Services.jsx/Operations/CoursesAPI";
// import { FiGlobe, FiClock, FiLayers, FiShare2, FiUser, FiCheckCircle, FiShield, FiTag } from "react-icons/fi";
// import OverviewofLectures from "../Components/Core/CourseDetails/OverviewofLectures";
// import "swiper/css";
// import "swiper/css/pagination";
// import toast from "react-hot-toast";
// import { AddNewCouseInCart } from "../Services.jsx/Operations/CartAPI";
// import GetAvgRating from "../Utilities/avgRating";
// import copy from "copy-to-clipboard";
// import ReactStars from "react-stars";
// import ModernFooter from "../Components/Core/Home/ModernFooter";

// const ONECourseDetail = () => {
//   const { courseDetails } = useSelector((state) => state.Category);
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { CourseId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [totalLectures, setTotalLectures] = useState(0);
//   const [averageRating, setAverageRating] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       await dispatch(GetWholeCourseDetails(CourseId));
//       setLoading(false);
//     };
//     fetchData();
//   }, [CourseId, dispatch]);

//   useEffect(() => {
//     if (courseDetails) {
//       const avg = GetAvgRating(courseDetails.ratingAndReviews);
//       setAverageRating(avg || 0);

//       if (courseDetails.courseContent) {
//         const count = courseDetails.courseContent.reduce(
//           (acc, sec) => acc + (sec.subSections?.length || 0), 
//           0
//         );
//         setTotalLectures(count);
//       }
//     }
//   }, [courseDetails]);

//   const handleShare = () => {
//     copy(window.location.href);
//     toast.success("Link Copied to Clipboard");
//   };

//   const handleAddCourseInCart = () => {
//     if (!token) {
//       toast.error("Please Login to Add to Cart");
//       return navigate("/login");
//     }
//     if (user?.courses?.includes(CourseId)) {
//       toast.error("Course already in your collection");
//       return;
//     }
//     dispatch(AddNewCouseInCart(CourseId, user._id, token, navigate));
//   };

//   if (loading) return (
//     <div className="h-screen bg-[#000000] flex flex-col items-center justify-center gap-4">
//       <div className="w-12 h-12 border-4 border-[#10b981]/20 border-t-[#10b981] rounded-full animate-spin" />
//       <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4b5563]">Loading Course Details...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#000000] text-[#ffffff] font-sans pt-16">
      
//       {/* ─── SIMPLE HERO SECTION ─── */}
//       <div className="relative py-16 px-6 md:px-12 border-b border-[#ffffff]/5">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start relative z-10">
          
//           {/* Left Info */}
//           <div className="lg:col-span-2 flex flex-col gap-6">
//             <nav className="text-[10px] font-bold uppercase tracking-widest text-[#4b5563]">
//                Catalog / <span className="text-[#10b981]">{courseDetails?.category?.name || "Course"}</span>
//             </nav>
            
//             <div className="space-y-4">
//               <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#ffffff]">
//                 {courseDetails.courseName}
//               </h1>
//               <p className="text-[#9ca3af] text-base font-light leading-relaxed max-w-2xl">
//                 {courseDetails.courseDescription}
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-8 items-center pt-2">
//               <div className="flex items-center gap-3">
//                 <span className="text-[#10b981] font-bold text-xl">{averageRating.toFixed(1)}</span>
//                 <ReactStars count={5} edit={false} value={averageRating} size={20} color2={"#10b981"} />
//               </div>
//               <div className="flex items-center gap-2 text-xs font-medium text-[#6b7280]">
//                 <FiUser className="text-[#10b981]" /> {courseDetails.studentEnrolled?.length || 0} Students Enrolled
//               </div>
//               <div className="flex items-center gap-2 text-xs font-medium text-[#6b7280]">
//                 <FiGlobe className="text-[#10b981]" /> English Node
//               </div>
//             </div>

//             <div className="flex items-center gap-3 pt-6">
//                <img src={courseDetails.instructor?.imageUrl} className="w-10 h-10 rounded-full object-cover border border-[#ffffff]/10" alt="Instructor" />
//                <p className="text-sm font-medium text-[#9ca3af]">
//                  By <span className="text-[#ffffff]">{courseDetails.instructor?.firstName} {courseDetails.instructor?.lastName}</span>
//                </p>
//             </div>
//           </div>

//           {/* ─── ACTION CARD ─── */}
//           <div className="lg:col-span-1">
//             <div className="bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-6 rounded-3xl shadow-xl flex flex-col gap-6">
//               <img src={courseDetails.thumbnail} className="w-full aspect-video rounded-2xl object-cover border border-[#ffffff]/10" alt="Thumbnail" />

//               <div className="flex justify-between items-center">
//                 <p className="text-4xl font-bold text-[#ffffff]">₹{courseDetails.price}</p>
//                 <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] text-[10px] font-bold rounded-lg uppercase">Full Access</span>
//               </div>

//               <div className="flex flex-col gap-3">
//                 {user?.courses?.includes(courseDetails._id) ? (
//                   <button onClick={() => navigate("/EnrolledCourses/active-Courses")} className="w-full py-4 bg-[#10b981] text-[#000000] font-bold rounded-xl text-xs uppercase tracking-widest hover:brightness-110 transition-all">Go to Dashboard</button>
//                 ) : (
//                   <button onClick={handleAddCourseInCart} className="w-full py-4 bg-[#ffffff] text-[#000000] font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-[#10b981] transition-all">Add to Cart</button>
//                 )}
//                 <button onClick={handleShare} className="w-full py-3 border border-[#ffffff]/10 text-[#6b7280] font-bold rounded-xl text-[10px] uppercase tracking-widest hover:text-[#ffffff] transition-all flex items-center justify-center gap-2">
//                   <FiShare2 /> Share Course
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ─── CONTENT GRID ─── */}
//       <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
//         <div className="lg:col-span-2 space-y-16">
          
//           {/* Objectives Section */}
//           <section className="bg-[#ffffff]/[0.01] border border-[#ffffff]/5 p-8 rounded-3xl">
//             <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
//                <FiShield className="text-[#10b981]" /> What you'll learn
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                {courseDetails.whatYouWillLearn?.map((item, i) => (
//                  <div key={i} className="flex gap-3">
//                     <FiCheckCircle className="text-[#10b981] shrink-0 mt-1" size={14} />
//                     <p className="text-[#9ca3af] text-sm leading-relaxed">{item}</p>
//                  </div>
//                ))}
//             </div>
//           </section>

//           {/* ─── NEW TAGS SECTION ("This Course Includes") ─── */}
//           <section className="bg-[#ffffff]/[0.01] border border-[#ffffff]/5 p-8 rounded-3xl">
//             <h3 className="text-xl font-bold mb-6 text-[#ffffff] flex items-center gap-2">
//               <FiTag className="text-[#10b981]" /> This course includes:
//             </h3>
//             <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 list-disc list-inside text-sm">
//               {courseDetails?.tag?.map((tag, i) => (
//                 <li key={i} className="text-[#9ca3af] marker:text-[#10b981]">
//                   <span className="ml-2">{tag}</span>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* Curriculum Section */}
//           <section className="space-y-6">
//             <div className="flex justify-between items-end">
//               <h3 className="text-2xl font-bold">Curriculum</h3>
//               <div className="text-[10px] text-[#4b5563] font-bold uppercase tracking-widest flex gap-4">
//                 <span><FiLayers className="inline mr-1" /> {courseDetails.courseContent?.length} Sections</span>
//                 <span><FiClock className="inline mr-1" /> {totalLectures} Lectures</span>
//               </div>
//             </div>
//             <div className="bg-[#ffffff]/[0.02] border border-[#ffffff]/5 rounded-2xl overflow-hidden">
//                <OverviewofLectures data={courseDetails.courseContent} />
//             </div>
//           </section>

//         </div>
//       </div>

//       <ModernFooter />
//     </div>
//   );
// };

// export default ONECourseDetail;








// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { GetWholeCourseDetails } from "../Services.jsx/Operations/CoursesAPI";
// import {
//   FiGlobe,
//   FiClock,
//   FiLayers,
//   FiShare2,
//   FiUser,
//   FiCheckCircle,
//   FiShield,
//   FiTag,
//   FiPlayCircle,
//   FiStar,
// } from "react-icons/fi";
// import OverviewofLectures from "../Components/Core/CourseDetails/OverviewofLectures";
// import toast from "react-hot-toast";
// import { AddNewCouseInCart } from "../Services.jsx/Operations/CartAPI";
// import GetAvgRating from "../Utilities/avgRating";
// import copy from "copy-to-clipboard";
// import ReactStars from "react-stars";
// import ModernFooter from "../Components/Core/Home/ModernFooter";

// const ONECourseDetail = () => {
//   const { courseDetails } = useSelector((state) => state.Category);
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { CourseId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   console.log(courseDetails)

//   const [loading, setLoading] = useState(true);
//   const [totalLectures, setTotalLectures] = useState(0);
//   const [averageRating, setAverageRating] = useState(0);

//   const cleanArray = (data) => {
//     if (!data) return [];
//     if (Array.isArray(data)) {
//       return data.flatMap((item) => {
//         if (typeof item === "string") {
//           try { return JSON.parse(item); } catch { return [item]; }
//         }
//         return item;
//       });
//     }
//     return [];
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       await dispatch(GetWholeCourseDetails(CourseId));
//       setLoading(false);
//     };
//     fetchData();
//   }, [CourseId, dispatch]);

//   useEffect(() => {
//     if (courseDetails) {
//       const avg = GetAvgRating(courseDetails.ratingAndReviews);
//       setAverageRating(avg || 0);
//       if (courseDetails.courseContent) {
//         const count = courseDetails.courseContent.reduce(
//           (acc, sec) => acc + (sec.subSections?.length || 0),
//           0
//         );
//         setTotalLectures(count);
//       }
//     }
//   }, [courseDetails]);

//   const handleShare = () => {
//     copy(window.location.href);
//     toast.success("Link copied to clipboard");
//   };

//   const handleAddCourseInCart = () => {
//     if (!token) {
//       toast.error("Please Login first");
//       return navigate("/login");
//     }
//     if (user?.courses?.includes(CourseId)) {
//       toast.error("Course already purchased");
//       return;
//     }
//     dispatch(AddNewCouseInCart(CourseId, user._id, token, navigate));
//   };

//   if (loading)
//     return (
//       <div className="h-screen bg-[#050505] flex flex-col items-center justify-center gap-4">
//         <div className="w-16 h-16 border-4 border-green-500/10 border-t-green-500 rounded-full animate-spin" />
//         <p className="text-gray-500 animate-pulse font-medium">Loading Experience...</p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#050505] text-white selection:bg-green-500/30">
      
//       {/* HERO SECTION */}
//       <div className="relative border-b border-white/10 bg-gradient-to-b from-green-500/5 to-transparent pt-24 pb-16">
//         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12 items-start">
          
//           {/* LEFT: COURSE INFO */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="space-y-4">
//               <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm font-semibold border border-green-500/20 tracking-wide">
//                 BESTSELLER
//               </span>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
//                 {courseDetails.courseName}
//               </h1>
//               <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
//                 {courseDetails.courseDescription}
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-6 items-center py-4 border-y border-white/5">
//               <div className="flex items-center gap-2">
//                 <span className="text-2xl font-bold text-green-400">{averageRating.toFixed(1)}</span>
//                 <ReactStars count={5} value={averageRating} edit={false} size={20} color2="#10b981" />
//                 <span className="text-gray-500 text-sm">({courseDetails.ratingAndReviews?.length} ratings)</span>
//               </div>
//               <div className="h-4 w-px bg-white/10 hidden sm:block" />
//               <div className="flex items-center gap-2 text-gray-300">
//                 <FiUser className="text-green-500" />
//                 <span>{courseDetails.studentEnrolled?.length} students enrolled</span>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 w-fit">
//               <img 
//                 src={courseDetails.instructor?.imageUrl} 
//                 className="w-12 h-12 rounded-full object-cover border-2 border-green-500/20 shadow-lg" 
//                 alt="instructor"
//               />
//               <div>
//                 <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Instructor</p>
//                 <p className="text-lg font-semibold hover:text-green-400 transition-colors cursor-pointer">
//                   {courseDetails.instructor?.firstName} {courseDetails.instructor?.lastName}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: FLOATING STICKY CARD */}
//           <div className="lg:sticky lg:top-28 z-10">
//             <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-green-500/5 group">
//               <div className="relative overflow-hidden">
//                 <img 
//                   src={courseDetails.thumbnail} 
//                   className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" 
//                   alt="thumbnail"
//                 />
//                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                   <FiPlayCircle size={60} className="text-white drop-shadow-2xl" />
//                 </div>
//               </div>

//               <div className="p-8 space-y-6">
//                 <div className="flex items-end gap-2">
//                   <span className="text-4xl font-bold italic">₹{courseDetails.price}</span>
//                   <span className="text-gray-500 line-through mb-1">₹{courseDetails.price * 2}</span>
//                 </div>

//                 <div className="space-y-3">
//                   <button
//                     onClick={handleAddCourseInCart}
//                     className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 transform active:scale-95 shadow-lg shadow-white/5"
//                   >
//                     Add to Cart
//                   </button>
//                   <button
//                     onClick={handleShare}
//                     className="w-full py-3 border border-white/10 rounded-xl flex justify-center items-center gap-2 font-medium hover:bg-white/5 transition-colors"
//                   >
//                     <FiShare2 /> Share Course
//                   </button>
//                 </div>
                
//                 <p className="text-center text-xs text-gray-500">30-Day Money-Back Guarantee</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MAIN CONTENT AREA */}
//       <div className="max-w-7xl mx-auto px-6 py-20">
//         <div className="grid lg:grid-cols-3 gap-16">
          
//           <div className="lg:col-span-2 space-y-16">
            
// {/* LEARNING POINTS */}
// <section className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 shadow-inner">
//   <h3 className="text-2xl font-bold mb-6 flex gap-3 items-center">
//     <FiShield className="text-green-500" /> What you'll achieve
//   </h3>
//   {/* grid-cols-1 ensures every item takes the full width and comes on the next line */}
//   <div className="grid grid-cols-1 gap-2">
//     {cleanArray(courseDetails.whatYouWillLearn).map((item, i) => (
//       <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-white/5">
//         <FiCheckCircle className="text-green-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
//         <p className="text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed">
//           {item}
//         </p>
//       </div>
//     ))}
//   </div>
// </section>

// {/* CANDIDATE REQUIREMENTS */}
// <section className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 shadow-inner mt-8">
//   <h3 className="text-2xl font-bold mb-6 flex gap-3 items-center">
//     <FiShield className="text-green-500" /> Candidate Requirements
//   </h3>
//   {/* Vertical layout: har line next line mein */}
//   <div className="flex flex-col gap-2">
//     {cleanArray(courseDetails.instructions).map((item, i) => (
//       <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-white/5">
//         <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 shrink-0 group-hover:shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all" />
//         <p className="text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed">
//           {item}
//         </p>
//       </div>
//     ))}
//   </div>
// </section>

//             {/* CURRICULUM */}
//             <section className="space-y-8">
//               <div className="flex justify-between items-end">
//                 <div>
//                   <h3 className="text-3xl font-bold mb-2">Course Content</h3>
//                   <p className="text-gray-500">{totalLectures} lectures • Lifetime access</p>
//                 </div>
//                 <button className="text-green-400 font-medium hover:underline">Expand all sections</button>
//               </div>
//               <div className="border border-white/10 rounded-3xl overflow-hidden bg-[#0f0f0f]">
//                 <OverviewofLectures data={courseDetails.courseContent} />
//               </div>
//             </section>

//             {/* TAGS/INCLUDES */}
// {/* COURSE TAGS / INCLUDES */}
// <section className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 shadow-inner mt-8">
//   <h3 className="text-2xl font-bold mb-6 flex gap-3 items-center">
//     <FiTag className="text-green-500" /> This course includes
//   </h3>
  
//   {/* Flex column ensure karega ki har tag next line mein aaye */}
//   <div className="flex flex-col gap-3">
//     {cleanArray(courseDetails.tag).map((tag, i) => (
//       <div 
//         key={i} 
//         className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-white/5"
//       >
//         {/* Subtle Hash Icon or Dot */}
//         <span className="text-green-500/50 group-hover:text-green-400 font-mono text-lg transition-colors">
//           #
//         </span>
        
//         <p className="text-gray-400 group-hover:text-gray-200 transition-colors font-medium tracking-wide">
//           {tag}
//         </p>
//       </div>
//     ))}
//   </div>
// </section>

//           </div>
//         </div>
//       </div>

//       <ModernFooter />
//     </div>
//   );
// };

// export default ONECourseDetail;







import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetWholeCourseDetails } from "../Services.jsx/Operations/CoursesAPI";
import {
  FiShare2,
  FiUser,
  FiCheckCircle,
  FiShield,
  FiTag,
  FiPlayCircle,
} from "react-icons/fi";
import OverviewofLectures from "../Components/Core/CourseDetails/OverviewofLectures";
import toast from "react-hot-toast";
import { AddNewCouseInCart } from "../Services.jsx/Operations/CartAPI";
import GetAvgRating from "../Utilities/avgRating";
import copy from "copy-to-clipboard";
import ReactStars from "react-stars";
import ModernFooter from "../Components/Core/Home/ModernFooter";
import OurInstructor from "../Components/Core/Home/OurInstructor";

const ONECourseDetail = () => {
  const { courseDetails } = useSelector((state) => state.Category);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { CourseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [totalLectures, setTotalLectures] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const cleanArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) {
      return data.flatMap((item) => {
        if (typeof item === "string") {
          try { return JSON.parse(item); } catch { return [item]; }
        }
        return item;
      });
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(GetWholeCourseDetails(CourseId));
      setLoading(false);
    };
    fetchData();
  }, [CourseId, dispatch]);

  useEffect(() => {
    if (courseDetails) {
      const avg = GetAvgRating(courseDetails.ratingAndReviews);
      setAverageRating(avg || 0);
      if (courseDetails.courseContent) {
        const count = courseDetails.courseContent.reduce(
          (acc, sec) => acc + (sec.subSections?.length || 0),
          0
        );
        setTotalLectures(count);
      }
    }
  }, [courseDetails]);

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleAddCourseInCart = () => {
    if (!token) {
      toast.error("Please Login first");
      return navigate("/login");
    }
    if (user?.courses?.includes(CourseId)) {
      toast.error("Course already purchased");
      return;
    }
    dispatch(AddNewCouseInCart(CourseId, user._id, token, navigate));
  };

  if (loading)
    return (
      <div className="h-screen bg-[#050505] flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-green-500/10 border-t-green-500 rounded-full animate-spin" />
        <p className="text-gray-500 animate-pulse font-medium">Loading Experience...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-green-500/30 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <div className="relative border-b border-white/10 bg-gradient-to-b from-green-500/5 to-transparent pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          
          {/* LEFT: COURSE INFO */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs md:text-sm font-semibold border border-green-500/20 tracking-wide inline-block">
                BESTSELLER
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                {courseDetails.courseName}
              </h1>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl">
                {courseDetails.courseDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6 items-center py-4 border-y border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-bold text-green-400">{averageRating.toFixed(1)}</span>
                <ReactStars count={5} value={averageRating} edit={false} size={18} color2="#10b981" />
                <span className="text-gray-500 text-xs md:text-sm">({courseDetails.ratingAndReviews?.length} ratings)</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
                <FiUser className="text-green-500" />
                <span>{courseDetails.studentEnrolled?.length} Students</span>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 w-fit">
              <img 
                src={courseDetails.instructor?.imageUrl} 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-green-500/20" 
                alt="instructor"
              />
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Instructor</p>
                <p className="text-base md:text-lg font-semibold hover:text-green-400 transition-colors">
                  {courseDetails.instructor?.firstName} {courseDetails.instructor?.lastName}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: FLOATING CARD (Mobile: Top, Desktop: Sticky Right) */}
          <div className="lg:sticky lg:top-28 z-10 order-1 lg:order-2">
            <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-green-500/5 group">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={courseDetails.thumbnail} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt="thumbnail"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:opacity-100 transition-opacity">
                  <FiPlayCircle className="text-white drop-shadow-2xl text-5xl md:text-6xl" />
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-4 md:space-y-6">
                <div className="flex items-end gap-2">
                  <span className="text-3xl md:text-4xl font-bold">₹{courseDetails.price}</span>
                  <span className="text-gray-500 line-through mb-1 text-sm md:text-base">₹{courseDetails.price * 2}</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={handleAddCourseInCart}
                    className="w-full py-3.5 md:py-4 bg-white text-black font-bold rounded-xl hover:bg-green-500 hover:text-white transition-all transform active:scale-95"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full py-3 border border-white/10 rounded-xl flex justify-center items-center gap-2 text-sm font-medium hover:bg-white/5"
                  >
                    <FiShare2 /> Share Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          
          <div className="lg:col-span-2 space-y-12 md:space-y-16">
            
            {/* LEARNING POINTS */}
            <section className="bg-[#0f0f0f] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-inner">
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex gap-3 items-center">
                <FiShield className="text-green-500" /> What you'll achieve
              </h3>
              <div className="flex flex-col gap-1">
                {cleanArray(courseDetails.whatYouWillLearn).map((item, i) => (
                  <div key={i} className="flex gap-4 p-3 md:p-4 rounded-xl hover:bg-white/5 transition-all group">
                    <FiCheckCircle className="text-green-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                    <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-200 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CURRICULUM */}
            <section className="space-y-6 md:space-y-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Course Content</h3>
                  {/* <p className="text-sm text-gray-500">{totalLectures} lectures • Lifetime access</p> */}
                </div>
                <button className="text-green-400 text-sm font-medium hover:underline text-left">Expand all sections</button>
              </div>
              <div className="border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden bg-[#0f0f0f]">
                <OverviewofLectures data={courseDetails.courseContent} />
              </div>
            </section>

            {/* REQUIREMENTS */}
            <section className="bg-[#0f0f0f] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-inner">
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex gap-3 items-center">
                <FiShield className="text-green-500" /> Candidate Requirements
              </h3>
              <div className="flex flex-col gap-1">
                {cleanArray(courseDetails.instructions).map((item, i) => (
                  <div key={i} className="flex gap-4 p-3 md:p-4 rounded-xl hover:bg-white/5 transition-all group">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 shrink-0" />
                    <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-200 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* TAGS */}
            <section className="bg-[#0f0f0f] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-inner">
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex gap-3 items-center">
                <FiTag className="text-green-500" /> This course includes
              </h3>
              <div className="flex flex-col gap-2">
                {cleanArray(courseDetails.tag).map((tag, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group">
                    <span className="text-green-500/50 font-mono text-lg">#</span>
                    <p className="text-sm md:text-base text-gray-400 group-hover:text-white font-medium">{tag}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>

      <OurInstructor/>

      <ModernFooter />
    </div>
  );
};

export default ONECourseDetail;