import styled from "styled-components";
import moumAddButton from "assets/images/pages/moum/moum-add-button.png";
import moum from "assets/images/pages/moum/moum-background.png";
import { useSetRecoilState } from "recoil";
import { popupState, globalPopup } from "state/common/popup";
import MoumAddPopup from "../Popup/MoumAddPopup";

import Modal from "react-modal";
import { modalContent, modalOverlay } from "shared/modal";
import { useState } from "react";
Modal.setAppElement("#root");

const createFolderModal = {
  ...modalContent,
  width: "440px",
  height: "330px",
  overflow: "hidden",
  borderRadius: "30px"
};

function MoumAddCard () {
  const [modalState, setModalState] = useState(false);
  // const setGlobalPopup = useSetRecoilState(globalPopup);
  // const runAddMoumPopup = (e) => {
  //   setGlobalPopup(<MoumAddPopup />);
  //   setPopupState(true);
  // }
  
  return (
    <>
      <Modal
        isOpen={modalState}
        onRequestClose={(e) => {e.preventDefault(); setModalState(false);}}
        style={{
          overlay: modalOverlay,
          content: createFolderModal
        }}
      >
        <MoumAddPopup close={() => setModalState(false)} />
      </Modal>
      <Card onClick={() => setModalState(true)}>
        <MoumAddCardBackground />
        <MoumAddCardContent>
          <img src={moumAddButton} alt="모음 추가 버튼" />
          <div className="moum-new">새 모음 만들기</div>
        </MoumAddCardContent>
      </Card>
    </>
  )
}

const MoumAddCardBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${moum});
  background-size: 100%;
  background-repeat: no-repeat;
  opacity: 0.4;
  transition: opacity .3s;
`;

const MoumAddCardContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .moum-new {
    font-size: 14px;
    margin-top: 10px;
    padding: 12px;
    color: #AC7DFF;
    background-color: #FFFFFF;
    border-radius: 50px;
  }
`;

const Card = styled.div`
  width: 282px;
  height: 314px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  cursor: pointer;

  &:hover ${MoumAddCardBackground} {
    opacity: 0.7;
  }
`;


export default MoumAddCard;