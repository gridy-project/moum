import { useMutation } from "react-query";

function useCustomMutate (fetch, query) {
  const mutate = useMutation(fetch, {
    onSuccess: data => {
      console.log("요청 성공");
      if (query?.onSuccess) {
        query.onSuccess();
      }
    },
    onError: err => {
      console.log("요청 실패");
      if (query?.onError) {
        query.onError();
      }
    }
  });

  return mutate;
}

export default useCustomMutate;