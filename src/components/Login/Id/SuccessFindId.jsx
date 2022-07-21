// React
import React, { useState } from 'react';
// Recoil
import { useRecoilState } from "recoil";
import { numberLoginState, viewAccountState } from 'state/login';
// css
import styled from "styled-components";

const SuccessFindId = () => {
  const [viewId, setViewID] = useRecoilState(viewAccountState)
  console.log(viewId)
  const [numberState, setNumberState] = useRecoilState(numberLoginState)

  const goToLogin = () => {
    window.location.reload();
  }

  const ChangeIdPageNumber = () => {
    setNumberState(1)
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
      <IdPwdBtn onClick={ChangeIdPageNumber}>비밀번호 재발급하기</IdPwdBtn> 
    </IdContainer>
  )
 }  

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

export default SuccessFindId;