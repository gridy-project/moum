import useCustomQuery from "hooks/useCustomQuery";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ScrapBoard from "./ScrapBoard";
import ScrapPieces from "./ScrapPieces";
import arrowRight from "assets/images/pages/moum/location/arrow-right.svg";
import { instance } from "shared/axios";
import tw from "twin.macro";

function MoumScrapContent () {
  const match = useMatch("/scrap/:userId/:folderId");
  const {folderId: viewFolderId = 0} = useParams();
  const navigate = useNavigate();

  const {isSuccess, data: moums} = useCustomQuery(
    "mine/scrap",
    () => instance.get(`/shares/0/all`)
  );

  return (
    <div>
      {/* <Option>
        <Search>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="나의 조각 검색하기" onChange={changeSearchText} />
            <button><img src={pieceSearch} alt="검색" /></button>
          </form>
        </Search>
      </Option> */}
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
    </div>
  )
}

const Line = styled.div`
  ${tw`mt-[60px] w-full text-[18px] font-semibold`}
`;

const Search = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  form {
    display: flex;
    align-items: center;
    width: 400px;
    height: 44px;
    border-radius: 22px;
    transition: background .3s;
    background-color: ${props => props.isActive ? "#FFFFFF": "#E8E1FC"};
    justify-content: space-between;
    input {
      width: 100%;
      height: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      color: #303030;
      padding: 0 0 0 20px;

      &::placeholder {
        color: #9E67FF;
        font-size: 15px;
      }
    }

    button {
      padding: 0 20px 0 10px;
      height: 100%;
      border: none;
      background-color: transparent;
    }
  }
`;

const Location = styled.div`
  ${tw`text-[#949494] flex gap-[4px]`}

  span {
    ${tw`p-[6px] text-[18px]`}
  }

  .location-home {
    ${tw`cursor-pointer`}
    transition: background-color .3s, color .3s;
    &:hover {
      ${tw`bg-[#E8E1FC] rounded-[10px] text-[#9152FF]`}
    }
  }

  .location-now {
    ${tw`text-[#555555]`};
  }
`;


export default MoumScrapContent;