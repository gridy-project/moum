import styled from "styled-components";
import fastCreateOptionModify from "assets/images/pages/moum/fast-create-option-modify.png";
import fastCreateOptionArrow from "assets/images/pages/moum/fast-create-option-arrow.png";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { pageMoumSelectedFolderId } from "state/moum";
import LinkDetailPopup from "../Popup/LinkDetailPopup";
import { useState } from "react";
import MemoDetailPopup from "../Popup/MemoDetailPopup";
import { globalFloat, globalPopup } from "state/common/popup";
import { useParams } from "react-router-dom";

function MoumCreateFloat ({piece, moums}) {
  const {folderId: viewFolderId = 0} = useParams();

  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);
  const setFloat = useSetRecoilState(globalFloat);

  const closeModal = () => {
    resetPopup();
  }

  const openModal = () => {
    if (piece.boardType === "LINK") {
      setPopup({
        state: true,
        component: <LinkDetailPopup piece={piece} close={closeModal} />
      });
    } else if (piece.boardType === "MEMO") {
      setPopup({
        state: true,
        component: <MemoDetailPopup piece={piece} close={closeModal} />
      });
    }
  }

  const runModifyPopup = (e) => {
    openModal();
    setFloat(current => ({...current, state: false}));
  }

  return (
    <Wrap>
      <img src={fastCreateOptionModify} alt="modify" />
      <div className="desc">
        <em>{(viewFolderId === 0 || moums === undefined) ? "무제" : moums.filter((v) => v.id === viewFolderId)[0]?.name}</em>
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