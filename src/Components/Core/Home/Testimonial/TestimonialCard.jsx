// import React, { useRef } from "react";

// const TestimonialCard = ({ data }) => {
//   const videoRef = useRef(null);

//   const handleMouseEnter = () => {
//     if (videoRef.current) {
//       // FIX: Ensure it stays muted so the browser allows autoplay on hover
//       videoRef.current.muted = true;

//       // Best Practice: Handle the promise returned by play()
//       // This prevents errors if the user hovers on/off quickly
//       var playPromise = videoRef.current.play();

//       if (playPromise !== undefined) {
//         playPromise.catch((error) => {
//           console.log("Playback prevented or interrupted usually by rapid hovering:", error);
//         });
//       }
//     }
//   };

//   const handleMouseLeave = () => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//       // Optional: Reset to start if you want it to restart next hover
//       videoRef.current.currentTime = 0;
//     }
//   };

//   return (
//     <div
//       className="group relative bg-[#0a0a0a] border border-white/[0.08] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       // Optional: Add click to unmute
//       onClick={() => {
//          if(videoRef.current) videoRef.current.muted = !videoRef.current.muted
//       }}
//     >
//       {/* 9:16 Video Container - Exact like image frame */}
//       <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#111] rounded-t-[2.5rem]">
//         <video
//           ref={videoRef}
//           src={data.mediaUrl}
//           className="w-full h-full object-cover"
//           // Ensure muted is present by default here
//           muted
//           playsInline
//           loop
//         />

//         {/* Subtle Overlay Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

//         {/* Optional: Add a visual cue that sound is muted/available */}
//          <div className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
//            {/* You could add a mute/speaker icon here */}
//            <span className="text-white text-xs">Click for Sound</span>
//         </div>
//       </div>

//       {/* INFO AREA - Matching WGMI Style */}
//       <div className="p-6 bg-black">
//         <div className="flex flex-col gap-1">
//           {/* Student Name (Like WGMI Jam/3D Title) */}
//           <h3 className="text-white font-bold text-xl tracking-tight uppercase">
//             {data.studentName}
//           </h3>

//           {/* Message/Bio (Like Price Info) */}
//           <p className="text-gray-500 text-sm leading-snug line-clamp-2">
//             {data.message}
//           </p>

//           {/* Rating with Purple Icon (Matching the Diamond icon style) */}
//           <div className="flex items-center gap-2 mt-3">
//             <span className="text-[#a855f7] text-xs">◆</span>
//             <span className="text-gray-400 text-xs font-semibold tracking-widest">
//               {data.rating} / 5 RATING
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestimonialCard;






import React, { useRef } from "react";

const TestimonialCard = ({ data }) => {
  const videoRef = useRef(null);

  // Desktop Hover
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // ✅ Mobile Touch Support (IMPORTANT FIX)
  const handleTouchStart = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleTouchEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group relative bg-[#0a0a0a] border border-white/[0.08] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => {
        if (videoRef.current) {
          videoRef.current.muted = !videoRef.current.muted;
        }
      }}
    >
      {/* 9:16 Video Container */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#111] rounded-t-[2.5rem]">
        <video
          ref={videoRef}
          src={data.mediaUrl}
          className="w-full h-full object-cover"
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
          webkit-playsinline="true"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        <div className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-xs">Click for Sound</span>
        </div>
      </div>

      {/* INFO AREA */}
      <div className="p-6 bg-black">
        <div className="flex flex-col gap-1">
          <h3 className="text-white font-bold text-xl tracking-tight uppercase">
            {data.studentName}
          </h3>

          <p className="text-gray-500 text-sm leading-snug line-clamp-2">
            {data.message}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-[#a855f7] text-xs">◆</span>
            <span className="text-gray-400 text-xs font-semibold tracking-widest">
              {data.rating} / 5 RATING
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
