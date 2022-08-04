import { instance } from "shared/axios";

let refreshPromise = null;

export const apiUser = {
  signUp: ({ username, nickname, password, email, imageUrl }) => {
    return instance.post(`/user/signup`, {
      username,
      nickname,
      password,
      email,
      imgPath: imageUrl
    })
  },
  signIn: ({ username, password }) => {
    return instance.post(`/user/login`, { username, password });
  },
  signInSocial: ({ code }) => {
    return instance.post(`/user/social`, {}, { headers: { code } });
  },
  refresh: ({ refreshToken }) => {
    if (refreshPromise === null) {
      refreshPromise = instance.post(`/user/refresh`, {}, { headers: { RefreshToken: `Bearer ${refreshToken}` } }).then(token => {
        refreshPromise = null;
        return token;
      });
    }
    return refreshPromise;
  },
  executeCheckUsername: ({ username }) => {
    return instance.get(`/user/emailDupCheck/${username}`);
  },
  executeCheckNickname: ({ nickname }) => {
    return instance.get(`/user/nameDupCheck/${nickname}`);
  },
  executeFindUsername: ({ username }) => {
    return instance.post(`/find/username`, { email: username });
  },
  executeChangePasswordCode: ({ username, email }) => {
    return instance.post(`/email/sendResetPwCode`, { username, email });
  },
  executeChangePasswordCodeCheck: ({ email, code }) => {
    return instance.post(`/email/password/check`, { email, certification: code });
  },
  executeChangePassword: ({ email }) => {
    return instance.post(`/email/sendNewPw`, { email })
  },
  getUserProfile: () => {
    return instance.get(`/user/myProfile`);
  },
  getUserInfo: () => {
    return instance.get(`/user/myProfile`);
  }
}