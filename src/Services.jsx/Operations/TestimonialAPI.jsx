import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { TestimonialEndPoints } from "../apis";

const {ADD_TESTIMONIAL} = TestimonialEndPoints

export const addTestimonial = (formData, token , navigate) => async (dispatch) => {
  const toastId = toast.loading("Adding Testimonial...");

  try {
    const response = await apiConnector(
      "POST",
      ADD_TESTIMONIAL,
      formData,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Testimonial Added Successfully");
    navigate("/dashboard/AllTestimonilsListAndModify")

  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
};




// GET ALL TESTIMONIALS
export const getAllTestimonials = (page = 1, limit = 10, status = "All", token) => {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        "GET",
        `http://localhost:4000/api/v1/testimonial/getAllTestimonials?page=${page}&limit=${limit}&status=${status}`,
        null,
        { Authorization: `Bearer ${token}` }
      );

      dispatch({ type: "SET_TESTIMONIALS", payload: res.data.data });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch testimonials");
    }
  };
};

// DELETE TESTIMONIAL
export const deleteTestimonial = (testimonialId, token) => {
  return async (dispatch) => {
    try {
      await apiConnector(
        "DELETE",
        "http://localhost:4000/api/v1/testimonial/deleteTestimonial",
        { testimonialId },
        { Authorization: `Bearer ${token}` }
      );

      toast.success("Testimonial deleted");
      dispatch({ type: "DELETE_TESTIMONIAL", payload: testimonialId });
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete testimonial");
    }
  };
};





