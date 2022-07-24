import { useParams } from "react-router-dom";
import styled from "styled-components";
import { instance } from "shared/axios";
import Container from "components/Common/Container";
import Header from "components/Common/Header";
import MoumResultSet from "components/Search/Result/MoumResultSet";
import PieceResultSet from "components/Search/Result/PieceResultSet";
import Search from "components/Search/SearchForm";
import useCustomQuery from "hooks/useCustomQuery";

function Result () {
  const params = useParams();

  const folderQuery = useCustomQuery(["folderQuery", params], async () => {
    const response = await instance.post(`/allfolders/${params.keyword}?page=0`);
    return response.data;
  });


  const fileQuery = useCustomQuery(["fileQuery", params], async () => {
    const response = await instance.post(`/allboards/${params.keyword}/0`, [{ category: "전체" }]);
    return response.data;
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