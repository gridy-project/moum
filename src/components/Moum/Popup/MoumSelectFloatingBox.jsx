import iconMove from "assets/images/pages/moum/move_icon.png";
import iconDelete from "assets/images/pages/moum/delete_icon.png";
import { atomSelectedItems } from "state/moum";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useQueryClient } from "react-query";
import { removePieceMultiAxios } from "utils/api/piece";
import useCustomMutate from "hooks/useCustomMutate";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";

function MoumSelectFloatingBox ({floatStatus, floatItemStatus}) {
  const {folderId: viewFolderId = 0} = useParams();

  const queryClient = useQueryClient();
  const selectedItemList = useRecoilValue(atomSelectedItems);
  const resetSelected = useResetRecoilState(atomSelectedItems);

  // Backend Required Test => File Delete Request Error
  const mutatePieceRemove = useCustomMutate(({folderId, list}) => removePieceMultiAxios(folderId, list), {
    onSuccess: () => {
      queryClient.invalidateQueries("mine/pieces")
    }
  });

  const removeFolders = (e) => {
    if (selectedItemList.length === 0) {
      alert("조각을 선택해주세요");
    } else {
      mutatePieceRemove.mutate({folderId: viewFolderId, list: selectedItemList.map((v) => ({id: v}))});
      resetSelected();
    }
  }

  return (
    <FloatingBox isActive={floatStatus}>
      <FloatItem isActive={floatItemStatus} onClick={() => {alert("폴더 이동 미구현")}}>
        <img src={iconMove} alt="move" />
      </FloatItem>
      <FloatItem isActive={floatItemStatus} onClick={removeFolders}>
        <img src={iconDelete} alt="remove"/>
      </FloatItem>
    </FloatingBox>
  );
}


const FloatingBox = styled.div`
  position: fixed;
  bottom: -100px;
  display: flex;
  gap: 16px;
  transition: bottom .3s;
  ${props => props.isActive && css`
    bottom: 50px;
  `}
`;

const FloatItem = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E0D6FF;
  box-shadow: 0px 0px 20px 1px #E8E1FC;
  transition: background-color .3s, box-shadow .3s;
  ${props => props.isActive && css`
    background-color: #9E67FF;
    box-shadow: 0px 0px 20px 1px #D2BAFF;
    cursor: pointer;
  `}
  img {
    pointer-events: none;
  }
`;


export default MoumSelectFloatingBox;