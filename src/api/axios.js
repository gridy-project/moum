import axios from "axios";
import { refresh } from "./auth";
import { getAccessToken, getRefreshToken, setToken } from "../shared/localStorage";

// library : sweetAlert

const SUCCESS = true;
const FAILED = false;
export const requestAxios = async (func) => {
  try {
    const response = await func();
    return { result: SUCCESS, data: response.data };
  } catch (err) {
    console.log(err);
    return { result: FAILED, data: err.response.data };
  }
}

export const instance = axios.create({
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
    if (status === 402) {
      window.location.replace("/");
    }
    if (status === 403 || status === 401) { // 만료된 토큰 : 403 , 변질된 토큰 : 401, 토큰 없음 : 402
      const originalRequest = config;
      const token = getRefreshToken();
      if (token) {
        const { result, data } = await refresh(token);
        if (result) {
          console.log("SUCCESS");
          setToken(data.accessToken, data.refreshToken);
          return instance(originalRequest);
        }
      } else {
        window.location.replace("/");
      }
    } else if (status === 500) {

    }
    return Promise.reject(error);
  },
);