// React
import React, { useRef, useState } from 'react';
// React Query
import { useMutation } from "react-query";
// // Recoil
import { useRecoilState } from "recoil";
import { viewAccountState } from 'state/login';
// axios
import { instance } from "shared/axios"
// css
import styled from "styled-components";

// 아이디 찾기
 const FingIdPage = (props) => {
  const idEmailRef = useRef(null);

  const [viewId, setViewID] = useRecoilState(viewAccountState)

  const searchIdForm = (e) => {

    e.preventDefault();
    const data = {
      email : idEmailRef.current.value
    }
    console.log(data)
    props.runSuccessFindId();
    searchId(data);
  }

  const { mutate: searchId } = useMutation(
    async (data) => {
      const response = await instance.post("/find/username", data);
      console.log(response)
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        setViewID(data)
      },
			onError: (err) => {
				console.log(err)
			}
    }
  )
  
  return (
    <IdContainer>
    <IdTitle>아이디 찾기</IdTitle>
      <form onSubmit={searchIdForm}>
        <IdContent>
          <p>이메일로 본인 확인</p>
          <input type="text" ref={idEmailRef} />
        </IdContent>
        <IdBtn>아이디 찾기</IdBtn>
      </form>  
    </IdContainer>
  )
 }

 // 아이디 찾기 완료
 const SuccessFindId = () => {
  const [viewId, setViewID] = useRecoilState(viewAccountState)
  
  const goToLogin = () => {
    window.location.reload();
  }

  return (
    <IdContainer>
      <IdTitle>아이디 찾기 완료</IdTitle>
        <IdContent>
          <p>계정 아이디</p>
          <FoundIdBox>
            <p>{viewId}</p>
          </FoundIdBox>
        </IdContent>
      <IdBtn onClick={goToLogin}>로그인 하러가기</IdBtn> 
      <IdPwdBtn>비밀번호 찾기</IdPwdBtn> 
    </IdContainer>
  )
 }  

const SearchId = () => {
  const [searchIdState, setSearchIdState] = useState(0);

  const runSearchId = () => {
    setSearchIdState(0);
  }
  const runSuccessId = () => {
    setSearchIdState(1);
  }
  return (
    <div>
      {searchIdState === 0 && <FingIdPage
        runFindId={runSearchId}
        runSuccessFindId={runSuccessId}
      />}
      {searchIdState === 1 && <SuccessFindId />}
    </div>
  );
};

// FingIdPage 
const IdContainer = styled.div`
  position:relative;
  top:-37px;
`;

const IdTitle = styled.h1`
  font-size:28px;
  margin-bottom:52px;
  font-weight: 600;
  color:#303030;
`;
const IdContent = styled.div`
  p {
    font-size:17px;
    margin-bottom: 18px;
  }
  input {
    width: 360px;
    height: 44px;
    border: 1px solid #B7B7B7;
    border-radius: 10px;
    padding: 14px;
    &:focus {
      outline: 1px solid #9152FF;
    }
  }
`;

const IdBtn = styled.button`
  width: 360px;
  height: 44px;
  background: #9E67FF;
  border-radius: 50px;
  color:#fff;
  border:none;
  margin-top:32px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
`;

// SuccessFindId
const FoundIdBox = styled.div`
  width: 360px;
  height: 44px;
  background: #F7F3FD;
  border-radius: 10px;
  display: table;
  table-layout: fixed;
  p {
    text-align:center;
    display: table-cell; 
    vertical-align:middle;
    color: #721EFC;
    font-size: 16px;
    font-weight: 600;
  }
`

const IdPwdBtn = styled.button`
  width: 360px;
  height: 44px;
  border: 1px solid #D2BAFF;
  background: #FFFFFF;
  border-radius: 50px;
  color: #AC7DFF;
  font-weight: 600;
  font-size: 17px;
  margin-top:12px;
  cursor: pointer;
`;

export default SearchId;