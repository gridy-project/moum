// images
import PieceMemoCard from "./PieceMemoCard";
import PieceLinkCard from "./PieceLinkCard";
import { useEffect } from "react";

function PieceCard ({
  piece, 
  selectMode,
  selectedItems,
  setSelectedItems,
  selectAll, 
  sortable, 
  options, 
  buttonState, 
  setButtonState
}) {
  // const setItems = useSetRecoilState(selectedItems);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(current => {
        if (current.indexOf(piece.id) === -1) { // 값이 없는 경우 리스트 추가
          return [...current, piece.id];
        } else {
          return current;
        }
      });
    }
  }, [selectAll, setSelectedItems, piece.id]);

  return (
    piece.boardType === "LINK" ? 
    <PieceLinkCard
      piece={piece}
      selectMode={selectMode}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      selectAll={selectAll}
      sortable={sortable} 
      options={options}
      buttonState={buttonState}
      setButtonState={setButtonState}
    /> :
    <PieceMemoCard
      piece={piece} 
      selectMode={selectMode}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      selectAll={selectAll} 
      sortable={sortable} 
      options={options}
      buttonState={buttonState}
      setButtonState={setButtonState}
    />
  )
}

export default PieceCard;