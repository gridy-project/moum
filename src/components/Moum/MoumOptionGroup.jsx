import styled, { css } from "styled-components";

import moumSortBottom from "assets/images/pages/moum/moum-sort-select-bottom.png";
import pieceSelect from "assets/images/pages/moum/piece-select.png";
import pieceSearch from "assets/images/pages/moum/piece-search.png";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { atomPieceSelectMode, atomSelectedItems, atomMoumSort, atomMoum } from "state/moum";
import tw from "twin.macro";

function MoumOptionSort ({active, setActive}) { 
  const [option, setOption] = useRecoilState(atomMoumSort);
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
  ${tw`relative flex items-center cursor-pointer shrink-0`};
`;

const NowOption = styled.div`
  ${tw`h-44 px-16 border-1 border-solid border-[#DFDFDF] bg-[#FFFFFF] rounded-50 text-[#303030] flex items-center w-145 text-15 shadow-transparent justify-between`};
  transition: border .3s, box-shadow .3s;

  img {
    ${tw`ml-18`};
  }

  ${props => props.isActive && css`
    border: 1px solid #E0D6FF;
    box-shadow: 0px 0px 6px 2px #E8E1FC;
  `}
`;

const SortOptionList = styled.ul`
  ${tw`absolute top-65 w-full bg-[#FFFFFF] z-1 rounded-12 flex-col`}
  display: ${props => props.isActive ? "flex" : "none"};

  ${props => props.isActive && css`
    border: 1px solid #E0D6FF;
    box-shadow: 0px 0px 6px 2px #E8E1FC;
  `}

  li {
    ${tw`flex items-center justify-start w-full text-14 p-18`};
    transition: color .3s;
  }

  li:hover {
    ${tw`text-[#9152FF]`};
  }

  li + li {
    ${tw`pt-9`};
  }
`;

function MoumOptionGroup ({
  isFolderView, 
  setFloatStatus, 
  setFloatItemStatus, 
  floatItemStatus,
  setSearch
}) {
  const [selectState, setSelectState] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [modeState, setModeState] = useRecoilState(atomPieceSelectMode);
  const resetSelectedItems = useResetRecoilState(atomSelectedItems);
  const items = useRecoilValue(atomSelectedItems);
  const setSelectAll = useSetRecoilState(atomMoum.modeSelectAll);

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
  }, [modeState, setFloatStatus, setSelectAll, resetSelectedItems]);

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
    <div className="w-full flex justify-between mt-[40px] items-center">
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
    </div>
  );

}

const Search = styled.div`
  ${tw`w-full h-full flex items-center px-[15px]`};
  form {
    ${tw`flex items-center w-[400px] h-[44px] rounded-[22px] justify-between`};
    transition: background .3s;
    background-color: ${props => props.isActive ? "#FFFFFF": "#E8E1FC"};
    input {
      ${tw`w-full h-full bg-transparent border-0 outline-0 text-[#303030] pl-[20px]`};

      &::placeholder {
        ${tw`text-[#9E67FF] text-[15px]`};
      }
    }

    button {
      ${tw`pr-[20px] pl-[10px] h-full border-0 bg-transparent`};
    }
  }
`;

const Option = styled.div`
  ${tw`flex shrink-0 h-[44px]`}
  .piece-select-mode {
    ${tw`flex items-center`};
    span {
      ${tw`text-[#949494]`};
    }

    button {
      ${tw`h-full px-[18px] rounded-[22px] ml-[16px] cursor-pointer`};
    }

    .btn-cancel {
      ${tw`bg-[#E8E1FC] border-0 text-[#9152FF]`};
    }

    .btn-select {
      ${tw`border border-solid border-[#BE9AFF] bg-[#FFFFFF] text-[#9152FF]`};
    }
  }

  .piece-select-button {
    ${tw`border border-solid border-[#BE9AFF] bg-[#FFFFFF] px-[18px] text-[16px] text-[#9152FF] flex items-center rounded-[50px] cursor-pointer`};
    span {
      ${tw`ml-[10px]`};
    }
  }
`;

export default MoumOptionGroup;