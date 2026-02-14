import toast from "react-hot-toast";
import { setUser } from "../../Slices/Profile";
import { apiConnector } from "../apiConnector";
import { InstallmentEndPoints } from "../apis";

const {ADD_INSTALLMENT} = InstallmentEndPoints

export function addInstallmentAPI( payload, token ,  navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        ADD_INSTALLMENT,
        payload,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      // console.log(payload)

      // console.log(response.data.userdata)

                  dispatch(setUser(response.data.userdata))
                  localStorage.setItem("user" , JSON.stringify(response.data.userdata))

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Installment Added");
      navigate("/dashboard/my-profile");

    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || "Failed");
      toast.error(error.response?.data?.message || "Failed")
    }
  };
}
