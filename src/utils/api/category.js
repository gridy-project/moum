import { instance } from "shared/axios";

export const getCategoryAxios = async (folderId) => {
  if (folderId === 0) {
    const response = await instance.get(`/folders/${folderId}`);
    return response.data;
  } else {
    const response = await instance.get(`/boards/0/${folderId}`);
    return response.data;
  }
}