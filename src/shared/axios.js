import axios from "axios";
import { refresh } from "../api/auth";
import { getAccessToken, getRefreshToken, removeToken, setToken } from "./localStorage";

export const instance = axios.create({
  baseURL: "http://3.35.55.104/"
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

    // const {
    //   config,
    //   response: { status },
    // } = error;
    // if (status === 500) {
    //   if (error.response.data.code === 'expired') {
    //     const originalRequest = config;
    //     const token = getRefreshToken();
    //     const { result, data } = await refresh(token);
    //     // 새로운 토큰 저장
    //     dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
    //     originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
    //     // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
    //     return axios(originalRequest);
    //   }
    // }
    return Promise.reject(error);
  },
);