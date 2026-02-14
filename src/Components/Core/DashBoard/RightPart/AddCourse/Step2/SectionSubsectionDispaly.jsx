import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit3, FiTrash2, FiChevronDown, FiPlus, FiPlayCircle, FiMoreVertical } from "react-icons/fi";
import { SetaddSubSection, SeteditSubSection, SetviewSubSection } from "../../../../../../Slices/SubSection";
import { SetEditSection, SetsectionId } from "../../../../../../Slices/Section";
import { DeleteSection, DeleteSubSection } from "../../../../../../Services.jsx/Operations/DashBoard";
import ConfirmationModal from "../../../../../Common/ConfirmationModal";
import toast from "react-hot-toast";

const SectionSubsectionDispaly = () => {
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(null);
  const { course } = useSelector((state) => state.Course);
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col gap-4">
      {course?.courseContent?.map((section) => (
        <details key={section._id} className="group bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden transition-all hover:bg-white/[0.04]">
          <summary className="list-none cursor-pointer p-5 flex items-center justify-between group-open:bg-emerald-500/5 transition-all">
            <div className="flex items-center gap-3">
              <FiChevronDown className="text-gray-500 group-open:rotate-180 transition-transform" />
              <p className="font-bold text-white tracking-tight">{section.sectionName}</p>
            </div>
            <div className="flex items-center gap-4 border-l border-white/5 pl-4">
              <button onClick={() => dispatch(SetEditSection(section))} className="text-gray-500 hover:text-emerald-400 transition-colors">
                <FiEdit3 size={16} />
              </button>
              <button 
                onClick={() => setDeleteModal({
                  heading: "Terminate Section?",
                  text1: "All lessons inside this section will be wiped.",
                  button1Text: "Confirm", button2Text: "Cancel",
                  btn1Onclick: () => {
                    if(section.subSections?.length > 0) return toast.error("Section not empty!");
                    dispatch(DeleteSection({ sectionId: section._id, courseId: course._id }, token));
                    setDeleteModal(null);
                  },
                  btn2Onclick: () => setDeleteModal(null)
                })}
                className="text-gray-600 hover:text-red-400 transition-colors"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </summary>

          <div className="p-6 pt-2 flex flex-col gap-2">
            {section?.subSections?.map((sub) => (
              <div key={sub._id} className="flex items-center justify-between bg-white/5 border border-white/5 p-4 rounded-2xl group/sub hover:border-emerald-500/30 transition-all">
                <div onClick={() => dispatch(SetviewSubSection(sub))} className="flex items-center gap-3 cursor-pointer flex-1">
                  <FiPlayCircle className="text-emerald-400 opacity-50 group-hover/sub:opacity-100" />
                  <span className="text-sm text-gray-300 font-light">{sub.title}</span>
                </div>
                <div className="flex items-center gap-3 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                  <button onClick={() => dispatch(SeteditSubSection(sub))} className="text-gray-500 hover:text-white"><FiEdit3 size={14} /></button>
                  <button onClick={() => dispatch(DeleteSubSection({ subSectionId: sub._id, sectionId: section._id, courseId: course._id }, token))} className="text-gray-500 hover:text-red-400"><FiTrash2 size={14} /></button>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => { dispatch(SetaddSubSection(true)); dispatch(SetsectionId(section._id)); }}
              className="mt-2 flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-300 transition-colors ml-2"
            >
              <FiPlus /> New Lecture Entry
            </button>
          </div>
        </details>
      ))}
      {deleteModal && <ConfirmationModal data={deleteModal} />}
    </div>
  );
};

export default SectionSubsectionDispaly;