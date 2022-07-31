// React, React-redux
import React, { useState, useEffect } from "react";
// React Query
import {  useMutation } from "react-query";
// React-hook-form
import { useForm } from "react-hook-form";
// css
import tw from "twin.macro";
import Swal from "sweetalert2";
import styled, { css } from "styled-components";
import human from "assets/images/pages/mypage/human.png";
import xbutton from "assets/images/pages/mypage/xbutton.png";
// modal
import Modal from "react-modal";
// axios
import { instance } from "shared/axios"
import { removeToken } from "shared/localStorage";
import useCustomMutate from "hooks/useCustomMutate";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const ChangePwd = () => {
	const navigate = useNavigate();

  // modal
	const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);

	// 글자 수 세기
	const [existPwdLen, setExistPwdLen] = useState(false); // 기존 비밀번호
	const [newPwdLen, setNewPwdLen] = useState(false); // 새 비밀번호
	const [reNewPwdLen, setReNewPwdLen] = useState(false); // 새 비밀번호 재입력

  // 비밀번호 변경 
	const { mutate: modifyPassword } = useCustomMutate(
		async (newData) => await instance.put("/user/pw/update/", newData),
		{
			onSuccess: ({result, status}) => {
				if (result) {
					removeToken();
					navigate('/login');
				} else {
					if (status === 505) {
						Swal.fire({
							icon: "error",
							title: "비밀번호 변경 실패",
							text: "사용할 수 없는 비밀번호 입니다."
						});
					} else if (status === 501) {
						Swal.fire({
							icon: "error",
							title: "비밀번호 변경 실패",
							text: "기존 비밀번호가 틀렸습니다."
						});
					}
				}
			},
			onError: (err) => {
				Swal.fire({
					icon: "error",
					title: "서비스 에러"
				});
			}
		}
	);

	// react-hook-form 에서 쓸 애들 꺼내 쓰기
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
		reset
  } = useForm();

	// react-hook-form 넘길때 추가에러 설정 및 데이터 서버에 넘기기
	const onValid = (data) => {
		if(data.newpassword !== data.renewpassword){
			setError(
				"renewpassword",
				{message:"새로 설정한 비밀번호가 동일하지 않습니다."},
				{shouldFocus:true}
			);
		} else if (data.newpassword === data.password){
				setError(
				"newpassword",
				{message:"기존 비밀번호와 동일합니다."},
				{shouldFocus:true}
			);
		} else {
			let newData = {
				password: data.password,
				newPassword: data.newpassword,
			};
			modifyPassword(newData);
		}
	}

	// react-hook-form 비밀번호 활성화 비활성화
	const [isPwdActive, setIsPwdActive] = useState(false);
	const watchAll = Object.values(watch());
	useEffect(() => {
		if (watchAll.every((el) => el)){ // 인풋값이 다 채워졌을때
			setIsPwdActive(true);
		} else {
			setIsPwdActive(false);
		}
	},[watchAll])

	// input 값 있을시 x button 활성화
	const onChangePwd = watch("password")?.length ?? 0;
	const onChangeNewPwd = watch("newpassword")?.length ?? 0;
	const onChangeReNewPwd = watch("renewpassword")?.length ?? 0;

	const checkExistPwd = (e) => {	
		e.target.value.length > 0 ? setExistPwdLen(true) : setExistPwdLen(false)
	}

	const checkNewPwd = (e) => {
		if (watch.newpassword.length > 0){
			setNewPwdLen(true)
		} else {
			setNewPwdLen(false)
		}
	}

	const checkReNewPwd = (e) => {
			e.target.value.length > 0 ? setReNewPwdLen(true) : setReNewPwdLen(false)
	}

	// x button 클릭시 input 초기화
	const removeExistPwd = (data) => {
		reset()
	}
	const removeNewPwd = (e) => {
		watch("newpassword")
		reset()
	}
	const removeReNewPwd= (e) => {
		watch("renewpassword")
		reset()
	}

	// 비밀번호 변경 모달창 닫았을 때 input 값 초기화
 const resetPwd = () => {
		if (	passwordModalIsOpen === true ) {
			watch("password") && watch("newpassword") && watch("renewpassword")
			reset()
	} 
}

return (
	<PwdArticle>
			<PwdTitle>비밀번호</PwdTitle>
			<PwdArea>
				<PwdBtn onClick={() => setPasswordModalIsOpen(true)}>비밀번호 변경하기</PwdBtn>
			</PwdArea>
			<Modal
				isOpen={passwordModalIsOpen}
				onRequestClose={() => {setPasswordModalIsOpen(false); resetPwd();}}
				style={{
					overlay: {
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0,0,0,0.5)"
					},
					content: {
						background:"#fff",
						borderRadius:"30px",
						color: "#111",
						width: "438px",				
						height: "600px",
						top: "20%",
						left: "39%",
						padding:"24px"
					},
				}}
			>
				<ModalPasswordHeader>
					<Modalimagebox>
						<img src={human} alt="human"></img>
					</Modalimagebox>	
				<h1>비밀번호 변경하기</h1>
				</ModalPasswordHeader>
				<form onSubmit={handleSubmit(onValid)}>
					<ModalPasswordContent>										
						<ExistPwdWrap
						isExitFilled={existPwdLen} >
							<p>기존 비밀번호</p>
							<input
							id="password"
							type="password" 
							placeholder="비밀번호를 입력하세요."								
							onChange={e => checkExistPwd(e)}
							{...register("password", {
								pattern:{
										value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
										message: "현재 비밀번호와 다릅니다.",
								},
							})}
							/>
							<span>{errors?.password?.message}</span>
							{onChangePwd > 0 && <img 
							src={xbutton} 
							alt=""
							onClick={() => {removeExistPwd(watch("password"))}
								}
							/>}							
						</ExistPwdWrap>
						<PwdWrap isNewPwdFilled={newPwdLen}>
							<p>새 비밀번호</p>
							<input
							id="newpassword"
							type="password"
							placeholder="새 비밀번호를 입력하세요."
							onChange={e => checkNewPwd(e)}
							{...register("newpassword", {
							required:"새 비밀번호를 입력하세요.",
							pattern:{
									value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
									message: "숫자 + 영문자 조합으로 최소 4자 이상 입력해주세요.",
							},	
							})}	
							/>
							<span>{errors?.newpassword?.message}</span>
							{onChangeNewPwd > 0 && <img 
							src={xbutton} 
							alt=""
							onClick={removeNewPwd} />}									
						</PwdWrap>
						<RePwdWrap isReNewPwdFilled={reNewPwdLen}>
							<p>새 비밀번호 확인</p>
							<input
							id="renewpassword"
							type="password"
							placeholder="새 비밀번호를 재입력하세요."						
							onChange={e => checkReNewPwd(e)}		
									{...register("renewpassword", {
							required:"새 비밀번호를 재입력하세요.",
							pattern:{
									value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
									message: ""
							},	
							})}			
							/>
							<span>{errors?.renewpassword?.message}</span>
							{onChangeReNewPwd > 0 && <img 
							src={xbutton} 
							alt=""
							onClick={removeReNewPwd} />}	
						</RePwdWrap>												
				</ModalPasswordContent>
				<ModalPasswrodBtnWrap>
					<CancelPwdBtn type="button" onClick={(e) => 
						{
							setPasswordModalIsOpen(false);
							resetPwd();
						}}>취소</CancelPwdBtn>
					<ChangePwdBtn type="submit" disabled={!isPwdActive}>비밀번호 변경</ChangePwdBtn>
				</ModalPasswrodBtnWrap>
				</form>								
			</Modal>
		</PwdArticle>
  );
};

// Pwd
const PwdArticle = styled.div`
	${tw`
    mt-[40px]
  `}
`;

const PwdTitle = styled.div`
	font-size: 20px;
	color: #111111;
	${tw`
    mb-[16px]
  `}
`;
const PwdArea = styled.div`
`;

const PwdBtn = styled.button`
	font-size: 12px;
	color: #9152ff;
	background: #f6f5fb;
	border: #bc98fc;
	&:hover {
		cursor: pointer;
	}
	${tw`
    border-none border-solid border-[1px] rounded-[50px] p-[12px 16px]
  `}
`;

// ModalPassword
const ModalPasswordHeader = styled.div`
	${tw`
    flex items-center mb-[32px]
  `}
	h1 {
		color:#303030;
		font-size:20px;
		${tw`
    	font-semibold
 	 	`}
	}
	`
const ModalPasswordContent = styled.div`
	${tw`
		relative
	`}
	p {
		font-size:16px;
		${tw`
			mb-[12px]
		`}
	}
	input {
		border: #D2BAFF;
		&:focus {
			outline: 1px solid #9152FF;
		}
		${tw`
			w-[390px] h-[50px] border-solid border-[1px] rounded-[100px] p-[18px 20px]
		`}
	}
`;

const Modalimagebox = styled.div`
	background-color:#E8E1FC;
	${tw`
		w-[44px] h-[44px] rounded-[50%] mr-[12px]
	`}
	img {
		${tw`
			relative left-[35.6%] top-[25%]
		`}
	}
`;

const ExistPwdWrap = styled.div`
	${tw`
		relative
	`}
	span {
		color:#FF5C5C;
		${tw`
			mt-[10px] inline-block
		`}
	}
	img {
		${tw`
			absolute block top-[42px] right-[15px]
		`}
	}
`
const PwdWrap = styled.div`
	${tw`
		relative mt-[15px]
	`}
	span {
		color:#FF5C5C;
		${tw`
			mt-[10px] inline-block
		`}
	}
	img {
		${tw`
			absolute top-[42px] right-[15px]
		`}
	}
`
const RePwdWrap = styled.div`
	${tw`
		relative mt-[15px]
	`}
	span {
		color:#FF5C5C;
		${tw`
		mt-[10px] inline-block
		`}
	}
	img {
		${tw`
			absolute top-[42px] right-[15px]
		`}
	}
`
const ModalPasswrodBtnWrap = styled.div`
	${tw`
		absolute right-[24px] bottom-[24px] flex
	`}
`;

const CancelPwdBtn = styled.button`
	background: #F7F3FD;
	font-size:14px;
	line-height:14px;
	color:#9E67FF;
	${tw`
		w-[62px] h-[48px] rounded-[26px] p-[18px] mr-[12px] border-none cursor-pointer
	`}
`

const ChangePwdBtn = styled.button`
	padding: 18px;
	font-size:14px;
	line-height:14px;
	background-color: #ECECEC;
	color:#949494;
	${tw`
		w-[113px] h-[48px] rounded-[50px] border-none
	`}
		${(props) =>
		props.disabled
			? css`
					background-color: #ECECEC;
					color:#949494;
			  `
			: css`		
					background-color: #9152FF;
					color:#fff;
					cursor: pointer;
			`}
`

export default ChangePwd;