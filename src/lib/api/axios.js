import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth_token");
    
    console.log("Interceptor running - Token:", token);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Added Authorization header:", config.headers.Authorization);
    }
    
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error); 
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("401 error - removing token and redirecting"); 
      Cookies.remove("auth_token");
      
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;