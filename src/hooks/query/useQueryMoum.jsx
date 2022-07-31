import { useInfiniteQuery } from "react-query";
import { apiMoum } from "utils/api/moum";

export function useGetMoumMineInfinite ({categories, search, sortState}, option) {
  const fetch = async ({categories, search, sort, pageParam}) => {
    const response = await apiMoum.getMoum({categories, search, sort, page: pageParam});
    return { moums: response.data, nextPage: pageParam + 1, isLast: response.totalPage === pageParam }
  }
  return useInfiniteQuery(
    ["mine/moums", categories, search, sortState], 
    ({pageParam = 0}) => fetch({categories, search, sort: (sortState === "사용자 지정순"), pageParam}),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) {
          return lastPage.nextPage
        } else {
          return undefined;
        }
      },
      ...option
    },
  );
}

export function useSortMoum () {

}