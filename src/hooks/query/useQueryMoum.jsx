import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { apiMoum } from "utils/api/moum";

export const moumQueryKey = {
  MY_MOUMS: "MY_MOUMS",
  MY_MOUMS_ALL: "MY_MOUMS_ALL"
}

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

export function useGetMoumSimple (option) {
  return useQuery(["mine/moums/all"], () => apiMoum.getMoumSimple(), {staleTime : 100000, ...option});
}

export function useOrderMoum (option) {
  return useMutation(apiMoum.orderMoum, option);
}