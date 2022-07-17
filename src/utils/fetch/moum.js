import { getMoumMineAllAxios, getMoumMineByOptionsAxios } from "utils/api/moum";

export const getMoumFetch = async (categories, search, sortState) => {
  if (search === "" && (categories[0]?.category === "전체" || categories.length === 0) && sortState === "최신 조각순") {
    const response = await getMoumMineAllAxios();
    return response.data;
  } else if (search === "") {
    const response = await getMoumMineByOptionsAxios(
      { keyword: "all", categories, sort: sortState === "사용자 지정순" ? true : false }
    );
    return response.data;
  } else {
    const response = await getMoumMineByOptionsAxios(
      { keyword: search, categories, sort: sortState === "사용자 지정순" ? true : false }
    );
    return response.data;
  }
}