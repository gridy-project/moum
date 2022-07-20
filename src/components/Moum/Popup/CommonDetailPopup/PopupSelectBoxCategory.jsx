import React, { useEffect, useState } from "react";

import arrowDown from "assets/images/pages/moum/popup/arrow_down.png";
import styled, { css } from "styled-components";

function PopupSelectBox ({ items, getter, setter }) {
  const [selectedItem, setSelectedItem] = useState(0);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    setter(current => ({...current, category: items[0].category}));
  }, [setter]);

  return (
    <Wrap>
      <Selected onClick={() => {setActive(current => !current)}}>
        {items[selectedItem].imageActive && <img src={items[selectedItem].imageActive} alt={"single"}/>}
        <span>{items[selectedItem].name}</span>
        <img src={arrowDown} alt="down" />
      </Selected>
      <Select isActive={isActive}>
        {items.map((v, idx) => {
          return (
            <Item 
              key={v.id} 
              isActive={selectedItem === idx}
              onClick={() => {
                setSelectedItem(idx);
                setter(current => (
                  {
                    ...current, 
                    category: items[idx].category === "카테고리 없음" ?
                    "미정" : items[idx].category
                  }
                ));
                setActive(false);
              }}
            >
              {/* UseItemsIcon */}
              {
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
  width: 200px;
  height: 48px;
  border-radius: 24px;
  background-color: #F7F3FD;
  position: relative;
  z-index: 1;
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
  display: ${props => props.isActive ? "flex" : "none"};
  position: absolute;
  top: ${props => props.height ? `${props.height + 8}px` : `58px`};
  width: 190%;
  height: 140px;
  border: 1px solid #F1EDFD;
  border-radius: 12px;
  background-color: #FFFFFF;
  padding: 10px;
  overflow-y: auto;
  flex-wrap: wrap;
  gap: 3.3%;
`;

const Item = styled.div`
  width: 30%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  color: #555555;
  font-weight: 400;
  font-size: 15px;
  border-radius: 6px;
  background-color: #F6F6F6;
  transition: background-color .3s;
  cursor: pointer;

  ${props => props.isActive && css`
    background-color: #E8E1FC;
  `}

  img {
    width: 16px;
    margin-right: 8px;
  }

  &:hover {
    background-color: #F0F0F0;
  }

  & + & {
    margin-top: 0;
  }

  &:nth-of-type(n+4) {
    margin-top: 10px;
  }

  &:hover {
    background-color: #F5F5F5;
  }
`;

export default React.memo(PopupSelectBox);