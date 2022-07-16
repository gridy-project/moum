import styled from "styled-components";
import { instance } from "../../api/axios";
import useGetReactQuery from "../../hooks/useGetReactQuery";
import MoumCard from "./MoumCard";

function AllMoumFavorite () {
  const {data: bestMoum, isLoading: bestMoumLoading} = useGetReactQuery("search/bestMoum", async () => {
    const response = await instance.get("/BestFolders/0/10");
    return response.data;
  });
  return (
    <Favorite>
      <div></div>
      <em>스크랩 많은 인기 모음</em>
      <FavoriteList>
        {
          bestMoumLoading ? <div>isLoading</div> :
          bestMoum?.content?.map((moum) => {
            return <MoumCard key={moum.id} moum={moum}/>
          })
        }
      </FavoriteList>
    </Favorite>
  );
}


const Favorite = styled.div`
  margin-top: 70px;

  em {
    display: block;
    font-size: 30px;
    margin-bottom: 30px;
  }
`;

const FavoriteList = styled.div`
  display: flex;
  flex-wrap: wrap;

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


export default AllMoumFavorite;