import axios from "axios";
import { executeTokenRefreshAxios } from "utils/api/auth";
import { getAccessToken, getRefreshToken, removeToken, setToken } from "shared/localStorage";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_IP
  // baseURL: process.env.REACT_APP_HTTPS_SERVER_DOMAIN
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
      const data = { ...config.data }
      if (config.data.statusCode === 200) {
        data.result = true;
      } else {
        data.result = false;
      }
      data.status = config.data.statusCode;
      data.message = config.data.message;
      if (config.data?.content) {
        data.data = config.data.content;
      }

      return data;
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
            setToken(response.data.accessToken, response.data.refreshToken);
            return instance(originalRequest);
          } catch (err) {
            removeToken();
            window.location.replace("/");
          }
        }
      }
    }
    // return ({ result: false, data: error.response.data, error });
    return Promise.reject({ result: false, data: error.response.data, error });
  },
);