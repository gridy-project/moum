import { useMutation, useQuery } from "react-query";
import { apiUser } from "utils/api/user";

export function useGetUserProfileMine (option) {
  return useQuery([`/mine/profile`], () => apiUser.getUserProfile(), option);
}

export function useExecuteLogin(option) {
  return useMutation(apiUser.signIn, option);
}