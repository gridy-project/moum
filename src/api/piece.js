import { instance, requestAxios } from "./axios";

// React Query 적용중
export const addPieceSimple = (data) => instance.post("/board", data);
export const addPieceSimpleInFolder = (id, data) => instance.put("/folder", { folderId: id, ...data });
export const removePiece = (id) => () => instance.delete(`/board/${id}`);
export const modifyPiece = (id, data) => instance.put(`/board/${id}`, data);