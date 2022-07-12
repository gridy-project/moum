// module
import { React } from "react";
import styled from "styled-components";
import Container from "../components/common/Container";

// components
import Header from "../components/common/Header";
import MoumContentProfile from "../components/Moum/MoumContentProfile";
import MoumCategoryGroup from "../components/Moum/MoumCategoryGroup";

// redux
import MoumSelect from "../components/Moum/MoumSelect";
import MoumOptionGroup from "../components/Moum/MoumSortGroup";
import PieceList from "../components/Moum/PieceList";
import MoumTitleContent from "../components/Moum/MoumTitleContent";
import MoumTitleCreateForm from "../components/Moum/MoumTitleCreateForm";
import { useRecoilValue } from "recoil";
import { pageMoumSelectedFolderId } from "../atoms/moum";
import MoumList from "../components/Moum/MoumList";

function Moum() {
  const selectedFolderId = useRecoilValue(pageMoumSelectedFolderId);
  return (
    <Container>
      <Title>
        <Header />
        <MoumTitleContent />
        <MoumTitleCreateForm />
      </Title>
      <Content>
        <MoumContentProfile />
        <PieceBoard>
          <MoumHeader>
            <MoumCategoryGroup />
            {selectedFolderId !== 0 && <MoumSelect />}
            <MoumOptionGroup />
          </MoumHeader>
          {selectedFolderId === 0 ? <MoumList /> : <PieceList />}
        </PieceBoard>
      </Content>
    </Container>
  )
}

const Title = styled.div`
  width: 100%;
  height: 500px;
  background-color: #E5D6FF;
  border-radius: 0 0 60px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 1200px;
  padding-bottom: 70px;
`;

const PieceBoard = styled.div`
  margin-top: 80px;
`;

const MoumHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default Moum;