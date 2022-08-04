// React
import SvgAuthBack from 'assets/code/Auth/SvgAuthBack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
// component
import LookUpId from '../Id/LookUpId';
import SuccessFindId from '../Id/SuccessFindId'

const SearchId = () => {
  const navigate = useNavigate();
  const [searchIdState, setSearchIdState] = useState(0);

  const runSearchId = () => {
    setSearchIdState(0);
  }
  const runSuccessId = () => {
    setSearchIdState(1);
  }

  return (
    <div className="pt-60">
      <BtnBack onClick={() => {navigate(-1)}}>
        <SvgAuthBack />
      </BtnBack>
      {searchIdState === 0 && <LookUpId
        runFindId={runSearchId}
        runSuccessFindId={runSuccessId}
      />}
      {searchIdState === 1 && <SuccessFindId/>}
    </div>
  );
};

const BtnBack = styled.div`
${tw`w-37 h-37 bg-[#FFFFFF] border-2 border-solid border-[#D9D9D9] rounded-[50%] justify-center items-center flex pr-2 mb-30 cursor-pointer`};
  &:hover {
    ${tw`bg-[#E5D6FF] border-0`}
    svg {
      path {
        stroke: #9152FF;
      }
    }
  }
`;

export default SearchId;