// React
import React, { useState, useRef } from 'react';
// React Query
import { useMutation } from "react-query";
// axios
import { instance }  from "shared/axios"
// css
import styled, { css } from "styled-components";
import Swal from "sweetalert2";

const ReissuePwd = () => {
  const idCheckRef = useRef();
  const emailCheckRef = useRef();
  const codeCheckRef = useRef();

  const [active, setActive] = useState(false);

  // 비밀번호 발급을 위한 인증 메일 발송
  const ClickResetPwdCode = () => {
     const data = {
      username : idCheckRef.current.value,
      email : emailCheckRef.current.value
    }
    sendResetPwdCode(data);
  }

  const { mutate: sendResetPwdCode } = useMutation(
    async (data) => {
      const response = await instance.post("/email/sendResetPwCode", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: "이메일 전송 완료"
        })
      },
			onError: (err) => {
        Swal.fire({
          icon: "error",
          title: "유저를 찾을 수 없습니다."
        })
			}
    }
  )

 // 비밀번호 발급을 위한 인증번호 확인
  const clickEmailCheck = () => {
     const data = {
      email : emailCheckRef.current.value,
      certification : codeCheckRef.current.value
    }
    EmailCheck(data);
  }

  const { mutate: EmailCheck} = useMutation(
    async (data) => {
      const response = await instance.post("/email/password/check", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: "인증 번호가 일치합니다."
        })   
      },
			onError: (err) => {
        Swal.fire({
          icon: "error",
          title: "인증 번호가 불일치합니다."
        }) 
			}
    }
  ) 

  // 임시 비밀번호 발급
    const clickSendNewPwd = () => {
     const data = {
      email : emailCheckRef.current.value,
    }
    sendNewPwd(data);
  }

  const { mutate: sendNewPwd } = useMutation(
    async (data) => {
      const response = await instance.post("/email/sendNewPw", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: "임시 비밀번호 발급 성공"
        })       
      },
			onError: (err) => {
        Swal.fire({
          icon: "error",
          title: "인증을 하지 않은 회원입니다."
        }) 
			}
    }
  )

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
        <input type="text" ref={idCheckRef} placeholder='아이디 입력' />
      </PwdCheckId>
      <PwdCheckEmail>
        <p>이메일로 본인 확인</p>
        <PwdEmailBox>
          <input type="text" ref={emailCheckRef} placeholder='이메일'/>
          <button onClick={ClickResetPwdCode}>인증요청</button>
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
  position:relative;
  top:-37px;
`;

const PwdTitle = styled.h1`
  font-size:28px;
  font-weight: 600;
  color:#303030;
  margin-bottom:52px;
`
const PwdCheckId = styled.div`
  p {
    font-size:17px;
    color:#303030;
    margin-bottom:18px;
    font-weight:500;
  }
  input {
    width: 360px;
    height: 44px;
    border: 1px solid #B7B7B7;
    border-radius: 10px;
    padding: 14px;
    &:focus {
		  outline: 1px solid #9152FF;
	  }
  }
`

const PwdCheckEmail = styled.div`
  margin-top:40px;
  p {
    font-weight:500;
  }
`;

const PwdEmailBox = styled.div`
  margin-bottom:12px;
  input {
    margin-top:18px;
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
    border:none;
    color: #fff;
    margin-left:8px;
    cursor: pointer;
  }
`
const PwdCodeBox = styled.div`
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
`
const PwdBtn = styled.button`
  width: 360px;
  height: 44px;
  margin-top:32px;
  background: #9E67FF;
  border-radius: 50px;
  font-weight: 600;
  font-size: 17px;
  color:#fff;
  border:none;
  cursor: pointer;
`;

export default ReissuePwd;