import React from "react";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import { globalPopup, popupState } from "../../state/popup";

function Popup () {
  const [state, setState] = useRecoilState(popupState);
  const [popup, setPopup] = useRecoilState(globalPopup);
  return (
    <Fixed isActive={state}>
      <Background />
      <Pop>{popup}</Pop>
    </Fixed>
  )
}

const Fixed = styled.div`
  display: ${props => props.isActive ? "flex" : "none !important"};
  position: fixed;
  
  width: 100%;
  height: 100vh;
  z-index: 999;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  background-color: #000;
  width: 100%;
  height: 100vh;
  opacity: 0.2;
  position: absolute;
`;

const Pop = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

export default Popup;