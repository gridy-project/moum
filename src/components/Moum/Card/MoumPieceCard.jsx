import PieceCard from "components/Card/PieceCard";

import LinkDetailPopup from "components/Moum/Popup/LinkDetailPopup";
import useCustomMutate from "hooks/useCustomMutate";
import { removePieceAxios } from "utils/api/piece";

import modifySvg from "assets/common/OptionMenu/write.svg";
import moveSvg from "assets/common/OptionMenu/move.svg";
import removeSvg from "assets/common/OptionMenu/delete.svg";
import privateSvg from "assets/common/OptionMenu/private.svg";
import publicSvg from "assets/common/OptionMenu/public.svg";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { useQueryClient } from "react-query";
import { useState } from "react";
import { globalPopup } from "state/common/popup";
import { instance } from "shared/axios";
import { useParams } from "react-router-dom";
import MemoDetailPopup from "../Popup/MemoDetailPopup";
import MoveSelectPopup from "components/Common/Popup/MoveSelectPopup";
import { getMoumMineAllAxios } from "utils/api/moum";
import useCustomQuery from "hooks/useCustomQuery";
import { atomPieceSelectMode, atomSelectedItems } from "state/moum";

import Swal from "sweetalert2";

function MoumPieceCard ({sortable, piece, selectAll}) {
  const queryClient = useQueryClient();
  const {folderId: viewFolderId = 0} = useParams();

  // Recoil State
  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);

  const [items, setItems] = useRecoilState(atomSelectedItems);
  const selectMode = useRecoilValue(atomPieceSelectMode);

  const {mutateAsync: remove} = useCustomMutate((id) => removePieceAxios(viewFolderId, id));
  const [buttonState, setButtonState] = useState(false);
  
  // React Query
  const moumsQuery = useCustomQuery(["mine/all/moums"], () => instance.get("/folders"));

  const {mutateAsync: getPiece} = useCustomMutate((id) => instance.get(`/board/${id}`));
  const {mutateAsync: changeStatus} = useCustomMutate(async (piece) => {
      if (piece.boardType === "LINK") {
        const {data: detail} = await getPiece(piece.id);

        // Find Image Type
        const imageTypeIdx = detail.imageList.findIndex(v => v.id === detail.imageId);

        const data = {
          title: detail.title,
          explanation: detail.explanation,
          link: detail.link,
          imgPath: detail.imgPath,
          image: {
            imgPath: detail.imgPath,
            imageType: detail.imageList[imageTypeIdx].imageType,
          },
          folderId: detail.folderId,
          category: detail.category === "미정" ? null : detail.category,
          boardType: detail.boardType,
          status: detail.status === "PUBLIC" ? "PRIVATE" : "PUBLIC"
        }

        return instance.put(`/board/${piece.id}`, data); // TYPE LINK
      } else {
        return instance.put(`/board/${piece.id}`, { // TYPE MEMO
          ...piece,
          folderId: viewFolderId,
          status: piece.status === "PUBLIC" ? "PRIVATE" : "PUBLIC"
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("mine/pieces");
      }
    }
  );

  const {mutateAsync: movePiece} = useCustomMutate(({folderId, list}) => instance.post(`/folder/${folderId}`, {
    boardList: list
  }));

  const options = [
    {
      name: "수정",
      image: modifySvg,
      onClick: () => {
        setPopup({
          state: true,
          component: (
            piece.boardType === "LINK" ?
            <LinkDetailPopup 
              piece={piece} 
              close={
                () => {
                  resetPopup();
                }
              }
            />
            :
            <MemoDetailPopup 
              piece={piece}
              close={
                () => {
                  resetPopup();
                }
              }
            />
          )
        });
        setButtonState(false);
      }
    },
    {
      name: "삭제",
      image: removeSvg,
      onClick: async () => {
        const {result} = await remove(piece.id);
        if (result) {
          Swal.fire({
            icon: "success",
            title: "삭제 성공"
          });
          queryClient.invalidateQueries("mine/pieces");
        } else {
          Swal.fire({
            icon: "error",
            title: "삭제 실패"
          });
        }
      }
    },
    {
      name: "다른 모음으로 이동",
      image: moveSvg,
      onClick: () => {
        setPopup({
          state: true,
          component: (
            <MoveSelectPopup
              query={moumsQuery}
              close={() => {
                resetPopup();
              }}
              confirm= {async (moum) => {
                const {result} = await movePiece({folderId: moum.id, list: [{id: piece.id}]});
                if (result) {
                  queryClient.invalidateQueries("mine/pieces");
                } else {
                  console.log("폴더 이동 실패");
                }
              }}
            />
          )
        });
        setButtonState(false);
      }
    },
    {
      name: piece.status === "PRIVATE" ? "공개로 전환" : "비공개로 전환",
      image: piece.status === "PRIVATE" ? publicSvg : privateSvg,
      onClick: () => {
        changeStatus(piece);
      }
    }
  ]

  return (
    <PieceCard
      piece={piece} 
      selectAll={selectAll} 
      sortable={sortable} 
      buttonState={buttonState} 
      setButtonState={setButtonState} 
      options={options}
      selectMode={selectMode}
      selectedItems={items}
      setSelectedItems={setItems}
    />
  )
}

export default MoumPieceCard;