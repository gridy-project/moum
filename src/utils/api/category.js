import { instance } from "shared/axios";

export const getCategoryAxios = (folderId) => {
  if (folderId === 0) {
    return getCategoryFolderAxios(folderId);
  } else {
    return getCategoryBoardAxios(folderId);
  }
}

export const getCategoryFolderAxios = (folderId) => instance.get(`/folders/${folderId}`);
export const getCategoryBoardAxios = (folderId) => instance.get(`/boards/0/${folderId}`);