import React, { useRef, useState } from 'react';
// React Query
import { useMutation, useQuery } from "react-query";
import queryClient from "shared/query";
// axios
import { instance } from "shared/axios"
// css
import styled from "styled-components";
import background from "../assets/images/pages/login/background.png"
import moumlogo from "../assets/images/pages/login/moum_logo.png"
import googlelogo from "../assets/images/pages/login/google_logo.png";
import line from "../assets/images/pages/login/Line.png";
import check from "../assets/images/pages/login/check.png";
import circle from "../assets/images/pages/login/circle.png";
// component
import Header from "components/Common/Header";
import SearchId from 'components/Login/SearchId';

 const LoginPage = (props) => {
  return (
    <div>
      <MoumLogo>
        <img src={moumlogo} alt="" />
      </MoumLogo> 
      <SocialLoginBox>
        <img src={googlelogo} alt=""></img>
        <p>구글 계정으로 시작하기</p>
      </SocialLoginBox>
      <LineBox>
        <img src={line} alt="" />
        <p>OR</p>
        <img src={line} alt="" />
      </LineBox>
      <LoginInputBox>
        <input placeholder='아이디'/>
        <input placeholder='비밀번호'/>
      </LoginInputBox>
      <KeepingLogin>
        <LoginImgBox>
          <CircleImg src={circle} alt=""/>
          <CheckImg src={check} alt="" />
        </LoginImgBox>
        <p>로그인 상태 유지</p>
      </KeepingLogin>
      <LoginBtn>로그인</LoginBtn>
       <TabBox>
        <Tab onClick={() => {
          props.runid()
        }}>아이디 찾기</Tab>
        <span>|</span>
        <Tab onClick={() => {
          props.runpwd()
        }}>비밀번호 재설정</Tab>
        <span>|</span>
        <Tab onClick={() => {
         props.runjoin()
        }}>회원가입</Tab>
      </TabBox>     
    </div>
  )
 }

 const FingPwdPage = () => {
  return (
    <PwdContainer>
      <PwdTitle>비밀번호 찾기</PwdTitle>
      <PwdCheckId>
        <p>아이디</p>
        <input type="text" placeholder='아이디 입력' />
      </PwdCheckId>
      <PwdCheckEmail>
        <p>이메일로 본인 확인</p>
        <PwdEmailBox>
          <input type="text" placeholder='이메일'/>
          <button>인증요청</button>
        </PwdEmailBox>
        <PwdCodeBox>
          <input type="text" placeholder='인증코드를 입력해주세요.'/>
        <button>확인</button>  
        </PwdCodeBox>
      </PwdCheckEmail>
    </PwdContainer>
  )
 }

 const JoinPage = () => {
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

const NewLogin = () => {
  const [state, setState] = useState(0);

  const runLoginPage = () => {
    setState(0)
  }
  const runPwdPage = () => {
    setState(1)
  }
  const runIdPage = () => {
    setState(2)
  }
  const runJoinPage = () => {
    setState(3)
  }

  return (
    <Container>
      <Header selected={3}/>
      <img src={background} alt=""/>
      <Box>
        <ChangeContainer>
          <Content>
            {state === 0 && <LoginPage
              runlogin={runLoginPage}
              runpwd={runPwdPage}
              runid={runIdPage}
              runjoin={runJoinPage}
            />}
            {state === 1 && <FingPwdPage />}
            {state === 2 && <SearchId/>}
            {state === 3 && <JoinPage />}
          </Content>
        </ChangeContainer>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  position:relative;
`;

const Box = styled.div`
  width: 1453px;
  height: 702px;
  position:absolute;
  top:219px;
  right:310px;
`;

const ChangeContainer = styled.div`
  width: 540px;
  height: 702px;
  background-color:#fff;
  border-radius: 24px;
  float:right;
`;
const Content = styled.div`
  width: 369px;
  height: 435px;
  margin-left:90px;
  margin-top:130px;
`;

const TabBox = styled.div`
  width: 310px;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:14px;
  margin-left:15px;
  span {
    color:#A4A4A4;
  }
`;

const Tab = styled.p`
  color:#606060;
  font-size: 12px;
  padding: 12px 20px;
  cursor: pointer;
`;

// Login
const MoumLogo = styled.div`
  width: 90.56px;
  height: 23px;
  margin: 0 auto 33px auto;
`;

const SocialLoginBox = styled.div`
  width: 360px;
  height: 44px;
  background: #F8F8F8;
  border: 1px solid #E9E9E9;
  border-radius: 50px;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor: pointer;
  p {
    margin-left:10px;
  }
  img {
    width: 16px;
    height: 16px;
  }
`;

const LineBox = styled.div`
  display:flex;
  align-items:center;
  margin: 32px 0;
  img {
    width: 160px;
    height: 1px;
  }
  p {
    color : #949494;
    font-size: 14px;
    margin: 0 9px;
  }
`;

const LoginInputBox = styled.div`
  margin-bottom:5px;
  input {
    width: 360px;
    height: 44px;
    border: 1px solid #B7B7B7;
    border-radius: 10px;
    padding: 14px;
    margin-bottom:12px;
  }
`;

const KeepingLogin = styled.div`
  display:flex;
  align-items:center;
  margin-bottom:33px;
  p { 
    color:#909090;
  }
`;

const LoginImgBox = styled.div`
   position:relative;
   cursor: pointer;
`;

const CircleImg = styled.img`
 margin-right:6.83px;
`
const CheckImg = styled.img`
  width: 9.17px;
  height:6.33px;
  position:absolute;
  top: 7.5px;
  left: 5.5px;
`

const LoginBtn = styled.button`
  width: 360px;
  height: 44px;
  background: #9E67FF;
  border-radius: 50px;
  border:none;
  color:#fff;
  cursor: pointer; 
`;

// FindPwd
const PwdContainer = styled.div`
  position:relative;
  top:-37px;
`;

const PwdTitle = styled.h1`
  font-size:28px;
  color:#303030;
  margin-bottom:52px;
`
const PwdCheckId = styled.div`
  p {
    font-size:17px;
    color:#303030;
    margin-bottom:18px;
  }
  input {
    width: 360px;
    height: 44px;
    border: 1px solid #B7B7B7;
    border-radius: 10px;
    padding: 14px;
  }
`

const PwdCheckEmail = styled.div`
  margin-top:40px;
`;

const PwdEmailBox = styled.div`
  margin-bottom:12px;
  input {
    margin-top:18px;
    width: 268px;
    height: 44px;
    border: 1px solid #B7B7B7;
    border-radius: 10px;
    padding: 14px;
  }
  button {
    width: 84px;
    height: 44px;
    background: #9E67FF;
    border-radius: 10px;
    border:none;
    color: #fff;
    margin-left:8px;
    cursor: pointer;
  }
`
const PwdCodeBox = styled.div`
  input {
    width: 268px;
    height: 44px;
    border: 1px solid #B7B7B7;
    border-radius: 10px;
    padding: 14px;
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
`

// FindId


// Join
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

export default NewLogin;