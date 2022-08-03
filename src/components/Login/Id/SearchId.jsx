// React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div>
      <div onClick={() => {navigate(-1)}} className="absolute top-0 left-0">뒤로가기</div>
      {searchIdState === 0 && <LookUpId
        runFindId={runSearchId}
        runSuccessFindId={runSuccessId}
      />}
      {searchIdState === 1 && <SuccessFindId/>}
    </div>
  );
};

export default SearchId;