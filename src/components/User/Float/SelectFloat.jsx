import iconMove from "assets/images/pages/moum/move_icon.png";
import iconDelete from "assets/images/pages/moum/delete_icon.png";
import { selectedItems } from "state/moum";
import { useRecoilValue } from "recoil";
import { useQueryClient } from "react-query";
import { removePieceMultiAxios } from "utils/api/piece";
import useCustomMutate from "hooks/useCustomMutate";
import styled, { css } from "styled-components";
import { atomFloatItemActive, atomFloatStatus } from "state/user";
import { useParams } from "react-router-dom";

function SelectFloat () {
  const {folderId: viewFolderId = 0} = useParams();

  const queryClient = useQueryClient();
  const selectedItemList = useRecoilValue(selectedItems);
  const floatStatus = useRecoilValue(atomFloatStatus);
  const FloatItemActive = useRecoilValue(atomFloatItemActive);

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
    }
  }

  return (
    <FloatingBox isActive={floatStatus}>
      <FloatItem isActive={FloatItemActive} onClick={() => {alert("폴더 이동 미구현")}}>
        <img src={iconMove} alt="move" />
      </FloatItem>
      <FloatItem isActive={FloatItemActive}>
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


export default SelectFloat;