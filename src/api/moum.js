import { instance } from "./axios";

export const getMoumAll = () => instance.get("/board");
export const getPieceInFolder = (id) => instance.get(`/folder/${id}`);
export const addMoumAxios = (data) => instance.post("/folder", data);