import { useQuery } from "react-query";

function useCustomQuery (name, fetch, option) {
  const queryOption = {}
  if (option) {
    if (option.staleTime) {
      queryOption.staleTime = option.staleTime;
    }
  }
  queryOption.refetchOnWindowFocus = false;
  queryOption.retry = 0;

  const query = useQuery(name, fetch, queryOption);

  return query;
}

export default useCustomQuery;