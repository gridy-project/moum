import PieceCard from "components/Card/PieceCard";
import React, { useState } from "react";

import saveSvg from "assets/common/OptionMenu/save.svg";
import reportSvg from "assets/common/OptionMenu/report.svg";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { globalPopup } from "state/common/popup";
import MoveSelectPopup from "components/Common/Popup/MoveSelectPopup";
import { instance } from "shared/axios";
import useCustomQuery from "hooks/useCustomQuery";
import useCustomMutate from "hooks/useCustomMutate";
import { atomSelectedItems, atomSelectItemsAll, atomSelectMode } from "state/user";

import Swal from "sweetalert2";

function SearchPieceCard ({piece}) {
  const [optionState, setOptionState] = useState(false);
  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);
  const selectAll = useRecoilValue(atomSelectItemsAll);
  const [selectedItems, setSelectedItems] = useRecoilState(atomSelectedItems);
  const selectMode = useRecoilValue(atomSelectMode);

  // React Query
  const moumsQuery = useCustomQuery(["mine/all/moums"], () => instance.get("/folders"));

  const {mutateAsync: movePiece} = useCustomMutate(
    ({moumId, pieceId}) => instance.post(`/myshare/boards/${moumId}`, [{id: pieceId}])
  );

  const options = [
    {
      name: "내 모음에 저장하기",
      image: saveSvg,
      onClick: () => {
        setPopup({
          state: true,
          component: (
            <MoveSelectPopup 
              query={moumsQuery}
              close={resetPopup}
              // 저장시 폴더 선택 백엔드 API에 추가 필요
              confirm={async (moum) => {
                const {result} = await movePiece({moumId: moum.id, pieceId: piece.id});
                if (result) {
                  Swal.fire({
                    icon: "success",
                    title: "저장 성공"
                  });
                }
              }}
              title={"저장할 모음 선택하기"} 
            />
          )
        });
      }
    },
    {
      name: "신고하기",
      image: reportSvg,
      onClick: () => {
        Swal.fire({
          icon: "error",
          title: "아직 구현되지 않은 기능입니다"
        });
      }
    }
  ]
  return (
    <PieceCard
      piece={piece} 
      selectAll={selectAll} 
      buttonState={optionState} 
      setButtonState={setOptionState} 
      options={options}
      selectMode={selectMode}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
    />
  )
}

export default SearchPieceCard;