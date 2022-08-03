import { useInfiniteQuery, useMutation } from "react-query";
import { apiPiece } from "utils/api/piece";

export function useGetPiecesMineInfinite({folderId, categories, search, sortState}, option) {
  const fetch = async ({pageParam}) => {
    const response = await apiPiece.getPieces({folderId, categories, search, sort: (sortState === "사용자 지정순"), page: pageParam});
    return { data: response.data.boardList, nextPage: pageParam + 1, isLast: response.totalPages === pageParam }
  }
  return useInfiniteQuery(
    ["mine/pieces", folderId, categories, search, sortState], 
    ({pageParam = 0}) => fetch({pageParam}),
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

export function useGetPiecesInfinite({userId, folderId, categories, search, sortState}, option) {
  const fetch = async ({pageParam}) => {
    const response = await apiPiece.getPieces({userId, folderId, categories, search, sort: (sortState === "사용자 지정순"), page: pageParam});
    return { data: response.data.boardList, nextPage: pageParam + 1, isLast: response.totalPages === pageParam }
  }
  return useInfiniteQuery(
    ["other/pieces", userId, folderId, categories, search, sortState], 
    ({pageParam = 0}) => fetch({pageParam}),
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

export function useGetPieces (option) {
}

export function useAddPiece (option) {
  return useMutation(apiPiece.addPiece, option);
}

export function useModifyPiece () {

}

export function useRemovePiece (option) {
  return useMutation(apiPiece.removePiece, option);
}

export function useMovePiece (option) {
  return useMutation(apiPiece.movePiece, option);
}

export function useOrderPiece (option) {
  return useMutation(apiPiece.orderPiece, option);
}