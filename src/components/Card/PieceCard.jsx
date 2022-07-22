// images
import PieceMemoCard from "./PieceMemoCard";
import PieceLinkCard from "./PieceLinkCard";
import { useSetRecoilState } from "recoil";
import { selectedItems } from "state/moum";
import { useEffect } from "react";

function PieceCard ({piece, selectAll, sortable, options, buttonState, setButtonState}) {
  const setItems = useSetRecoilState(selectedItems);

  useEffect(() => {
    if (selectAll) {
      setItems(current => {
        if (current.indexOf(piece.id) === -1) { // 값이 없는 경우 리스트 추가
          return [...current, piece.id];
        } else {
          return current;
        }
      });
    }
  }, [selectAll, setItems, piece.id]);

  return (
    piece.boardType === "LINK" ? 
    <PieceLinkCard
      piece={piece}
      selectAll={selectAll}
      sortable={sortable} 
      options={options}
      buttonState={buttonState}
      setButtonState={setButtonState}
    /> :
    <PieceMemoCard
      piece={piece} 
      selectAll={selectAll} 
      sortable={sortable} 
      options={options}
      buttonState={buttonState}
      setButtonState={setButtonState}
    />
  )
}

export default PieceCard;