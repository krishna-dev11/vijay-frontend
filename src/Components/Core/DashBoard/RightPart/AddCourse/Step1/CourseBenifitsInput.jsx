// import React, { useEffect, useState } from "react";
// import { FiX, FiCheck } from "react-icons/fi";
// import { useSelector } from "react-redux";

// const CourseBenifitsInput = ({ name, lable, register, setValue, errors }) => {
//   const [Chip, setChip] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const { editCourse, course } = useSelector((state) => state.Course);

//   useEffect(() => {
//     if (editCourse) setChip(course.whatYouWillLearn || []);
//     register(name, { required: true, validate: (v) => v.length > 0 });
//   }, []);

//   useEffect(() => {
//     setValue(name, Chip);
//   }, [Chip]);

//   const addChip = () => {
//     const val = inputValue.trim();
//     if (val && !Chip.includes(val)) {
//       setChip([...Chip, val]);
//       setInputValue("");
//     }
//   };

//   const handleKeyUp = (e) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       addChip();
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <label>
//         <span className="text-[10px] font-bold uppercase text-gray-500 mb-2 block">
//           {lable}
//         </span>

//         <input
//           type="text"
//           placeholder="Add benefit & hit Enter"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyUp={handleKeyUp}
//           onBlur={addChip}
//           className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm"
//         />
//       </label>

//       <div className="flex flex-wrap gap-2">
//         {Chip.map((c, i) => (
//           <div key={i} className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl">
//             <FiCheck className="text-emerald-400 text-xs" />
//             <span className="text-xs text-emerald-200">{c}</span>
//             <FiX onClick={() => setChip(Chip.filter((_, idx) => idx !== i))} />
//           </div>
//         ))}
//       </div>

//       {errors[name] && (
//         <p className="text-red-500 text-[10px] font-bold">
//           Selection Required
//         </p>
//       )}
//     </div>
//   );
// };

// export default CourseBenifitsInput;









import React, { useEffect, useState, useRef } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import { useSelector } from "react-redux";

const CourseBenifitsInput = ({ name, lable, register, setValue, errors }) => {
  const [Chip, setChip] = useState([]);
  const inputRef = useRef(null); // 🔥 uncontrolled input
  const { editCourse, course } = useSelector((state) => state.Course);

  useEffect(() => {
    if (editCourse) setChip(course.whatYouWillLearn || []);
    register(name, { required: true, validate: (v) => v.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, Chip);
  }, [Chip, name, setValue]);

  const addChip = (value) => {
    const val = value.trim();
    if (val && !Chip.includes(val)) {
      setChip([...Chip, val]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip(e.target.value);
      e.target.value = "";
    }
  };

  // 🔥 Mobile comma support
  const handleChange = (e) => {
    const val = e.target.value;
    if (val.endsWith(",")) {
      addChip(val.slice(0, -1));
      e.target.value = "";
    }
  };

  // 🔥 Blur support (mobile best UX)
  const handleBlur = () => {
    const val = inputRef.current.value;
    if (val) {
      addChip(val);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label>
        <span className="text-[10px] font-bold uppercase text-gray-500 mb-2 block">
          {lable}
        </span>

        <input
          ref={inputRef} // 🔥 uncontrolled
          type="text"
          placeholder="Add benefit & hit Enter"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        {Chip.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl"
          >
            <FiCheck className="text-emerald-400 text-xs" />
            <span className="text-xs text-emerald-200">{c}</span>
            <FiX
              className="cursor-pointer"
              onClick={() => setChip(Chip.filter((_, idx) => idx !== i))}
            />
          </div>
        ))}
      </div>

      {errors[name] && (
        <p className="text-red-500 text-[10px] font-bold">
          Selection Required
        </p>
      )}
    </div>
  );
};

export default CourseBenifitsInput;