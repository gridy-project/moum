import React from "react";
import styled from "styled-components";
import {useRecoilValue, useResetRecoilState} from "recoil";
import { globalPopup } from "state/common/popup";
import { useRef } from "react";
import Swal from "sweetalert2";

function Popup () {
  const popRef = useRef();
  const ref = useRef();
  const popup = useRecoilValue(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);

  return (
    <Fixed isActive={popup.state}>
      <Background onClick={() => {
        Swal.fire({
          icon: "warning",
          title: "팝업을 종료하시겠습니까?",
          html: "팝업을 종료하면 작성중이던 정보를 잃게 됩니다.<br/> 정말로 종료 하시겠습니까?",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: '취소',
          confirmButtonText: '종료',
          reverseButtons: true
        }).then(result => {
          if (result.isConfirmed) {
            resetPopup();
          }
        });
      }}/>
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
    font-size: 0;
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
  position: absolute;
  display: flex;
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

export default Popup;