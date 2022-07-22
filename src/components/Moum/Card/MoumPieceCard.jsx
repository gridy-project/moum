import PieceCard from "components/Card/PieceCard";

import LinkDetailPopup from "components/Moum/Popup/LinkDetailPopup";
import useCustomMutate from "hooks/useCustomMutate";
import { removePieceAxios } from "utils/api/piece";

import modifySvg from "assets/common/OptionMenu/write.svg";
import moveSvg from "assets/common/OptionMenu/move.svg";
import removeSvg from "assets/common/OptionMenu/delete.svg";
import privateSvg from "assets/common/OptionMenu/private.svg";
import publicSvg from "assets/common/OptionMenu/public.svg";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { pageMoumSelectedFolderId } from "state/moum";
import { useQueryClient } from "react-query";
import { useState } from "react";
import { globalPopup } from "state/common/popup";

function MoumPieceCard ({sortable, piece, selectAll}) {
  const queryClient = useQueryClient();

  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);
  const folderId = useRecoilValue(pageMoumSelectedFolderId);
  const {mutateAsync: remove} = useCustomMutate((id) => removePieceAxios(folderId, id));
  const [buttonState, setButtonState] = useState(false);

  const options = [
    {
      name: "수정",
      image: modifySvg,
      onClick: () => {
        setPopup({
          state: true,
          component: <LinkDetailPopup 
            piece={piece} 
            close={() => {
              resetPopup();
            }} 
            width={"630px"} 
            height={"530px"} 
            backgroundColor={"#FFFFFF"}
          />
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
          alert("삭제 성공");
          queryClient.invalidateQueries("mine/pieces");
        } else {
          alert("삭제 실패");
        }
      }
    },
    {
      name: "다른 모음으로 이동",
      image: moveSvg,
      onClick: () => {
        alert("미구현 상태입니다.");
      }
    },
    {
      name: piece.status === "PRIVATE" ? "공개로 전환" : "비공개로 전환",
      image: piece.status === "PRIVATE" ? publicSvg : privateSvg,
      onClick: () => {
        alert("미구현 상태입니다.");
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
    />
  )
}

export default MoumPieceCard;