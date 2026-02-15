// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Pagination, Autoplay } from "swiper/modules";
// import { useDispatch, useSelector } from "react-redux";
// import TestimonialCard from "./TestimonialCard";
// import { getAllTestimonials } from "../../../../Services.jsx/Operations/TestimonialAPI";

// const TestimonialSlider = () => {
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const { testimonials } = useSelector((state) => state.testimonial);

//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(getAllTestimonials(1, 10, "Active"));
//       setLoading(false);
//     };
//     fetchData();
//   }, [dispatch]);

//   if (loading) return <div className="text-white text-center py-20">Loading...</div>;

//   return (
//     <div className="px-6 py-20 bg-black min-h-screen">
//       {/* Section Header */}
//       <div className="max-w-7xl mx-auto flex items-center justify-between mb-12">
//         <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
//           Our Testimonials
//         </h2>
//       </div>

//       <div className="max-w-7xl mx-auto">
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={25}
//           loop={true}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//             1280: { slidesPerView: 4 },
//           }}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true, // 🔥 Yeh raha wo magic line!
//           }}
//           pagination={{ clickable: true, dynamicBullets: true }}
//           modules={[Pagination, Autoplay]}
//           className="testimonial-swiper"
//         >
//           {testimonials?.map((t) => (
//             <SwiperSlide key={t._id} className="pb-14">
//               <TestimonialCard data={t} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Pagination Dot Styling */}
//       <style jsx global>{`
//         .swiper-pagination-bullet { background: #444 !important; opacity: 1; }
//         .swiper-pagination-bullet-active { background: #fff !important; width: 20px; border-radius: 4px; }
//       `}</style>
//     </div>
//   );
// };

// export default TestimonialSlider;





import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import TestimonialCard from "./TestimonialCard";
import { getAllTestimonials } from "../../../../Services.jsx/Operations/TestimonialAPI";

const TestimonialSlider = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { testimonials } = useSelector((state) => state.testimonial);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllTestimonials(1, 10, "Active"));
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-white text-center py-20">Loading...</div>
    );

  if (!testimonials || testimonials.length === 0)
    return (
      <div className="text-white text-center py-20">
        No Testimonials Available
      </div>
    );

  return (
    <div className="px-6 py-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-12">
        <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
          Our Testimonials
        </h2>
      </div>

      <div className="max-w-7xl mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination, Autoplay]}
          className="testimonial-swiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t._id} className="pb-14">
              <TestimonialCard data={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialSlider;
