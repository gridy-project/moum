import { useQuery } from "react-query";

function useCustomQuery (name, fetch) {
  const query = useQuery(name, fetch, {
    refetchOnWindowFocus: false,
    retry: 0
  });

  return query;
}

export default useCustomQuery;