import React from 'react';
import styled from 'styled-components';
// React Query
import { useMutation } from "react-query";
// axios
import { instance } from "shared/axios"

const DeleteAccount = () => {
  // 회원 탈퇴 
	const clickDelete = () => {
		RemoveAccount()
	};

	const { mutate: RemoveAccount } = useMutation(
    async () => {
      const response = await instance.delete("/user/getout/");
      return response.data;
    },
    {
      onSuccess: (data) => {
				window.location.replace("/login")
      },
			onError: (err) => {
				console.log(err)
			}
    }
  )

  return (
   <DeleteAccountArticle>
      <DeleteAccountBtn onClick={clickDelete}>계정 탈퇴하기</DeleteAccountBtn>
    </DeleteAccountArticle>
  );
};

// DeleteAccount
const DeleteAccountArticle = styled.div`
	margin-top: 40px;
`;

const DeleteAccountBtn = styled.p`
	color: #8b8b8b;
	font-size: 14px;
	text-decoration: underline;
	cursor: pointer;
`;
export default DeleteAccount;