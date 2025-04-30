import axios from "axios";

const BASE_URL = "https://blog-app-backend-vjwy.onrender.com/api";

console.log("Base URL:", BASE_URL);

export const signup = (data) => {
  return axios
    .post(`${BASE_URL}/auth/register`, data)
    .then((res) => res.data) // Return response data
    .catch((err) => {
      console.error("Signup error:", err.response?.data || err.message);
      throw err; // Re-throw the error for further handling
    });
};

export const login = (data) => {
  return axios
    .post(`${BASE_URL}/auth/login`, data)
    .then((res) => res.data) // Return response data
    .catch((err) => {
      console.error("Login error:", err.response?.data || err.message);
      throw err; // Re-throw the error for further handling
    });
};
