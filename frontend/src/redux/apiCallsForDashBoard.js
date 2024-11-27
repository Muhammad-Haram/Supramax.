import { publicRequest, userRequest } from "../requestMethod.js";
// import { loginFailure, loginStart, loginSuccess } from "./authSlice.js";
import {
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
} from "./productSlice.js";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  // updateUserFailure,
  // updateUserStart,
  // updateUserSuccess,
} from "./userSlice.js";

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

export const deleteProducts = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProducts = async (id, product, dispatch) => {
  console.log(id, product, "api calls");
  dispatch(updateProductStart());
  try {
    const response = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, product }));
  } catch (error) {
    console.log(error);
    dispatch(updateProductFailure());
  }
};

export const addProducts = async (product, dispatch) => {
  dispatch(addProductStart());
  console.log("Product Data Sent to API:", product); // Add this line
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message); // Add this line
    dispatch(addProductFailure());
  }
};


// get user

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailure());
  }
};

export const deleteUsers = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};
