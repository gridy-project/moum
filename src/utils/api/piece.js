import { instance } from "shared/axios";

export const apiPiece = {
  getPiece: () => {

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
      return instance.post(`/folder`, { folderId, ...data })
    }
  },
  modifyPiece: () => {

  },
  removePiece: () => {

  }
}

export const removePieceAxios = (folderId, id) => instance.delete(`/boards/${folderId}`, { data: [{ id }] });
export const removePieceMultiAxios = (folderId, list) => instance.delete(`/boards/${folderId}`, { data: list });
export const modifyPieceAxios = (id, data) => instance.put(`/board/${id}`, data);