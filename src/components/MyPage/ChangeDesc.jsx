// React, React-redux
import React, { useState } from "react";
// css
import styled, {css} from 'styled-components';
import tw from "twin.macro";
// React Query
import { useMutation } from "react-query";
import queryClient from "shared/query";
// axios
import { instance } from "shared/axios"
import useCustomQuery from "hooks/useCustomQuery";
import Swal from "sweetalert2";

const ChangeDesc = () => {
	// textArea onChange 값 저장하기
	const [descText, setDescText] = useState("")

  // 글자 수 세기
	const [len, setLen] = useState(0); // 계정 설명

  // 계정 설명 textarea
	const [active, setActive] = useState(false);
	const actived = active ? false : true;

  // 계정 조회
	const { data } = useCustomQuery(
    "profile",
    async () => {
      const response = await instance.get("/user/profile");
      return response.data;
    }
  );

	// textArea 글자 수 세기, 값 지켜보기 
	const descTextChange = (e) => {
		setLen(e.target.value.length);
		setDescText(e.target.value)
	}

	const { mutate: modifyDesc } = useMutation(
    async (data) => instance.put("/user/updateInfo/", data),
    {
      onSuccess: ({result, status}) => {
				if (result) {
        	queryClient.invalidateQueries("profile");
				} else {
					if (status === 500) {
						Swal.fire({
							icon: "error",
							title: "유저 설명 수정 실패",
							text: "글자 수를 확인해 주세요"
						});
					}
				}
      },
			onError: () => {
				Swal.fire({
					icon: "error",
					title: "서비스 에러"
				});
			}
    }
  )
  // 계정 설명 수정 
	const updateDesc = (e) => {
		e.preventDefault();
		const data = {
			information: descText
		}
		modifyDesc(data);
	};

  return (
    <DescArticle>
			<form onSubmit={updateDesc}>
				<Desc>계정 설명</Desc>
				{actived === false && (
					<DescNumber>
						<p id="textCount">{len}자 / 40자</p>
					</DescNumber>
				)}	
				{active ? 
				<DescTextarea
					id="tesxtArea"
					maxLength="40"
					spellcheck="false"
					placeholder={
						data?.information === null ? 
						"나의 계정/모음/채널에 대해 설명해주세요." : data?.information
					}
					isActive={active}
					onChange={descTextChange}
				/> :
					<DescDiv
						>
							{data?.information === null ? 
						"나의 계정/모음/채널에 대해 설명해주세요." : data?.information}
					</DescDiv>
			}		
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
	${tw`relative `}
`;

const Desc = styled.p`
	font-size: 20px;
	${tw`
		mb-[16px]
	`}
`;

const DescNumber = styled.div`
	color: #b7b7b7;
	font-size: 12px;
	${tw`
		w-[80px] h-[12px] flex absolute right-[-23px] top-[8px]
	`}
`;
const DescTextarea = styled.textarea`
	color: #303030;
	background: #e8e1fc;
	font-size: 15px;
	&:focus {
		background: #ffffff;
		outline: none;
	}
	${tw`
		w-[410px] h-[80px] p-[20px 16px] rounded-[10px] border-none resize-none
	`} 
	${(props) =>
		props.isActive
			? css`
					background-color: #fff;
			  `
			: null}
`;

const DescDiv = styled.div`
	color: #303030;
	background: #e8e1fc;
	-ms-overflow-style: none;
	&::-webkit-scrollbar { 
    display: none;
    width: 0 !important;
	}
	${tw`
		w-[410px] h-[80px] p-[20px 16px] rounded-[10px] border-none whitespace-pre-line overflow-scroll overflow-x-hidden
	`} 
`;

const DescBtn = styled.button`
	color: #9152ff;
	border: #bc98fc;
	&:hover {
		cursor: pointer;
	}
	${tw`
		border-solid border-[1px] rounded-[50px] p-[12px 16px] absolute right-[-106px] bottom-[0]
	`} 
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