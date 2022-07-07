import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import axios from "axios";

import Header from "../components/common/Header";
import { getProfileDB, modifyProfileDB, deleteProfileDB, modifyPasswordeDB } from "../redux/modules/profileSlice";
import pen from "../public/img/pen.png";
import { act } from "react-dom/test-utils";

function MyPage() {
	const dispatch = useDispatch();

	const imageRef = useRef(null);
	const passwordRef = useRef(null);
	const newPasswordRef = useRef(null);
	const deletePwdRef = useRef(null);

	const [imageUrls, setImageUrls] = useState([]);
	const [imageSrc, setImageSrc] = useState("");

	const [active, setActive] = useState(false);

	const profileList = useSelector((state) => state.profile.info);

	const actived = active ? false : true;

	// 이미지 1장 업로드
	const uploadImage = (e) => {
		const formData = new FormData();
		formData.append("image", imageRef.current.files[0]);

		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};

		axios.post("http://13.124.160.57/image", formData, config).then((response) => {
			const url = response.data;
			setImageUrls({ imageUrl: url });
		});
	};

	// ========================================== 계정 관리

	useEffect(() => {
		dispatch(getProfileDB());
	}, []);

	// 비밀번호 변경
	const modifyPassword = () => {
		const id = profileList.id;
		const data = {
			password: passwordRef.current.value,
			newPassword: newPasswordRef.current.value,
		};
		dispatch(modifyPasswordeDB(id, data));
	};

	// 회원 탈퇴
	const RemoveAccount = () => {
		const id = profileList.id;
		dispatch(deleteProfileDB(id));
	};

	return (
		<div>
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
								<Image>
									<div>
										<img src={imageSrc} alt="previewImg" />
									</div>
								</Image>
								<FileBox>
									<FileLabel htmlFor="file">
										<FileImagePhoto src={pen} alt="펜 사진" />
										<FileImageBtn>
											<input type="file" id="file" ref={imageRef}/>
										</FileImageBtn>
									</FileLabel>
								</FileBox>
							</ImageBox>
						</ImageArea>
						<TextArea>
							<NicknameArticle>
								<Nickname>{profileList.nickname}</Nickname>
								<NicknameBtn>닉네임 변경하기</NicknameBtn>
							</NicknameArticle>
							<DescArticle>
								<Desc>계정 설명</Desc>
								<DescInput placeholder="나의 계정/모음/채널에 대해 설명해주세요." isActive={active} />
								<DescBtn isActive={active} onClick={() => setActive(!active)}>
									{actived ? "수정하기" : "적용하기"}
								</DescBtn>
							</DescArticle>
							<EmailArticle>
								<EmailTitle>계정 이메일</EmailTitle>
								<Email>{profileList.username}</Email>
							</EmailArticle>
							<PwdArticle>
								<PwdTitle>비밀번호</PwdTitle>
								<PwdArea>
									<PwdBtn>비밀번호 변경하기</PwdBtn>
								</PwdArea>
							</PwdArticle>
							<DeleteAccountArticle>
								<DeleteAccount onClick={RemoveAccount}>계정 탈퇴하기</DeleteAccount>
							</DeleteAccountArticle>
						</TextArea>
					</Content>
				</ContentBox>
			</Wrap>
		</div>
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
const DescArticle = styled.div``;

const Desc = styled.p`
	font-size: 20px;
	margin-bottom: 16px;
`;

const DescInput = styled.textarea`
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
