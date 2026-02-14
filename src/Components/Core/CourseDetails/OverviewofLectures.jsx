// import React from "react";
import { IoIosTv, IoMdArrowDropdown } from "react-icons/io";
import { FiClock, FiPlayCircle } from "react-icons/fi";

const OverviewofLectures = ({ data }) => {
  
  // Logic to calculate duration for each section
  function calculateSectionDuration(sectionData) {
    let totalSeconds = 0;
    sectionData?.subSections?.forEach((sub) => {
      const duration = parseFloat(sub.timeDuration);
      if (!isNaN(duration)) {
        totalSeconds += duration;
      }
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
  }

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full flex flex-col border border-[#ffffff]/10 rounded-2xl overflow-hidden bg-[#ffffff]/[0.02] backdrop-blur-sm">
      {data.map((section) => (
        <details key={section._id} className="group border-b border-[#ffffff]/5 last:border-none">
          
          {/* Section Header */}
          <summary className="flex justify-between items-center px-6 py-5 cursor-pointer list-none hover:bg-[#ffffff]/[0.03] transition-all">
            <div className="flex gap-x-4 items-center">
              <IoMdArrowDropdown 
                className="text-[#6b7280] group-open:rotate-180 transition-transform duration-300" 
                size={22} 
              />
              <p className="text-sm font-bold tracking-tight text-[#ffffff] uppercase">
                {section.sectionName}
              </p>
            </div>
            
            <div className="flex gap-x-6 items-center">
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#10b981]">
                <FiPlayCircle />
                <span>{section.subSections?.length} Lectures</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#4b5563]">
                <FiClock />
                <span>{calculateSectionDuration(section)}</span>
              </div>
            </div>
          </summary>

          {/* Sub-sections (Lectures) */}
          <div className="bg-[#000000]/40">
            {section.subSections?.map((subSection) => (
              <div 
                className="flex flex-col sm:flex-row justify-between py-4 px-8 sm:px-14 items-start sm:items-center border-t border-[#ffffff]/5 hover:bg-[#ffffff]/[0.02] transition-colors" 
                key={subSection._id}
              >
                <div className="flex gap-x-4 items-start">
                  <IoIosTv className="text-[#10b981] mt-1 shrink-0" size={18} /> 
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-[#e5e7eb]">{subSection.title}</p>
                    {subSection.description && (
                      <p className="text-[#6b7280] text-[11px] leading-relaxed max-w-[500px]">
                        {subSection.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mt-2 sm:mt-0 ml-9 sm:ml-0 text-[10px] font-mono text-[#4b5563] bg-[#ffffff]/5 px-2 py-1 rounded">
                  {subSection.timeDuration}s
                </div>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
};

export default OverviewofLectures;