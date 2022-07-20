import styled from "styled-components";
import fastCreateOptionModify from "assets/images/pages/moum/fast-create-option-modify.png";
import fastCreateOptionArrow from "assets/images/pages/moum/fast-create-option-arrow.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { floatState } from "state/common/popup";
import { pageMoumSelectedFolderId } from "state/moum";
import LinkDetailPopup from "../Popup/LinkDetailPopup";
import {modalOverlay, modalContent} from "shared/modal";

import Modal from "react-modal";
import { useState } from "react";
import MemoDetailPopup from "../Popup/MemoDetailPopup";

const createModalContent = {
  ...modalContent,
  width: "630px",
  height: "530px",
  overflow: "hidden",
  borderRadius: "30px"
};

Modal.setAppElement("#root");

function MoumCreateFloat ({piece, moums}) {
  const [modalState, setModalState] = useState(false);
  const setFloatState = useSetRecoilState(floatState);

  const openModal = () => {
    setModalState(true);
  }

  const closeModal = () => {
    setModalState(false);
  }

  const folderId = useRecoilValue(pageMoumSelectedFolderId);

  const runModifyPopup = (e) => {
    openModal();
    setFloatState(false);
  }

  return (
    <Wrap>
      <Modal
        isOpen={modalState}
        onRequestClose={closeModal}
        style={{
          overlay: modalOverlay,
          content: createModalContent
        }}
      >
        {
        piece.boardType === "LINK" ?
          <LinkDetailPopup piece={piece} close={closeModal} />
          :
          <MemoDetailPopup piece={piece} close={closeModal} />
        }
      </Modal>
      <img src={fastCreateOptionModify} alt="modify" />
      <div className="desc">
        <em>{(folderId === 0 || moums === undefined) ? "무제" : moums.filter((v) => v.id === folderId)[0]?.name}</em>
        <p>에 조각 저장 완료</p>
      </div>
      <button onClick={runModifyPopup}>
        자세히 작성하기
        <img src={fastCreateOptionArrow} alt="modify" />
      </button>
    </Wrap>
  )
}


const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 0 28px;

  .desc {
    em {
      font-weight: 600;
    }
    p {
      font-size: 13px;
      font-weight: 400;
      margin-top: 5px;
    }
  }

  button {
    width: 150px;
    height: 50px;
    background-color: #FFFFFF;
    border: none;
    border-radius: 25px;
    color: #721EFC;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin-left: 5px;
    }
  }
`;

export default MoumCreateFloat;