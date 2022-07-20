import { instance } from "shared/axios";

export const apiCommon = {
  uploadImage: (data) => instance.post(`/board/image`, data),
}