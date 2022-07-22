import React, { useEffect } from "react";
import styled from "styled-components";
import MoumSelectItem from "../Item/MoumSelectItem";
import {useRecoilState} from "recoil";
import { pageMoumSelectedFolderId } from "state/moum";
import { getMoumMineAllAxios } from "utils/api/moum";
import useCustomQuery from "hooks/useCustomQuery";
import arrowRight from "assets/images/pages/moum/location/arrow-right.svg";

function MoumSelect ({moums}) {
  const [selectedFolderId, setSelectedFolderId] = useRecoilState(pageMoumSelectedFolderId);
  
  const { isSuccess, data: query } = useCustomQuery("mine/moums/all", async () => await getMoumMineAllAxios());

  const onClick = (id) => { setSelectedFolderId(id) }

  return (
    <Line>
      <Location>
        <span className="location-home" onClick={
          () => {
            setSelectedFolderId(0)
          }
        }>나의 모음</span>
        <img src={arrowRight} alt="right" />
        <span className="location-now">{query?.data?.filter((v) => v.id === selectedFolderId)[0].name}</span>
      </Location>
      <List>
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
      </List>
    </Line>
  );
}

const Line = styled.div`
  margin-top: 70px;
  width: 100%;
  font-size: 18px;
  font-weight: 600px;
`;

const Location = styled.div`
  color: #949494;
  display: flex;
  gap: 4px;

  span {
    padding: 6px;
  }

  .location-home {
    cursor: pointer;
    transition: background-color .3s, color .3s;
    &:hover {
      background-color: #E8E1FC;
      border-radius: 10px;
      color: #9152FF;
    }
  }

  .location-now {
    color: #555555;
  }
`;

const List = styled.div`
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