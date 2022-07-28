import React, { useEffect } from "react";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import { globalPopup } from "state/common/popup";
import { useRef } from "react";

function Popup () {
  const popRef = useRef();
  const ref = useRef();
  const [popup, setPopup] = useRecoilState(globalPopup);

  return (
    <Fixed isActive={popup.state}>
      <Background />
      <Pop ref={popRef} tabIndex={0}>
        {popup.component}
      </Pop>
      <button className="btn-hide" ref={ref} onFocus={() => {
        const useFocusElement = popRef.current;
        useFocusElement.focus();
      }}>HIDDEN BUTTON</button>
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
  > .btn-hide {
    width: 0;
    height: 0;
  }
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