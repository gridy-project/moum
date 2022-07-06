import { React, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import Container from "../components/common/Container";

import Header from "../components/common/Header";
import MoumProfile from "../components/Moum/MoumProfile";
import searchIcon from "../public/img/icon-search-mono.png";
import { setBackground } from "../redux/modules/optionSlice";
import { addDataDB, getDataDB, modifyDataDB, removeDataDB } from "../redux/modules/postSlice";

function Moum() {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.post.list);

  const titletRef = useRef();
  const contentRef = useRef();
  const statusRef = useRef();
  const boardTypeRef = useRef();

  useEffect(() => {
    dispatch(setBackground("#F5F5F5")); // 이 페이지에서만 회색 배경
    dispatch(getDataDB());
    return (() => {
      dispatch(setBackground("#FFFFFF")); // 페이지가 사라질 때 흰색 배경으로 복구
    });
  }, [dispatch]);

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

  const makePiece = (e) => {

  }

  return (
    <Container>
      <Title>
        <Header />
        <div className="desc">
          <em>간편한 정보 아카이빙, moum</em>
          <p>링크, 글, 이미지 조각을 모아두고 쉽게 찾을 수 있어요.</p>
        </div>
        <form className="maker" onSubmit={makePiece}>
          <div>
            {/* <div className="selected-type">링크</div> */}
            <select className="select-type">
              <option value="LINK">링크</option>
              <option value="MEMO">메모</option>
            </select>
            {/* <ul class="select-type">
              <li>링크</li>
              <li>글</li>
            </ul> */}
          </div>
          <input type="text" />
          <button>바로 생성하기</button>
        </form>
      </Title>
      <Content>
        <MoumProfile />
        <PieceBoard>
          <MoumHeader>
            <CategoryGroup>
              <div className="category-title">카테고리</div>
              <ul className="category-list">
                <Category isActive={true}>전체</Category>
                <Category>음식</Category>
                <Category>여행</Category>
                <Category>운동</Category>
              </ul>
            </CategoryGroup>
            <SortGroup>
              <select>
                <option>최신 조각순</option>
                <option>사용자 지정순</option>
              </select>
              <form>
                <input type="text" />
                <button>검색</button>
              </form>
            </SortGroup>
          </MoumHeader>
          <MoumList>
            {postList.boardList?.map((post, i) => {
              return (
                <div key={i}>
                  <div>{post.title}</div>
                  <div>{post.content}</div>
                  <div>{post.explanation}</div>
                  <div>{post.imgPath}</div>
                  <button onClick={() => { modifyBoard(post.id) }}>수정</button>
                  <button onClick={() => { removeBoard(post.id) }}>삭제</button>
                </div>
              )
            })}
            <div>링크타입</div>
            <form onSubmit={addBoard}>
              <input type="text" ref={titletRef} />
              <input type="text" ref={contentRef} />
              <select ref={statusRef}>
                <option value="PUBLIC">PUBLIC</option>
                <option value="PRIVATE">PRIVATE</option>
              </select>
              <select ref={boardTypeRef}>
                <option value="MEMO">MEMO</option>
              </select>
              <button>추가</button>
            </form>
            <div>메모타입</div>
            <form onSubmit={addBoard}>
              <input type="text" ref={titletRef} />
              <input type="text" ref={contentRef} />
              <select ref={statusRef}>
                <option value="PUBLIC">PUBLIC</option>
                <option value="PRIVATE">PRIVATE</option>
              </select>
              <select ref={boardTypeRef}>
                <option value="MEMO">MEMO</option>
              </select>
              <button>추가</button>
            </form>
          </MoumList>
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

  form.maker {
    margin-top: 90px;
    width: 620px;
    height: 50px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 16px 4px rgba(145, 82, 255, 0.2);
    border-radius: 25px;

    > div {
      flex-shrink: 0;
      width: 80px;
      height: 70%;
      border-right: 1px solid #ddd;
      display: flex;
      justify-content: center;
      align-items: center;

      select {
        border: none;
        width: 60%;
        height: 100%;
      }
      /* div.selected-type {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      ul.select-type {
        display: none;
        li {

        }
      } */
    }

    input {
      border: none;
      width: 100%;
    }

    button {
      flex-shrink: 0;
      width: 150px;
      font-size: 16px;
      border: none;
      background: transparent;
      color: #721EFC;
      cursor: pointer;
    }
  }
`;

const Content = styled.div`
  width: 1200px;
`;

const PieceBoard = styled.div`
  margin-top: 80px;
`;

const MoumHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CategoryGroup = styled.div`
  .category-title {
    font-size: 22px;
    color: #111111;
    font-weight: bold;
  }

  .category-list {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
  }
`;

const Category = styled.li`
  padding: 0 15px;
  height: 40px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  border-radius: 20px;
  ${({isActive}) => isActive ? css`
    border: 1px solid #721EFC;
    color: #721EFC;
  ` : css`
    border: 1px solid #C8C8C8;
    color: #555555;
  `}

  & + & {
    margin-left: 10px;
  }
`;

const SortGroup = styled.div`
`;

const MoumList = styled.div``;

export default Moum;