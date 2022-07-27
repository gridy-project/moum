import iconMove from "assets/images/pages/moum/move_icon.png";
import iconDelete from "assets/images/pages/moum/delete_icon.png";
import { atomSelectedItems } from "state/moum";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { useQueryClient } from "react-query";
import { removePieceMultiAxios } from "utils/api/piece";
import useCustomMutate from "hooks/useCustomMutate";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2"
import { instance } from "shared/axios";
import { globalPopup } from "state/common/popup";
import MoveSelectPopup from "components/Common/Popup/MoveSelectPopup";
import useCustomQuery from "hooks/useCustomQuery";

function MoumSelectFloatingBox ({floatStatus, floatItemStatus}) {
  const {folderId: viewFolderId = 0} = useParams();

  const queryClient = useQueryClient();
  const selectedItemList = useRecoilValue(atomSelectedItems);
  const resetSelected = useResetRecoilState(atomSelectedItems);
  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);

  const mutatePieceRemove = useCustomMutate(({folderId, list}) => removePieceMultiAxios(folderId, list), {
    onSuccess: () => {
      queryClient.invalidateQueries("mine/pieces")
      Swal.fire({
        icon: "success",
        title: "삭제 성공"
      });
    }
  });

  const removeFolders = (e) => {
    if (selectedItemList.length === 0) {
      Swal.fire({
        icon: "error",
        title: "조각을 선택해주세요"
      })
    } else {
      mutatePieceRemove.mutate({folderId: viewFolderId, list: selectedItemList.map((v) => ({id: v}))});
      resetSelected();
    }
  }


  const {mutateAsync: movePiece} = useCustomMutate(({moumId, pieces}) => instance.post(`/folder/${moumId}`, {boardList: [...pieces]}));

  const moumsQuery = useCustomQuery(["mine/moums/all"], () => instance.get("/folders"), {staleTime : 100000});
  const moveFolders = (e) => {
    if (selectedItemList.length === 0) {
      Swal.fire({
        icon: "error",
        title: "조각을 선택해주세요"
      })
    } else {
      setPopup({
        state: true,
        component: (
          <MoveSelectPopup 
            query={moumsQuery}
            close={resetPopup}
            confirm={async (moum) => {
              const {result} = await movePiece({moumId: moum.id, pieces: selectedItemList.map((v) => ({id: v}))});
              if (result) {
                Swal.fire({
                  icon: "success",
                  title: "이동 성공"
                });
                queryClient.invalidateQueries("mine/pieces");
                resetSelected();
              }
            }}
            title={"이동할 모음 선택하기"} 
          />
        )
      });
    }
  }

  return (
    <FloatingBox isActive={floatStatus}>
      <FloatItem isActive={floatItemStatus} onClick={moveFolders}>
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