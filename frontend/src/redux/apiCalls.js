import { publicRequest } from "../requestMethod.js";
// import toast, { Toaster } from "react-hot-toast";

import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./authSlice.js";

export const login = async (dispatch, auth) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", auth);
    dispatch(loginSuccess(res.data));  // Ensure this is correctly defined
    return res.data;
  } catch (error) {
    dispatch(loginFailure()); // Ensure this is correctly defined
    console.error("Login API Error:", error.response);
    return { error: error.response?.data?.message || "Login failed." };
  }
};


export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(registerFailure());
    return { error: error.response.data.message };
  }
};
