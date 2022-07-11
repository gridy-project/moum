// module
import { React, useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../components/common/Container";

// custom hook
import useLoginStatus from "../hooks/useLoginStatus";

// components
import Header from "../components/common/Header";
import MoumContentProfile from "../components/Moum/MoumContentProfile";
import MoumCategoryGroup from "../components/Moum/MoumCategoryGroup";

// redux
import MoumFastFolderCreateForm from "../components/Moum/MoumFastFolderCreateForm";
import MoumSelect from "../components/Moum/MoumSelect";
import MoumOptionGroup from "../components/Moum/MoumSortGroup";
import PieceList from "../components/Moum/PieceList";
import MoumTitleContent from "../components/Moum/MoumTitleContent";
import MoumTitleCreateForm from "../components/Moum/MoumTitleCreateForm";

function Moum() {

  // Custom Hook
  // const checkLogin = useLoginStatus();

  // useEffect(() => { 
  //   // checkLogin();
  // }, [checkLogin]);

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
            <MoumSelect />
            <MoumOptionGroup />
          </MoumHeader>
          {/* {folderId !== 0 && <button onClick={() => {setFolderId(0)}}>홈으로</button>} */}
          <PieceList />
            {/* {folderId === 0 ? moum.map((moum) => {
              return <MoumCard key={moum.id} moum={moum} onClick={() => {setFolderId(moum.id)}} />
            }) : moum.boardList.map((piece) => {
              return <LinkPieceCard key={piece.id} piece={piece} />
            })} */}
        </PieceBoard>
        <MoumFastFolderCreateForm />
      </Content>
      {/* <MoumModifyPopup /> */}
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
  padding-bottom: 100px;
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