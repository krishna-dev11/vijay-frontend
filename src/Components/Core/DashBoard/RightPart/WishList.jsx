import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Tr, Td } from "react-super-responsive-table";
import { RiDeleteBin5Line } from "react-icons/ri";
// import { buyCourse } from "../../../../Services.jsx/Operations/PaymentAPI";
import { useNavigate } from "react-router-dom";
import { RemovedCousefromTheCart } from "../../../../Services.jsx/Operations/CartAPI";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const WishList = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(0);
  const [courseIds, setCourseIds] = useState([]);

  useEffect(() => {
    if (!user?.cart) return;

    const total = user.cart.reduce((acc, course) => acc + Number(course.price), 0);
    setTotalAmount(total);

    const ids = user.cart.map((course) => course._id);
    setCourseIds(ids);
  }, [user]);

  // const handleBuyCartCourses = async () => {
  //   if (!token || courseIds.length === 0) return;
  //   await buyCourse(token, courseIds, totalAmount, user, navigate, dispatch);
  // };

  const handleRemoveCourseFromCart = (id) => {
    dispatch(RemovedCousefromTheCart(id, user._id, token));
  };

  return (
    <div className="min-h-screen bg-[#000] text-white p-6 md:p-12 font-sans">

      {/* HEADER */}
      <div className="mb-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
          Dashboard / Wishlist
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-3">
          My <span className="text-yellow-400">Wishlist</span>
        </h2>
        <p className="text-gray-400 text-sm font-medium tracking-wide">
          {user?.cart?.length || 0} Courses Saved for Later
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative items-start">

        {/* COURSES TABLE SECTION */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-xl shadow-2xl">
          {!user?.cart?.length ? (
            <div className="p-20 flex flex-col items-center justify-center gap-4 text-gray-500">
              <RiDeleteBin5Line size={40} className="opacity-50" />
              <p className="text-lg font-medium tracking-wide">Your Wishlist is Empty</p>
              <button onClick={() => navigate('/courses')} className="mt-4 px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition text-sm font-bold tracking-wide">
                Browse Courses
              </button>
            </div>
          ) : (
            <Table className="w-full">
              <Tbody>
                {user.cart.map((course, index) => (
                  <Tr key={course._id} className={`border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300 ${index === user.cart.length - 1 ? 'border-none' : ''}`}>
                    
                    {/* IMAGE & INFO */}
                    <Td className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <img
                        src={course.thumbnail}
                        className="w-full md:w-48 h-32 object-cover rounded-2xl shadow-lg"
                        alt="course thumbnail"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="font-bold text-xl tracking-tight">{course.courseName}</p>
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                          {course.courseDescription}
                        </p>
                         <div className="flex gap-2 mt-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full text-gray-400">
                               {course.category?.name || "Development"}
                            </span>
                         </div>
                      </div>
                    </Td>

                    {/* ACTION & PRICE */}
                    <Td className="p-6 md:p-8 text-right">
                      <div className="flex flex-col gap-6 items-end h-full justify-between">
                        
                        <button
                          onClick={() => handleRemoveCourseFromCart(course._id)}
                          className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors group px-4 py-2 rounded-lg hover:bg-red-500/10"
                        >
                          <RiDeleteBin5Line className="group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-bold tracking-wide">Remove</span>
                        </button>

                        <div className="flex flex-col items-end">
                          <p className="text-3xl font-bold text-yellow-400 tracking-tight">
                            ₹ {course.price}
                          </p>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">One-time Payment</p>
                        </div>

                      </div>
                    </Td>

                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </div>

        {/* TOTAL CARD SUMMARY */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-10 h-fit sticky top-12 backdrop-blur-xl shadow-2xl lg:col-span-1">
          
          <div className="flex items-center gap-3 mb-8">
             <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
             <h3 className="text-lg font-bold tracking-tight uppercase">Order Summary</h3>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
               <p className="text-gray-400 text-sm font-medium">Subtotal</p>
               <p className="text-white font-bold">₹ {totalAmount}</p>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
               <p className="text-gray-400 text-sm font-medium">Tax & Fees</p>
               <p className="text-white font-bold">₹ 0</p>
            </div>
             <div className="flex justify-between items-center">
               <p className="text-white text-lg font-bold">Total Amount</p>
               <p className="text-4xl font-bold text-yellow-400 tracking-tight">₹ {totalAmount}</p>
            </div>
          </div>

          {/* <button
            disabled={!totalAmount}
            onClick={handleBuyCartCourses}
            className="w-full py-5 bg-yellow-400 text-black font-black rounded-2xl hover:bg-yellow-300 transition-all transform active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.2em] text-sm"
          >
            Checkout Now
          </button>
           
           <p className="text-center text-gray-500 text-xs mt-6 font-medium tracking-wide">
              Secure 256-bit SSL Encrypted Payment
           </p> */}
        </div>

      </div>
    </div>
  );
};

export default WishList;