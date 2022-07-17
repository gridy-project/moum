import React, { useEffect } from "react";
import styled from "styled-components";
import MoumSelectItem from "../Item/MoumSelectItem";
import {useRecoilState} from "recoil";
import { pageMoumSelectedFolderId } from "state/moum";
import { getMoumMineAllAxios } from "utils/api/moum";
import useCustomQuery from "hooks/useCustomQuery";

function MoumSelect ({moums}) {
  const [selectedFolderId, setSelectedFolderId] = useRecoilState(pageMoumSelectedFolderId);
  
  const { isSuccess, data: query } = useCustomQuery("mine/moums/all", async () => await getMoumMineAllAxios());

  const onClick = (id) => { setSelectedFolderId(id) }

  return (
    <Line>
      <em>전체 모음 목록</em>
      <MoumList>
        <ul>
          {
            isSuccess &&
            query?.data?.map((v, i) => {
              return (
                <MoumSelectItem 
                key={v.id} 
                isActive={v.id === selectedFolderId} 
                _onClick={() => onClick(v.id)}>{v.name}</MoumSelectItem>
              )
            })
          }
        </ul>
      </MoumList>
    </Line>
  );
}

const Line = styled.div`
  margin-top: 70px;
  width: 100%;
  font-size: 18px;
  font-weight: 600px;
`;

const MoumList = styled.div`
  padding: 25px 0;
  width: 100%;
  ul {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    width: 100%;
  }
`;

export default React.memo(MoumSelect);