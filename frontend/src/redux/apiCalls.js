import { publicRequest } from "../requestMethod.js";
import toast, { Toaster } from 'react-hot-toast';

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
    dispatch(loginSuccess(res.data));
    toast.success('Login Successful');
  } catch (error) {
    dispatch(loginFailure());
    toast.error('Login Failed');
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    toast.success('Registration Successful');
  } catch (error) {
    dispatch(registerFailure());
    toast.error('Registration Failed');
  }
};
