import styled, { css } from "styled-components";
import MoumMenu from "./MoumMenu";
import SortGroup from "./SortGroup";

import arrowRight from "assets/images/pages/moum/location/arrow-right.svg";
import { useNavigate, useParams } from "react-router-dom";
import CategoryGroup from "./CategoryGroup";
import { instance } from "shared/axios";
import useCustomQuery from "hooks/useCustomQuery";

function ContentHeaderView () {
  const navigate = useNavigate();
  const {userId: viewUserId, folderId: viewFolderId = 0} = useParams();
  
  const { data: query } = useCustomQuery(["mine/moums/all"], () => instance.get(`/folders?userId=${viewUserId}`));

  return (
    <View>
      {viewFolderId === 0 ? 
        <Location>모음 목록</Location> :
        <Location isGrey isSmall margin>
          <span className="location-home" onClick={
            () => {
              navigate(`/user/${viewUserId}`)
            }
          }>모음 목록</span>
          <img src={arrowRight} alt="right" />
          <span className="location-now">{query?.data?.filter((v) => v.id === Number(viewFolderId))[0]?.name}</span>
        </Location>
      }
      {viewFolderId !== 0 && <MoumMenu />}
      {viewFolderId !== 0 && <CategoryGroup />}
      <SortGroup />
    </View>
  )
}

const View = styled.div`
  margin-top: 90px;
`;

const Location = styled.div`
  font-size: ${props => props.isSmall ? "18px" : "22px"};
  line-height: 24px;
  font-weight: 600;
  color: ${props => props.isGrey ? "#949494" : "#303030"};
  display: flex;
  gap: 4px;

  ${props => props.margin && css`
    margin-top: 70px;
  `}

  span {
    padding: 6px;
    font-size: 19px;
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

export default ContentHeaderView;