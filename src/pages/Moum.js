import { React, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Header from "../components/common/Header";
import MoumProfile from "../components/Moum/MoumProfile";
import searchIcon from "../public/img/icon-search-mono.png";
import { addDataDB, getDataDB, modifyDataDB, removeDataDB } from "../redux/modules/postSlice";

function Moum() {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.post.list);

  const titletRef = useRef();
  const contentRef = useRef();
  const statusRef = useRef();
  const boardTypeRef = useRef();

  useEffect(() => {
    dispatch(getDataDB());
    console.log(postList, "dlr");
  }, []);

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

  return (
    <Container>
      <Header />
      <Content>
        <MoumProfile />
        <MoumFiles>
          <MoumHeader>
            <div className="search">
              <div className="box-left">
                <form onSubmit={(e) => { e.preventDefault() }}>
                  <input type="text" />
                  <button><img src={searchIcon} alt="search" /></button>
                </form>
                <div>전체 파일 | <span>58</span>개</div>
              </div>
              <div className="box-right">
                <button >Add Folder</button>
              </div>
            </div>
            <div className="select">
              <div className="category">
                <ul>
                  <li>카테고리 전체</li>
                  <li>음식</li>
                  <li>운동</li>
                  <li>뉴스</li>
                  <li>여행</li>
                </ul>
              </div>
              <div className="view-type">
                <select name="" id="">최신순</select>
                <select name="" id="">폴더와 파일 보기</select>
              </div>
            </div>
          </MoumHeader>
          <MoumList>
            {postList.boardList?.map((v, i) => {
              return (
                <div key={i}>
                  <div>{v.title}</div>
                  <div>{v.content}</div>
                  <div>{v.explanation}</div>
                  <div>{v.imgPath}</div>
                  <button onClick={() => { modifyBoard(v.id) }}>수정</button>
                  <button onClick={() => { removeBoard(v.id) }}>삭제</button>
                </div>
              )
            })}
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
        </MoumFiles>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 1200px;
`;

const MoumFiles = styled.div`
`;

const MoumHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  height: 40px;

  .search {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;


    .box-left {
      display: flex;
      align-items: center;
      form {
        width: 250px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        box-shadow: 0px 3px 16px 4px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        overflow: hidden;
        
        input {
          width: 100%;
          border: none;
          outline: none;
          padding: 0 20px;
        }

        button {
          flex-shrink: 0;
          border: none;
          width: 45px;
          background-color: #ABABAB;
          box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.25);
          border-radius: 20px;
        }
      }

      div {
        margin-left: 20px;
      }
    }

    .box-right {
      button {
        height: 100%;
        border: none;
        border-radius: 5px;
        font-size: 12px;
        padding: 0 20px;
      }
    }
  }

  .select {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .category {
      ul {
        display: flex;
        li {

        }
      }
    }

    .view-type {

    }
  }
`;

const MoumList = styled.div`

`;

export default Moum;