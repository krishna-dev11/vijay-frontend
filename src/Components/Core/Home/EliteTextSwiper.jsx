import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";


const slides = [
  {
    protocol: "Academy Protocol Active",
    main: "Vijayvargiya's",
    grad: "",
    quote: "Where your words transform into authority.",
  },
  {
    protocol: "Elite Protocol Active",
    main: "Personality",
    grad: "Development",
    quote: "Engineers of confidence, architects of your persona.",
  },
  {
    protocol: "Craft Protocol Active",
    main: "Artistic",
    grad: "Handwriting",
    quote: "Leave a mark that speaks even before you do.",
  },
  {
    protocol: "Fluent Protocol Active",
    main: "Public",
    grad: "Speaking",
    quote: "Break the barriers of hesitation, sync with the global node.",
  },
];

const EliteTextSwiper = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="w-full flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.9, y: 15, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, y: -15, filter: "blur(12px)" }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col items-center text-center px-4"
        >
          {/* Tagline - Refined size */}
          {/* <div className="flex items-center gap-3 mb-3">
             <div className="h-[1px] w-5 bg-[#10b981]" />
             <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#10b981]">
               {slides[current].protocol}
             </span>
             <div className="h-[1px] w-5 bg-[#10b981]" />
          </div> */}

          {/* Heading - Slightly smaller (5xl instead of 7xl) */}
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-[#ffffff] uppercase leading-[0.95] mb-3">
            {slides[current].main}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#ffffff] to-[#6A0DAD] animate-gradientMove bg-300%">
              {slides[current].grad}
            </span>
          </h1>

          {/* Quote - Scaled down for balance */}
          <p className="text-[#6b7280] text-xs md:text-base font-light italic tracking-wide max-w-md opacity-70">
            "{slides[current].quote}"
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Progress Sync Dots */}
      <div className="flex gap-2.5 mt-6">
        {slides.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-[1.5px] cursor-pointer transition-all duration-700 rounded-full ${
              current === idx ? "w-10 bg-[#10b981]" : "w-5 bg-[#ffffff]/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default EliteTextSwiper;