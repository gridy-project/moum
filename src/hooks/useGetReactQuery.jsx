import { useQuery } from "react-query";

function useGetReactQuery (name, fetch) {
  const query = useQuery(name, fetch, {
    refetchOnWindowFocus: true,
    retry: 0,
    onSuccess: data => {},
    onError: err => {}
  });
  return query;
}

export default useGetReactQuery;