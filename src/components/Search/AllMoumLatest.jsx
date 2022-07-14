import styled from "styled-components";
import { instance } from "../../api/axios";
import useGetReactQuery from "../../hooks/useGetReactQuery";
import LinkPieceCard from "../card/LinkPieceCard";
import MemoPieceCard from "../card/MemoPieceCard";

function AllMoumLatest () {
  const query = useGetReactQuery("search/latestPiece", async () => {
    const response = await instance.get("/newboards/0/4");
    console.log(response);
    return response.data;
  });

  return (
    <Latest>
      <em>최근 올라온 조각</em>
      <LatestList>
        {
          query.isSuccess 
          && (
            query.data?.content?.map(piece => {
              return piece.boardType === "LINK" ? 
                <LinkPieceCard key={piece.id} piece={piece} /> :
                <MemoPieceCard key={piece.id} piece={piece} />
            })
          )
        }
      </LatestList>
      <div className="latest-more">
        <button>더보기</button>
      </div>
    </Latest>
  );
}


const Latest = styled.div`
  margin-top: 80px;
  em {
    display: block;
    font-size: 30px;
    margin-bottom: 30px;
  }

  .latest-more {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    padding-bottom: 100px;
    button {
      width: 280px;
      height: 56px;
      border: none;
      background-color: #E0D6FF;
      color: #9152FF;
      border-radius: 16px;
      cursor: pointer;
    }
  }
`;

const LatestList = styled.div`
  display: flex;

  > div {
    width: calc(92% / 4);
  }

  > div + div {
    margin-left: calc(8% / 3);
  }

  > div:nth-of-type(4n + 1) {
    margin-left: 0;
  }

  > div:nth-of-type(n + 5) {
    margin-top: calc(8% / 3);
  }
`;


export default AllMoumLatest;