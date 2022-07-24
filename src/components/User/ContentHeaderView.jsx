import styled, { css } from "styled-components";
import MoumMenu from "./MoumMenu";
import SortGroup from "./SortGroup";

import arrowRight from "assets/images/pages/moum/location/arrow-right.svg";
import { useNavigate, useParams } from "react-router-dom";
import CategoryGroup from "./CategoryGroup";

function ContentHeaderView () {
  const navigate = useNavigate();
  const {userId: viewUserId, folderId: viewFolderId = 0} = useParams();

  return (
    <View>
      {viewFolderId === 0 ? 
        <Location>모음 목록</Location> :
        <Location isGrey margin>
          <span className="location-home" onClick={
            () => {
              navigate(`/user/${viewUserId}`)
            }
          }>나의 모음</span>
          <img src={arrowRight} alt="right" />
          <span className="location-now">모음 이름</span>
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
  font-size: 22px;
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