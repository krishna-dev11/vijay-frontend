import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setLoading } from "../../Slices/Auth";
import { WalkINEndPoints } from "../apis";
import { setWalkIns } from "../../Slices/WalkInSlice";

// Destructure all endpoints properly
const { 
  ADD_WALKIN_API, 
  CONVERT_WALKIN, 
  UPDATE_STATUS,
  GET_ALL_WALKINS
} = WalkINEndPoints;

/* ======================================================
   1️⃣ ADD WALK-IN STUDENT
====================================================== */

export function addWalkInStudent(formData, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Adding Walk-in Student...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        ADD_WALKIN_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Walk-in student added successfully");
    } catch (error) {
      console.log("Error in addWalkInStudent:", error);
      toast.error(error?.response?.data?.message || "Failed to add walk-in");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

/* ======================================================
   2️⃣ GET ALL WALK-INS  ✅ (THIS WAS MISSING)
====================================================== */

export function getAllWalkIns(token, filters = {}) {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching Walk-ins...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_WALKINS,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        filters
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to fetch walk-ins");
      }

      dispatch(setWalkIns(response.data.data)); // ✅ IMPORTANT FIX

      toast.success("Walk-ins loaded");

    } catch (error) {
      console.log("getAllWalkIns error:", error);
      toast.error(error.message || "Failed to fetch walk-ins");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


/* ======================================================
   3️⃣ CONVERT WALK-IN TO ENROLLMENT
====================================================== */

export function convertWalkInToEnrollment(walkInId, payload, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Converting walk-in...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        `${CONVERT_WALKIN}/${walkInId}`,
        payload,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      toast.success("Converted Successfully");
      navigate("/dashboard/walkins");

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}



/* ======================================================
   4️⃣ MARK WALK-IN AS NOT INTERESTED
====================================================== */

export function markWalkInNotInterested(walkInId, reason, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating status...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "PUT",
        `${UPDATE_STATUS}/${walkInId}`,
        {
          status: "Not Interested",
          notInterestedReason: reason,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to update status");
      }

      toast.success("Marked as Not Interested");
      navigate("/dashboard/walkins");

    } catch (error) {
      console.log("markWalkInNotInterested error:", error);
      toast.error(error.message || "Failed to update status");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
