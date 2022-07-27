// React, React-redux
import React, { useState, useRef, useEffect } from "react";
// css
import styled, {css} from 'styled-components';
// React Query
import { useMutation, useQuery } from "react-query";
import queryClient from "shared/query";
// axios
import { instance } from "shared/axios"

const ChangeDesc = () => {
  const descInfoRef = useRef(null);

  // 글자 수 세기
	const [len, setLen] = useState(0); // 계정 설명

  // 계정 설명 textarea
	const [active, setActive] = useState(false);
	const actived = active ? false : true;

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
      }
    }
  );
  // 계정 설명 수정 
	const updateDesc = (e) => {
		e.preventDefault();
			const data = {
				information: descInfoRef.current.value
		}		
		modifyDesc(data);
		actived ? descInfoRef.current.blur() : descInfoRef.current.focus();
	};

	const { mutate: modifyDesc } = useMutation(
    async (data) => {
      const response = await instance.put("/user/updateInfo/", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("profile");
      }
    }
  )
		// 글자 수 세기 / 제한
	const descTextChange = (e) => {
		setLen(e.target.value.length);
		
		if (descInfoRef.current.value.length > 40){
			descInfoRef.current.value = descInfoRef.current.value.slice(0,39);
		}
	}

  return (
    <DescArticle>
			<form onSubmit={updateDesc}>
				<Desc>계정 설명</Desc>
				{actived === false && (
					<DescNumber>
						<p id="textCount">{len}자 / 40자</p>
					</DescNumber>
				)}
				<DescTextarea
					id="tesxtArea"
					maxLength="40"
					spellcheck="false"
					placeholder={
						data?.information === null ? 
						"나의 계정/모음/채널에 대해 설명해주세요." : data?.information
					}
					isActive={active}
					ref={descInfoRef}
					onChange={descTextChange}
				/>
				<DescBtn
					isActive={active} 
					onClick={() => setActive(!active)}
				>
					{actived ? "수정하기" : "적용하기"}
				</DescBtn>
			</form>
		</DescArticle>
  );
};

// Desc
const DescArticle = styled.div`
	position: relative;
`;

const Desc = styled.p`
	font-size: 20px;
	margin-bottom: 16px;
`;

const DescNumber = styled.div`
	width: 80px;
	height: 12px;
	color: #b7b7b7;
	font-size: 12px;
	display: flex;
	position: absolute;
	right: 65px;
	top: 10px;
`;
const DescTextarea = styled.textarea`
	width: 410px;
	height: 80px;
	padding: 20px 16px;
	color: #303030;
	background: #e8e1fc;
	border-radius: 10px;
	border: none;
	font-size: 15px;
	pointer-events: none;
	resize: none;
	&:focus {
		background: #ffffff;
		outline: none;
	}
	${(props) =>
		props.isActive
			? css`
					pointer-events: auto;
					background-color: #fff;
			  `
			: null}
`;

const DescBtn = styled.button`
	color: #9152ff;
	border: 1px solid #bc98fc;
	border-radius: 50px;
	padding: 12px 16px;
	position: relative;
	left: 16px;
	bottom: 16px;
	&:hover {
		cursor: pointer;
	}
	${(props) =>
		props.isActive
			? css`
					background-color: #9152ff;
					color: #ffffff;
			  `
			: css`
					background-color: #f6f5fb;
					color: #9152ff;
			  `}
`;
export default ChangeDesc;