import { REFRESH_EXPIRY_KEY, REFRESH_TOKEN_KEY, TOKEN_EXPIRY_KEY, TOKEN_KEY } from "../config/appConfig";


export const saveTokenWithExpiry = (token, refreshToken) => {
  const tokenExpiryTime = Date.now() + 2 * 60 * 1000;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, tokenExpiryTime);

  const refreshExpiryTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(REFRESH_EXPIRY_KEY, refreshExpiryTime);
};

export const isTokenExpired = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
  return token && expiryTime && Date.now() > expiryTime;
};

export const getTokenWithExpiry = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);

  if (token && expiryTime && Date.now() > expiryTime) {
    return token;
  }
  console.debug("Access Token expired or not found");
  return null;
};

export const getRefreshTokenWithExpiry = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const refreshExpiryTime = localStorage.getItem(REFRESH_EXPIRY_KEY);
  if (refreshToken && refreshExpiryTime && Date.now() > refreshExpiryTime) {
    return refreshToken;
  }
  console.debug("Refresh Token has expired or not found.");
  return null;
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_EXPIRY_KEY);
};
