import { instance } from "shared/axios";

export const getMoumMineAllAxios = (page) => instance.post(`/folders/0/all?page=${page}`, [{ category: "전체" }]);
export const getMoumMineByOptionsAxios = ({ keyword, categories, sort, page }) => {
  if (sort) {
    return instance.post(`/folders/0/${keyword}?page=${page}&sort=folderOrder,asc`, categories.length === 0 ? [{ category: "전체" }] : categories);
  } else {
    return instance.post(`/folders/0/${keyword}?page=${page}`, categories);
  }
};
export const addMoumAxios = (data) => instance.post("/folder", data);
export const changeMoumOrder = (moveFolderId, afterFolderOrder) => instance.post(`/folders`, { folderId: moveFolderId, afterOrder: afterFolderOrder });
export const getPieceMineAllAxios = (folderId, sort) => {
  // /boards2/{userId}/{folderId}/{keyword}/{sort}
  // const queryString = `/boards2/0/${folderId}/all` + (sort ? "?sort=boardOrder,asc" : "");
  const queryString = `/boards2/0/${folderId}/all/${sort ? "b" : "a"}`;
  return instance.post(queryString, [{ category: "전체" }]);
};
export const getPieceMineByOptionsAxios = (folderId, { keyword, categories, sort }) => {
  // const queryString = `/boards2/0/${folderId}/${keyword}` + (sort ? "?sort=boardOrder,asc" : "");
  const queryString = `/boards2/0/${folderId}/${keyword}/${sort ? "b" : "a"}`;
  return instance.post(queryString, categories);
};