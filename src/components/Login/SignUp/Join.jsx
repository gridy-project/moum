// React
import React, { useRef, useState } from "react";
// React Query
import { useMutation } from "react-query";
// Recoil
import { useSetRecoilState } from "recoil";
import { JoinIdState, JoinPasswordState, JoinEmailState } from 'state/login';
// axios
import { instance }  from "shared/axios"
// css
import styled, { css }  from "styled-components";
import Swal from "sweetalert2";
import useCustomMutate from "hooks/useCustomMutate";
import tw from "twin.macro";

import PulseLoader from "react-spinners/PulseLoader";
import useMessageFloat from "hooks/useMessageFloat";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Join = (props) => {
  const [active, setActive] = useState(false);
  const [sendStatus, setSendStatus] = useState(false);
  const toast = useMessageFloat();
  
  const ref = {
    username: useRef(),
    nickname: useRef(),
    password: useRef(),
    passwordConfirm: useRef(),
    email: useRef(),
    certification: useRef()
  }

  const setJoinIdState = useSetRecoilState(JoinIdState);
  const setJoinPwdState = useSetRecoilState(JoinPasswordState);
  const setJoinEmailState = useSetRecoilState(JoinEmailState);

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
      onSuccess: ({result, status}) => {
        if (result) {
          toast("메일로 인증코드를 전송했어요");
        } else {
          if (status === 501) {
            Swal.fire({
              icon: "error",
              title: "중복된 이메일 입니다"
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "이메일 전송 실패"
            });
          }
        }
        setSendStatus(false);
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
          toast("인증번호가 일치합니다");
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
      return false;
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
          <SendMail onClick={CheckEmailRegister} disabled={sendStatus}>
            {sendStatus ? <PulseLoader color={"#000000"} cssOverride={override} size={5} /> : "인증요청" }
          </SendMail>
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
  ${tw`relative flex flex-col items-center justify-center w-full h-full`}
`;

const JoinTitle = styled.h1`
  ${tw`
    w-full text-28 mb-[52px]
  `}
  @media screen and (max-width: 1600px) {
    font-size: 24px;
    margin-bottom: 45px;
  }
`;

const JoinCheckBox = styled.div`
  ${tw`
    mb-[40px]
  `}
  p {
    font-size: 17px;
    ${tw`
    mb-[18px]
    `}
  }

  @media screen and (max-width: 1600px) {
    p {
      font-size: 15px; 
      margin-bottom: 16px;
    }
    margin-bottom: 35px;
  }
`;
const JoinEmailBox = styled.div`
  ${tw`
    mb-[12px] flex
  `}
  input {
    border: #B7B7B7;
    &:focus {
		  outline: 1px solid #9152FF;
	  }
    ${tw`
    w-[268px] h-[44px] rounded-[10px] border-solid border-[1px] p-[14px]
    `}
  }
  @media screen and (max-width: 1600px) {
    input {
      ${tw`h-40 w-244 text-14`}
    }
  }
`;

const SendMail = styled.button`
  background: #9E67FF;
  color:#fff;
  ${tw`
    w-[84px] h-[44px] rounded-[10px] border-none ml-[8px] cursor-pointer flex justify-center items-center
  `}
  ${props => props.disabled && css`
    background: #EEEEEE;
  `}
  @media screen and (max-width: 1600px) {
    ${tw`h-40 w-76 text-14`}
  }
`;

const JoinCodeBox = styled.div`
  input {
    border: #B7B7B7;
    &:focus {
		  outline: 1px solid #9152FF;
	  }
    ${tw`
    w-[268px] h-[44px] rounded-[10px] border-solid border-[1px] p-[14px]
    `}
    @media screen and (max-width: 1600px) {
      ${tw`h-40 w-244`}
    }
  }
  button {
    background: #ECECEC;
    color: #8B8B8B;
    ${tw`
    w-[84px] h-[44px] rounded-[10px] border-none ml-[8px]
    `}
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
    @media screen and (max-width: 1600px) {
      ${tw`h-40 w-76 text-14`}
    }
  }


  @media screen and (max-width: 1600px) {
    input {
      ${tw`text-14`}
    }
  }
`;
const CreateBox = styled.div`
  width: 360px;

  @media screen and (max-width: 1600px) {
    ${tw`w-330`}
  }
  p {
    color:#303030;
    font-size: 17px;
    ${tw`
    mb-[18px]
    `}

    @media screen and (max-width: 1600px) {
      ${tw`mb-16 text-15`}
    }
  }
  input {
    border: #B7B7B7;
    &:focus {
		  outline: 1px solid #9152FF;
	  }
    ${tw`
    w-[360px] h-[44px] rounded-[10px] border-solid border-[1px] p-[14px] mb-[12px]
    `}

    @media screen and (max-width: 1600px) {
      ${tw`h-40 mb-12 w-330 text-15`}
    }
  }
`;
const JoinBtn = styled.button`
  ${tw`
    w-[360px] h-[44px] rounded-[50px] border-none mt-[16px]
  `}
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

  @media screen and (max-width: 1600px) {
    ${tw`h-40 w-330`}
  }
`

export default Join;