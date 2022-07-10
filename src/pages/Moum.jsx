// module
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Container from "../components/common/Container";

// custom hook
import useLoginStatus from "../hooks/useLoginStatus";

// components
import Header from "../components/common/Header";
import MoumProfile from "../components/Moum/MoumProfile";
import LinkPieceCard from "../components/card/LinkPieceCard";
import MoumFastCreateForm from "../components/Moum/MoumFastCreateForm";
import MoumCategoryGroup from "../components/Moum/MoumCategoryGroup";
import MoumModifyPopup from "../components/Moum/MoumModifyPopup";
import MoumCard from "../components/card/MoumCard";

// redux
import MoumSortGroup from "../components/Moum/MoumSortGroup";
import MoumFastFolderCreateForm from "../components/Moum/MoumFastFolderCreateForm";
import { instance } from "../api/axios";
import useGetReactQuery from "../hooks/useGetReactQuery";

function Moum() {
  const [folderId, setFolderId] = useState(0);
  const {data: moum, isLoading} = useGetReactQuery(["moum", folderId], async ({queryKey}) => {
    const [_, id] = queryKey;
    if (id === 0) {
      const response = await instance.post("/folders/all");
      return response.data;
    } else {
      const response = await instance.post(`/boards/${id}/all`, [{category: "전체"}]);
      return response.data;
    }
  });

  // Custom Hook
  const checkLogin = useLoginStatus();

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    if (moum) {
      console.log(moum);
    }
  }, [!isLoading])

  return (
    isLoading ? <div>isLoading</div> :
    <Container>
      <Title>
        <Header />
        <div className="desc">
          <em>간편한 정보 아카이빙, moum</em>
          <p>링크, 글, 이미지 조각을 모아두고 쉽게 찾을 수 있어요.</p>
        </div>
        <MoumFastCreateForm />
      </Title>
      <Content>
        <MoumProfile />
        <PieceBoard>
          <MoumHeader>
            <MoumCategoryGroup />
            <MoumSortGroup />
          </MoumHeader>
          {folderId !== 0 && <button onClick={() => {setFolderId(0)}}>홈으로</button>}
          <MoumList>
            {folderId === 0 ? moum.map((moum) => {
              return <MoumCard key={moum.id} moum={moum} onClick={() => {setFolderId(moum.id)}} />
            }) : moum.boardList.map((piece) => {
              return <LinkPieceCard key={piece.id} piece={piece} />
            })}
          </MoumList>
        </PieceBoard>
        <MoumFastFolderCreateForm />
      </Content>
      <MoumModifyPopup />
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

  .desc {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    em {
      font-size: 36px;
      color: #5B2EDA;
    }

    p {
      padding-top: 20px;
      font-size: 20px;
      color: #9975FF;
    }
  }
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


const MoumList = styled.div`
  padding-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

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

export default Moum;

/*
  const addBoard = (e) => {
    e.preventDefault();

    const data = {
      title: titletRef.current.value,
      content: contentRef.current.value,
      status: statusRef.current.value,
      boardType: boardTypeRef.current.value
    }

    dispatch(addDataDB(data));
    titletRef.current.value = "";
    contentRef.current.value = "";
    statusRef.current.value = "";
    boardTypeRef.current.value = "";
  }

  const modifyBoard = (id) => {
    const data = {
      title: titletRef.current.value,
      content: contentRef.current.value,
      status: statusRef.current.value,
      boardType: boardTypeRef.current.value,
    }

    dispatch(modifyDataDB(id, data));

    titletRef.current.value = "";
    contentRef.current.value = "";
    statusRef.current.value = "";
    boardTypeRef.current.value = "";
  }

  const removeBoard = (id) => {
    dispatch(removeDataDB(id));
  }
*/