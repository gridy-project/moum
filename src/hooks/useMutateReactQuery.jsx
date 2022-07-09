import { useMutation } from "react-query";

function useMutateReactQuery (name, fetch) {
  const {mutate, data, error} = useMutation(name, fetch, {
    onSuccess: data => {
      console.log("query 성공", data);
    },
    onError: err => {
      console.log("query 실패");
    }
  });

  return {mutate, data, error}
}

export default useMutateReactQuery;