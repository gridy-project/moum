import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { selectedItems } from "state/moum";
import { atomFloatItemActive, atomFloatStatus, atomSearch, atomSelectedItems, atomSelectItemsAll, atomSelectMode } from "state/user";
import styled from "styled-components";

import pieceSelect from "assets/images/pages/moum/piece-select.png";
import pieceSearch from "assets/images/pages/moum/piece-search.png";
import OptionGroup from "./OptionGroup";
import { useParams } from "react-router-dom";

function SortGroup () {
  const {folderId: viewFolderId = 0} = useParams();
  
  // recoil reset
  const resetSelectedItems = useResetRecoilState(atomSelectedItems);

  // recoil set
  const setSearch = useSetRecoilState(atomSearch);
  const setFloatStatus = useSetRecoilState(atomFloatStatus);
  const setSelectAll = useSetRecoilState(atomSelectItemsAll);
  
  // recoil value
  const items = useRecoilValue(selectedItems);

  // recoil state
  const [modeState, setModeState] = useRecoilState(atomSelectMode);
  const [floatItemActive, setFloatItemActive] = useRecoilState(atomFloatItemActive);

  // state
  const [searchText, setSearchText] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const changeSearchText = (e) => {
    if (e.target.value.length > 0) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
    setSearchText(e.target.value);
  }

  const toggleSelectMode = (e) => {
    setModeState(current => !current);
  }

  const selectAll = (e) => {
    setSelectAll(true);
  }

  useEffect(() => {
    if (modeState) {
      setSelectAll(false);
      setFloatStatus(true);
    } else {
      resetSelectedItems();
      setFloatStatus(false);
    }
  }, [modeState]);

  useEffect(() => {
    if (items.length > 0 && floatItemActive === false) {
      setFloatItemActive(true);
    } else if (items.length <= 0 && floatItemActive === true) {
      setFloatItemActive(false);
    }
  }, [items]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearch(searchText);
  }

  return (
    <Group>
      <OptionGroup />
      <Search isActive={searchActive}>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="나의 조각 검색하기" onChange={changeSearchText} />
          <button><img src={pieceSearch} alt="검색" /></button>
        </form>
      </Search>
      <Option>
        {viewFolderId !== 0 && ( // Folder를 보고 있지 않은 경우
          modeState ? 
          <div className="piece-select-mode">
            <span>조각을 선택하세요</span>
            <button className="btn-cancel" onClick={toggleSelectMode}>취소</button>
            <button className="btn-select" onClick={selectAll}>모두 선택</button>
          </div> :
          <button className="piece-select-button" onClick={toggleSelectMode}>
            <img src={pieceSelect} alt="select" />
            <span>조각 선택 및 정리</span>
          </button>
        )}
      </Option>
    </Group>
  )
}

const Group = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  align-items: center;
`;

const Search = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  form {
    display: flex;
    align-items: center;
    width: 400px;
    height: 44px;
    border-radius: 22px;
    transition: background .3s;
    background-color: ${props => props.isActive ? "#FFFFFF": "#E8E1FC"};
    justify-content: space-between;
    input {
      width: 100%;
      height: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      color: #303030;
      padding: 0 0 0 20px;

      &::placeholder {
        color: #9E67FF;
        font-size: 15px;
      }
    }

    button {
      padding: 0 20px 0 10px;
      height: 100%;
      border: none;
      background-color: transparent;
    }
  }
`;

const Option = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 44px;
  .piece-select-mode {
    display: flex;
    align-items: center;
    span {
      color: #949494;
    }

    button {
      height: 100%;
      padding: 0 18px;
      border-radius: 22px;
      margin-left: 16px;
      cursor: pointer;
    }

    .btn-cancel {
      background-color: #E8E1FC;
      border: none;
      color: #9152FF;
    }

    .btn-select {
      border: 1px solid #BE9AFF;
      background-color: #FFFFFF;
      color: #9152FF;
    }
  }

  .piece-select-button {
    border: 1px solid #BE9AFF;
    background-color: #FFFFFF;
    padding: 0 18px;
    font-size: 16px;
    color: #9152FF;
    display: flex;
    align-items: center;
    border-radius: 50px;
    cursor: pointer;
    span {
      margin-left: 10px;
    }
  }
`;

export default SortGroup;