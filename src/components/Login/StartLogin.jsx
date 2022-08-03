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

  //오류메시지 상태저장
  const [usernameMessage, setUsernameMessage] = React.useState("");

  // 로그인
  const {mutateAsync: login} = useExecuteLogin();

  const loginSubmit = async (e) => {
    e.preventDefault();
    let username = idRef.current.value;
    let password = pwRef.current.value; 

    if (username === "" || password === "") {
      setUsernameMessage("아이디와 비밀번호를 입력해주세요.");
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
        <ErrorMessage>
          {usernameMessage}
        </ErrorMessage>
        </LoginInputBox>
      
        <LoginBtn>로그인</LoginBtn>
      </form>
       <TabBox>
        <Tab onClick={() => {
          navigate("/auth/id");
        }}>아이디 찾기</Tab>
        <span>|</span>
        <Tab onClick={() => {
          navigate("/auth/pw");
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
      mb-[24px]
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
const ErrorMessage = styled.span`
   color:#FF5C5C;
    font-size: 13px;
    ${tw`font-medium `}
`

const LoginBtn = styled.button`
  ${tw`
    w-[360px] h-[44px] border-none rounded-[50px] cursor-pointer bg-[#9E67FF] text-[#FFFFFF] transition-colors duration-300
  `}

  &:hover {
    background-color: #7240c9;
  }
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
  ${tw`
    p-[12px 20px] cursor-pointer text-[#606060] text-12 transition-colors duration-300
  `}

  &:hover {
    color: #000000;
  }
`;

export default StartLogin;