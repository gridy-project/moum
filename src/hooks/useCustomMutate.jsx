import { useMutation } from "react-query";

function useCustomMutate (fetch, successFunc, failedFunc) {
  const mutate = useMutation(fetch, {
    onSuccess: data => {
      console.log("요청 성공");
      if (successFunc) successFunc();
    },
    onError: err => {
      console.log("요청 실패");
      if (failedFunc) failedFunc();
    }
  });

  return mutate;
}

export default useCustomMutate;