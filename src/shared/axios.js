import axios from "axios";
import { refresh } from "../api/auth";
import { getAccessToken, getRefreshToken, setToken } from "./localStorage";

// library : sweetAlert

export const instance = axios.create({
  baseURL: "http://13.124.160.57/"
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

// 로그인 컴포넌트 -> 인터셉터가 아니라 API 요청 에러가 나온경우 처리를 하는 방향을 생각해보기
instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {

    const {
      config,
      response: { status },
    } = error;
    if (status === 403) { // 액세스 토큰이 실패한 경우, 토큰이 없는 경우
      if (error.response.data.message.slice(0, 11) === 'JWT expired') {
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
      }
    }
    return Promise.reject(error);
  },
);