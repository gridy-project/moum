import useMessageFloat from "hooks/useMessageFloat";
import { useSetRecoilState } from "recoil";
import { globalMessageFloat } from "state/common/popup";
import styled from "styled-components";

function Test () {
  const setFloat = useSetRecoilState(globalMessageFloat);
  const toast = useMessageFloat();
  return (
    <Container>
      <button
        onClick={() => {
          // setFloat({
          //   state: true,
          //   icon: "success",
          //   message: "메일로 인증코드를 전송했어요"
          // });
          toast("메일로 인증코드를 전송했어요");
        }}
        className="p-10 bg-[#EEEEEE] border border-solid border-[#000000] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      >플롯 생성</button>
    </Container>
  )
}

const Container = styled.div`
`;

export default Test;