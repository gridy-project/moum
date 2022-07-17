import { instance } from "shared/axios";

// React Query 적용중
export const addPieceSimpleAxios = (data) => instance.post("/board", data);
export const addPieceSimpleInFolderAxios = (id, data) => instance.put("/folder", { folderId: id, ...data });
export const removePieceAxios = (folderId, id) => instance.delete(`/boards/${folderId}`, { data: [{ id }] });
export const removePieceMultiAxios = (folderId, list) => instance.delete(`/boards/${folderId}`, { data: list });
export const modifyPieceAxios = (id, data) => instance.put(`/board/${id}`, data);