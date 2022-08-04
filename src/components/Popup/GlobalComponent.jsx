import { useResetRecoilState, useSetRecoilState } from "recoil";
import { atomScrollState } from "state/common/scroll";
import BottomFloat from "./BottomFloat";
import MessageFloat from "./MessageFloat";
import Popup from "./Popup";

import scrollTopImage from "assets/svg/scroll_top.svg";
import helpImage from "assets/svg/help.svg";
import styled from "styled-components";
import tw from "twin.macro";
import { useEffect, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { globalPopup } from "state/common/popup";
import TutorialPopup from "components/Common/Popup/TutorialPopup";

function GlobalComponent () {
  const {pathname: path} = useLocation();
  const isHelp = (path.includes("/moum") || path.includes("/search"));

  const scrollState = useSetRecoilState(atomScrollState);
  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    if (window.scrollY > 0) setIsScroll(true);
    function scrollEvt (e) {
      if (window.scrollY > 0) {
        if (!isScroll) setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    }

    window.addEventListener("scroll", scrollEvt);
    return () => {
      window.removeEventListener("scroll", scrollEvt);
    }
  }, [isScroll]);
  return (
    <>
      <Popup />
      <MessageFloat />
      <BottomFloat />
      <RightBottom>
        {isScroll && <TopButton onClick={() => {scrollState(true)}}><img src={scrollTopImage} alt="scroll top" /></TopButton>}
        {isHelp && <HelpButton onClick={() => {
          setPopup({
            state: true,
            component: <TutorialPopup close={resetPopup} />
          });
        }}><img src={helpImage} alt="help" /></HelpButton>}
      </RightBottom>
    </>
  )
}

const RightBottom = styled.div`
  ${tw`fixed bottom-0 right-0 flex flex-col cursor-pointer z-5 p-60 gap-30`}
`;

const TopButton = styled.button`
  ${tw`w-60 h-60 bg-[#FFFFFF] rounded-[50%] justify-center items-center flex`};
  box-shadow: 0px 0px 20px #E0D6FF;
  
  &:hover {
    ${tw`bg-[#F5F5F5]`};
  }

  img {
    ${tw`w-16 h-16`}
  }
`;

const HelpButton = styled.button`
  ${tw`w-60 h-60 bg-[#FFFFFF] rounded-[50%] justify-center items-center flex`};
  box-shadow: 0px 0px 20px #E0D6FF;
  
  &:hover {
    ${tw`bg-[#F5F5F5]`};
  }

  img {
    ${tw`w-12 h-20`}
  }
`;

export default GlobalComponent;