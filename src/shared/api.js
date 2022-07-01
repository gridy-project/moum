import { instance } from "./axios";

export const login = async (data) => {
  return await instance.post(`/user/login`, data);
};

export const loginGoogle = async (credential) => {
  return await instance.post(`/user/social`, {}, {
    headers: { Credential: credential }
  });
};

export const register = async (data) => {
  return await instance.post(`/user/signup`, data)
};

export const loginRefresh = async (refreshToken) => {
  return await instance.post(`/user/refresh`, {}, {
    headers: { Authorization: `Bearer ${refreshToken}` }
  });
};

export const checkEmail = async (email) => {
  return await instance.get(`/user/emailDupCheck/${email}`)
};

export const checkNickname = async (nickname) => {
  return await instance.get(`/user/nameDupCheck/${nickname}`)
};