import styled, { css } from "styled-components";
import { useCallback } from "react";
import PieceMemoCardCommon from "./PieceMemoCardCommon";
import { SortableItem } from "react-easy-sort";
import OptionMenu from "components/Common/OptionMenu";
import tw from "twin.macro";

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
  ${tw`relative flex w-full h-[314px] bg-[#FFFFFF] rounded-[15px] border-0 flex-col justify-start cursor-pointer`};
  
  ${props => props.isSelected && css`
    ${tw`bg-[#E0D6FF] border-2 border-solid border-[#AC7DFF]`};
  `}
`;

const Option = styled.div`
  ${tw`absolute top-60 right-[-130px] z-1`}
`;

export default PieceMemoCard;