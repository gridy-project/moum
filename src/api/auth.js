import { instance, requestAxios } from "./axios";

export const signIn = (data) => requestAxios(() => instance.post(`/user/login`, data));
export const signUp = (data) => requestAxios(() => instance.post(`/user/login`, data));
export const signInWithGoogle = (code) => requestAxios(
  () => instance.post(`/user/social`, {}, { headers: { Code: code } })
);
export const refresh = (refreshToken) => requestAxios(
  () => instance.post(`/user/refresh`, {}, {
    headers: { RefreshToken: `Bearer ${refreshToken}` }
  })
);