import { useMutation, useQuery } from "react-query";
import { apiUser } from "utils/api/user";

export function useGetUserProfileMine (option) {
  return useQuery([`mine/profile`], () => apiUser.getUserProfile(), option);
}

export function useExecuteLogin(option) {
  return useMutation(apiUser.signIn, option);
}

export function useExecuteLoginSocial(option) {
  return useMutation(apiUser.signInSocial, option);
}

export function useExecuteChangePasswordCode (option) {
  return useMutation(apiUser.executeChangePasswordCode, option);
}

export function useExecuteChangePasswordCodeCheck (option) {
  return useMutation(apiUser.executeChangePasswordCodeCheck,option);
}

export function useExecuteChangePassword (option) {
  return useMutation(apiUser.executeChangePassword, option);
}

export function useExecuteCheckUsername (option) {
  return useMutation(apiUser.executeCheckUsername, option);
}

export function useExecuteCheckNickname (option) {
  return useMutation(apiUser.executeCheckNickname, option);
}