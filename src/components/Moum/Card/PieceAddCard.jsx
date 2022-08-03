import styled from "styled-components";
import tw from "twin.macro";
import moumAddButton from "assets/images/pages/moum/moum-add-button.png";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { globalPopup } from "state/common/popup";
import PieceAddPopup from "../Popup/PieceAddPopup";

function PieceAddCard () {
  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);

  const closePopup = () => {
    resetPopup();
  }

  const runAddPopup = () => {
    setPopup({
      state: true,
      component: <PieceAddPopup close={() => closePopup()} />
    });
  }

  return (
    <Card onClick={runAddPopup}>
      <Background />
      <Content>
        <img src={moumAddButton} alt="모음 추가 버튼" />
        <div className="moum-new">새 조각 만들기</div>
      </Content>
    </Card>
  );
}

const Background = styled.div`
  ${tw`absolute w-full h-full opacity-70 rounded-20`}
  background: linear-gradient(180deg, #E0D6FF 0%, #D2BAFF 100%);
  transition: opacity .3s;
`;

const Content = styled.div`
  ${tw`absolute flex flex-col items-center justify-center w-full h-full`};

  .moum-new {
    ${tw`text-14 mt-10 p-12 text-[#AC7DFF] bg-[#FFFFFF] rounded-50`};
  }
`;

const Card = styled.div`
  ${tw`relative flex flex-col justify-start border-0 cursor-pointer w-282 h-314`};

  &:hover ${Background} {
    opacity: 1;
  }
`;


export default PieceAddCard;