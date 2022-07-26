import useCustomQuery from "hooks/useCustomQuery";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ScrapBoard from "./ScrapBoard";
import ScrapPieces from "./ScrapPieces";
import arrowRight from "assets/images/pages/moum/location/arrow-right.svg";
import { instance } from "shared/axios";

function MoumScrapContent () {
  const match = useMatch("/scrap/:userId/:folderId");
  const {folderId: viewFolderId = 0} = useParams();
  const navigate = useNavigate();

  const {isSuccess, data: moums} = useCustomQuery(
    "mine/scrap", 
    () => instance.get(`/shares/0/all`)
  );

  return <Box>
    {
      match ? 
      <>
        <Line>
          <Location>
            <span className="location-home" onClick={() => { navigate(`/scrap`) }}>스크랩 모음</span>
            <img src={arrowRight} alt="right" />
            {isSuccess && <span className="location-now">{moums?.data?.filter((v) => v.id === Number(viewFolderId))[0]?.name}</span>}
          </Location>
        </Line>
        <ScrapPieces />
      </>
      :
      <>
        <ScrapBoard />
      </>
    }
  </Box>
} 

const Box = styled.div`

`;

const Line = styled.div`
  margin-top: 60px;
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


export default MoumScrapContent;