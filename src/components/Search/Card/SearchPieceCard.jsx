import PieceCard from "components/Card/PieceCard";
import React, { useEffect, useState } from "react";

import saveSvg from "assets/common/OptionMenu/save.svg";
import reportSvg from "assets/common/OptionMenu/report.svg";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { globalPopup } from "state/common/popup";
import MoveSelectPopup from "components/Common/Popup/MoveSelectPopup";
import { useParams } from "react-router-dom";
import { instance } from "shared/axios";
import useCustomQuery from "hooks/useCustomQuery";
import useCustomMutate from "hooks/useCustomMutate";
import { atomSelectedItems, atomSelectItemsAll, atomSelectMode } from "state/user";

function SearchPieceCard ({piece}) {
  const [optionState, setOptionState] = useState(false);
  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);
  const selectAll = useRecoilValue(atomSelectItemsAll);
  const [selectedItems, setSelectedItems] = useRecoilState(atomSelectedItems);
  const selectMode = useRecoilValue(atomSelectMode);

  // React Query
  const moumsQuery = useCustomQuery(
    "mine/moums/all", () => instance.post(`/folders/0/all`, [{category: "전체"}])
  );

  const {mutateAsync: movePiece} = useCustomMutate(
    (id) => instance.post("/myshare/boards", [{id}])
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
                const {result} = await movePiece(piece.id);
                if (result) {
                  console.log("저장 성공");
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
        alert("미구현");
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