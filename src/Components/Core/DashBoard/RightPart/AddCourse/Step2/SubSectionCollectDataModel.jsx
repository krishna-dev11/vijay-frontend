import React from "react";
import { useForm } from "react-hook-form";
import { FiX, FiVideo, FiFileText } from "react-icons/fi";
import Upload from "../Step1/Upload";
import { useDispatch, useSelector } from "react-redux";
import { SetaddSubSection, SeteditSubSection, SetviewSubSection } from "../../../../../../Slices/SubSection";
import { AddNewSubSection, EditSubSection } from "../../../../../../Services.jsx/Operations/DashBoard";

const SubSectionCollectDataModel = () => {
  const dispatch = useDispatch();
  const { addSubSection, editSubSection, viewSubSection } = useSelector(state => state.subsection);
  const { sectionId } = useSelector(state => state.section);
  const { token } = useSelector(state => state.auth);
  const { course } = useSelector(state => state.Course);
  // const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      subSectionName: viewSubSection?.title || editSubSection?.title || "",
      description: viewSubSection?.description || editSubSection?.description || "",
      lectureVideo: viewSubSection?.videoUrl || editSubSection?.videoUrl || ""
    }
  });

  const onFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("subSectionName", data.subSectionName);
    formData.append("description", data.description);
    formData.append("lectureVideo", data.subSectionLectureVideo);
    formData.append("courseId", course._id);

    if (editSubSection) {
      formData.append("SubSectionId", editSubSection._id);
      dispatch(EditSubSection(formData, token));
    } else {
      formData.append("sectionId", sectionId);
      dispatch(AddNewSubSection(formData, token));
    }
    closeModal();
  };

  const closeModal = () => {
    dispatch(SetaddSubSection(null)); dispatch(SeteditSubSection(null)); dispatch(SetviewSubSection(null));
  };

  const inputStyle = "w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm focus:border-emerald-500/30 outline-none transition-all";
  const labelStyle = "text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block ml-1";

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-3xl overflow-hidden animate-fadeSlideUp relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
        
        <div className="p-8 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-2">
            <FiVideo className="text-emerald-400" />
            <h3 className="text-lg font-bold text-white">{addSubSection ? "Entry Protocol" : "Lecture Metadata"}</h3>
          </div>
          <button onClick={closeModal} className="text-gray-500 hover:text-white transition-colors"><FiX size={20} /></button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-8 flex flex-col gap-6">
          <Upload name="subSectionLectureVideo" label="Source Video" register={register} setValue={setValue} errors={errors} video={true} />
          
          <label>
            <span className={labelStyle}>Entry Title</span>
            <input type="text" placeholder="Title of the lesson" {...register("subSectionName", { required: true })} className={inputStyle} />
          </label>

          <label>
            <span className={labelStyle}>Description Protocol</span>
            <textarea rows={3} placeholder="Lesson details..." {...register("description", { required: true })} className={`${inputStyle} resize-none`} />
          </label>

          {!viewSubSection && (
            <button type="submit" className="w-full py-4 bg-white text-black font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95">
              {editSubSection ? "Update Entry" : "Initialize Lecture"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionCollectDataModel;