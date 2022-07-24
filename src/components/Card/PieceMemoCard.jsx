import styled, { css } from "styled-components";
import { useCallback } from "react";
import PieceMemoCardCommon from "./PieceMemoCardCommon";
import { SortableItem } from "react-easy-sort";
import OptionMenu from "components/Common/OptionMenu";

function PieceMemoCard ({
  piece, 
  sortable, 
  options, 
  buttonState, 
  setButtonState,
  selectMode,
  selectedItems,
  setSelectedItems
}) {
  const clickCard = useCallback((e) => {
    if (selectMode) {
      e.preventDefault(); // SelectMode === true 일때만 링크 기능 씹기
      setSelectedItems(current => {
        if (current.indexOf(piece.id) === -1) { // 값이 없는 경우 리스트 추가
          return [...current, piece.id];
        } else {
          return current.filter(v => v !== piece.id); // 값이 있는 경우 리스트 삭제
        }
      });
    }
  }, [selectMode, piece.id, setSelectedItems]);

  return (
    sortable ? 
    <SortableItem>
      <Card onClick={clickCard} isSelected={selectedItems.indexOf(piece.id) !== -1}>
        <PieceMemoCardCommon piece={piece} setButtonState={setButtonState} />
        <Option>
          <OptionMenu isActive={buttonState} options={options} />
        </Option>
      </Card>
    </SortableItem>
    :
    <Card onClick={clickCard} isSelected={selectedItems.indexOf(piece.id) !== -1}>
      <PieceMemoCardCommon piece={piece} setButtonState={setButtonState} />
      <Option>
        <OptionMenu isActive={buttonState} options={options} />
      </Option>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 314px;
  background-color: #FFFFFF;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  ${props => props.isSelected && css`
    background-color: #E0D6FF;
    border: 2px solid #AC7DFF;
  `}
`;

const Option = styled.div`
  position: absolute;
  top: 60px;
  right: -130px;
  z-index: 1;
`;

export default PieceMemoCard;