import axios from "axios";
import { getTokenWithExpiry } from "../utils/tokenUtil";
import {
  REFRESH_EXPIRY_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_EXPIRY_KEY,
  TOKEN_KEY,
} from "../config/appConfig";

export const getAxiosClient = () => {
  const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: { "Content-Type": "application/json" },
  });
  // Add a request interceptor
  instance.interceptors.request.use(
    async function (config) {
      console.debug("Request Retry Status: ", config.url, config._retry);

      const token = getTokenWithExpiry();
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Adding a response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.debug(
        "originalRequest Retry Status: ",
        originalRequest.url,
        originalRequest._retry
      );
      if (
        error.response.status === 401 &&
        !originalRequest?._retry &&
        originalRequest.url !== "/refresh-token"
      ) {
        console.log("Access Token has Expired.");
        originalRequest._retry = true;
        try {
          console.log("Using Refresh token to generate new Access Token.");
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const response = await instance.post("/refresh-token", {
              refreshToken,
            });
            localStorage.setItem(TOKEN_KEY, response.data.token);
            localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
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
