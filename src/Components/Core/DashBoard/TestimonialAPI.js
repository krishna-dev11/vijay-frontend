import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";

export const addTestimonial = (formData, token) => async () => {
  const toastId = toast.loading("Adding Testimonial...");

  try {
    const response = await apiConnector(
      "POST",
      "http://localhost:4000/api/v1/testimonial/addTestimonial",
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
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
};
