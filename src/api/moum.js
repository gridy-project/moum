import { instance } from "./axios";

export const axiosGetMoumMineAll = async () => await instance.post("/folders/0/all", [{ category: "전체" }]);
export const axiosGetMoumMineByOptions = async ({ keyword, categories }) => {
  return await instance.post(`/folders/0/${keyword}`, [{ category: "전체" }]);
}
export const axiosAddMoum = (data) => instance.post("/folder", data);
