import axios from "axios";
import { getTokenWithExpiry, isTokenExpired } from "../utils/tokenUtil";
export const getAxiosClient = () => {
  const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: { "Content-Type": "application/json" },
  });
  // Add a request interceptor
  instance.interceptors.request.use(
    async function (config) {
      // Do something before request is sent
    //   if (isTokenExpired()) {
    //     await refreshToken();
    //   }
      const token = getTokenWithExpiry();
      console.log("config from req interceptor : ", config);
      config.headers["Authorization"] = `Bearer ${token}`; // Replace 'YOUR_TOKEN' with your actual token
      config.headers["Content-Type"] = "application/json"; // Add other headers as needed return config;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log("interceptor error", originalRequest?._retry)

      if (error.response.status === 401 && !originalRequest?._retry) {
      console.log("interceptor error 401 ")

        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const response = await instance.post("/refresh-token", {
              refreshToken,
            });
            console.log("response after interceptor called........", response)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            // originalRequest.headers[
            //   "Authorization"
            // ] = `Bearer ${response.data.token}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
