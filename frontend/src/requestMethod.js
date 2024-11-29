import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_BACKEND_BASEURL}/api/`;

let TOKEN;
try {
  const rootData = localStorage.getItem("persist:root");

  if (rootData) {
    const authData = JSON.parse(rootData).auth;
    TOKEN = JSON.parse(authData)?.currentUser?.accessToken;
  }
} catch (error) {
  console.error("Error parsing JSON:", error);
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

