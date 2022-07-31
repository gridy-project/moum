import { instance } from "shared/axios";

export const apiMoum = {
  getMoum: ({ userId = 0, keyword = "all", categories, sort = false, page = 0 }) => {
    const queryString = `/folders/${userId}/${keyword}?page=${page}${sort ? "&sort=folderOrder,asc" : ""}`;

    if (categories.length === 0) {
      categories = [{ category: "전체" }];
    }

    return instance.post(queryString, categories);
  },
  addMoum: ({ name, share = "PRIVATE" }) => {
    // name : 이름
    // status : PUBLIC : PRIVATE
    return instance.post(`/folder`, { name, status: share });
  },
  modifyMoum: () => {
    // return
  },
  removeMoum: () => {

  },

  // SIDE API
  getMoumSimple: () => {

  },
  modifyMoumOrder: () => {

  }
}


// export const getMoumMineAllAxios = (page) => instance.post(`/folders/0/all?page=${page}`, [{ category: "전체" }]);
// export const getMoumMineByOptionsAxios = ({ keyword, categories, sort, page }) => {
//   if (sort) {
//     return instance.post(`/folders/0/${keyword}?page=${page}&sort=folderOrder,asc`, categories.length === 0 ? [{ category: "전체" }] : categories);
//   } else {
//     return instance.post(`/folders/0/${keyword}?page=${page}`, categories);
//   }
// };
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