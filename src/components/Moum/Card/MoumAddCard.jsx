import styled from "styled-components";
import moumAddButton from "assets/images/pages/moum/moum-add-button.png";
import moum from "assets/images/pages/moum/moum-background.png";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { globalPopup } from "state/common/popup";
import MoumAddPopup from "../Popup/MoumAddPopup";
import tw from "twin.macro";

function MoumAddCard () {
  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);

  const closePopup = () => {
    resetPopup();
  }

  const openPopup = () => {
    setPopup({
      state: true,
      component: <MoumAddPopup close={() => closePopup()} />
    });
  }
  
  return (
    <Card onClick={openPopup}>
      <MoumAddCardBackground />
      <MoumAddCardContent>
        <img src={moumAddButton} alt="모음 추가 버튼" />
        <div className="moum-new">새 모음 만들기</div>
      </MoumAddCardContent>
    </Card>
  )
}

const MoumAddCardBackground = styled.div`
  ${tw`absolute w-full h-full opacity-40`}
  background-image: url(${moum});
  background-size: 100%;
  background-repeat: no-repeat;
  transition: opacity .3s;
`;

const MoumAddCardContent = styled.div`
  ${tw`absolute flex flex-col items-center justify-center w-full h-full`};

  .moum-new {
    ${tw`text-14 mt-10 p-12 text-[#AC7DFF] bg-[#FFFFFF] rounded-50`};
  }
`;

const Card = styled.div`
  ${tw`relative flex flex-col justify-start border-0 cursor-pointer w-282 h-314`};

  &:hover ${MoumAddCardBackground} {
    opacity: 0.7;
  }
`;


export default MoumAddCard;