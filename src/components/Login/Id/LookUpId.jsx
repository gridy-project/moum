// React
import React, { useRef } from 'react';
// React Query
import { useMutation } from "react-query";
// Recoil
import { useRecoilState } from "recoil";
import { viewAccountState } from 'state/login';
// axios
import { instance } from "shared/axios"
// css
import styled from "styled-components";
import Swal from "sweetalert2";
import tw from "twin.macro";

// sparta3@dev.com
 const LookUpId = (props) => {
  const idEmailRef = useRef(null);

  const [viewId, setViewID] = useRecoilState(viewAccountState)

  const searchIdForm = (e) => {
    e.preventDefault();
    const data = {
      email : idEmailRef.current.value
    }
    searchId(data);
  }

  const { mutate: searchId } = useMutation(
    async (data) => {
      const response = await instance.post("/find/username", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setViewID(data);
        props.runSuccessFindId();
      },
			onError: (err) => {
        Swal.fire({
          icon: "error",
          title: "회원가입되지 않은 이메일입니다."
        })
			}
    }
  )
  
  return (
    <IdContainer>
    <IdTitle>아이디 찾기</IdTitle>
      <form onSubmit={searchIdForm}>
        <IdContent>
          <p>이메일로 본인 확인</p>
          <input type="text" ref={idEmailRef} autoComplete="email" />
        </IdContent>
        <IdBtn>아이디 찾기</IdBtn>
      </form>  
    </IdContainer>
  )
 }

 const IdContainer = styled.div`
  ${tw`
    relative top-[-37px]
  `}
`;

const IdTitle = styled.h1`
  font-size:28px;
  font-weight: 600;
  color:#303030;
  ${tw`
    mb-[52px] font-semibold
  `}
`;
const IdContent = styled.div`
  p {
    font-size:17px;
    ${tw`
    mb-[18px]
    `}
  }
  input {
    border: #B7B7B7;
    &:focus {
      outline: 1px solid #9152FF;
    } 
    ${tw`
      w-[360px] h-[44px] rounded-[10px] border-solid border-[1px] p-[14px]
    `}
  }
`;

const IdBtn = styled.button`
  background: #9E67FF;
  color:#fff;
  font-size: 17px;
   ${tw`
      w-[360px] h-[44px] rounded-[50px] border-none mt-[32px] font-semibold cursor-pointer
    `}
`;

export default LookUpId;