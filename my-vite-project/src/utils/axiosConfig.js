// axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/v1/", // Replace with your backend URL
  timeout: 5000, // Set a timeout
  headers: {
    "Content-Type": "application/json",
    // Add any required headers here
  },
});

// const getToken = () => {
//   const state = store.getState();
//   console.log("staate", state);
//   // Access the token from your Redux state structure

//   return state.organization.tokens.access.token;
//   // Adjust the path based on your Redux state structure
// };

// instance.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default instance;
