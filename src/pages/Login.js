import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { login, loginRefresh } from "../shared/api";
import { setToken } from "../shared/localStorage";
import { instance } from "../shared/axios";
import SocialLogin from "../components/Login/SocialLogin";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const idRef = React.useRef();
  const pwRef = React.useRef();

  const loginDispatch = () => {
    let id = idRef.current.value;
    let pw = pwRef.current.value;

    if (id === "" || pw === "") {
      alert("아이디, 비밀번호를 모두 입력해주세요.");
      return;
    }
    dispatch(loginRequest(id, pw));
  };

  // 로그인
  const loginRequest = (username, password) => {
    return async function () {
      try {
        const response = await instance.post("/user/login", {
          username,
          password,
        });
        onLoginSuccess(response);
        alert("로그인 되었습니다");
        console.log(response);
      } catch (error) {
        alert("아이디와 비밀번호를 확인해주세요");
        console.log(error);
      }
    };
  };

  // 토큰 재발급 refresh Token
  const onSilentRefresh = () => {
    instance
      .post("/user/refresh")
      .then(onLoginSuccess)
      .catch((error) => {
        console.log(error);
      });
  };
  // 토큰 재발급 타이머
  const onLoginSuccess = (response) => {
    const JWT_EXPIRY_TIME = 3600 * 1000;
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000); // 60분 - 1분(밀리세컨드) = 만료하기 1분 전 로그인 연장
    setToken(response.data.accessToken, response.data.refreshToken);
    console.log(response.data);
  };

  return (
    <All>
      <Container>
        <Leftbox>
          <Title>
            <h1>moum</h1>
            <p>모음에 가입하고 더 많은 정보를 쉽게 모아봐요.</p>
          </Title>
          <Imgbox>
            <p> img </p>
          </Imgbox>
        </Leftbox>
        <Rightbox>
          <Information>
            <input type="text" ref={idRef} className="id-pw" placeholder="  이메일" /><br />
            <input type="password" ref={pwRef} className="id-pw" placeholder="  비밀번호" /><br />
            <input type="checkbox" className="checkbox" /> 로그인 상태 유지<br />
            <button className="login-button" onClick={() => loginDispatch()}>로그인</button><br />
            <br /><span>비밀번호 찾기</span>|
            <span>아이디 찾기</span>|
            <span onClick={() => navigate("/register")}>회원가입</span><br /><br />
            <button className="login-button"><img src="kakao.png" alt="kakao"></img>카카오 계정으로 로그인</button><br />
            <button className="login-button"><img src="google.png" alt="google"></img>구글 계정으로 로그인</button>
            <SocialLogin loginSuccess={onLoginSuccess} />
          </Information>
        </Rightbox>
      </Container>
    </All>

  );
}

const All = styled.div`
width: 100%;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
`;
const Container = styled.div`
width: 1700px;
height: 800px;
border : 1px solid black;
display: flex;
align-items: center;
justify-content: center;
`;
const Leftbox = styled.div`
width: 1000px;
height: 800px;
border : 1px solid black;
display: flex;
flex-direction: column;
justify-content: space-between
`;
const Title = styled.div`
width: 1000px;
border : 1px solid black;
h1 {
  margin-left : 15px;
  font-size: 60px;
  font-weight: bold;
}
p {
  margin : 15px;
  font-size: 30px;
  font-weight: bold;
}
`;
const Imgbox = styled.div`
width: 1000px;
height: 600px;
border : 1px solid black;
display: flex;
align-items: center;
justify-content: center;
p {
  width: 800px;
  height: 500px;
  border : 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;
const Rightbox = styled.div`
width: 700px;
height: 800px;
border : 1px solid black;
display: flex;
align-items: center;
justify-content: center;
`;

const Information = styled.div`
width: 360px;
.id-pw {
  width: 360px;
  height: 50px;
  border-radius: 20px;
  margin: 15px auto;
  font-size: 18px;
}
.checkbox {
  margin : 15px auto;
}
.login-button {
  width: 360px;
  height: 50px;
  border-radius: 20px;
  margin: 15px auto;
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
}
span {
  margin: 18px;
  cursor: pointer;
}
img {
  float: left;
}
`;

export default Login;
