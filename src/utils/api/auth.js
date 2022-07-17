import { capsule, instance } from "shared/axios";


export const executeSignInAxios = (data) => instance.post(`/user/login`, data);
export const executeSignUpAxios = (data) => instance.post(`/user/signup`, data);
export const executeSignInWithGoogleAxios = (code) => instance.post(`/user/social`, {}, { headers: { Code: code } });
export const executeCheckEmailAxios = (username) => instance.get(`/user/emailDupCheck/${username}`);
export const executeCheckNickAxios = (nickname) => instance.get(`/user/nameDupCheck/${nickname}`);
export const executeTokenRefreshAxios = (refreshToken) => instance.post(`/user/refresh`, {}, { headers: { RefreshToken: `Bearer ${refreshToken}` } });