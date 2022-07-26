import { useMatch, useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";

function MoumContentTabMenu () {
  const {folderId: viewFolderId = 0} = useParams();
  const isScrapFolder = useMatch("/scrap") ? true : false;
  const isScrapPiece = useMatch("/scrap/:userId/:folderId") ? true : false;
  const isScrap = isScrapFolder || isScrapPiece;
  const navigate = useNavigate();

  return (
    viewFolderId === 0 &&
    <TabMenu>
      <Item onClick={
        () => {
          navigate("/moum");
        }}
        isActive={!isScrap}
      >
        <span>나의 모음</span>
      </Item>
      <Item onClick={
        () => {
          navigate("/scrap");
        }}
        isActive={isScrap}
      >
        <span>스크랩 모음</span>
      </Item>
    </TabMenu>
  )
}


const TabMenu = styled.div`
  margin-top: 40px;
  display: flex;
`;

const Item = styled.div`
  width: 120px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: -15px;
  border-radius: 10px;
  cursor: pointer;
  transition: background .3s, color .3s;

  ${props => !props.isActive && css`
    &:hover {
      background-color: #E8E1FC;
      span {
        color: #9152FF;
      }
    }
  `}

  span {
    display: inline-flex;
    height: 100%;
    align-items: center;
    font-size: 22px;
    color: #8B8B8B;


    ${props => props.isActive && css`
      border-bottom: 2px solid #303030;
      color: #303030;
    `}
  }
`;

export default MoumContentTabMenu;