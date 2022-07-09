import { instance, requestAxios } from "./axios";

export const addPieceSimple = (data) => requestAxios(() => instance.post("/board", data));
export const addPieceSimpleInFolder = (id, data) => requestAxios(() => instance.put("/folder", { folderId: id, ...data }));
export const removePiece = (id) => requestAxios(() => instance.delete(`/board/${id}`));
export const modifyPiece = (id, data) => requestAxios(() => instance.put(`/board/${id}`, data));