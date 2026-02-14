import React, { useEffect, useRef, useState } from "react";

const stats = [
  { count: 22, label: "Years of Experience", display: "22+" },
  { count: 5000, label: "Students Trained", display: "5000+" },
  { count: 90, label: "Confidence Improvement Rate", display: "90%" },
  { count: 100, label: "Practical Speaking Sessions", display: "100%" },
];

const AnimatedCounter = ({ target, display }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = target;
          const duration = 1200;
          const increment = end / (duration / 16);

          const counter = setInterval(() => {
            start += increment;
            if (start >= end) {
              setValue(end);
              clearInterval(counter);
            } else {
              setValue(Math.floor(start));
            }
          }, 16);

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
  }, [target]);

  return (
    <h2 ref={ref} className="text-white text-5xl font-bold">
      {display}
    </h2>
  );
};

const SocialStats = () => {
  return (
    <div className="relative bg-black py-16 overflow-hidden">
      {/* DOT GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#1A1A1A 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-8">
        <div className="flex flex-wrap justify-center gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-[#0f0f10] border border-white/5 rounded-2xl px-10 py-8 
              min-w-[220px] text-center transition-all duration-300 
              hover:bg-[#141415] hover:border-indigo-500/40"
            >
              <AnimatedCounter target={item.count} display={item.display} />
              <p className=" text-richblack-25 text-sm mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM GLOW LINE */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-indigo-500/30 blur-[0.5px]"></div>
    </div>
  );
};

export default SocialStats;
