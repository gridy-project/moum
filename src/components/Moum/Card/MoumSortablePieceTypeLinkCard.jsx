// module
import React, { useState } from "react";
import styled, { css } from "styled-components";

// image
import noImage from "assets/images/pages/moum/images-none.png";
import more from "assets/images/pages/moum/menu-black.png";
import PieceCategory from "../PieceCategory";
import privateLock from "assets/images/pages/moum/private-lock.png";
import PieceOption from "./PieceOption";
import { useRecoilState, useRecoilValue } from "recoil";
import { pieceSelectMode, selectedItems } from "../../../state/moum";
import { useCallback } from "react";
import { useEffect } from "react";
import { SortableItem } from "react-easy-sort";

function MoumSortablePieceTypeLinkCard({piece, selectAll}) {
  const [buttonState, setButtonState] = useState(false);
  const selectMode = useRecoilValue(pieceSelectMode);
  const [items, setItems] = useRecoilState(selectedItems);

  const clickCard = useCallback((e) => {
    if (selectMode) {
      // e.preventDefault(); // SelectMode === true 일때만 링크 기능 씹기
      setItems(current => {
        if (current.indexOf(piece.id) === -1) { // 값이 없는 경우 리스트 추가
          return [...current, piece.id];
        } else {
          return current.filter(v => v !== piece.id); // 값이 있는 경우 리스트 삭제
        }
      })
    } else {
      window.open(piece.link, "_blank");
    }
  }, [selectMode, piece, setItems]);

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
    <SortableItem>
      <Box isSelected={items.indexOf(piece.id) !== -1}>
        <ItemDragBox>
          <li></li>
          <li></li>
          <li></li>
        </ItemDragBox>
        <div className="link-box" onClick={clickCard}>
          <div className="card-image">
            <img src={piece.imgPath || noImage} alt="noImage" className="item-image" />
            <div className="menu" onClick={
              (e) => {
                e.preventDefault();
                e.stopPropagation();
                setButtonState(current => !current);
              }
            }>
              <img src={more} alt="" />
            </div>
          </div>
          <div className="card-content">
            <div className="card-header">
              {piece.status === "PRIVATE" && 
              <PrivateIcon><img src={privateLock} alt="" /></PrivateIcon>}
              <PieceCategory category={piece.category} />
            </div>
            
            <div className="card-title">{piece.title}</div>
            <div className="card-description"><span>{piece.explanation}</span></div>
          </div>
        </div>
        <PieceOption isActive={buttonState} setActive={setButtonState} piece={piece} type={"LINK"} />
      </Box>
    </SortableItem>
  );
}

const ItemDragBox = styled.ul`
  position: absolute;
  width: 25px;
  height: 20px;
  z-index: 1;
  left: 50%;
  top: 0px;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  li {
    width: 5px;
    height: 5px;
    background-color: #FFF;
    box-shadow: 0 0 2px 0 #333;
    border-radius: 50%;
  }
`;

const Box = styled.div`
  position: relative;

  .link-box {
    width: 100%;
    height: 314px;
    background-color: #FFFFFF;
    border-radius: 15px;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;

    img {
      pointer-events: none;
    }
  }

  ${props => props.isSelected && css`
    .link-box {
      background-color: #E0D6FF;
      border: 2px solid #AC7DFF;
    }
  `}

  .card-image {
    width: 100%;
    height: 100%;
    background-color: #D9D9D9;
    border-radius: 0px 0px 15px 15px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .menu {
      position: absolute;
      right: 12px;
      top: 12px;
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
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-header {
    width: 100%;
    display: flex;
    padding: 12px 16px 16px;
    flex-shrink: 0;
    align-items: center;
  }

  .card-title {
    flex-shrink: 0;
    padding: 0 20px;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    height: 48px;
    display:-webkit-box; 
    word-wrap:break-word; 
    -webkit-line-clamp:2; 
    -webkit-box-orient:vertical; 
    overflow:hidden; 
    text-overflow:ellipsis;
  }

  .card-description {
    margin-top: 15px;
    margin-bottom: 20px;
    padding: 0 20px;
    line-height: 1.2;
    color: #595959;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
      width: 100%;
      white-space: nowrap;
    }
  }
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

export default MoumSortablePieceTypeLinkCard;