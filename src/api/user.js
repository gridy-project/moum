import { instance, requestAxios } from "./axios";

// React Query
export const getUserInfo = () => requestAxios(() => instance.get(`/user/profile`));
export const getUserInfoForMoum = (id) => requestAxios(() => instance.get(`/user/profile/${id}`));