import { getMoumMineAllAxios, getMoumMineByOptionsAxios } from "utils/api/moum";

export const getMoumMineFetch = async (categories, search, sortState, page) => {
  if (search === "" && (categories[0]?.category === "전체" || categories.length === 0) && sortState === "최신 조각순") {
    return getMoumMineAllAxios(page);
  } else if (search === "") {
    return getMoumMineByOptionsAxios(
      { keyword: "all", categories, sort: sortState === "사용자 지정순" ? true : false, page }
    );
  } else {
    return getMoumMineByOptionsAxios(
      { keyword: search, categories, sort: sortState === "사용자 지정순" ? true : false, page }
    );
  }
}