import styled, { css } from "styled-components";
import more from "../../../public/img/menu-black.png";
import PieceCategory from "../../Moum/PieceCategory";
import PieceScrollVertical from "../../Moum/PieceScrollVertical";
import privateLock from "../../Moum/images/private-lock.png";
import PieceOption from "./PieceOption";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { pieceSelectMode, selectedItems } from "../../../atoms/mode";
import { useCallback } from "react";
import { useEffect } from "react";

function MoumPieceTypeMemoCard ({piece, selectAll}) {
  const selectMode = useRecoilValue(pieceSelectMode);
  const [items, setItems] = useRecoilState(selectedItems);

  const clickCard = useCallback((e) => {
    if (selectMode) {
      e.preventDefault(); // SelectMode === true 일때만 링크 기능 씹기
      setItems(current => {
        if (current.indexOf(piece.id) === -1) { // 값이 없는 경우 리스트 추가
          return [...current, piece.id];
        } else {
          return current.filter(v => v !== piece.id); // 값이 있는 경우 리스트 삭제
        }
      })
    }
  }, [selectMode, piece.id, setItems]);

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

  const [buttonState, setButtonState] = useState(false);
  return (
    <Card onClick={clickCard} isSelected={items.indexOf(piece.id) !== -1}>
      <CardHeader>
        <Category>
          {piece.status === "PRIVATE" && <PrivateIcon><img src={privateLock} alt="" /></PrivateIcon>}
          <PieceCategory category={piece.category}/>
        </Category>
        <More className="menu" onClick={
            (e) => {
              e.preventDefault();
              setButtonState(current => !current);
            }
          }><img src={more} alt="more" /></More>
      </CardHeader>
      <CardContent>
        <PieceScrollVertical>
          <div className="title">{piece.title}</div>
          <div className="content">{piece.content}</div>
        </PieceScrollVertical>
      </CardContent>
      <PieceOption isActive={buttonState} setActive={setButtonState} piece={piece} type={"MEMO"} />
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

const CardHeader = styled.div`
  height: 50px;
  flex-shrink: 0;
  border-bottom: 1px solid #E8E1FC;
  display: flex;
  justify-content: space-between;
`;

const Category = styled.div`
  padding: 0 16px;
  display: flex;
  align-items: center;
`;

const PrivateIcon = styled.div`
  width: 28px;
  height: 28px;
  padding-bottom: 2px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9152FF;
  margin-right: 8px;
`;

const More = styled.div`
  margin: 12px;
  width: 28px;
  height: 28px;
  background-color: #FFFFFF;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: pointer;

  img {
    width: 18px;
    height: 18px;
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
`;

export default MoumPieceTypeMemoCard;