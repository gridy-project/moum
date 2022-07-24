import { useParams } from "react-router-dom";
import styled from "styled-components";
import { instance } from "shared/axios";
import Container from "components/Common/Container";
import Header from "components/Common/Header";
import MoumResultSet from "components/Search/Result/MoumResultSet";
import PieceResultSet from "components/Search/Result/PieceResultSet";
import Search from "components/Search/SearchForm";

function Result () {
  return (
    <Container>
      <Box>
        <Header />
        <Search />
        <MoumResultSet />
        <PieceResultSet />
      </Box>
    </Container>
  )
}

const Box = styled.div`
  padding-bottom: 70px;
`;

export default Result;