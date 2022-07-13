// module
import styled from "styled-components";
import { instance } from "../api/axios";

// component
import FollowerCard from "../components/card/FollowerCard";
import MoumCard from "../components/card/MoumCard";
import Header from "../components/common/Header";
import useGetReactQuery from "../hooks/useGetReactQuery";
import LinkPieceCard from "../components/card/LinkPieceCard";

// image
import searchIcon from "../public/img/icon-search-white.png";

function Search() {
  const {data: followUserList, isLoading : followUserListLoading} = useGetReactQuery("search/followUserList", async () => {
    const response = await instance.get("/followinguser/0/4");
    return response.data;
  });

  const {data: bestMoum, isLoading : bestMoumLoading} = useGetReactQuery("search/bestMoum", async () => {
    const response = await instance.get("/BestFolders/0/4");
    return response.data;
  });

  const {data: latestPiece, isLoading : latestPieceLoading} = useGetReactQuery("search/latestPiece", async () => {
    const response = await instance.get("/newboards/0/4");
    return response.data;
  });

  return (
    <Container>
      <Header selected={2}/>
      <SearchForm>
        <input type="text" />
        <button>
          <img src={searchIcon} alt="search" />
        </button>
      </SearchForm>
      <Content>
        {/* { followUserList?.length > 0 &&  */}
        <Follower>
          <em>내가 팔로우한 계정</em>
          <FollowerList>
            {
              followUserListLoading ? <div>isLoading</div> : 
              followUserList?.content?.map((moum) => {
                return <FollowerCard />
              })
            }
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
          </FollowerList>
        </Follower>
        <Latest>
          <em>스크랩 많은 인기 모음</em>
          <LatestList>
            {
              bestMoumLoading ? <div>isLoading</div> :
              bestMoum?.content?.map((moum) => {
                return <MoumCard key={moum.id} moum={moum}/>
              })
            }
          </LatestList>
        </Latest>
        <Favorite>
          <em>최근 올라온 조각</em>
          <FavoriteList>
            { latestPieceLoading ? <div>isLoading</div> :
              latestPiece?.content?.map(piece => {
                return <LinkPieceCard key={piece.id} piece={piece} />
              })
            }
          </FavoriteList>
        </Favorite>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const SearchForm = styled.form`
  display: flex;
  justify-content: center;

  input {
    width: 700px;
    height: 50px;
    box-shadow: 0px 2px 16px 2px rgba(145, 82, 255, 0.2);
    border-radius: 25px;
    border: none;
    background-color: #FAFAFA;
    padding: 0 20px;
    font-size: 18px;
    outline: none;
  }

  button {
    margin-left: 20px;
    width: 60px;
    height: 50px;
    background-color: #9152FF;
    box-shadow: 0px 2px 16px 4px rgba(145, 82, 255, 0.2);
    border-radius: 25px;
    border: none;

    img {
      width: 24px;
      height: 24px;
    }
  }
`;

const Content = styled.div`
  width: 1200px;
`;

const Favorite = styled.div`
  margin-top: 70px;
  padding-bottom: 100px;

  em {
    display: block;
    font-size: 30px;
    margin-bottom: 30px;
  }
`;

const FavoriteList = styled.div`
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
`;

const Follower = styled.div`
  margin-top: 150px;
  em {
    display: block;
    font-size: 30px;
    margin-bottom: 30px;
  }
`;

const FollowerList = styled.div`
  display: flex;
  gap: 25px;
`;

const Latest = styled.div`
  margin-top: 80px;
  em {
    display: block;
    font-size: 30px;
    margin-bottom: 30px;
  }
`;

const LatestList = styled.div`
  display: flex;
  gap: 25px;
`;

export default Search;