// // import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import CourseCard from "./CourseCard";
// import { Pagination, Navigation, Keyboard, Autoplay } from "swiper/modules"; 
// import "../../../App.css";

// const CourseSlider = ({ data , speed , count}) => {  
//   // console.log(data);

//   return (
//     <div>
//       {data.length > 0 ? (
//         <Swiper
//           className=" "
//           slidesPerView={ count ? count : 3}
//           spaceBetween={10}
//           loop={true}
//           grabCursor={true}
//           direction="horizontal" 
//           pagination={{ clickable: true }}
//           autoplay={{ 
//             delay: speed ? speed : 2500, 
//             disableOnInteraction: false,
//           }}
//           modules={[Pagination, Navigation, Keyboard , Autoplay ]} 
//         >
//           {data.map((course) => (
//             <SwiperSlide key={course._id}>
//               <CourseCard data={course} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <div className="   bg-white/10 backdrop-blur-md  border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] py-10 rounded-md justify-center flex items-center text-3xl  font-inter font-semibold ">Courses Not Found</div>
//       )}
//     </div>
//   );
// };

// export default CourseSlider;



import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CourseCard from "./CourseCard";
import { Pagination, Navigation, Keyboard, Autoplay } from "swiper/modules"; 
import "../../../App.css";

const CourseSlider = ({ data, speed, count }) => {   
  return (
    <div className="w-full">
      {data.length > 0 ? (
        <Swiper
          className="mySwiper"
          // Default Swiper settings
          loop={true}
          grabCursor={true}
          direction="horizontal" 
          pagination={{ clickable: true }}
          autoplay={{ 
            delay: speed ? speed : 2500, 
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Keyboard, Autoplay]} 
          
          // --- BREAKPOINTS: NO CHANGE TO LAPTOP UI ---
          breakpoints={{
            // 1. Mobile (Small screens)
            0: {
              slidesPerView: 1.1, // Thoda sa dusra card dikhega taaki user ko lage ki scroll ho sakta hai
              spaceBetween: 15,
            },
            // 2. Tablet (Medium screens)
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // 3. Laptop/Desktop (Tera Original Logic 100% untouched)
            1024: {
              slidesPerView: count ? count : 3,
              spaceBetween: 10,
            }
          }}
        >
          {data.map((course) => (
            <SwiperSlide key={course._id} className="pb-12"> 
              {/* pb-12 added for pagination dots visibility on mobile */}
              <CourseCard data={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] py-10 rounded-md justify-center flex items-center text-xl md:text-3xl font-inter font-semibold text-white">
          Courses Not Found Node
        </div>
      )}
    </div>
  );
};

export default CourseSlider;