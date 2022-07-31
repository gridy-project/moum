// React
import useCustomMutate from 'hooks/useCustomMutate';
import React, { useState, useRef } from 'react';
// React Query
import { useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
// axios
import { instance }  from "shared/axios"
// css
import styled, { css } from "styled-components";
import Swal from "sweetalert2";
import tw from "twin.macro";

import PulseLoader from "react-spinners/PulseLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const ReissuePwd = () => {
  const navigate = useNavigate();
  const idCheckRef = useRef();
  const emailCheckRef = useRef();
  const codeCheckRef = useRef();

  const [active, setActive] = useState(false);
  const [check, setCheck] = useState(false);
  const [codeRequestState, setCodeRequestState] = useState(false);


  const { mutateAsync: sendResetPwdCode } = useCustomMutate((data) => instance.post("/email/sendResetPwCode", data))

  // 비밀번호 발급을 위한 인증 메일 발송
  const clickResetPwdCode = async () => {
     const data = {
      username : idCheckRef.current.value,
      email : emailCheckRef.current.value
    }

    if (data.username === "") {
      Swal.fire({
        icon: "error",
        title: "아이디를 입력해주세요."
      });
      return false;
    }

    if (data.email === "") {
      Swal.fire({
        icon: "error",
        title: "이메일을 입력해주세요."
      });
      return false;
    }

    setCodeRequestState(true);
    const {result} = await sendResetPwdCode(data);
    if (result) {
      Swal.fire({
        icon: "success",
        title: "이메일 전송 완료"
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "유저를 찾을 수 없습니다."
      });
    }
    setCodeRequestState(false);
  }

 // 비밀번호 발급을 위한 인증번호 확인
  const clickEmailCheck = () => {
     const data = {
      email : emailCheckRef.current.value,
      certification : codeCheckRef.current.value
    }
    EmailCheck(data);
  }

  const { mutate: EmailCheck} = useMutation(
    (data) => instance.post("/email/password/check", data),
    {
      onSuccess: ({result}) => {
        if (result) {
          Swal.fire({
            icon: "success",
            title: "인증 번호가 일치합니다."
          });
          setCheck(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "인증 번호가 불일치합니다."
          });
          setCheck(false);
        }
      }
    }
  ) 


  const { mutate: sendNewPwd } = useMutation(
    async (data) => instance.post("/email/sendNewPw", data),
    {
      onSuccess: ({result}) => {
        if (result) {
          Swal.fire({
            icon: "success",
            title: "임시 비밀번호 발급 성공"
          });
          navigate("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "인증을 하지 못한 회원입니다."
          });
        }
      }
    }
  )

  // 임시 비밀번호 발급
  const clickSendNewPwd = () => {
    if (check) {
      const data = {
        email : emailCheckRef.current.value,
      }
      sendNewPwd(data);
    } else {
      Swal.fire({
        icon: "error",
        title: "인증번호 확인이 필요합니다."
      })
    }
  }

  // input 에 값이 있을 경우 확인 버튼 활성화
  const checkInputCount = () => {
    if (codeCheckRef.current.value.length > 0){
			setActive(true);
		} else {
      setActive(false);
    }
  }

  return (
    <PwdContainer>
      <PwdTitle>비밀번호 재발급하기</PwdTitle>
      <PwdCheckId>
        <p>아이디</p>
        <input type="text" ref={idCheckRef} placeholder='아이디 입력' autoComplete='username' />
      </PwdCheckId>
      <PwdCheckEmail>
        <p>이메일로 본인 확인</p>
        <PwdEmailBox>
          <input type="text" ref={emailCheckRef} placeholder='이메일' autoComplete='email' />
          <SendMail onClick={clickResetPwdCode} disabled={codeRequestState}>
            {codeRequestState ? <PulseLoader color={"#000000"} cssOverride={override} size={5} /> : "인증요청" }
          </SendMail>
        </PwdEmailBox>
        <PwdCodeBox isActive={active}>
          <input 
          type="text" 
          ref={codeCheckRef}
          onChange={checkInputCount}
          placeholder='인증코드를 입력해주세요.'/>
          <button         
          onClick={clickEmailCheck}
          >확인</button>  
        </PwdCodeBox>
      </PwdCheckEmail>
      <PwdBtn onClick={clickSendNewPwd}>새 비밀번호 받기</PwdBtn>
    </PwdContainer>
  )
 }

const PwdContainer = styled.div`
  ${tw`
    relative top-[-37px]
  `}
`;

const PwdTitle = styled.h1`
  font-size:28px;
  color:#303030;
  ${tw`
    font-semibold mb-[52px]
  `}
`
const PwdCheckId = styled.div`
  p {
    font-size:17px;
    color:#303030;
    ${tw`
      font-medium mb-[18px]
    `}
  }
  input {
    border: #B7B7B7;
    &:focus {
		  outline: 1px solid #9152FF;
	  }
    ${tw`
      w-[360px] h-[44px] border-solid border-[1px] rounded-[10px] p-[14px]
    `}
  }
`

const PwdCheckEmail = styled.div`
  ${tw`
    mt-[40px]
  `}
  p {
    ${tw`
     font-medium
    `}
  }
`;

const PwdEmailBox = styled.div`
  ${tw`
    mb-[12px]
  `}
  input {
    border: #B7B7B7;
    &:focus {
		  outline: 1px solid #9152FF;
	  }
    ${tw`
      mt-[18px] w-[268px] h-[44px] border-solid border-[1px] rounded-[10px] p-[14px]
    `}
  }
`;

const SendMail = styled.button`
  background: #9E67FF;
  color: #fff;
  ${tw`
    w-[84px] h-[44px] rounded-[10px] border-none ml-[8px] cursor-pointer
  `}
  ${props => props.disabled && css`
    background: #EEEEEE;
  `}
`;

const PwdCodeBox = styled.div`
  input {
    border: #B7B7B7;
    &:focus {
		  outline: 1px solid #9152FF;
	  }
    ${tw`
      w-[268px] h-[44px] rounded-[10px] border-solid border-[1px] p-[14px]
    `}
  }
  button {
    background: #ECECEC;
    color: #8B8B8B;
    ${tw`
      w-[84px] h-[44px] rounded-[10px] border-none ml-[8px] cursor-pointer
    `}
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
`
const PwdBtn = styled.button`
  margin-top:32px;
  background: #9E67FF;
  font-size: 17px;
  color:#fff;
  ${tw`
    w-[360px] h-[44px] rounded-[50px] border-none cursor-pointer font-semibold mt-[32px]
  `}
`;

export default ReissuePwd;