import { instance, requestAxios } from "./axios";

export const addPieceSimple = (data) => requestAxios(() => instance.post("/board", data));
export const removePiece = (id) => requestAxios(() => instance.delete(`/board/${id}`));
export const modifyPiece = (id, data) => requestAxios(() => instance.put(`/board/${id}`, data));