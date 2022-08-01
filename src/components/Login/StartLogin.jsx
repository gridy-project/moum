// React
import React from 'react';
import { useNavigate } from "react-router-dom";
// Recoil
import { useSetRecoilState } from "recoil";
// css
import tw from "twin.macro";
import Swal from "sweetalert2";
import styled from "styled-components";
import moumlogo from "../../assets/images/pages/login/moum_logo.png"
import line from "../../assets/images/pages/login/Line.png";
// import check from "../../assets/images/pages/login/check.png";
// import circle from "../../assets/images/pages/login/circle.png";
// shared
import { setToken } from "shared/localStorage";
// component
import SocialLogin from './SocialLogin';
import { isLogin } from 'state/common/user';
import { useExecuteLogin } from 'hooks/query/useQueryUser';
import useMessageFloat from 'hooks/useMessageFloat';

const StartLogin = (props) => {
  const navigate = useNavigate();
  const toast = useMessageFloat();

  const setLoginStatus = useSetRecoilState(isLogin);

  const idRef = React.useRef(null);
  const pwRef = React.useRef(null);

  // 로그인
  const {mutateAsync: login} = useExecuteLogin();

  const loginSubmit = async (e) => {
    e.preventDefault();
    let username = idRef.current.value;
    let password = pwRef.current.value; 

    if (username === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "로그인 실패",
        text: "아이디, 비밀번호를 모두 입력해주세요"
      });
      return false;
    }

    try {
      const {result, data} = await login({username, password});
      
      if (result === true) {
        setToken(data.accessToken, data.refreshToken);
        toast("로그인 되었습니다");
        setLoginStatus(true);
        navigate("/moum");
      } else if (result === false) {
        Swal.fire({
          icon: "error",
          title: "로그인 실패"
        })
        setLoginStatus(false);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "로그인 실패"
      });
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
          <input type="text" ref={idRef} placeholder='아이디' autoComplete='username'/>
          <input type="password" ref={pwRef} placeholder='비밀번호' autoComplete='password'/>
        </LoginInputBox>
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
          navigate("/register");
        }}>회원가입</Tab>
      </TabBox>
    </div>
  )
 }

 const MoumLogo = styled.div`
  ${tw`
    w-[144px] h-[40px] m-[0 auto 40px] pr-[10px]
  `}
`;

const LineBox = styled.div`
  ${tw`
    m-[32px 0] flex items-center
  `}
  img {
    ${tw`
      w-[160px] h-[1px]
    `}
  }
  p {
    color : #949494;
    font-size: 14px;
    ${tw`
      m-[0 9px]
    `}
  }
`;

const LoginInputBox = styled.div`
  ${tw`
      mb-[16px]
    `}
  input {
    border: #B7B7B7;
    &:focus {
		  outline: 1px solid #9152FF;
	  }
    ${tw`
      w-[360px] h-[44px] border-solid border-[1px] rounded-[10px] p-[14px] mb-[12px]
    `}
  }
`;

const LoginBtn = styled.button`
  background: #9E67FF;
  color:#fff;
  ${tw`
    w-[360px] h-[44px] border-none rounded-[50px] cursor-pointer
  `}
`;

const TabBox = styled.div`
  ${tw`
    w-[310px] flex justify-center items-center mt-[14px] ml-[15px]
  `}
  span {
    color:#A4A4A4;
  }
`;

const Tab = styled.p`
  color:#606060;
  font-size: 12px;
  ${tw`
    p-[12px 20px] cursor-pointer
  `}
`;

export default StartLogin;