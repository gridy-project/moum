import { instance } from "shared/axios";

export const apiCategory = {
  getCategories: ({ userId = 0, folderId }) => {
    if (folderId === 0) {
      return instance.get(`/folders/${folderId}`);
    } else {
      return instance.get(`/boards/${userId}/${folderId}`);
    }
  }
}