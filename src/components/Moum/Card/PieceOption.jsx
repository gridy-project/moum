import { useMutation } from "react-query";
import styled, { css } from "styled-components";
import { removePieceAxios } from "utils/api/piece";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { globalPopup, popupState } from "state/common/popup";
import LinkUpdatePopup from "../Popup/LinkUpdatePopup";
import MemoUpdatePopup from "../Popup/MemoUpdatePopup";
import { pageMoumSelectedFolderId } from "state/moum";

function PieceCardOption ({isActive, setActive, piece, type}) {
  const setPopupState = useSetRecoilState(popupState);
  const setPopup = useSetRecoilState(globalPopup);
  const folderId = useRecoilValue(pageMoumSelectedFolderId);
  const {mutate: remove} = useMutation(async (id) => {
    const response = await removePieceAxios(folderId, id);
    return response.data;
  }, {
    onSuccess: data => {
      alert("삭제 성공");
    },
    onError: err => {
      alert("삭제 실패");
    }
  });

  const onClickModify = (e) => {
    console.log(type);
    if (type === "LINK") {
      setPopup(<LinkUpdatePopup piece={piece} />);
    } else if (type === "MEMO") {
      setPopup(<MemoUpdatePopup piece={piece} />);
    }
    setPopupState(true);
    setActive(false);
  }

  const onClickRemove = (e) => {
    remove(piece.id);
    setActive(false);
  }

  return (
    <CardOption isActive={isActive}>
      <div onClick={onClickModify}>수정하기</div>
      <div onClick={onClickRemove}>삭제하기</div>
    </CardOption>
  )
      
}

const CardOption = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #FFFFFF;
  right: -50px;
  top: 60px;
  border: 1px solid #ddd;
  z-index: 1;
  display: none;

  ${props => props.isActive && css`
    display: block;
  `};

  div {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  div:hover {
    background-color: #ddd;
  }

  div + div {
    border-top: 1px solid #ddd;
  }
`;

export default PieceCardOption;