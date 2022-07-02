import styled from "styled-components";
import FollowerCard from "../components/card/FollowerCard";
import LinkPieceCard from "../components/card/LinkPieceCard";
import MoumCard from "../components/card/MoumCard";
import Header from "../components/common/Header";
import searchIcon from "../public/img/icon-search-mono.png";

function Search() {
  return (
    <Container>
      <Header />
      <SearchForm>
        <input type="text" />
        <button>
          <img src={searchIcon} alt="search" />
        </button>
      </SearchForm>
      <Content>
        <Favorite>
          <em>추천 파일 리스트</em>
          <FavoriteList>
            <LinkPieceCard />
            <LinkPieceCard />
            <LinkPieceCard />
            <LinkPieceCard />
          </FavoriteList>
        </Favorite>
        <Follower>
          <em>내가 팔로우한 계정</em>
          <FollowerList>
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
          </FollowerList>
        </Follower>
        <Latest>
          <em>최근 인기 폴더</em>
          <LatestList>
            <MoumCard />
            <MoumCard />
            <MoumCard />
            <MoumCard />
          </LatestList>
        </Latest>
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
    box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.1);
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
    background-color: #ABABAB;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
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
  margin-top: 150px;

  em {
    display: block;
    font-size: 30px;
    margin-bottom: 30px;
  }
`;

const FavoriteList = styled.div`
  display: flex;
  gap: 25px;
`;

const Follower = styled.div`
  margin-top: 70px;
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