import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

function Register() {
  const navigate = useNavigate();

  const ref = {
    username: useRef(),
    nickname: useRef(),
    password: useRef(),
    passwordConfirm: useRef()
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const username = ref.username.current.value;
    const nickname = ref.nickname.current.value;
    const password = ref.password.current.value;
    const passwordConfirm = ref.passwordConfirm.current.value;

    if (username === "" || password === "" || nickname === "") {
      alert("아이디, 닉네임, 비밀번호를 모두 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (/^([0-9a-zA-Z_\\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/.test(username) === false) {
      alert("이메일을 다시 확인해 주세요");
      return;
    }

    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(password) === false) {
      alert("비밀번호는 1개 이상의 숫자, 1개 이상의 문자로 조합해야 하며 최소 4자 이상 입력해야 합니다.");
      return;
    }

    register({username, nickname, password, imgPath: null}).then(
      ({result, data}) => {
        if (result) {
          alert("회원가입 성공");
          navigate("/login");
        }
      }
    );
  };

  // 회원가입
  // const register = async function (data) {
  //   try {
  //     const response = await instance.post("/user/signup", data);
  //     console.log(response);
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Container>
      <h1>회원가입</h1>
      <LoginForm>
        <form onSubmit={onSubmit}>
          <p>아이디</p>
          <input type="text" placeholder="이메일을 입력해주세요" ref={ref.username} />
          <p>닉네임</p>
          <input type="text" placeholder="닉네임 입력해주세요" ref={ref.nickname} />
          <p>비밀번호</p>
          <input type="password" placeholder="비밀번호를 입력해주세요" ref={ref.password} />
          <p>비밀번호 확인</p>
          <input type="password" placeholder="비밀번호를 확인해주세요" ref={ref.passwordConfirm} />
          <button>회원가입</button> 
        </form>
      </LoginForm>
      <button onClick={() => navigate("/")}>취소</button>
    </Container>
  );
}

const Container = styled.div`
  width: 200px;
  height: 300px;
  border: 1px solid #ccc;
  margin: 5% auto;
  h1 {
    margin: 5% auto;
    display: flex;
    justify-content: center;
  }
  button {
    margin: 5% 11%;
  }
`;

const LoginForm = styled.div`
  border: 1px solid #ccc;
  margin: 5% 5;
  padding: 15px;
  p {
    margin: 2% auto;
  }
`;

export default Register;
