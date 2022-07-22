import axios from "axios";
import { executeTokenRefreshAxios } from "utils/api/auth";
import { getAccessToken, getRefreshToken, removeToken, setToken } from "shared/localStorage";

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_TWO_IP
  baseURL: process.env.REACT_APP_SERVER_IP
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
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    if (config.data?.statusCode) {
      console.log(config.data);
      if (config.data?.statusCode === 200) {
        alert(config.data.message)
        return { result: true, status: config.data.statusCode, message: config.data.massage, data: config.data.content }
      } else {
        alert(config.data.message)
        return { result: false, status: config.data.statusCode, message: config.data.massage }
      }
    } else {
      return { result: true, data: config.data, response: config };
    }
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
            const response = await executeTokenRefreshAxios(token);
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
    return Promise.reject({ result: false, data: error.response.data, error });
  },
);