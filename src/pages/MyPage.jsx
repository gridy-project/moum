// React, React-redux
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// React Query
import {  useMutation, useQuery } from "react-query";
import queryClient from "../shared/query";
// css
import styled, { css } from "styled-components";
import pen from "../public/img/pen.png";
// modal
import Modal from "react-modal";
// axios
import { instance } from "../api/axios"
// component
import Header from "../components/common/Header";
import Container from "../components/common/Container";

Modal.setAppElement("#root");

function MyPage() {
	const imageRef = useRef(null);
	const passwordRef = useRef(null);
	const newPasswordRef = useRef(null);
	const nicknameRef = useRef(null);
	const descInfoRef = useRef(null);

	// textarea
	const [active, setActive] = useState(false);
	const actived = active ? false : true;

	// 글자 수 세기
	const [len, setLen] = useState(0);

	// modal
	const [nicknameModalIsOpen, setNicknameModalIsOpen] = useState(false);
	const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);

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

	// ======= 계정 관리 ========

	const { data } = useQuery(
    "profile",
    async () => {
      const response = await instance.get("/user/profile");
      return response.data;
    },
    {
      onSuccess: (data) => {
				queryClient.invalidateQueries("profile");
			 },
      onError: (err) => {
        console.log(err);
      }
    }
  );
	
	// 닉네임 변경
	const clickModifyNickname = () => {
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
        console.log(data);
      },
			onError: (err) => {
				 window.alert(err.response.data.message);
			}
    }
  )

	// 비밀번호 변경
	const clickModifyPassword = () => {
			const data = {
			password: passwordRef.current.value,
			newPassword: newPasswordRef.current.value,
		}		
		modifyPassword(data);
	};

		const { mutate: modifyPassword } = useMutation(
    async (data) => {
      const response = await instance.put("/user/pw/update/", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
			onError: (err) => {
				console.log(err)
				window.alert(err.response.data.message);
			}
    }
  )

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
        console.log(data);
      },
			onError: (err) => {
				console.log(err)
			}
    }
  )
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
        console.log(data);
				window.location.replace("/login")
      },
			onError: (err) => {
				console.log(err)
				// window.alert(err.response.data.message);
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
		<Container>
			<Header />
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
											backgroundColor: "rgba(255, 255, 255, 0.75)",
										},
										content: {
											color: "#111",
											width: "500px",
											height: "500px",
											top: "15%",
											left: "35%",
										},
									}}
								>
									<h1>닉네임 변경하기</h1>
									<br />
									<p>변경할 닉네임</p>
									<input type="text" ref={nicknameRef} />
									<button onClick={clickModifyNickname}>변경</button>
									<div>
										<button onClick={() => setNicknameModalIsOpen(false)}>X</button>
									</div>
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
									onRequestClose={() => setPasswordModalIsOpen(false)}
									style={{
										overlay: {
											position: "fixed",
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											backgroundColor: "rgba(255, 255, 255, 0.75)",
										},
										content: {
											color: "#111",
											width: "500px",
											height: "500px",
											top: "15%",
											left: "35%",
										},
									}}
								>
									<h1>비밀번호 변경하기</h1>
									<br />
									<div>
										<p>기존 비밀번호</p>
										<input type="password" ref={passwordRef} />
									</div>
									<div>
										<p>변경 비밀번호</p>
										<input type="password" ref={newPasswordRef} />
									</div>
									<button onClick={clickModifyPassword}>변경</button>
									<div>
										<button onClick={() => setPasswordModalIsOpen(false)}>X</button>
									</div>
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
	/* line-height: 40px; */
	/* display: flex;
	align-items: center; */
`;

// const Pwd = styled.div`
// 	font-size: 20px;
// 	color: #818181;
// 	vertical-align: middle;
// 	display: flex;
// 	align-items: center;
// 	position: relative;
// 	top: 5px;
// `;

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
