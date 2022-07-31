import { useQuery } from "react-query";
import { apiCategory } from "utils/api/category";

function useGetCategoriesMine (data, option) {
  return useQuery(["mine/categories"], () => apiCategory.getCategories(data), option);
}

export default useGetCategoriesMine;