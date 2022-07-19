import { useState } from "react";

import arrowDown from "assets/images/pages/moum/popup/arrow_down.png";
import styled, { css } from "styled-components";

function PopupSelectBox ({
  width,
  height, 
  items, 
  useIcon, 
  useSingleIcon, 
  useSingleIconImage,
  useSingleIconImageNotSelected,
  useItemsIcon,
  zIndex
}) {
  const [selectedItem, setSelectedItem] = useState(0);
  const [isActive, setActive] = useState(false);
  return (
    <Wrap width={width} height={height} zIndex={zIndex}>
      <Selected onClick={() => {setActive(current => !current)}}>
        {useIcon && useSingleIcon && <img src={useSingleIconImage} alt={"single"}/>}
        {useIcon && useItemsIcon && items[selectedItem].imageActive && <img src={items[selectedItem].imageActive} alt={"single"}/>}
        <span>{items[selectedItem].name}</span>
        <img src={arrowDown} alt="down" />
      </Selected>
      <Select isActive={isActive} height={height} useSmall={useItemsIcon}>
        {items.map((v, idx) => {
          return (
            <Item 
              key={v.id} 
              isActive={selectedItem === idx}
              onClick={() => {
                setSelectedItem(idx);
                setActive(false);
              }}
            >
              {/* UseSingleIcon */}
              {
                useIcon && 
                useSingleIcon && 
                selectedItem === idx &&
                <img src={useSingleIconImage} alt={"single"}/>
              }
              {
                useIcon &&
                useSingleIcon &&
                selectedItem !== idx &&
                <img src={useSingleIconImageNotSelected} alt={"single"}/>
              }
              {/* UseItemsIcon */}
              {
                useIcon &&
                useItemsIcon &&
                v.image &&
                <img src={v.image} alt={v.name} />
              }
              {v.name}
            </Item>
          )
        })}
      </Select>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: ${props => props.width ? `${props.width}px` : "100px"};
  height: ${props => props.height ? `${props.height}px` : "50px"};
  border-radius: ${props => props.height ? `${props.height/2}px` : "25px"};
  background-color: #F7F3FD;
  position: relative;
  z-index: ${props => props.zIndex};
`;

const Selected = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 14px;
  color: #721EFC;
  font-weight: 500;
  justify-content: space-between;
  img {
    margin-right: 8px;
    flex-shrink: 0;
  }
  
  span {
    width: 100%;
  }
`;

const Select = styled.div`
  display: ${props => props.isActive ? "block" : "none"};
  position: absolute;
  top: ${props => props.height ? `${props.height + 8}px` : `58px`};
  width: 100%;
  height: 240px;
  border: 1px solid #F1EDFD;
  border-radius: 12px;
  background-color: #FFFFFF;
  padding: 10px;
  overflow-y: auto;

  ${props => props.useSmall && css`
    display: ${props => props.isActive ? "flex" : "none"};
    width: 190%;
    height: 140px;
    flex-wrap: wrap;
    gap: 3.3%;

    ${Item} {
      width: 30%;
      height: 36px;
      background-color: #F6F6F6;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      img {
        width: 16px;
      }

      &:hover {
        background-color: #F0F0F0;
      }
    }

    ${Item} + ${Item} {
      margin-top: 0;
    }

    ${Item}:nth-of-type(n+4) {
      margin-top: 10px;
    }
  `}
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 7px;
  color: #555555;
  font-weight: 400;
  border-radius: 6px;
  background-color: #FFFFFF;
  transition: background-color .3s;
  cursor: pointer;
  ${props => props.isActive && css`
    background-color: #E8E1FC;
  `}

  img {
    margin-right: 8px;
  }

  & + & {
    margin-top: 8px;
  }

  &:hover {
    background-color: #F5F5F5;
  }
`;

export default PopupSelectBox;