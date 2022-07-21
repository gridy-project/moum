// React
import React, { useRef } from 'react';
// React Query
import { useMutation } from "react-query";
// axios
import { instance } from "shared/axios"
// css
import styled from "styled-components";

const ReissuePwd = () => {
  const idCheckRef = useRef();
  const emailCheckRef = useRef();
  const CodeCheckRef = useRef();

  // 비밀번호 재설정 인증 메일 발송
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
        console.log(data);
        window.alert(data.massage);
      },
			onError: (err) => {
				console.log(err)
        if (err.statusCode === 501) {
          window.alert(err.massage);
        } else if (err.statusCode === 500) {
          window.alert(err.massage);
        }
			}
    }
  )

  // 임시 비밀번호 발급
    const ClicksendNewPwd = () => {
     const data = {
      email : emailCheckRef.current.value,
      certification : CodeCheckRef.current.value
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
        console.log(data);       
        window.alert(data.massage);
      },
			onError: (err) => {
				console.log(err)
        window.alert(err.massage);
			}
    }
  )

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
        <PwdCodeBox>
          <input type="text" ref={CodeCheckRef} placeholder='인증코드를 입력해주세요.'/>
        <button onClick={ClicksendNewPwd}>확인</button>  
        </PwdCodeBox>
      </PwdCheckEmail>
      <PwdBtn>새 비밀번호 받기</PwdBtn>
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
  }
  input {
    width: 360px;
    height: 44px;
    border: 1px solid #B7B7B7;
    border-radius: 10px;
    padding: 14px;
  }
`

const PwdCheckEmail = styled.div`
  margin-top:40px;
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

`;

export default ReissuePwd;