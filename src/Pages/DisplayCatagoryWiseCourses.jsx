import React, { useEffect, useState } from "react";
import Fotter from "../Components/Common/Fotter";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetCategoryWiseCoursesData } from "../Services.jsx/Operations/CoursesAPI";
import CategoryWiseCoursesPageTopPart from "../Components/Core/Catalog/CategoryWiseCoursesPageTopPart";
import { FiLoader, FiLayers } from "react-icons/fi";
import ModernFooter from "../Components/Core/Home/ModernFooter";

const DisplayCategoryWiseCourses = () => {
  const { categoryName, categoryId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategoryCourses = async () => {
      try {
        await dispatch(GetCategoryWiseCoursesData(categoryId));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCategoryCourses();
  }, [categoryId, categoryName, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#000] gap-4">
        <div className="relative">
           <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
           <FiLayers className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400" size={24} />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 animate-pulse">Syncing Catalog...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#000] font-sans pt-16">
      {/* Background Watermark */}
      <div className="absolute top-[10%] left-[-5%] select-none pointer-events-none opacity-[0.015] z-0 overflow-hidden">
        <h1 className="text-[20rem] font-bold uppercase tracking-widest leading-none">Catalog</h1>
      </div>

      <div className="relative z-10">
        <CategoryWiseCoursesPageTopPart />
        <div className="mt-20">
          <ModernFooter />
        </div>
      </div>
      
      {/* Global Accent Glow */}
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default DisplayCategoryWiseCourses;