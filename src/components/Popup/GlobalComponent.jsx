import { useSetRecoilState } from "recoil";
import { atomScrollState } from "state/common/scroll";
import BottomFloat from "./BottomFloat";
import MessageFloat from "./MessageFloat";
import Popup from "./Popup";

import scrollTopImage from "assets/svg/scroll_top.svg";
import styled from "styled-components";
import tw from "twin.macro";

function GlobalComponent () {
  const scrollState = useSetRecoilState(atomScrollState);
  return (
    <>
      <Popup />
      <MessageFloat />
      <BottomFloat />
      <TopButton onClick={() => {scrollState(true)}}><img src={scrollTopImage} alt="scroll top" /></TopButton>
    </>
  )
}

const TopButton = styled.button`
  ${tw`z-5 cursor-pointer fixed w-64 h-64 bg-[#FFFFFF] bottom-0 right-0 m-50 rounded-[50%] justify-center items-center flex transition-colors`};
  box-shadow: 0px 0px 20px #E0D6FF;
  
  &:hover {
    ${tw`bg-[#F5F5F5]`};
  }
`;

export default GlobalComponent;