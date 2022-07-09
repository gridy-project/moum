// module
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Container from "../components/common/Container";

// custom hook
import useLoginStatus from "../hooks/useLoginStatus";

// Components
import Header from "../components/common/Header";
import MoumProfile from "../components/Moum/MoumProfile";
import LinkPieceCard from "../components/card/LinkPieceCard";
import MoumFastCreateForm from "../components/Moum/MoumFastCreateForm";
import MoumCategoryGroup from "../components/Moum/MoumCategoryGroup";
import MoumModifyPopup from "../components/Moum/MoumModifyPopup";
import MoumCard from "../components/card/MoumCard";

// redux
import { setBackground } from "../redux/modules/optionSlice";
import { getPieceThunk } from "../redux/modules/moumSlice";
import MoumSortGroup from "../components/Moum/MoumSortGroup";
import useHandleChange from "../hooks/useHandleChange";
import { addMoum } from "../api/moum";

function Moum() {
  const dispatch = useDispatch();

  // Custom Hook
  const checkLogin = useLoginStatus();
  const {input, handleChange} = useHandleChange({
    name: "",
    share: "NONE"
  });

  const {boardList, folderList} = useSelector((state) => state.moum);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    dispatch(setBackground("#F6F5FB")); // 이 페이지에서만 회색 배경
    dispatch(getPieceThunk());
    return (() => {
      dispatch(setBackground("#FFFFFF")); // 페이지가 사라질 때 흰색 배경으로 복구
    });
  }, [dispatch]);

  useEffect(() => {
    console.log(boardList);
    console.log(folderList);
  }, [boardList, folderList]);

  const submitAddFolder = async (e) => {
    e.preventDefault();
    const moum = {
      name: input.name,
      status: input.share
    }
    const {result} = await addMoum(moum);
    if (result) {
      alert("폴더 생성 성공");
    } else {
      alert("폴더 생성 실패");
    }
  };

  return (
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
          <MoumList>
            {folderList.map((moum) => {
              return <MoumCard key={moum.id} moum={moum} />
            })}
            {boardList.map((piece) => {
              return <LinkPieceCard key={piece.id} piece={piece} />
            })}
          </MoumList>
        </PieceBoard>
        <MakeFolder onSubmit={submitAddFolder}>
          폴더명<input type="text" onChange={handleChange("name")} value={input.name} />
          공유설정
          <select onChange={handleChange("share")} value={input.share}>
            <option value="NONE">공유 설정</option>
            <option value="PUBLIC">공개</option>
            <option value="PRIVATE">비공개</option>
          </select>
          <button>폴더 생성</button>
        </MakeFolder>
      </Content>
      <MoumModifyPopup />
    </Container>
  )
}

const MakeFolder = styled.form`

`;

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