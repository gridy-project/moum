// React
import React, { useState } from 'react';
// Recoil
import { useRecoilState } from "recoil";
import { numberLoginState, viewAccountState } from 'state/login';
// css
import styled from "styled-components";
import tw from "twin.macro";

const SuccessFindId = () => {
  const [viewId, setViewID] = useRecoilState(viewAccountState)
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
  ${tw`
    relative top-[-37px]
  `}
`;

const IdTitle = styled.h1`
  font-size:28px;
  color:#303030;
  ${tw`
    mb-[52px] font-semibold
  `}
`;

const IdContent = styled.div`
  p {
    font-size:17px;
    ${tw`
    mb-[18px] 
    `}
  }
  input {
    border: #B7B7B7;
    &:focus {
      outline: 1px solid #9152FF;
    }
    ${tw`
    w-[360px] h-[44px] border-solid border-[1px] p-[14px]
    `}
  }
`;

const IdBtn = styled.button`
  background: #9E67FF;
  color:#fff;
  font-size: 17px;
  ${tw`
  w-[360px] h-[44px] rounded-[50px] border-none mt-[32px] font-semibold cursor-pointer
  `}
`;

const FoundIdBox = styled.div`
  background: #F7F3FD;
  ${tw`
  w-[360px] h-[44px] rounded-[10px] table table-fixed
  `}
  p {
    color: #721EFC;
    font-size: 16px;
    ${tw`
    text-center table-cell align-middle font-semibold
  `}
  }
`

const IdPwdBtn = styled.button`
  border: #D2BAFF;
  background: #FFFFFF;
  color: #AC7DFF;
  font-size: 17px;
  ${tw`
  w-[360px] h-[44px] rounded-[50px] font-semibold mt-[12px] cursor-pointer border-solid border-[1px]
  `}
`;

export default SuccessFindId;