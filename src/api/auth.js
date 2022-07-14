import { instance } from "./axios";

export const signIn = (data) => instance.post(`/user/login`, data);
export const signUp = (data) => instance.post(`/user/login`, data);
export const signInWithGoogle = (code) => instance.post(`/user/social`, {}, { headers: { Code: code } });
export const tokenRefresh = (refreshToken) => instance.post(`/user/refresh`, {}, { headers: { RefreshToken: `Bearer ${refreshToken}` } });