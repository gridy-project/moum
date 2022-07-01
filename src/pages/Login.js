import styled from "styled-components";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

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
            <input type="text" className="id-pw" placeholder="  이메일" /><br />
            <input type="password" className="id-pw" placeholder="  비밀번호" /><br />
            <input type="checkbox" className="checkbox" /> 로그인 상태 유지<br />
            <button className="login-button">로그인</button><br />
            <br /><span>비밀번호 찾기</span>|
            <span>아이디 찾기</span>|
            <span onClick={() => navigate("/register")}>회원가입</span><br /><br />
            <button className="login-button"><img src="kakao.png" alt="kakao"></img>카카오 계정으로 로그인</button><br />
            <button className="login-button"><img src="google.png" alt="google"></img>구글 계정으로 로그인</button>
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
