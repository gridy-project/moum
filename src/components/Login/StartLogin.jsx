// React
import React from 'react';
// css
import styled from "styled-components";
import moumlogo from "../../assets/images/pages/login/moum_logo.png"
import googlelogo from "../../assets/images/pages/login/google_logo.png";
import line from "../../assets/images/pages/login/Line.png";
import check from "../../assets/images/pages/login/check.png";
import circle from "../../assets/images/pages/login/circle.png";

const StartLogin = (props) => {
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
        }}>비밀번호 재발급</Tab>
        <span>|</span>
        <Tab onClick={() => {
         props.runjoin()
        }}>회원가입</Tab>
      </TabBox>     
    </div>
  )
 }

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

export default StartLogin;