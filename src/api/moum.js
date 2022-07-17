import { instance } from "./axios";

export const axiosGetCategories = async () => await instance.get("/folders/0");
export const axiosGetCategoriesInFolder = async (folderId) => await instance.get(`/boards/0/${folderId}`);
export const axiosGetMoumMineAll = async () => await instance.post("/folders/0/all", [{ category: "전체" }]);
export const axiosGetMoumMineByOptions = async ({ keyword, categories, sort }) => {
  if (sort) {
    return await instance.post(`/folders/0/${keyword}?sort=folderOrder,asc`, categories.length === 0 ? [{ category: "전체" }] : categories);
  } else {
    return await instance.post(`/folders/0/${keyword}`, categories);
  }
};
export const axiosGetPieceMineAll = async (folderId) => await instance.post(`/boards/0/${folderId}/all`, [{ category: "전체" }]);
export const axiosGetPieceMineByOptions = async (folderId, { keyword, categories }) => {
  return await instance.post(`/boards/0/${folderId}/${keyword}`, categories);
}
export const axiosAddMoum = (data) => instance.post("/folder", data);