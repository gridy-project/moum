import React from "react";
import styled from "styled-components";
import MoumSelectItem from "./MoumSelectItem";
import {useRecoilState} from "recoil";
import { pageMoumSelectedFolderId } from "../../atoms/moum";
import { axiosGetMoumMineAll } from "api/moum";
import useGetReactQuery from "hooks/useGetReactQuery";

function MoumSelect ({moums}) {
  const [selectedFolderId, setSelectedFolderId] = useRecoilState(pageMoumSelectedFolderId);
  
  const moumsQuery = useGetReactQuery("mine/moums/all", async () => {
    const response = await axiosGetMoumMineAll();
    return response.data;
  });

  const onClick = (id) => {
    setSelectedFolderId(id);
  }

  return (
    <Line>
      <em>전체 모음 목록</em>
      <MoumList>
        <ul>
          {
            moumsQuery.data?.map((v, i) => {
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