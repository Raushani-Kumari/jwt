import axios from "axios";
import {
  clearToken,
  getRefreshTokenWithExpiry,
  getTokenWithExpiry,
  saveTokenWithExpiry,
} from "../utils/tokenUtil";

const api_path = "http://localhost:8080/api";

export const register = async ({ username, email, password }) => {
  try {
    const response = await axios.post(`${api_path}/register`, {
      username,
      email,
      password,
    });
    console.log(response.data);
  } catch (error) {
    console.log("error", error);
    if (error.response && error.response.status === 400) {
      alert("User already exists. Please try with a different email.");
    }
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${api_path}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response from login auth service");
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};
export const isAuthenticated = () => {
  return !!getToken();
};

export const removeLoginToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const apiRequest = async (endpoint, method = "GET", data = null) => {
  const accessToken = getTokenWithExpiry();
  const refreshToken = getRefreshTokenWithExpiry();

  console.log("accesstoken expiry: ", accessToken);
  console.log("refresh token expiry : ", refreshToken);
  if (!accessToken) {
    throw new Error("No valid access token found. Please log in.");
  }

  const config = {
    method,
    url: `${api_path}${endpoint}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    const response = await axios(config);
    console.log("response data when apirequest called", response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401 && refreshToken) {
      console.log("Access token expired. Attempting to refresh token...");
      try {
        const refreshResponse = await axios.post(`${api_path}/refresh-token`, {
          refreshToken,
        });
        const {
          token: newAccessToken,
          refreshToken: newRefreshToken,
          tokenExpiry,
          refreshTokenExpiry,
        } = refreshResponse.data;

        console.log("New access token:", newAccessToken);
        console.log("New refresh token:", newRefreshToken);

        saveTokenWithExpiry(
          newAccessToken,
          newRefreshToken,
          tokenExpiry,
          refreshTokenExpiry
        );

        config.headers.Authorization = `Bearer ${newAccessToken}`;
        const retryResponse = await axios(config);
        console.log("retry responsewith data", retryResponse.data);
        return retryResponse.data;
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        clearToken();
        throw new Error("Session expired. Please log in again.");
      }
    }

    throw error;
  }
};

// for validation , sending this token to backend and checking if it is a valid one or not.
// if valid -> then it will return theuser data along will the role
// else return error code
// sending this
export const fetchToken = async () => {
  const response = await fetch(`${api_path}/validate-token`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }
  const data = await response.json();
  console.log("user data after validating it from backnd api", data);
  return data;
};

export const fetchCurrentUser = async (token) => {
  if (!token) {
    token = getTokenWithExpiry();
  }
  const response = await fetch(`${api_path}/me`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("User not found");
  }
  const fetchedUser = await response.json();
  console.log("user data fetched ", fetchedUser);
  return fetchedUser;
};
