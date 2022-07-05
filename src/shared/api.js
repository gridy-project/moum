import { instance } from "./axios";

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