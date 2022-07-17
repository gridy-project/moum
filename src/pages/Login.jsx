import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SocialLogin from "components/Login/SocialLogin";
import { instance } from "shared/axios";
import { setToken } from "shared/localStorage";
import { useSetRecoilState } from "recoil";
import { isLogin } from "../state/user";

import noBG from "assets/images/pages/login/no-background.png";
import useCustomMutate from "hooks/useCustomMutate";
import { executeSignInAxios } from "utils/api/auth";

function Login() {
  const navigate = useNavigate();
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
    <Container>
      <Wrap>
        <BoxLeft>
          <Title>
            <h1>moum</h1>
            <p>모음에 가입하고 더 많은 정보를 쉽게 모아봐요.</p>
          </Title>
          <Imgbox>
            <img src={noBG} alt="noBG" />
          </Imgbox>
        </BoxLeft>
        <BoxRight>
          <Information>
            <form onSubmit={loginSubmit}>
              <input type="text" ref={idRef} className="username" placeholder="이메일" autoComplete="email" />
              <input type="password" ref={pwRef} className="password" placeholder="비밀번호" autoComplete="password" />
              {/* <input type="checkbox" className="checkbox" /> 로그인 상태 유지 */}
              <button className="btn-login">로그인</button>
            </form>
            <div className="option">
              <span>아이디 찾기</span>
              <span>비밀번호 찾기</span>
              <span onClick={() => navigate("/register")}>회원가입</span>
            </div>
            <SocialLogin />
          </Information>
        </BoxRight>
      </Wrap>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrap = styled.div`
  width: 1700px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoxLeft = styled.div`
  width: 1000px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  width: 1000px;
  h1 {
    margin-left : 15px;
    font-size: 60px;
  }
  p {
    margin : 15px;
    font-size: 30px;
  }
`;

const Imgbox = styled.div`
  width: 1000px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    width: 800px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const BoxRight = styled.div`
  width: 700px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Information = styled.div`
  width: 360px;

  .username, .password {
    width: 100%;
    height: 50px;
    border-radius: 20px;
    font-size: 18px;
    border: none;
    padding: 0 24px;
  }

  .password {
    margin-top: 24px;
  }

  .checkbox {
    margin : 15px auto;
  }

  .btn-login {
    width: 100%;
    height: 60px;
    border-radius: 20px;
    margin-top: 30px;
    font-size: 18px;
    padding: 10px;
    cursor: pointer;
    color: #FFFFFF;
    background-color: #909090;
    border: none;
    font-size: 23px;
    transition: background-color .3s;

    &:hover {
      background-color: #666666;
    }
  }

  .option {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    span {
      cursor: pointer;
      position: relative;
      font-size: 19px;
      font-weight: 400;
      color: #606060;
    }
    span + span {
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 1px;
        height: 16px;
        left: -18px;
        top: 50%;
        transform: translateY(-50%);
        background-color: #606060;
      }
    }
  }
`;

export default Login;
