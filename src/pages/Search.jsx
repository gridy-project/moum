// module
import styled from "styled-components";

// component
import Header from "components/Common/Header";
import SearchForm from "components/Search/SearchForm";
import AllMoumFavorite from "components/Search/AllMoumFavorite";
import AllMoumLatest from "components/Search/AllMoumLatest";
import Container from "components/Common/Container";
import AllMoumFollower from "components/Search/AllMoumFollower";

function Search() {
  return (
    <Container>
      <Header selected={2}/>
      <SearchForm />
      <Content>
        <AllMoumFollower />
        <AllMoumFavorite />
        <AllMoumLatest />
      </Content>
    </Container>
  )
}

const Content = styled.div`
  width: 1200px;
`;

export default Search;