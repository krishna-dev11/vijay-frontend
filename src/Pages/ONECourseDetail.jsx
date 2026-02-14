import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetWholeCourseDetails } from "../Services.jsx/Operations/CoursesAPI";
import { FiGlobe, FiClock, FiLayers, FiShare2, FiUser, FiCheckCircle, FiShield } from "react-icons/fi";
import OverviewofLectures from "../Components/Core/CourseDetails/OverviewofLectures";
import "swiper/css";
import "swiper/css/pagination";
import toast from "react-hot-toast";
import { AddNewCouseInCart } from "../Services.jsx/Operations/CartAPI";
import GetAvgRating from "../Utilities/avgRating";
import copy from "copy-to-clipboard";
// import calculateTotalCourseDuration from "../Utilities/CalculateDuration";
import ReactStars from "react-stars";
import ModernFooter from "../Components/Core/Home/ModernFooter";

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
    toast.success("Link Copied to Clipboard");
  };

  const handleAddCourseInCart = () => {
    if (!token) {
      toast.error("Please Login to Add to Cart");
      return navigate("/login");
    }
    // Check if course already purchased
    if (user?.courses?.includes(CourseId)) {
      toast.error("Course already in your collection");
      return;
    }
    dispatch(AddNewCouseInCart(CourseId, user._id, token, navigate));
  };

  if (loading) return (
    <div className="h-screen bg-[#000000] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-[#10b981]/20 border-t-[#10b981] rounded-full animate-spin" />
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4b5563]">Loading Course Details...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] font-sans pt-16">
      
      {/* ─── SIMPLE HERO SECTION ─── */}
      <div className="relative py-16 px-6 md:px-12 border-b border-[#ffffff]/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start relative z-10">
          
          {/* Left Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <nav className="text-[10px] font-bold uppercase tracking-widest text-[#4b5563]">
               Catalog / <span className="text-[#10b981]">{courseDetails?.category?.name || "Course"}</span>
            </nav>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#ffffff]">
                {courseDetails.courseName}
              </h1>
              <p className="text-[#9ca3af] text-base font-light leading-relaxed max-w-2xl">
                {courseDetails.courseDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-8 items-center pt-2">
              <div className="flex items-center gap-3">
                <span className="text-[#10b981] font-bold text-xl">{averageRating.toFixed(1)}</span>
                <ReactStars count={5} edit={false} value={averageRating} size={20} color2={"#10b981"} />
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#6b7280]">
                <FiUser className="text-[#10b981]" /> {courseDetails.studentEnrolled?.length || 0} Students Enrolled
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#6b7280]">
                <FiGlobe className="text-[#10b981]" /> English Node
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6">
               <img src={courseDetails.instructor?.imageUrl} className="w-10 h-10 rounded-full object-cover border border-[#ffffff]/10" alt="Instructor" />
               <p className="text-sm font-medium text-[#9ca3af]">
                 By <span className="text-[#ffffff]">{courseDetails.instructor?.firstName} {courseDetails.instructor?.lastName}</span>
               </p>
            </div>
          </div>

          {/* ─── ACTION CARD (Simplified) ─── */}
          <div className="lg:col-span-1">
            <div className="bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-6 rounded-3xl shadow-xl flex flex-col gap-6">
              <img src={courseDetails.thumbnail} className="w-full aspect-video rounded-2xl object-cover border border-[#ffffff]/10" alt="Thumbnail" />

              <div className="flex justify-between items-center">
                <p className="text-4xl font-bold text-[#ffffff]">₹{courseDetails.price}</p>
                <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] text-[10px] font-bold rounded-lg uppercase">Full Access</span>
              </div>

              <div className="flex flex-col gap-3">
                {user?.courses?.includes(courseDetails._id) ? (
                  <button onClick={() => navigate("/EnrolledCourses/active-Courses")} className="w-full py-4 bg-[#10b981] text-[#000000] font-bold rounded-xl text-xs uppercase tracking-widest hover:brightness-110 transition-all">Go to Dashboard</button>
                ) : (
                  <button onClick={handleAddCourseInCart} className="w-full py-4 bg-[#ffffff] text-[#000000] font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-[#10b981] transition-all">Add to Cart</button>
                )}
                <button onClick={handleShare} className="w-full py-3 border border-[#ffffff]/10 text-[#6b7280] font-bold rounded-xl text-[10px] uppercase tracking-widest hover:text-[#ffffff] transition-all flex items-center justify-center gap-2">
                  <FiShare2 /> Share Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CONTENT GRID ─── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          
          {/* Objectives */}
          <section className="bg-[#ffffff]/[0.01] border border-[#ffffff]/5 p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
               <FiShield className="text-[#10b981]" /> What you'll learn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {courseDetails.whatYouWillLearn?.map((item, i) => (
                 <div key={i} className="flex gap-3">
                    <FiCheckCircle className="text-[#10b981] shrink-0 mt-1" size={14} />
                    <p className="text-[#9ca3af] text-sm leading-relaxed">{item}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* Curriculum */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <h3 className="text-2xl font-bold">Curriculum</h3>
              <div className="text-[10px] text-[#4b5563] font-bold uppercase tracking-widest flex gap-4">
                <span><FiLayers className="inline mr-1" /> {courseDetails.courseContent?.length} Sections</span>
                <span><FiClock className="inline mr-1" /> {totalLectures} Lectures</span>
              </div>
            </div>
            <div className="bg-[#ffffff]/[0.02] border border-[#ffffff]/5 rounded-2xl overflow-hidden">
               <OverviewofLectures data={courseDetails.courseContent} />
            </div>
          </section>

        </div>
      </div>

      <ModernFooter />
    </div>
  );
};

export default ONECourseDetail;