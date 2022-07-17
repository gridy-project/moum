// React, React-redux
import React, { useState, useRef, useEffect } from "react";
// React Query
import {  useMutation, useQuery } from "react-query";
import queryClient from "shared/query";
// React-hook-form
import { useForm } from "react-hook-form";
// css
import styled, { css } from "styled-components";
import pen from "assets/images/pages/mypage/pen.png";
import human from "assets/images/pages/mypage/human.png";
import xbutton from "assets/images/pages/mypage/xbutton.png";
// modal
import Modal from "react-modal";
// axios
import { instance } from "shared/axios"
// component
import Header from "components/Common/Header";
import Container from "components/Common/Container";

Modal.setAppElement("#root");


function MyPage() {
	const imageRef = useRef(null);
	const nicknameRef = useRef(null);
	const descInfoRef = useRef(null);

	// modal
	const [nicknameModalIsOpen, setNicknameModalIsOpen] = useState(false);
	const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);

	// 닉네임 변경 input
	const [nickFill, setNickFill] = useState(false);

	// 계정 설명 textarea
	const [active, setActive] = useState(false);
	const actived = active ? false : true;

	// 글자 수 세기
	const [len, setLen] = useState(0); // 계정 설명
	const [existPwdLen, setExistPwdLen] = useState(false); // 기존 비밀번호
	const [newPwdLen, setNewPwdLen] = useState(false); // 새 비밀번호
	const [reNewPwdLen, setReNewPwdLen] = useState(false); // 새 비밀번호 재입력

	// 프로필 이미지 1장 업로드
	const uploadImage = (e) => {
		const formData = new FormData();

		formData.append("profilePhoto", imageRef.current.files[0]);

		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		modifyImage({formData, config});
	};

	const { mutate: modifyImage } = useMutation(
    async ({formData, config}) => {
      await instance.post("/user/profilePhoto", formData, config);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("profile");
        console.log(data);
      },
			onError: (err) => {
				 window.alert(err.response.data.message);
			}
    }
  )

	// 계정 조회 ==========================================

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
	
	// 닉네임 변경 ===========================================
	const clickModifyNickname = () => {
			setNickFill(false)
			const data = {
			nickname: nicknameRef.current.value
		}		
		modifyNickname(data);
	};

	const { mutate: modifyNickname } = useMutation(
    async (data) => {
      const response = await instance.put("/user/updateName/", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("profile");
      },
			onError: (err) => {
				 window.alert(err.response.data.message);
			}
    }
  )

	// 닉네임 변경 input
	const nicknameFilled = (e) => {
		if(e.target.value.length > 0) {
			setNickFill(true)
		} else {
			setNickFill(false)
		}
	}
	// 비밀번호 변경 ==========================================
		const { mutate: modifyPassword } = useMutation(
    async (newData) => {
      const response = await instance.put("/user/pw/update/", newData);
      return response.newData;
    },
    {
      onSuccess: (data) => {
        console.log(data);
				localStorage.removeItem("accessToken")
				localStorage.removeItem("refreshToken")
				window.location.replace('/login');
      },
			onError: (err) => {
				console.log(err)
				// window.alert(err.response.data.message);
			}
    }
  )
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
				// error 발생시 그 input 값으로 focus
				{shouldFocus:true}
			);
		} else if (data.newpassword === data.password){
				setError(
				"newpassword",
				{message:"기존 비밀번호와 동일합니다."},
				// error 발생시 그 input 값으로 focus
				{shouldFocus:true}
			);
		} else {
			// 제대로 다 작성했을 때 실행
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

	// 계정 설명 수정  ============================================
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
        console.log(data);
      },
			onError: (err) => {
				console.log(err)
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

	// 회원 탈퇴 =====================================================
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
        console.log(data);
				window.location.replace("/login")
      },
			onError: (err) => {
				console.log(err)
				// window.alert(err.response.data.message);
			}
    }
  )

	return (
		<Container>
			<Header selected={3}/>
			<Wrap>
				<TitleWrap>
					<Title>마이페이지</Title>
					<TitleDesc>나의 정보를 수정할 수 있습니다.</TitleDesc>
				</TitleWrap>
				<ContentBox>
					<Content>
						<ImageArea>
							<ImageBox>
								<label htmlFor="file" onChange={uploadImage}>
									<Image>
										<div>
											{data?.imgPath && (
												<img
													src={data?.imgPath}
													alt="previewImg"
													style={{
														width: "187px",
														height: "180px",
														borderRadius: "100%",
													}}
												/>
											)}
										</div>
									</Image>
									<FileBox>
										<FileLabel htmlFor="file">
											<FileImagePhoto src={pen} alt="펜 사진" />
											<FileImageBtn>
												<input type="file" id="file" ref={imageRef} />
											</FileImageBtn>
										</FileLabel>
									</FileBox>
								</label>
							</ImageBox>
						</ImageArea>
						<TextArea>
							<NicknameArticle>
								<Nickname>{data?.nickname}</Nickname>
								<NicknameBtn onClick={() => setNicknameModalIsOpen(true)}>닉네임 변경하기</NicknameBtn>
								<Modal
									isOpen={nicknameModalIsOpen}
									onRequestClose={() => setNicknameModalIsOpen(false)}
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
											height: "248px",
											top: "25%",
											left: "39%",
											padding:"24px"
										},
									}}
								>								
										<ModalNicknameHeader>
											<Modalimagebox>
												<img src={human} alt="human"></img>
											</Modalimagebox>							
											<h1>닉네임 변경하기</h1>
										</ModalNicknameHeader>
											<ModalNicknameInput 
												type="text" 
												ref={nicknameRef}
												onChange={nicknameFilled}
												maxLength="10"
												placeholder = "공백 포함 10자 이내로 작성이 가능해요."
											/>
										<ModalBtnWrap>
											<CancelNicknameBtn onClick={() => setNicknameModalIsOpen(false)}>취소</CancelNicknameBtn>
											<ChangeNicknameBtn 
											onClick={() => {clickModifyNickname(); setNicknameModalIsOpen(false);}}
											disabled={nickFill === false}
											>닉네임 변경</ChangeNicknameBtn>
											<div>										
											</div>
										</ModalBtnWrap>
								</Modal>
							</NicknameArticle>
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
							<EmailArticle>
								<EmailTitle>계정 이메일</EmailTitle>
								<Email>{data?.username}</Email>
							</EmailArticle>
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
										<CancelPwdBtn onClick={() => 
											{setPasswordModalIsOpen(false); resetPwd();}}>취소</CancelPwdBtn>
										<ChangePwdBtn disabled={!isPwdActive}>비밀번호 변경</ChangePwdBtn>
									</ModalPasswrodBtnWrap>
									</form>								
								</Modal>
							</PwdArticle>
							<DeleteAccountArticle>
								<DeleteAccount onClick={clickDelete}>계정 탈퇴하기</DeleteAccount>
							</DeleteAccountArticle>
						</TextArea>
					</Content>
				</ContentBox>
			</Wrap>
		</Container>
	);
}

const Wrap = styled.div`
	width: 1000px;
	margin: 0 auto 100px auto;
`;

// Title
const TitleWrap = styled.div`
	width: 100%;
	margin-bottom: 50px;
`;
const Title = styled.p`
	font-size: 30px;
	line-height: 24px;
	font-weight: 500;
	padding: 8px 0px 19px 15px;
`;
const TitleDesc = styled.p`
	font-size: 20px;
	line-height: 24px;
	font-weight: 400;
	padding: 0px 0px 3px 15px;
`;

// Content
const ContentBox = styled.div`
	width: 1000px;
	height: 610px;
	border: none;
	border-radius: 30px;
	background: #f6f5fb;
	position: relative;
	padding: 65px 105px 70px 104px;
`;
const Content = styled.div`
	width: 900px;
	height: 470px;
	display: flex;
`;

// Image
const ImageArea = styled.div``;

const ImageBox = styled.div`
	position: relative;
`;

const Image = styled.div`
	background-color: #c9aaff;
	width: 187px;
	height: 180px;
	border-radius: 100%;
	position: relative;
`;

// File
const FileBox = styled.div`
	input {
		position: absolute;
		width: 0;
		height: 0;
		padding: 0;
		overflow: hidden;
		border: 0;
	}
`;
const FileLabel = styled.label`
	width: 53px;
	height: 53px;
	background-color: #9152ff;
	border-radius: 100%;
	position: absolute;
	top: 127px;
	right: 0px;
	padding: 17px 17px;
	&:hover {
		cursor: pointer;
	}
`;

const FileImageBtn = styled.div``;

const FileImagePhoto = styled.img`
	width: 21px;
	height: 21px;
	position: absolute;
	z-index: 1;
	color: #999;
`;

// TextArea
const TextArea = styled.div`
	margin-left: 100px;
`;

// Nickname
const NicknameArticle = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 45px;
`;

const Nickname = styled.p`
	font-size: 24px;
	font-weight: 500;
`;
const NicknameBtn = styled.button`
	margin-left: 16px;
	padding: 12px 16px;
	color: #9152ff;
	background-color: #f6f5fb;
	border: 1px solid #bc98fc;
	border-radius: 50px;
	font-size: 12px;
	line-height: 12px;
	box-sizing: border-box;
	&:hover {
		cursor: pointer;
	}
`;

// ModalNickname
const ModalNicknameHeader = styled.div`
	display:flex;
	align-items:center;
	margin-bottom:28px;
	h1 {
		color:#303030;
		font-size:20px;
		font-weight:600;
	}
`;

const Modalimagebox = styled.div`
	width: 44px;
	height: 44px;
	background-color:#E8E1FC;
	border-radius:50%;
	margin-right:12px;
	img {
		position:relative;
		left: 35.6%;
		top: 25%;
	}
`;

const ModalNicknameInput = styled.input`
	width: 390px;
	height: 50px;
	border: 1px solid #D2BAFF;
	border-radius: 100px;
	padding: 18px 20px;
	margin-bottom:28px;
	&:focus {
		outline: 1px solid #9152FF;
	}
`;

const ModalBtnWrap = styled.div`
	display:flex;
	position:absolute;
	bottom: 24px;
	right:24px;
`;

const CancelNicknameBtn = styled.button`
	width: 62px;
	height: 48px;
	background: #F7F3FD;
	border-radius: 26px;
	font-size:14px;
	line-height:14px;
	color:#9E67FF;
	padding:18px;
	margin-right:12px;
	border:none;
	cursor: pointer;
`;

const ChangeNicknameBtn = styled.button`
	width: 100px;
	height: 48px;
	border-radius: 50px;
	padding: 18px;
	font-size:14px;
	line-height:14px;
	border:none;
	background-color: #ECECEC;
	color:#949494;
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
`;

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

// Pwd
const PwdArticle = styled.div`
	margin-top: 40px;
`;

const PwdTitle = styled.div`
	font-size: 20px;
	color: #111111;
	margin-bottom: 16px;
`;
const PwdArea = styled.div`
`;


const PwdBtn = styled.button`
	border: none;
	font-size: 12px;
	color: #9152ff;
	background: #f6f5fb;
	border: 1px solid #bc98fc;
	border-radius: 50px;
	padding: 12px 16px;
	&:hover {
		cursor: pointer;
	}

`;

// ModalPassword
const ModalPasswordHeader = styled.div`
	display:flex;
	align-items:center;
	margin-bottom:32px;
	h1 {
		color:#303030;
		font-size:20px;
		font-weight:600;
	}
	`
const ModalPasswordContent = styled.div`
	/* margin-bottom:28px; */
	position:relative;
	p {
		font-size:16px;
		margin-bottom:12px;
	}
	input {
		width: 390px;
		height: 50px;
		border: 1px solid #D2BAFF;
		border-radius: 100px;
		padding: 18px 20px;
		&:focus {
			outline: 1px solid #9152FF;
	}
	}
`;

const ExistPwdWrap = styled.div`
	position:relative;
	span {
		color:#FF5C5C;
		margin-top:10px;
		/* height:15px; */
		display:inline-block;
	}
	img {
		position:absolute;
		top:42px;
		right:15px;
		display:block;
	}
`
const PwdWrap = styled.div`
	margin-top:15px;
	position:relative;
	span {
		color:#FF5C5C;
		margin-top:10px;
		display:inline-block;
	}
	img {
		position:absolute;
		top:42px;
		right:15px;
	}
`
const RePwdWrap = styled.div`
	margin-top:15px;
	position:relative;
	span {
		color:#FF5C5C;
		display:inline-block;
		margin-top:10px;
	}
	img {
		position:absolute;
		top:42px;
		right:15px;
	}
`
const ModalPasswrodBtnWrap = styled.div`
	display:flex;
	position:absolute;
	right:24px;
	bottom:24px;
`;

const CancelPwdBtn = styled.button`
	width: 62px;
	height: 48px;
	background: #F7F3FD;
	border-radius: 26px;
	font-size:14px;
	line-height:14px;
	color:#9E67FF;
	padding:18px;
	margin-right:12px;
	border:none;
	cursor: pointer;
`

const ChangePwdBtn = styled.button`
	width: 113px;
	height: 48px;
	border-radius: 50px;
	padding: 18px;
	font-size:14px;
	line-height:14px;
	border:none;
	background-color: #ECECEC;
	color:#949494;
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

// DeleteAccount
const DeleteAccountArticle = styled.div`
	margin-top: 40px;
`;

const DeleteAccount = styled.p`
	color: #8b8b8b;
	font-size: 14px;
	text-decoration: underline;
	cursor: pointer;
`;

export default MyPage;
