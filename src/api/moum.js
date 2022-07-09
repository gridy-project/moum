import { instance, requestAxios } from "./axios";

export const getMoumAll = () => requestAxios(() => instance.get("/board"));
export const getPieceInFolder = (id) => requestAxios(() => instance.get(`/folder/${id}`));
export const addMoum = (data) => requestAxios(() => instance.post("/folder", data));