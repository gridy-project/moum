import { instance } from "../shared/axios";

const SUCCESS = "SUCCESS";
const FAILED = "FAILED";
export const signIn = async (data) => {
  try {
    const response = await instance.post(`/user/login`, data);
    return { result: SUCCESS, data: response.data };
  } catch (err) {
    return { result: FAILED, data: err.response.data };
  }
};

export const signUp = async (data) => {
  try {
    const response = await instance.post(`/user/login`, data);
    return { result: SUCCESS, data: response.data };
  } catch (err) {
    return { result: FAILED, data: err.response.data };
  }
}

export const signInWithGoogle = async (code) => {
  try {
    const response = await instance.post(`/user/social`, {}, {
      headers: { Code: code }
    });
    return { result: SUCCESS, data: response.data };
  } catch (err) {
    return { result: FAILED, data: err.response.data };
  }
};

export const refresh = async (refreshToken) => {
  try {
    const response = await instance.post(`/user/refresh`, {}, {
      headers: { RefreshToken: `Bearer ${refreshToken}` }
    });
    return { result: SUCCESS, data: response.data };
  } catch (err) {
    return { result: FAILED, data: err.response.data };
  }
}