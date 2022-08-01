import { useSetRecoilState } from "recoil";
import { globalMessageFloat } from "state/common/popup";

function useMessageFloat () {
  const setFloat = useSetRecoilState(globalMessageFloat);
  const message = (message, status = "success") => {
    setFloat({
      state: true,
      icon: status,
      message: message
    });
  }
  return message;
}

export default useMessageFloat;