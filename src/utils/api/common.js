import { instance } from "shared/axios";

export const apiCommon = {
  uploadImage: (data) => instance.post(`/image`, data),
}