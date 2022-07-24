// React
import React from 'react';
import { useNavigate } from "react-router-dom";
// Recoil
import { useSetRecoilState } from "recoil";
import useCustomMutate from "hooks/useCustomMutate";
import { executeSignInAxios } from "utils/api/auth";
// css
import styled from "styled-components";
import moumlogo from "../../assets/images/pages/login/moum_logo.png"
import line from "../../assets/images/pages/login/Line.png";
import check from "../../assets/images/pages/login/check.png";
import circle from "../../assets/images/pages/login/circle.png";
// shared
import { setToken } from "shared/localStorage";
// component
import SocialLogin from './SocialLogin';
import { isLogin } from 'state/common/user';

const StartLogin = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const setLoginStatus = useSetRecoilState(isLogin);

  const idRef = React.useRef(null);
  const pwRef = React.useRef(null);

  // 로그인
  const {mutateAsync: login} = useCustomMutate(async (data) => await executeSignInAxios(data));

  const loginSubmit = async (e) => {
    e.preventDefault();
    let username = idRef.current.value;
    let password = pwRef.current.value; 

    if (username === "" || password === "") {
      alert("아이디, 비밀번호를 모두 입력해주세요.");
      return;
    }

    const {result, data} = await login({username, password});
    
    if (result) {
      alert("로그인 성공");
      setToken(data.accessToken, data.refreshToken);
      setLoginStatus(true);
      navigate("/");
    } else {
      alert("로그인 실패");
      setLoginStatus(false);
    }
  };

  return (
    <div>
      <MoumLogo>
        <img src={moumlogo} alt="" />
      </MoumLogo>
      <SocialLogin/>
      <LineBox>
        <img src={line} alt="" />
        <p>OR</p>
        <img src={line} alt="" />
      </LineBox>
      <form onSubmit={loginSubmit}>
        <LoginInputBox>
          <input type="text" ref={idRef} placeholder='아이디'/>
          <input type="password" ref={pwRef} placeholder='비밀번호'/>
        </LoginInputBox>
        {/* <KeepingLogin>
          <LoginImgBox>
            <CircleImg src={circle} alt=""/>
            <CheckImg src={check} alt="" />
          </LoginImgBox>
          <p>로그인 상태 유지</p>
        </KeepingLogin> */}
        <LoginBtn>로그인</LoginBtn>
      </form>
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
  width: 144px;
  height: 40px;
  margin: 110px 0 36px 100px;
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
  margin-bottom:16px;
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