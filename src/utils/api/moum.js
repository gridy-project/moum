import { instance } from "shared/axios";

export const getMoumMineAllAxios = () => instance.post("/folders/0/all", [{ category: "전체" }]);
export const getMoumMineByOptionsAxios = ({ keyword, categories, sort }) => {
  if (sort) {
    return instance.post(`/folders/0/${keyword}?sort=folderOrder,asc`, categories.length === 0 ? [{ category: "전체" }] : categories);
  } else {
    return instance.post(`/folders/0/${keyword}`, categories);
  }
};
export const addMoumAxios = (data) => instance.post("/folder", data);
export const changeMoumOrder = (moveFolderId, afterFolderOrder) => instance.post(`/folders`, { folderId: moveFolderId, afterOrder: afterFolderOrder });
export const getPieceMineAllAxios = (folderId) => instance.post(`/boards/0/${folderId}/all`, [{ category: "전체" }]);
export const getPieceMineByOptionsAxios = (folderId, { keyword, categories }) => instance.post(`/boards/0/${folderId}/${keyword}`, categories);