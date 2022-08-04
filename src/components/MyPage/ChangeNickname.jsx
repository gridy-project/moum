// React, React-redux
import React, { useState, useRef } from "react";
// css
import styled, {css} from 'styled-components';
import human from "assets/images/pages/mypage/human.png";
import Swal from "sweetalert2";
import tw from "twin.macro";
// modal
import Modal from "react-modal";
// React Query
import {  useMutation, useQueryClient } from "react-query";
// axios
import { instance } from "shared/axios"
import useCustomQuery from "hooks/useCustomQuery";

Modal.setAppElement("#root");

const ChangeNickname = () => {
	const queryClient = useQueryClient();
  const nicknameRef = useRef(null);
  
  // 닉네임 변경 input
	const [nickFill, setNickFill] = useState(false);
  //  modal
	const [nicknameModalIsOpen, setNicknameModalIsOpen] = useState(false);

  // 계정 조회 
	const { data } = useCustomQuery(
    "profile",
    async () => {
      const response = await instance.get("/user/profile");
      return response.data;
    }
  );

  // 닉네임 변경 
	const clickModifyNickname = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const data = {
			nickname: nicknameRef.current.value
		}
		modifyNickname(data);
	};

	const { mutate: modifyNickname } = useMutation(
    async (data) => await instance.put("/user/updateName/", data),
    {
      onSuccess: ({result, status}) => {
				if (result) {
        	queryClient.invalidateQueries("profile");
					setNicknameModalIsOpen(false);
					setNickFill(false)
				} else {
					if (status === 501) {
						Swal.fire({
							icon: "error",
							title: "변경 실패",
							text: "중복된 닉네임입니다."
						});
					} else if (status === 505) {
						Swal.fire({
							icon: "error",
							title: "변경 실패",
							text: "사용할 수 없는 닉네임입니다."
						});
					} else if (status === 500) {
						Swal.fire({
							icon: "error",
							title: "변경 실패",
							text: "글자 수를 확인해 주세요."
						});
					}
				}
      },
			onError: (err) => {
				Swal.fire({
          icon: "error",
          title: "서비스 에러"
        })
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
											onClick={clickModifyNickname}
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
	${tw`
    mb-[45px] flex items-center
  `}
`;
const Nickname = styled.p`
	font-size: 24px;
	${tw`font-medium `}
`;
const NicknameBtn = styled.button`
	color: #9152ff;
	background-color: #f6f5fb;
	border: #bc98fc;
	font-size: 12px;
	line-height: 12px;
	&:hover {
		cursor: pointer;
	}
	${tw`
    ml-[16px] p-[12px 16px] border-solid border-[1px] rounded-[50px] box-border
  `}
`;

// ModalNickname
const ModalNicknameHeader = styled.div`
	${tw`
    flex items-center mb-[28px]
  `}
	h1 {
		color:#303030;
		font-size:20px;
		${tw`font-semibold `}
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

const ModalNicknameInput = styled.input`
	border: #D2BAFF;
	color: #B7B7B7;
	&:focus {
		outline: 1px solid #D2BAFF;
		color: #111111;
	}
	${tw`
    w-[390px] h-[50px] rounded-[100px] mb-[28px] border-solid border-[1px] p-[18px 20px]
  `}
`;

const ModalBtnWrap = styled.div`
	${tw`
    flex absolute bottom-[24px] right-[24px]
  `}
`;

const CancelNicknameBtn = styled.button`
	background: #F7F3FD;
	font-size:14px;
	line-height:14px;
	color:#9E67FF;
	cursor: pointer;
	${tw`
    w-[62px] h-[48px] rounded-[26px] p-[18px] mr-[12px] border-none cursor-pointer
  `}
`;

const ChangeNicknameBtn = styled.button`
	font-size:14px;
	line-height:14px;
	background-color: #ECECEC;
	color:#949494;
	${tw`
    w-[103px] h-[48px] rounded-[50px] p-[18px] border-none 
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
`;
export default ChangeNickname;