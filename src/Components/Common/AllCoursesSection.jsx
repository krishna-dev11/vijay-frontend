import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseSlider from "../Core/Catalog/CourseSlider";

const AllCoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${BASE_URL}/course/getAllCoursesFullDetails`
      );

      if (response.data.success) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-green-400/20 border-t-green-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full bg-black text-white py-20 px-6">

      {/* Heading */}
      <div className="max-w-7xl mx-auto flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">
            Explore Courses
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Learn from best spoken English & personality programs
          </p>
        </div>
      </div>

      {/* Slider */}
      <div className="max-w-7xl mx-auto">
        <CourseSlider data={courses} />
      </div>

    </div>
  );
};

export default AllCoursesSection;