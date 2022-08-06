import { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

function Test () {
  const [toggle, setToggle] = useState(false);
  return (
    <Container>
      {/* <SelectWrap>
        <SelectBox onClick={() => {setToggle((current) => !current)}}>
          <span>선택</span>
        </SelectBox>
        <SelectBoxOption toggle={toggle}>
          <Option onClick={
            () => {
            }}>링크</Option>
          <Option onClick={
            () => {
            }}>메모</Option>
        </SelectBoxOption>
      </SelectWrap> */}

      <details className="relative w-200 bg-[#EEEEEE]">
        <summary className="w-[100%]">내용</summary>
        <ul className="absolute w-[100%]">
          {[0,1,2,3].map((v) => {
            return <li className="w-[100%] h-50 bg-[#CCCCCC]">{v}</li>
          })}
        </ul>
      </details>
      afekjawefkwejofawjo
    </Container>
  )
}


const SelectWrap = styled.div`
  position: relative;
`;

const SelectBox = styled.div`
  img {
    margin-left: 8px;
  }
`;

const SelectBoxOption = styled.div`
  position: absolute;
  top: 50px;
  width: 80px;
  height: 80px;
  display: ${props => props.toggle ? "block" : "none"};
`;

const Option = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  transition: background .3s;

  &:hover {
    ${tw`bg-[#F1EAFF]`}
  }
`;

const Container = styled.div`
`;

export default Test;