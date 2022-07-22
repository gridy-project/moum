// React
import React from 'react';
// css
import styled from "styled-components";

const Join = () => {
  return (
    <JoinContainer>
      <JoinTitle>회원가입</JoinTitle>
      <JoinCheckBox>
        <p>이메일로 본인 확인</p>
        <JoinEmailBox>
          <input type="text" placeholder='이메일' />
          <button>인증요청</button>
        </JoinEmailBox>
        <JoinCodeBox>
          <input type="text" placeholder='인증코드를 입력해주세요.' />
          <button>확인</button>
        </JoinCodeBox>
      </JoinCheckBox>
      <CreateBox>
        <p>계정 만들기</p>
        <input type="text" placeholder='아이디' />
        <input type="text" placeholder='비밀번호 (숫자, 영문자 포함 4자 이상)' />
        <input type="text" placeholder='비밀번호 확인' />
      </CreateBox>
      <JoinBtn>회원가입</JoinBtn>
    </JoinContainer>
  )
 }

 const JoinContainer = styled.div`
  position:relative;
  top:-37px;
`;

const JoinTitle = styled.h1`
  font-size: 28px;
  margin-bottom:52px;
`;

const JoinCheckBox = styled.div`
  margin-bottom:40px;
  p {
    font-size: 17px;
    margin-bottom:18px;
  }
`;
const JoinEmailBox = styled.div`
  margin-bottom:12px;
  input {
    width: 268px;
    height: 44px;
    border: 1px solid #B7B7B7;
    border-radius: 10px;
    padding: 14px;
    &:focus {
		  outline: 1px solid #9152FF;
	  }
  }
  button {
    width: 84px;
    height: 44px;
    background: #9E67FF;
    border-radius: 10px;
    margin-left:8px;
    border:none;
    color:#fff;
    cursor: pointer;
  }
`;
const JoinCodeBox = styled.div`
  input {
    width: 268px;
    height: 44px;
    border: 1px solid #B7B7B7;
    border-radius: 10px;
    padding: 14px;
    &:focus {
		  outline: 1px solid #9152FF;
	  }
  }
  button {
    width: 84px;
    height: 44px;
    background: #ECECEC;
    border-radius: 10px;
    border:none;
    color: #8B8B8B;
    margin-left:8px;
    cursor: pointer;
  }
`;
const CreateBox = styled.div`
  p {
    color:#303030;
    font-size: 17px;
    margin-bottom:18px;
  }
  input {
    width: 360px;
    height: 44px;
    border: 1px solid #B7B7B7;
    border-radius: 10px;
    padding: 14px;
    margin-bottom:12px;
    &:focus {
		  outline: 1px solid #9152FF;
	  }
  }
`;
const JoinBtn = styled.button`
  width: 360px;
  height: 44px;
  background: #9E67FF;
  border-radius: 50px;
  color:#fff;
  border:none;
  margin-top:16px;
  cursor: pointer;
`

export default Join;