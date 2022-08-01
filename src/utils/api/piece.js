import { instance } from "shared/axios";

export const apiPiece = {
  getPieces: ({ userId = 0, folderId = 0, keyword = "all", sort, page, categories }) => {
    const queryString = `/boards/${userId}/${folderId}/${keyword}?page=${page}${sort ? "&sort=boardOrder,asc" : ""}`;
    if (categories.length === 0) {
      categories = [{ category: "전체" }];
    }
    return instance.post(queryString, categories);
  },
  addPiece: ({ folderId, data }) => {
    /*
      Type Link
      link: 링크,
      boardType: 타입

      Type Memo
      content: 내용,
      boardType: 타입
    */
    if (folderId === 0) {
      return instance.post(`/board`, data);
    } else {
      return instance.put(`/folder`, { folderId, ...data });
    }
  },
  modifyPiece: () => {

  },
  removePiece: ({ folderId, data }) => {
    return instance.delete(`/boards/${folderId}`, { data });
  },
  movePiece: ({ folderId, data }) => {
    return instance.post(`/folder/${folderId}`, { boardList: [...data] });
  }
}

export const removePieceAxios = (folderId, id) => instance.delete(`/boards/${folderId}`, { data: [{ id }] });
export const modifyPieceAxios = (id, data) => instance.put(`/board/${id}`, data);