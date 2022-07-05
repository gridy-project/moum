const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

const setToken = (accessTokenString, refreshTokenString) => {
  localStorage.setItem(ACCESS_TOKEN, accessTokenString);
  localStorage.setItem(REFRESH_TOKEN, refreshTokenString);
}

const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
}

const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
}

const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

export { setToken, getAccessToken, getRefreshToken, removeToken };