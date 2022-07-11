import { useQuery } from "react-query";

function useGetReactQuery (name, fetch) {
  const {isLoading, data} = useQuery(name, fetch, {
    refetchOnWindowFocus: true,
    retry: 0,
    onSuccess: data => {},
    onError: err => {}
  });
  return {isLoading, data};
}

export default useGetReactQuery;