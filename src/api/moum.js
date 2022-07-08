import { instance, requestAxios } from "./axios";

export const getMoumAll = () => requestAxios(() => instance.get("/board"));
export const addMoum = (data) => requestAxios(() => instance.post("/folder", data));