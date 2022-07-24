import { useMutation } from "react-query";

function useCustomMutate (fetch, query) {
  const mutate = useMutation(fetch, {
    onSuccess: data => {
      if (query?.onSuccess) {
        query.onSuccess();
      }
    },
    onError: err => {
      if (query?.onError) {
        query.onError();
      }
    }
  });

  return mutate;
}

export default useCustomMutate;