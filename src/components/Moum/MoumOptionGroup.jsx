import styled, { css } from "styled-components";

import moumSortBottom from "assets/images/pages/moum/moum-sort-select-bottom.png";
import pieceSelect from "assets/images/pages/moum/piece-select.png";
import pieceSearch from "assets/images/pages/moum/piece-search.png";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { pieceSelectMode, selectedItems } from "state/mode";
import { moumSort } from "state/moum";

function MoumOptionSort ({active, setActive}) {
  const [option, setOption] = useRecoilState(moumSort);
  const toggleOptionSelect = (e) => {
    setActive((current) => !current);
  }

  return (
    <Sort>
      <NowOption isActive={active} onClick={toggleOptionSelect}>{option}<img src={moumSortBottom} alt="bottom" /></NowOption>
      <SortOptionList isActive={active}>
        <li onClick={(e) => {setOption("최신 조각순"); setActive(false)}}>최신 조각순</li>
        <li onClick={(e) => {setOption("사용자 지정순"); setActive(false)}}>사용자 지정순</li>
      </SortOptionList>
    </Sort>
  )
}


const Sort = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
`;

const NowOption = styled.div`
  padding: 16px;
  border: 1px solid #DFDFDF;
  background-color: #FFFFFF;
  border-radius: 50px;
  color: #303030;
  display: flex;
  align-items: center;
  width: 145px;
  font-size: 15px;
  box-shadow: none;
  transition: border .3s, box-shadow .3s;
  justify-content: space-between;

  img {
    margin-left: 18px;
  }

  ${props => props.isActive && css`
    border: 1px solid #E0D6FF;
    box-shadow: 0px 0px 6px 2px #E8E1FC;
  `}
`;

const SortOptionList = styled.ul`
  display: ${props => props.isActive ? "flex" : "none"};
  position: absolute;
  top: 65px;
  width: 100%;
  background-color: #FFFFFF;
  z-index: 1;
  border-radius: 12px;
  flex-direction: column;

  ${props => props.isActive && css`
    border: 1px solid #E0D6FF;
    box-shadow: 0px 0px 6px 2px #E8E1FC;
  `}

  li {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    padding: 18px;
    transition: color .3s;
  }

  li:hover {
    color: #9152FF;
  }

  li + li {
    padding-top: 9px;
  }
`;

function MoumOptionGroup ({
  isFolderView, 
  setSelectAll, 
  setFloatStatus, 
  setFloatItemStatus, 
  floatItemStatus,
  setSearch
}) {
  const [selectState, setSelectState] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [modeState, setModeState] = useRecoilState(pieceSelectMode);
  const resetSelectedItems = useResetRecoilState(selectedItems);
  const items = useRecoilValue(selectedItems);

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
    if (items.length > 0 && floatItemStatus === false) {
      setFloatItemStatus(true);
    } else if (items.length <= 0 && floatItemStatus === true) {
      setFloatItemStatus(false);
    }
  }, [items]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearch(searchText);
  }

  return (
    <OptionGroup>
      <MoumOptionSort active={selectState} setActive={setSelectState} />
      <Search isActive={searchActive}>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="나의 조각 검색하기" onChange={changeSearchText} />
          <button><img src={pieceSearch} alt="검색" /></button>
        </form>
      </Search>
      <Option>
        {!isFolderView && ( // Folder를 보고 있지 않은 경우
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
    </OptionGroup>
  );

}

const OptionGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
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

export default MoumOptionGroup;