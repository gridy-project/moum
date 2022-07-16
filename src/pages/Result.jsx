import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { instance } from "api/axios";
import Container from "components/common/Container";
import Header from "components/common/Header";
import MoumResultSet from "components/Search/Result/MoumResultSet";
import PieceResultSet from "components/Search/Result/PieceResultSet";
import Search from "components/Search/SearchForm";

function Result () {
  const params = useParams();
  const folderQuery = useQuery(["folderQuery", params], async () => {
    const response = await instance.post(`/allfolders/${params.keyword}/0`);
    return response.data;
  }, {
    onSuccess: () => {

    },
    onError: () => {

    }
  });


  const fileQuery = useQuery(["fileQuery", params], async () => {
    const response = await instance.post(`/allboards/${params.keyword}/0`, [{ category: "전체" }]);
    return response.data;
  }, {
    onSuccess: () => {

    },
    onError: () => {

    }
  });

  return (
    <Container>
      <Box>
        <Header />
        <Search />
        { folderQuery?.isSuccess && <MoumResultSet moumQuery={folderQuery.data} /> }
        { fileQuery?.isSuccess && <PieceResultSet pieceQuery={fileQuery.data} /> }
      </Box>
    </Container>
  )
}

const Box = styled.div`
  padding-bottom: 70px;
`;

export default Result;