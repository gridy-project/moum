// React, React-redux
import React, { useState, useRef } from "react";
// css
import styled, {css} from 'styled-components';
import human from "assets/images/pages/mypage/human.png";

// modal
import Modal from "react-modal";

// React Query
import {  useMutation, useQuery } from "react-query";
import queryClient from "shared/query";

// axios
import { instance } from "shared/axios"

Modal.setAppElement("#root");

const ChangeNickname = () => {
  const nicknameRef = useRef(null);
  
  // 닉네임 변경 input
	const [nickFill, setNickFill] = useState(false);
  //  modal
	const [nicknameModalIsOpen, setNicknameModalIsOpen] = useState(false);

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

  // 닉네임 변경 
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
  return (
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
  );
};

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
export default ChangeNickname;