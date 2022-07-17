import { useQuery } from "react-query";

function useCustomQuery (name, fetch) {
  const query = useQuery(name, fetch, {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: data => { console.log(name + " 요청 성공") },
    onError: err => { console.log(name + " 요청 실패") }
  });

  return query;
}

export default useCustomQuery;