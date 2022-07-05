import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { setToken } from "../shared/localStorage";
import SocialLogin from "../components/Login/SocialLogin";
import { JWT_REFRESH_TIME, refresh, signIn } from "../api/auth";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../redux/modules/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const idRef = React.useRef(null);
  const pwRef = React.useRef(null);


  const loginSubmit = (e) => {
    e.preventDefault();
    let id = idRef.current.value;
    let pw = pwRef.current.value; 

    if (id === "" || pw === "") {
      alert("아이디, 비밀번호를 모두 입력해주세요.");
      return;
    }

    loginAsync(id, pw);
  };

  // 로그인
  const loginAsync = async (username, password) => {
    const {accessToken, refreshToken} = await signIn({ username, password });
    if (accessToken) {
      setToken(accessToken, refreshToken);
      dispatch(setLoginStatus(true));
      navigate("/moum");
      setTimeout(() => {refresh(dispatch)}, JWT_REFRESH_TIME); // 59분마다 리프레시
    }
  };

  return (
    <Container>
      <Wrap>
        <Leftbox>
          <Title>
            <h1>moum</h1>
            <p>모음에 가입하고 더 많은 정보를 쉽게 모아봐요.</p>
          </Title>
          <Imgbox>
            <p>img</p>
          </Imgbox>
        </Leftbox>
        <Rightbox>
          <Information>
            <form onSubmit={loginSubmit}>
              <input type="text" ref={idRef} className="id-pw" placeholder="  이메일" />
              <input type="password" ref={pwRef} className="id-pw" placeholder="  비밀번호" />
              <input type="checkbox" className="checkbox" /> 로그인 상태 유지
              <button className="login-button">로그인</button>
            </form>
            <span>아이디 찾기</span>|<span>비밀번호 찾기</span>|<span onClick={() => navigate("/register")}>회원가입</span>
            <button className="login-button"><img src="kakao.png" alt="kakao"></img>카카오 계정으로 로그인</button>
            <button className="login-button"><img src="google.png" alt="google"></img>구글 계정으로 로그인</button>
            <SocialLogin />
          </Information>
        </Rightbox>
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
