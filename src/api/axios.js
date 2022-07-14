import axios from "axios";
import { refresh, tokenRefresh } from "./auth";
import { getAccessToken, getRefreshToken, removeToken, setToken } from "../shared/localStorage";

// library : sweetAlert

const SUCCESS = true;
const FAILED = false;
export const requestAxios = async (func) => {
  try {
    const response = await func();
    return { result: SUCCESS, data: response.data };
  } catch (err) {
    console.log("에러");
    console.log(err);
    return { result: FAILED, data: err.response.data };
  }
}

export const instance = axios.create({
  // baseURL: "http://15.164.165.106"
  baseURL: "http://13.125.137.133/"
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {

    const {
      config,
      response: { status },
    } = error;
    if (status === 402) { // 토큰이 헤더에 없음 : 402
      window.location.replace("/");
    }
    if (status === 406) { // 변질된 토큰 : 406
      removeToken();
      window.location.replace("/");
    }
    const originalRequest = config;
    if (status === 410 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (originalRequest.url !== "/user/refresh") {
        const token = getRefreshToken();
        if (token) {
          try {
            const response = await tokenRefresh(token);
            console.log("토큰 자동 리프레시 성공");
            setToken(response.data.accessToken, response.data.refreshToken);
            return instance(originalRequest);
          } catch (err) {
            console.log("토큰 갱신 실패");
            removeToken();
            window.location.replace("/");
          }
        }
      }
    }
    return Promise.reject(error);
  },
);