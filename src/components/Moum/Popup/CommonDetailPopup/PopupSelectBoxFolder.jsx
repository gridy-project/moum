import { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import folderIcon from "assets/images/pages/moum/popup/folder-icon.png";
import folderIconGrey from "assets/images/pages/moum/popup/folder-icon-grey.png";
import arrowDown from "assets/images/pages/moum/popup/arrow_down.png";

function PopupSelectBoxFolder ({ items, setter, getter, initFolderId }) {
  console.log(items);
  console.log(initFolderId);
  const folderIdx = items.findIndex((v) => v.id === initFolderId);

  const [selectedItem, setSelectedItem] = useState(folderIdx);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    setter(current => ({...current, folderId: items[folderIdx].id}));
  }, [setter]);

  return (
    <Wrap>
      <Selected onClick={() => {setActive(current => !current)}}>
        <img src={folderIcon} alt={"single"}/>
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
                setter(current => ({...current, folderId: items[idx].id}));
                setActive(false);
              }}
            >
              {/* UseSingleIcon */}
              {
                selectedItem === idx &&
                <img src={folderIcon} alt={"single"}/>
              }
              {
                selectedItem !== idx &&
                <img src={folderIconGrey} alt={"single"}/>
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
  width: 360px;
  height: 48px;
  border-radius: 24px;
  background-color: #F7F3FD;
  position: relative;
  z-index: 2;
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


export default PopupSelectBoxFolder;