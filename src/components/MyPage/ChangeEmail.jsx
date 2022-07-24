import React from 'react';
import styled from 'styled-components';
// axios
import { instance } from "shared/axios"
// React Query
import { useQuery } from "react-query";

const ChangeEmail = () => {
  	// 계정 조회

	const { data } = useQuery(
    "profile",
    async () => {
      const response = await instance.get("/user/profile");
      return response.data;
    },
    {
      onSuccess: (data) => {
			},
      onError: (err) => {
        console.log(err);
      }
    }
  );
  return (
    <EmailArticle>
      <EmailTitle>계정 이메일</EmailTitle>
      <Email>{data?.email}</Email>
		</EmailArticle>
  );
};

// Email
const EmailArticle = styled.div`
	margin-top: 40px;
`;
const EmailTitle = styled.p`
	font-size: 20px;
	margin-bottom: 12px;
	color: #111111;
`;
const Email = styled.p`
	font-size: 16px;
	color: #555555;
`;

export default ChangeEmail;