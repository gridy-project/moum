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
import Swal from "sweetalert2";
import useCustomMutate from "hooks/useCustomMutate";

const Join = (props) => {
  const [active, setActive] = useState(false);
  const [sendStatus, setSendStatus] = useState(false);
  
  const ref = {
    username: useRef(),
    nickname: useRef(),
    password: useRef(),
    passwordConfirm: useRef(),
    email: useRef(),
    certification: useRef()
  }

  const [joinIdState, setJoinIdState] = useRecoilState(JoinIdState);
  const [joinNicknameState, setJoinNinknameState] = useRecoilState(JoinNicknameState);
  const [joinPwdState, setJoinPwdState] = useRecoilState(JoinPasswordState);
  const [joinEmailState, setJoinEmailState] = useRecoilState(JoinEmailState);
  const [joinImgPathState, setJoinImgPathState] = useRecoilState(JoinImgPathState);

  const [checkPass, setCheckPass] = useState(false);

  // 회원가입 이메일인증 메일전송
  const CheckEmailRegister = () => {
    if (!sendStatus) { // 비활성화시에는 실행 불가
     const data = {
        email : ref.email.current.value
      }
      sendEmailCheckJoinCode(data);
      setSendStatus(true);
    }
  }

  const { mutate: sendEmailCheckJoinCode } = useMutation(
    (data) => instance.post("/email", data),
    {
      onSuccess: ({result, message}) => {
        if (result) {
          Swal.fire({
            icon: "success",
            title: message
          })
        } else {
          Swal.fire({
              icon: "error",
              title: message
          })
        }
        setSendStatus(false);
      },
			onError: (err) => {
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
    (data) => instance.post("/email/check", data),
    {
      onSuccess: ({result}) => {
        if (result) {
          Swal.fire({
            icon: "success",
            title: "인증번호가 일치합니다."
          });
          setCheckPass(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "인증번호가 일치하지 않습니다."
				  }) 
          setCheckPass(false);
        }
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

// input 값이 다 채워져야 버튼 활성화
const [filled, setFilled] = useState(false)

// 글자 수 세기
const [emailLen, setEmailLen] = useState(false);
const [codeLen, setCodeLen] = useState(false);
const [idLen, setIdLen] = useState(false);
const [PwdLen, setPwdLen] = useState(false); 
const [rePwdLen, setRePwdLen] = useState(false);

  const filledEmail = (e)=> {
        if (ref.email.current.value.length > 0){
        setEmailLen(true)
      } else {
        setEmailLen(false)
      }
  }
  const filledCode = (e)=> {
        if (ref.certification.current.value.length > 0){
        setCodeLen(true)
      } else {
        setCodeLen(false)
      }
  }
  const filledId = (e)=> {
        if (ref.username.current.value.length > 0){
        setIdLen(true)
      } else {
        setIdLen(false)
      }
  }
  const filledPwd = (e) => {
        if (ref.password.current.value.length > 0){
        setPwdLen(true)
      } else {
        setPwdLen(false)
      }
  }

  const filledRePwd = (e)=> {
        if (ref.passwordConfirm.current.value.length > 0){
        setRePwdLen(true)
      } else {
        setRePwdLen(false)
      }
  }


  const { mutateAsync: IdCheckJoin} = useCustomMutate((username) => instance.get(`/user/emailDupCheck/${username}`));

  const nextPage = async (e) => {
    // 아이디 중복체크
    const {data} = await IdCheckJoin(ref.username.current.value);
    if (!data) {
      Swal.fire({
        icon: "error",
        title: "중복된 아이디입니다."
      })
    }

    // 비밀번호 유효성 검사
    const password = ref.password.current.value;
    const passwordConfirm = ref.passwordConfirm.current.value;
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (passwordReg.test(password) === false) {
      Swal.fire({
        icon: "error",
        title: "비밀번호 오류",
        text: "비밀번호는 1개 이상의 숫자, 1개 이상의 문자로 조합해야 하며 최소 4자 이상 입력해야 합니다."
      });
      return false;
    }

    if ( password !== passwordConfirm ) {
      Swal.fire({
        icon: "error",
        title: "비밀번호가 일치하지 않습니다."
      });
      return false;
    }

    if (checkPass) {
      props.runProfile();
    } else {
      Swal.fire({
        icon: "error",
        title: "이메일 인증을 완료해주세요."
      });
    }
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
            required
            onChange={
              (e)=> {
                setJoinEmailState(e.target.value);
                filledEmail();
              }
            }
            />
            <SendMail onClick={CheckEmailRegister} disabled={sendStatus}>인증요청</SendMail>
          </JoinEmailBox>
          <JoinCodeBox isActive={active}>
            <input 
            type="text"  
            required       
            onChange={() => {
              checkInputCount();
              filledCode();
              }
            }
            autoComplete="code"
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
          required
          autoComplete="username"
          onChange={(e)=> {
            setJoinIdState(e.target.value)
            filledId();
          }
          }
          />
          <input 
          type="password" 
          ref={ref.password} 
          autoComplete="password" 
          required
          placeholder='비밀번호 (숫자, 영문자 포함 4자 이상)'
          onChange={(e)=> {
            setJoinPwdState(e.target.value)
            filledPwd();
          }

          }
          />
          <input type="password" ref={ref.passwordConfirm} autoComplete="new-password" placeholder='비밀번호 확인'
          onChange={filledRePwd}
          required
          />
        </CreateBox>
        <JoinBtn 
        type="button" 
        disabled={!(emailLen && codeLen && idLen && PwdLen && rePwdLen)}
        onClick={nextPage}>다음</JoinBtn>
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
`;

const SendMail = styled.button`
  width: 84px;
  height: 44px;
  background: #9E67FF;
  border-radius: 10px;
  margin-left:8px;
  border:none;
  color:#fff;
  cursor: pointer;

  ${props => props.disabled && css`
    background: #EEEEEE;
  `}
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
    ${(props) =>
      props.isActive ? 
      css`
        background-color: #9152ff;
				color: #ffffff;
        cursor: pointer;
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
  border-radius: 50px;
  border:none;
  margin-top:16px;
      ${(props) =>
      props.disabled ? 
      css`
        background-color: #f6f5fb;
        color: #9152ff;
      `:
      css`
        background-color: #9152ff;
				color: #ffffff;
        cursor: pointer;
      `
    }
`

export default Join;