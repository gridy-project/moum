import { useQuery } from "react-query";
import { apiCategory } from "utils/api/category";

function useGetCategoriesMine ({folderId}, option) {
  return useQuery(["mine/categories", folderId], () => apiCategory.getCategories({folderId}), option);
}

export default useGetCategoriesMine;