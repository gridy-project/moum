import { useMutation } from "react-query";
import styled, { css } from "styled-components";
import { removePiece } from "../../api/piece";
import {useSetRecoilState} from "recoil";
import { globalPopup, popupState } from "../../atoms/popup";
import MoumModifyPopup from "../Moum/MoumModifyPopup";

function PieceCardOption ({isActive, setActive, piece}) {
  const setPopupState = useSetRecoilState(popupState);
  const setPopup = useSetRecoilState(globalPopup);
  const {mutate: remove} = useMutation(async (id) => {
    const response = await removePiece(id);
    return response.data;
  }, {
    onSuccess: data => {
      // queryClient.invalidateQueries("piece");
      alert("삭제 성공");
    },
    onError: err => {
      alert("삭제 실패");
    }
  });

  const onClickModify = (e) => {
    setPopup(<MoumModifyPopup piece={piece}></MoumModifyPopup>);
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