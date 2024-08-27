import axios from "axios";
import toast from "react-hot-toast";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    toast.success("Logged In");
  } catch (e) {
    dispatch({ type: "LOGIN_FAILURE", payload: e });
    toast.error("Login failed. Please check your credentials.");
  }
};
