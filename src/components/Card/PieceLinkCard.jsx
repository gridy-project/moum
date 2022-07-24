// module
import styled from "styled-components";

import { SortableItem } from "react-easy-sort";
import PieceLinkCardCommon from "./PieceLinkCardCommon";
import OptionMenu from "components/Common/OptionMenu";
import { useCallback } from "react";


function PieceLinkCard({
  piece, 
  sortable, 
  options, 
  buttonState, 
  setButtonState,
  selectedItems,
  setSelectedItems,
  selectMode
}) {
  const onClick = useCallback((e) => {
    if (selectMode) {
      e.preventDefault(); // SelectMode === true 일때만 링크 기능 씹기
      setSelectedItems(current => {
        if (current.indexOf(piece.id) === -1) { // 값이 없는 경우 리스트 추가
          return [...current, piece.id];
        } else {
          return current.filter(v => v !== piece.id); // 값이 있는 경우 리스트 삭제
        }
      });
    } else {
      window.open(piece.link, "_blank");
    }
  }, [selectMode, piece, setSelectedItems]);

  return (
      sortable ? 
      <SortableItem>
        <Box>
          <PieceLinkCardCommon isSelected={selectedItems.indexOf(piece.id) !== -1} piece={piece} onClick={onClick} setButtonState={setButtonState} />
          <Option>
            <OptionMenu isActive={buttonState} options={options} />
          </Option>
        </Box>
      </SortableItem>
      :
      <Box isSelected={selectedItems.indexOf(piece.id) !== -1}>
        <PieceLinkCardCommon isSelected={selectedItems.indexOf(piece.id) !== -1} piece={piece} onClick={onClick} setButtonState={setButtonState} />
        <Option>
          <OptionMenu isActive={buttonState} options={options} />
        </Option>
      </Box>
  )
}

const Box = styled.div`
  position: relative;
`;

const Option = styled.div`
  position: absolute;
  top: 60px;
  right: -130px;
  z-index: 1;
`;

export default PieceLinkCard;