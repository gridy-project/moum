import React from "react";
import styled from "styled-components";
import MoumSelectItem from "../Item/MoumSelectItem";
import { getMoumMineAllAxios } from "utils/api/moum";
import useCustomQuery from "hooks/useCustomQuery";
import arrowRight from "assets/images/pages/moum/location/arrow-right.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

function MoumSelect () {
  const {folderId: viewFolderId = 0} = useParams();
  const navigate = useNavigate();
  
  const { isSuccess, data: query } = useCustomQuery("mine/moums/all", async () => await getMoumMineAllAxios());

  const onClick = (id) => {
    navigate(`/moum/${id}`);
  }

  return (
    <Line>
      <Location>
        <span className="location-home" onClick={() => { navigate(`/moum`) }}>나의 모음</span>
        <img src={arrowRight} alt="right" />
        <span className="location-now">{query?.data?.filter((v) => v.id === Number(viewFolderId))[0]?.name}</span>
      </Location>
      <List>
        <ul>
          {
            isSuccess &&
            query?.data?.map((v, i) => {
              return (
                <MoumSelectItem 
                key={v.id} 
                isActive={v.id === Number(viewFolderId)} 
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
  margin-top: 110px;
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
    font-size: 18px;
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

export default MoumSelect;