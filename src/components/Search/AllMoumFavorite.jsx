import styled from "styled-components";
import { instance } from "shared/axios";
import useCustomQuery from "hooks/useCustomQuery";
import SearchMoumCard from "./Card/SearchMoumCard";

function AllMoumFavorite () {
  const {data: bestMoum, isLoading: bestMoumLoading} = useCustomQuery("search/best", 
  async () => await instance.get("/BestFolders/0/10"));
  return (
    <Favorite>
      <em>스크랩 많은 인기 모음</em>
      <FavoriteList>
        {
          bestMoumLoading ? <div>isLoading</div> :
          bestMoum.data?.content?.map((moum) => {
            return <SearchMoumCard key={moum.id} moum={moum}/>
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