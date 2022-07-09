import { useQuery } from "react-query";

function useGetReactQuery (name, fetch) {
  const {isLoading, data} = useQuery(name, fetch, {
    refetchOnWindowFocus: true,
    retry: 0,
    onSuccess: data => {
      console.log("query 성공");
    },
    onError: err => {
      console.log("query 실패");
    }
  });
  return {isLoading, data};
}

export default useGetReactQuery;