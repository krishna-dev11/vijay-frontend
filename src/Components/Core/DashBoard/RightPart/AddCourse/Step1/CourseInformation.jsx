import React, { useEffect} from "react";
import { useForm } from "react-hook-form";
import { FiInfo, FiSettings, FiArrowRight, FiZap, FiCalendar, FiClock, FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { CreateNewCourse, EditCourse, GetAllCategories } from "../../../../../../Services.jsx/Operations/DashBoard";
import CustomTagInput from "./CustomTagInput";
import CustomInstructionsInput from "./CustomInstructionsInput";
import Upload from "./Upload";
import { COURSE_STATUS } from "../../../../../../Utilities/Constaints";
import CourseBenifitsInput from "./CourseBenifitsInput";
// import toast from "react-hot-toast";

const CourseInformation = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.Category);
  const { editCourse, course } = useSelector((state) => state.Course);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  // ================= 1. FIX: DATA PRE-FILLING LOGIC =================
  useEffect(() => {
    // Categories hamesha load karo
    dispatch(GetAllCategories(token));

    // Jab course data Redux mein aa jaye, tab setValue trigger karo
    if (editCourse && course) {
      setValue("CourseTitle", course.courseName);
      setValue("CourseDescription", course.courseDescription);
      setValue("CoursePrice", course.price);
      setValue("CourseCategory", course.category?._id || course.category);
      setValue("CourseTag", course.tag);
      setValue("CourseBenefits", course.whatYouWillLearn);
      setValue("CourseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
      
      // Batch Fields Pre-filling
      setValue("isOfflineBatch", !!course.isOfflineBatch);
      setValue("batchStartDate", course.batchStartDate?.split("T")[0] || "");
      setValue("batchEndDate", course.batchEndDate?.split("T")[0] || "");
      setValue("batchTiming", course.batchTiming || "");
      setValue("maxSeats", course.maxSeats || "");
      setValue("batchStatus", course.batchStatus || "Upcoming");
      setValue("enrollmentOpen", course.enrollmentOpen ?? true);
    }
  }, [dispatch, token, editCourse, course, setValue]); // Course dependency yahan fix hai

  // Watch offline status for conditional UI
  const isOffline = watch("isOfflineBatch");

  // ================= 2. SUBMIT HANDLER (FormData Protocol) =================
  const onFormSubmit = async (data) => {
    const formData = new FormData();

    // Core Identity
    formData.append("courseName", data.CourseTitle);
    formData.append("courseDescription", data.CourseDescription);
    formData.append("price", data.CoursePrice);
    formData.append("category", data.CourseCategory);
    
    // Array Protocols (Stringified)
    formData.append("tag", JSON.stringify(data.CourseTag));
    formData.append("whatYouWillLearn", JSON.stringify(data.CourseBenefits));
    formData.append("instructions", JSON.stringify(data.CourseRequirements));

    // File Protocol Check
    if (data.courseImage instanceof FileList) {
      formData.append("thumbnailImage", data.courseImage[0]);
    } else {
      formData.append("thumbnailImage", data.courseImage);
    }

    // Offline Deployment Logic
    formData.append("isOfflineBatch", data.isOfflineBatch ? "true" : "false");
    if (data.isOfflineBatch) {
      formData.append("batchStartDate", data.batchStartDate);
      formData.append("batchEndDate", data.batchEndDate);
      formData.append("batchTiming", data.batchTiming);
      formData.append("maxSeats", data.maxSeats);
      formData.append("batchStatus", data.batchStatus);
      formData.append("enrollmentOpen", data.enrollmentOpen);
    }

    if (editCourse) {
      formData.append("courseId", course._id);
      dispatch(EditCourse(formData, token));
    } else {
      formData.append("status", COURSE_STATUS.DRAFT);
      dispatch(CreateNewCourse(formData, token));
    }
  };

  // Styles
  const inputStyle = "w-full bg-[#ffffff]/[0.03] border border-[#ffffff]/5 rounded-2xl px-5 py-3 text-[#ffffff] placeholder-[#4b5563] focus:border-[#10b981]/30 focus:outline-none transition-all text-sm";
  const labelStyle = "text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b7280] ml-1 mb-2 block";

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-10 max-w-5xl mx-auto pb-20 animate-fadeIn">
      
      {/* SECTION 1: GENERAL METADATA */}
      <div className="bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-8 rounded-[2.5rem] backdrop-blur-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/5 blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-8">
           <FiInfo className="text-[#10b981]" />
           <h3 className="text-xl font-bold tracking-tight text-[#ffffff] uppercase">General Metadata</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <label>
            <span className={labelStyle}>Course Title</span>
            <input type="text" placeholder="e.g. Elite Fluency Masterclass" {...register("CourseTitle", { required: true })} className={inputStyle} />
          </label>
          <label>
            <span className={labelStyle}>Curriculum Architecture (Description)</span>
            <textarea rows={4} placeholder="Describe the transformation protocol..." {...register("CourseDescription", { required: true })} className={`${inputStyle} resize-none`} />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label>
              <span className={labelStyle}>Price (INR)</span>
              <input type="number" placeholder="₹ 4999" {...register("CoursePrice", { required: true })} className={inputStyle} />
            </label>
            <label>
              <span className={labelStyle}>Category Node</span>
              <select {...register("CourseCategory", { required: true })} className={`${inputStyle} appearance-none cursor-pointer`}>
                <option value="" disabled>Choose Domain</option>
                {category.map(cat => <option key={cat._id} value={cat._id} className="bg-[#0a0a0a] text-white">{cat.name}</option>)}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* SECTION 2: BATCH CONFIGURATION */}
      <div className="bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-8 rounded-[2.5rem] backdrop-blur-2xl">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
             <FiSettings className="text-[#6A0DAD]" />
             <h3 className="text-xl font-bold tracking-tight text-[#ffffff] uppercase">Batch Protocol</h3>
           </div>
           <label className="flex items-center gap-3 cursor-pointer group">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b7280] group-hover:text-[#ffffff]">Offline Deployment</span>
              <div className="relative">
                <input type="checkbox" {...register("isOfflineBatch")} className="sr-only peer" />
                <div className="w-11 h-6 bg-[#ffffff]/10 rounded-full peer peer-checked:bg-[#10b981] transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#ffffff] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-lg" />
              </div>
           </label>
        </div>

        {isOffline && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeSlideUp">
            <label>
              <span className={labelStyle}><FiCalendar className="inline mr-1" /> Start Date</span>
              <input type="date" {...register("batchStartDate")} className={inputStyle} />
            </label>
            <label>
              <span className={labelStyle}><FiCalendar className="inline mr-1" /> End Date</span>
              <input type="date" {...register("batchEndDate")} className={inputStyle} />
            </label>
            <label>
              <span className={labelStyle}><FiClock className="inline mr-1" /> Timing Slot</span>
              <input type="text" placeholder="e.g. 06:00 PM - 08:00 PM" {...register("batchTiming")} className={inputStyle} />
            </label>
            <label>
              <span className={labelStyle}><FiUsers className="inline mr-1" /> Max Scholars</span>
              <input type="number" placeholder="40" {...register("maxSeats")} className={inputStyle} />
            </label>
            <label>
              <span className={labelStyle}>Status</span>
              <select {...register("batchStatus")} className={inputStyle}>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
            <label className="flex items-center gap-3 mt-8">
               <input type="checkbox" {...register("enrollmentOpen")} className="w-5 h-5 rounded border-[#ffffff]/10 bg-transparent checked:bg-[#10b981]" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffffff]">Enrollment Active</span>
            </label>
          </div>
        )}
      </div>

      {/* SECTION 3: MEDIA & TAGS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="lg:col-span-2 bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#6A0DAD]/5 blur-3xl rounded-full" />
          <div className="relative z-10">
             <span className={labelStyle}>Visual Identity (Thumbnail)</span>
<Upload 
  name="courseImage" 
  label="Thumbnail" 
  register={register} 
  setValue={setValue} 
  errors={errors} 
  // ─── ADD THIS LINE ───
  viewData={editCourse ? course?.thumbnail : null} 
/>
          </div>
        </div>

        <div className="bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
          <span className={labelStyle}>Indexing Tags</span>
          <CustomTagInput name="CourseTag" register={register} errors={errors} setValue={setValue} getValues={getValues} />
        </div>

        <div className="bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
          <span className={labelStyle}>Transformation Benefits</span>
          <CourseBenifitsInput name="CourseBenefits" register={register} errors={errors} setValue={setValue} getValues={getValues} />
        </div>
      </div>

      {/* SECTION 4: REQUIREMENTS */}
      <div className="bg-[#ffffff]/[0.02] border border-[#ffffff]/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
        <CustomInstructionsInput name="CourseRequirements" label="Candidate Requirements" register={register} errors={errors} setValue={setValue} getValues={getValues} />
      </div>

      {/* ACTION AREA */}
      <div className="flex justify-end pt-10">
        <button type="submit" className="group flex -translate-x-12  items-center gap-3 px-12 py-5 bg-[#ffffff] text-[#000000] font-bold rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:bg-[#10b981] transition-all uppercase tracking-[0.2em] text-[10px] active:scale-95">
          {editCourse ? "Sync Updates" : "Initialize Node"}
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  );
};

export default CourseInformation;



// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { FaRupeeSign } from "react-icons/fa";
// import { apiConnector } from "../../../../../../Services.jsx/apiConnector";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { CreateNewCourse, EditCourse, GetAllCategories } from "../../../../../../Services.jsx/Operations/DashBoard";
// import CustomTagInput from "./CustomTagInput";
// import CustomInstructionsInput from "./CustomInstructionsInput";
// import Upload from "./Upload";
// import { COURSE_STATUS } from "../../../../../../Utilities/Constaints";
// import CourseBenifitsInput from "./CourseBenifitsInput";

// const CourseInformation = () => {

//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const {token} = useSelector(state=>state.auth)
//     const {category} = useSelector(state=>state.Category)
//     const {editCourse , course} = useSelector(state=>state.Course)
//     // console.log(course)


//   const {
//     register,
//     reset,
//     handleSubmit,
//     setValue,
//     getValues,
//     formState: { errors, isSubmitSuccessful },
//   } = useForm();

//   useEffect(()=>{
//      const getAllCategories = async()=>{
//          try{
//             dispatch(GetAllCategories(token))
//          }catch(error){
//             console.log(error)
//          }
//      }

//      if(editCourse){
//       setValue("CourseTitle" , course.courseName)
//       setValue("CourseDescription" , course.courseDescription )
//       setValue("CoursePrice" , course.price)
//       setValue("CourseCategory" , course.category)
//       setValue("CourseTag" , course.tag)
//       setValue("CourseBenefits" , course.whatYouWillLearn)
//       setValue("CourseRequirments" ,  course.instructions )
//       setValue("courseImage" , course.thumbnail)
//      }

//      getAllCategories()


//   },[])

//   const isFormUpdated = ()=>{
//     const currentValues = getValues()
//     if(currentValues.CourseTitle !== course.courseName    ||
//        currentValues.CourseDescription !== course.courseDescription ||
//        currentValues.CoursePrice !== course.price ||
//        currentValues.CourseCategory._id !== course.category._id    ||
//        currentValues.CourseTag  !== course.tag     ||
//        currentValues.CourseBenefits !== course.whatYouWillLearn     ||
//        currentValues.CourseRequirments  !== course.instructions     ||
//        currentValues.CourseThumnail  !== course.thumbnailImage   ||
//        currentValues.isOfflineBatch !== course.isOfflineBatch ||
// currentValues.batchStartDate !== course.batchStartDate ||
// currentValues.batchEndDate !== course.batchEndDate ||
// currentValues.batchTiming !== course.batchTiming ||
// currentValues.maxSeats !== course.maxSeats ||
// currentValues.batchStatus !== course.batchStatus ||
// currentValues.enrollmentOpen !== course.enrollmentOpen 
//     ){
//       return true
//     }
//     return false
//   }


//   const submitHandler = async(event)=>{

//     // console.log(event , "event")

//     // edit Course
//  if(editCourse){
//   setValue("CourseTitle" , course.courseName)
//   setValue("CourseDescription" , course.courseDescription )
//   setValue("CoursePrice" , course.price)
//   setValue("CourseCategory" , course.category)
//   setValue("CourseTag" , course.tag)
//   setValue("CourseBenefits" , course.whatYouWillLearn)
//   setValue("CourseRequirments" ,  course.instructions )
//   setValue("courseImage" , course.thumbnail)

//   // ✅ NEW BATCH FIELDS (Edit case)
//   setValue("isOfflineBatch", course.isOfflineBatch ?? false)
//   setValue("batchStartDate", course.batchStartDate || "")
//   setValue("batchEndDate", course.batchEndDate || "")
//   setValue("batchTiming", course.batchTiming || "")
//   setValue("maxSeats", course.maxSeats || "")
//   setValue("batchStatus", course.batchStatus || "Upcoming")
//   setValue("enrollmentOpen", course.enrollmentOpen ?? true)
// }


//     // console.log(event , "event")

// // create new Course
//      const formData = new FormData()
//      formData.append("courseName" , event.CourseTitle)
//      formData.append("courseDescription" , event.CourseDescription)
//      formData.append("price" , event.CoursePrice)
//      formData.append("category" , event.CourseCategory)
//      formData.append("tag" , JSON.stringify(event.CourseTag))
//      formData.append("whatYouWillLearn" , JSON.stringify(event.CourseBenefits))
//     //  formData.append("whatYouWillLearn" , event.CourseBenefits)
//      formData.append("instructions" , JSON.stringify(event.CourseRequirments))
//      formData.append("thumbnailImage" , event.courseImage)
//      formData.append("status" , COURSE_STATUS.DRAFT)
//      formData.append("isOfflineBatch", event.isOfflineBatch)
// formData.append("batchStartDate", event.batchStartDate || "")
// formData.append("batchEndDate", event.batchEndDate || "")
// formData.append("batchTiming", event.batchTiming || "")
// formData.append("maxSeats", event.maxSeats || "")
// formData.append("batchStatus", event.batchStatus || "Upcoming")
// formData.append("enrollmentOpen", event.enrollmentOpen)


//      try{
//        dispatch(CreateNewCourse(formData , token))
//      }catch(error){
//        console.log("unable to send FormData data")
//      }

//   }

//   return (
//     <form onSubmit={handleSubmit(submitHandler)} className=" w-[95%] bg-richblack-800 rounded-md border border-richblack-700 h-full mx-auto flex flex-col gap-y-4 py-5">

//       <label className=" w-[93%] mx-auto">
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 ">
//           Couser Title<sup className="text-pink-200">*</sup>
//         </p>
//         <input
//           type="text"
//           placeholder="Enter Course Title"
//           {...register("CourseTitle" , {
//             required:{
//                 value:true,
//                 message:"Please provide course title carefully"
//             }
//           })}
//           style={{
//             boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//           }}
//           className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 placeholder:translate-x-5 text-richblack-5"
//         />
//       </label>

//       <label className=" w-[93%] mx-auto">
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//         Course Short Description<sup className="text-pink-200">*</sup>
//         </p>
//         <textarea
//           placeholder="Enter Description"
//           {...register("CourseDescription" , {
//             required:{
//                 value:true,
//                 message:"Please provide course Description carefully"
//             }
//           })}
//           style={{
//             boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//           }}
//           className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 text-richblack-5"
//         />
//       </label>

//       <label className=" w-[93%] mx-auto relative">
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 ">
//         Price<sup className="text-pink-200">*</sup>
//         </p>
//         <input
//           type="text"
//           placeholder="Enter Price"
//           {...register("CoursePrice" , {
//             required:{
//                 value:true,
//                 message:"Please provide course Price carefully"
//             }
//           })}
//           style={{
//             boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//           }}
//           className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder:px-8 placeholder-gray-500 text-richblack-5"
//         />
//         <div className=" absolute p-1 rounded-full border flex justify-center items-center top-9 left-2 border-richblack-400">
//         <FaRupeeSign fill="#6e727f"/>
//         </div>
//       </label>

//       <label className=" relative w-[93%] mx-auto">
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 ">
//         Category<sup className="text-pink-200">*</sup>
//         </p>
//         <select
//           style={{
//             boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//           }}
//           className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder:px-8 placeholder-gray-500 text-richblack-5"
//           {...register("CourseCategory" , {
//             required:{
//                 value:true,
//                 message:"Please Specify the Category "
//             }
//           })}
//           >
//             <option disabled>Choose a Category</option>
//             {
//               category.map(cat=>(
//                 <option key={cat._id} value={cat._id}>{cat.name}</option>
//               ))
//             }
//         </select>
//       </label>

//       <div className=" w-[93%] mx-auto ">
//       <CustomTagInput 
//              name="CourseTag"
//              lable="Tags"
//              Placeholder="Enter Tag and Press Enter"
//              register={register}
//              errors={errors}
//              setValue = {setValue}
//              getValues = {getValues} 
//              />
//       </div>



//       <div className=" w-[93%] mx-auto ">
//       <CourseBenifitsInput
//              name="CourseBenefits"
//              lable="Benefits of the course"
//              Placeholder="Enter Benefits of the course"
//              register={register}
//              errors={errors}
//              setValue = {setValue}
//              getValues = {getValues} 
//              />
//       </div>

//       {/* <label className=" w-[93%] mx-auto">
//         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//         Benefits of the course<sup className="text-pink-200">*</sup>
//         </p>
//         <textarea
//           placeholder="Enter Benefits of the course"
//           {...register("CourseBenefits" , {
//             required:{
//                 value:true,
//                 message:"Please provide course Benefits carefully"
//             }
//           })}
//           style={{
//             boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//           }}
//           className="w-full rounded-[0.5rem] bg-richblack-700  p-[10px] placeholder-gray-500 text-richblack-5"
//         />
//       </label> */}


// {/* ================= NEW BATCH / OFFLINE DETAILS ================= */}

// <div className="w-[93%] mx-auto bg-richblack-800 border border-richblack-700 rounded-md p-4 flex flex-col gap-y-4">

//   <p className="text-richblack-5 font-semibold">Batch / Offline Details</p>

//   {/* Is Offline Batch */}
//   <label className="flex items-center gap-x-3">
//     <input
//       type="checkbox"
//       {...register("isOfflineBatch")}
//       className="w-5 h-5"
//     />
//     <span className="text-richblack-5">Is this an Offline Batch?</span>
//   </label>

//   <div className="flex justify-between gap-x-4">
//     <label className="w-[48%]">
//       <p className="text-richblack-5">Batch Start Date</p>
//       <input
//         type="date"
//         {...register("batchStartDate")}
//         className="w-full rounded-[0.5rem] bg-richblack-700 p-[10px] text-richblack-5"
//       />
//     </label>

//     <label className="w-[48%]">
//       <p className="text-richblack-5">Batch End Date</p>
//       <input
//         type="date"
//         {...register("batchEndDate")}
//         className="w-full rounded-[0.5rem] bg-richblack-700 p-[10px] text-richblack-5"
//       />
//     </label>
//   </div>

//   <label>
//     <p className="text-richblack-5">Batch Timing (e.g. 6:00 PM - 8:00 PM)</p>
//     <input
//       type="text"
//       placeholder="Enter batch timing"
//       {...register("batchTiming")}
//       className="w-full rounded-[0.5rem] bg-richblack-700 p-[10px] text-richblack-5"
//     />
//   </label>

//   <label>
//     <p className="text-richblack-5">Maximum Seats</p>
//     <input
//       type="number"
//       placeholder="Enter max seats"
//       {...register("maxSeats")}
//       className="w-full rounded-[0.5rem] bg-richblack-700 p-[10px] text-richblack-5"
//     />
//   </label>

//   <label>
//     <p className="text-richblack-5">Batch Status</p>
//     <select
//       {...register("batchStatus")}
//       className="w-full rounded-[0.5rem] bg-richblack-700 p-[10px] text-richblack-5"
//     >
//       <option value="Upcoming">Upcoming</option>
//       <option value="Ongoing">Ongoing</option>
//       <option value="Completed">Completed</option>
//     </select>
//   </label>

//   <label className="flex items-center gap-x-3">
//     <input
//       type="checkbox"
//       {...register("enrollmentOpen")}
//       className="w-5 h-5"
//     />
//     <span className="text-richblack-5">Enrollment Open?</span>
//   </label>
// </div>



//     <div className="w-[93%]  mx-auto">
//     <Upload
//         name="courseImage"
//         label="Course Thumbnail"
//         register={register}
//         setValue={setValue}
//         errors={errors}
//         // editData={editCourse ? course?.thumbnail : null}
//       />
//     </div>

//     <div className=" w-[93%] mx-auto ">
//     <CustomInstructionsInput
//              name="CourseRequirments"
//              label="Requirements/Instructions"
//              Placeholder="Add Requirments"
//              register={register}
//              errors={errors}
//              setValue = {setValue}
//              getValues = {getValues} />
//     </div>

//       <button type="submit" className=" px-4 py-2 rounded-md bg-yellow-50 self-end mr-5 ">{editCourse ? "Save Edits" : "Next"}</button>

//     </form>
//   );
// };

// export default CourseInformation;