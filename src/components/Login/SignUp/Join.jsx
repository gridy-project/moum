// React
import React, { useRef, useState } from "react";
// React Query
import { useMutation } from "react-query";
// Recoil
import { useRecoilState } from "recoil";
import { JoinIdState, JoinNicknameState, JoinPasswordState, JoinEmailState, JoinImgPathState } from 'state/login';
// axios
import { instance }  from "shared/axios"
// css
import styled, { css }  from "styled-components";

const Join = (props) => {
  const [active, setActive] = useState(false);
  
  const ref = {
    username: useRef(),
    nickname: useRef(),
    password: useRef(),
    passwordConfirm: useRef(),
    email: useRef(),
    certification: useRef()
  }

  const [joinIdState, setJoinIdState] = useRecoilState(JoinIdState)
  const [joinNicknameState, setJoinNinknameState] = useRecoilState(JoinNicknameState)
  const [joinPwdState, setJoinPwdState] = useRecoilState(JoinPasswordState)
  const [joinEmailState, setJoinEmailState] = useRecoilState(JoinEmailState)
  const [joinImgPathState, setJoinImgPathState] = useRecoilState(JoinImgPathState)

  // 회원가입 이메일인증 메일전송
  const CheckEmailRegister = () => {
     const data = {
      email : ref.email.current.value
    }
    sendEmailCheckJoinCode(data);
  }

  const { mutate: sendEmailCheckJoinCode } = useMutation(
    async (data) => {
      const response = await instance.post("/email", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
			onError: (err) => {
				console.log(err)
        if (err.statusCode === 501) {
          window.alert(err.message);
        } else if (err.statusCode === 500) {
          window.alert(err.message);
        }
			}
    }
  )

 // 인증번호 확인
  const clickEmailCheck = () => {
    const data = {
      email : ref.email.current.value,
      certification : ref.certification.current.value
    }
    EmailCheckJoin(data);
  }

  const { mutate: EmailCheckJoin} = useMutation(
    async (data) => {
      const response = await instance.post("/email/check", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);       
      },
			onError: (err) => {
				console.log(err)
			}
    }
  ) 

  // input 에 값이 있을 경우 확인 버튼 활성화
  const checkInputCount = () => {
    if (ref.certification.current.value.length > 0){
			setActive(true);
		} else {
      setActive(false);
    }
  }

  // 아이디 중복 확인
  const clickIdCheck = () => {
    IdCheckJoin(ref.username.current.value);
  }

  const { mutate: IdCheckJoin} = useMutation(
    async (username) => {
      const response = await instance.get(`/user/emailDupCheck/test`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        // if (data === true){
        //   window.alert("사용 가능한 아이디입니다.")
        //   // props.runProfile();
        // } else if (data === false){ 
        //   window.alert("중복된 아이디입니다.")
        // }       
      },
			onError: (err) => {
				console.log(err)
			}
    }
  ) 

  // 비밀번호 일치/불일치 확인
  const clickPwdCheck = () => {
    const password = ref.password.current.value;
    const passwordConfirm = ref.passwordConfirm.current.value;

     if ( password !== passwordConfirm ) {
        window.alert("비밀번호가 일치하지 않습니다.");
        return            
     } else if (password === passwordConfirm) {
        // props.runProfile();
     }
      return false;
     
  }

  return (
    <JoinContainer>
      <JoinTitle>회원가입</JoinTitle>
        <JoinCheckBox>
          <p>이메일로 본인 확인</p>
          <JoinEmailBox>
            <input 
            type="text" 
            ref={ref.email} 
            placeholder='이메일' 
            autoComplete="email"
            onChange={(e)=> {setJoinEmailState(e.target.value)}}
            />
            <button onClick={CheckEmailRegister}>인증요청</button>
          </JoinEmailBox>
          <JoinCodeBox isActive={active}>
            <input 
            type="text"         
            onChange={checkInputCount}
            placeholder='인증코드를 입력해주세요.'
            ref={ref.certification}  />
            <button 
            onClick={clickEmailCheck}>
            확인</button>
          </JoinCodeBox>
        </JoinCheckBox>
        <CreateBox>
          <p>계정 만들기</p>
          <input 
          type="text" 
          ref={ref.username} 
          placeholder='아이디'
          onChange={(e)=> {setJoinIdState(e.target.value)}}
          />
          <input 
          type="password" 
          ref={ref.password} 
          autoComplete="password" 
          placeholder='비밀번호 (숫자, 영문자 포함 4자 이상)'
          onChange={(e)=> {setJoinPwdState(e.target.value)}}
          />
          <input type="password" ref={ref.passwordConfirm} autoComplete="new-password" placeholder='비밀번호 확인' />
        </CreateBox>
        <JoinBtn type="button" onClick={() => {
          clickIdCheck();   
          // clickPwdCheck();
          // props.runProfile();
        }}>다음</JoinBtn>
    </JoinContainer>
  )
 }

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
    &:focus {
		  outline: 1px solid #9152FF;
	  }
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
    &:focus {
		  outline: 1px solid #9152FF;
	  }
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
    ${(props) =>
      props.isActive ? 
      css`
        background-color: #9152ff;
				color: #ffffff;
      `:
      css`
        background-color: #f6f5fb;
        color: #9152ff;
      `
    }
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
    &:focus {
		  outline: 1px solid #9152FF;
	  }
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
// profile

export default Join;