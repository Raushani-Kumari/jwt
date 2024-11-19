const TOKEN_KEY = 'token';
const TOKEN_EXPIRY_KEY = 'tokenExpiry';
const REFRESH_TOKEN = 'refreshToken';
const REFRESH_EXPIRY_KEY = 'refreshTokenExpiry'; 


export const saveTokenWithExpiry = (token, refreshToken) => {

  const tokenExpiryTime = Date.now()+ 2* 60 * 1000; 
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(TOKEN_EXPIRY_KEY, tokenExpiryTime);


  const refreshExpiryTime = Date.now() + 7 * 24 * 60 * 60 * 1000; 
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(REFRESH_EXPIRY_KEY, refreshExpiryTime);
};


export const getTokenWithExpiry = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);

  console.log("access token expiry in gettokenexppiury", expiryTime)
  if (token || expiryTime || Date.now() > expiryTime) {
    console.log("returning token from gettoken with expiry", token);
    return token; 
  }
  console.log("Access Token expired or not found");
  return null;

};

export const getRefreshTokenWithExpiry = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  const refreshExpiryTime = localStorage.getItem(REFRESH_EXPIRY_KEY);
  console.log("refreshexpirytime in gettokenwithexpiry", refreshExpiryTime)

  if (refreshToken || refreshExpiryTime || Date.now() > refreshExpiryTime) {
    console.log("returning token from getrefreshtoken with expiry", refreshExpiryTime)
    return refreshToken; 
  }
  console.log("Refresh Token expired or not found");
  return null;
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(REFRESH_EXPIRY_KEY);
};
