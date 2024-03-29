import styled, { css } from "styled-components";

import moumSortBottom from "assets/images/pages/moum/moum-sort-select-bottom.png";
import { useRecoilState } from "recoil";
import { atomSortState } from "state/user";
import { useState } from "react";
import tw from "twin.macro";

function OptionGroup () {
  const [option, setOption] = useRecoilState(atomSortState);
  const [active, setActive] = useState(false);
  const toggleOptionSelect = (e) => {
    setActive((current) => !current);
  }

  return (
    <Group>
      <Selected isActive={active} onClick={toggleOptionSelect}>{option === "LATEST" ? "최신 조각순" : "사용자 지정순"}<img src={moumSortBottom} alt="bottom" /></Selected>
      <Options isActive={active}>
        <li 
          onClick={() => {
            setOption("LATEST");
            setActive(false);
          }}
        >최신 조각순</li>
        <li
          onClick={() => {
            setOption("CUSTOM");
            setActive(false)}
          }
        >사용자 지정순</li>
      </Options>
    </Group>
  )
}


const Group = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
`;

const Selected = styled.div`
  ${tw`p-16 border-1 border-solid border-[#DFDFDF] bg-[#FFFFFF] rounded-50 text-[#303030] flex items-center w-145 text-15 shadow-transparent justify-between`};
  transition: border .3s, box-shadow .3s;

  img {
    ${tw`ml-18`};
  }

  ${props => props.isActive && css`
    border: 1px solid #E0D6FF;
    box-shadow: 0px 0px 6px 2px #E8E1FC;
  `}
`;

const Options = styled.ul`
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

export default OptionGroup;