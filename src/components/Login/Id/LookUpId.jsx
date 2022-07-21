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

 const LookUpId = (props) => {
  const idEmailRef = useRef(null);

  const [viewId, setViewID] = useRecoilState(viewAccountState)

  const searchIdForm = (e) => {
    e.preventDefault();
    const data = {
      email : idEmailRef.current.value
    }
    props.runSuccessFindId();
    searchId(data);
  }

  const { mutate: searchId } = useMutation(
    async (data) => {
      const response = await instance.post("/find/username", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        setViewID(data)
      },
			onError: (err) => {
				console.log(err)
			}
    }
  )
  
  return (
    <IdContainer>
    <IdTitle>아이디 찾기</IdTitle>
      <form onSubmit={searchIdForm}>
        <IdContent>
          <p>이메일로 본인 확인</p>
          <input type="text" ref={idEmailRef} />
        </IdContent>
        <IdBtn>아이디 찾기</IdBtn>
      </form>  
    </IdContainer>
  )
 }

 const IdContainer = styled.div`
  position:relative;
  top:-37px;
`;

const IdTitle = styled.h1`
  font-size:28px;
  margin-bottom:52px;
  font-weight: 600;
  color:#303030;
`;
const IdContent = styled.div`
  p {
    font-size:17px;
    margin-bottom: 18px;
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
`;

const IdBtn = styled.button`
  width: 360px;
  height: 44px;
  background: #9E67FF;
  border-radius: 50px;
  color:#fff;
  border:none;
  margin-top:32px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
`;

export default LookUpId;