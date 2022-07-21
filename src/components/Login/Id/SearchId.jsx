// React
import React, { useState } from 'react';
// component
import ReissuePwd from '../ReissuePwd';
import LookUpId from '../Id/LookUpId';
import SuccessFindId from '../Id/SuccessFindId'

const SearchId = () => {
  const [searchIdState, setSearchIdState] = useState(0);

  const runSearchId = () => {
    setSearchIdState(0);
  }
  const runSuccessId = () => {
    setSearchIdState(1);
  }
  return (
    <div>
      {searchIdState === 0 && <LookUpId
        runFindId={runSearchId}
        runSuccessFindId={runSuccessId}
      />}
      {searchIdState === 1 && <SuccessFindId/>}
    </div>
  );
};

export default SearchId;