import iconMove from "assets/images/pages/moum/move_icon.png";
import iconDelete from "assets/images/pages/moum/delete_icon.png";
import { selectedItems } from "state/mode";
import { useRecoilValue } from "recoil";
import { useQueryClient } from "react-query";
import { pageMoumSelectedFolderId } from "state/moum";
import { removePieceMultiAxios } from "utils/api/piece";
import useCustomMutate from "hooks/useCustomMutate";
import styled, { css } from "styled-components";

function MoumSelectFloatingBox ({floatStatus, floatItemStatus}) {
  const queryClient = useQueryClient();
  const selectedItemList = useRecoilValue(selectedItems);
  const selectedFolderId = useRecoilValue(pageMoumSelectedFolderId);

  const mutatePieceRemove = useCustomMutate(async ({folderId, list}) => await removePieceMultiAxios(folderId, list), () => {
    queryClient.invalidateQueries("mine/pieces")
  });

  const removeFolders = (e) => {
    if (selectedItemList.length === 0) {
      alert("조각을 선택해주세요");
    } else {
      mutatePieceRemove.mutate({folderId: selectedFolderId, list: selectedItemList.map((v) => ({id: v}))});
    }
  }

  return (
    <FloatingBox isActive={floatStatus}>
      <FloatItem isActive={floatItemStatus} onClick={() => {alert("폴더 이동 미구현")}}>
        <img src={iconMove} alt="move" />
      </FloatItem>
      <FloatItem isActive={floatItemStatus}>
        <img src={iconDelete} alt="remove" onClick={removeFolders}/>
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
`;


export default MoumSelectFloatingBox;