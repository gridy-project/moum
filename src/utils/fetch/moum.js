import { getMoumMineAllAxios, getMoumMineByOptionsAxios } from "utils/api/moum";

export const getMoumFetch = async (categories, search, sortState) => {
  if (search === "" && (categories[0]?.category === "전체" || categories.length === 0) && sortState === "최신 조각순") {
    return getMoumMineAllAxios();
  } else if (search === "") {
    return getMoumMineByOptionsAxios(
      { keyword: "all", categories, sort: sortState === "사용자 지정순" ? true : false }
    );
  } else {
    return getMoumMineByOptionsAxios(
      { keyword: search, categories, sort: sortState === "사용자 지정순" ? true : false }
    );
  }
}