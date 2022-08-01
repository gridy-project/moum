import iconMove from "assets/images/pages/moum/move_icon.png";
import iconDelete from "assets/images/pages/moum/delete_icon.png";
import { atomPieceSelectMode, atomSelectedItems } from "state/moum";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { useQueryClient } from "react-query";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2"
import { globalPopup } from "state/common/popup";
import MoveSelectPopup from "components/Common/Popup/MoveSelectPopup";
import useMessageFloat from "hooks/useMessageFloat";
import { useMovePiece, useRemovePiece } from "hooks/query/useQueryPiece";
import { useGetMoumSimple } from "hooks/query/useQueryMoum";
import tw from "twin.macro";

function MoumSelectFloatingBox ({floatStatus, floatItemStatus}) {
  const {folderId: viewFolderId = 0} = useParams();

  const queryClient = useQueryClient();
  const selectedItemList = useRecoilValue(atomSelectedItems);
  const selectMode = useSetRecoilState(atomPieceSelectMode);
  const resetSelected = useResetRecoilState(atomSelectedItems);
  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);
  const toast = useMessageFloat();

  const {mutateAsync: removePiece} = useRemovePiece();
  const {mutateAsync: movePiece} = useMovePiece();
  const moumsQuery = useGetMoumSimple();

  const removeFolders = async (e) => {
    if (selectedItemList.length === 0) {
      Swal.fire({
        icon: "error",
        title: "조각을 선택해주세요"
      });
    } else {
      const {result} = await removePiece({folderId: viewFolderId, data: selectedItemList.map((v) => ({id: v}))});
      if (result) {
        queryClient.invalidateQueries("mine/profile");
        queryClient.invalidateQueries("mine/pieces");
        selectMode(false);
        toast("조각이 삭제되었습니다");
      } else {
        Swal.fire({
          icon: "error",
          title: "조각 삭제 실패"
        });
      }
      resetSelected();
    }
  }

  const moveFolders = (e) => {
    if (selectedItemList.length === 0) {
      Swal.fire({
        icon: "error",
        title: "조각을 선택해주세요"
      });
    } else {
      setPopup({
        state: true,
        component: (
          <MoveSelectPopup 
            query={moumsQuery}
            close={resetPopup}
            confirm={async (moum) => {
              const {result} = await movePiece({folderId: moum.id, data: selectedItemList.map((v) => ({id: v}))});
              if (result) {
                toast("조각이 이동되었습니다");
                queryClient.invalidateQueries("mine/pieces");
                selectMode(false);
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
  ${tw`flex fixed bottom-[-100px] gap-16`};
  transition: bottom .3s;

  ${props => props.isActive && css`
    ${tw`bottom-50`};
  `}
`;

const FloatItem = styled.div`
  ${tw`w-60 h-60 rounded-[50%] flex justify-center items-center bg-[#E0D6FF]`}
  box-shadow: 0px 0px 20px 1px #E8E1FC;
  transition: background-color .3s, box-shadow .3s;
  ${props => props.isActive && css`
    ${tw`bg-[#9E67FF] cursor-pointer`};
    box-shadow: 0px 0px 20px 1px #D2BAFF;
  `}
  img {
    ${tw`pointer-events-none`};
  }
`;


export default MoumSelectFloatingBox;