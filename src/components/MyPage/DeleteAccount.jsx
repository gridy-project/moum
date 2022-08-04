import React, {useState} from 'react';
// React Query
import { useMutation } from "react-query";
// modal
import Modal from "react-modal";
// css
import styled from 'styled-components';
import tw from "twin.macro";
import deletebtn from "../../assets/images/pages/mypage/delete.png";
import exclamation from "../../assets/images/pages/mypage/exclamation.png"
// axios
import { instance } from "shared/axios"
import { removeToken } from 'shared/localStorage';
import useMessageFloat from 'hooks/useMessageFloat';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLogin } from 'state/common/user';

Modal.setAppElement("#root");

const DeleteAccount = () => {
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(isLogin);
  const toast = useMessageFloat();

  //  modal
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  // 회원 탈퇴 
	const clickDelete = () => {
		RemoveAccount()
	};

	const { mutate: RemoveAccount } = useMutation(
    () => {
      return instance.delete("/user/getout/");
    },
    {
      onSuccess: ({result}) => {
        if (result) {
          toast("계정 탈퇴가 완료되었습니다");
          removeToken();
          setLogin(false);
          navigate("/");
        }
      },
			onError: (err) => {
			}
    }
  )

  return (
   <DeleteAccountArticle>
      <DeleteAccountBtn onClick={() => {setDeleteModalIsOpen(true)}}>계정 탈퇴하기</DeleteAccountBtn>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
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
            height: "410px",
            top: "25%",
            left: "39%",
            padding:"24px"
          },
        }}
      >								
          <ModalDeleteAccountHeader>			
            <div>
              <img src={deletebtn} alt="" />
            </div>		
            <h1>탈퇴하기</h1>
          </ModalDeleteAccountHeader>
          <ModalContent>
            <h2>moum을 떠나신다니 아쉬워요</h2>
            <CheckBox>
              <BoxHeader>
                <img src={exclamation} alt="" />
                <span>아래 내용을 꼭 확인하세요</span>
              </BoxHeader>
              <BoxContent>
                <span>탈퇴시 계정 프로필과 조각 등 모든 정보가 삭제되며,</span>
                <br/>
                <span>탈퇴 이후 해당 정보는 복구할 수 없습니다.</span>
              </BoxContent>    
            </CheckBox>
          </ModalContent>
          <ModalBtnWrap>
            <RemoveAccountBtn 
            onClick={() => {clickDelete(); setDeleteModalIsOpen(false);}}
            >탈퇴하기</RemoveAccountBtn>
            <CancelBtn onClick={() => setDeleteModalIsOpen(false)}>취소하기</CancelBtn>
            <div>
            </div>
          </ModalBtnWrap>
      </Modal>
    </DeleteAccountArticle>
  );
};

// DeleteAccount
const DeleteAccountArticle = styled.div`
  ${tw`
    mt-[40px]  
  `}
`;

const DeleteAccountBtn = styled.p`
	color: #8b8b8b;
	font-size: 14px;
  ${tw`underline cursor-pointer `}
`;

// modal
const ModalDeleteAccountHeader = styled.div`
		color:#303030;
		font-size:21px;
    display:flex;
    align-items:center;
    ${tw`
      font-semibold mt-[10px] ml-[5px] mb-[30px]
    `}
    div {
      width: 44px;
      height: 44px;
      background-color:#E8E1FC;
      border-radius:100%;
      margin-right:12px;
      img {
        position:relative;
        top:13px;
        left:13px;
      }
    }
`;

const ModalContent = styled.div`
  h2 {
    color:#555555;
    font-size: 21px;
    ${tw`
      font-semibold mb-[30px]
    `}
  }
`;

const CheckBox = styled.div`
  background-color:#F2EDFA;
   ${tw`
      w-[390px] h-[135px] rounded-[20px] p-[26px 41px 24px 24px]
    `}
`;

const BoxHeader = styled.div`
  color:#6A25E2;
  font-size: 18px;
  ${tw` 
     flex items-center font-medium mb-[13px] font-medium 
  `}
  img {
    color:#9152FF;
  }
  span {
    margin-left:8px;
  }
`;

const BoxContent = styled.div`
  span {
    color:#555555;
    line-height:28px;
  }
`
const ModalBtnWrap = styled.div`
  ${tw`
    flex absolute bottom-[24px] right-[24px]
  `}
`;

const RemoveAccountBtn = styled.button`
	font-size:14px;
	line-height:14px;
	background-color: #F7F3FD;
  ${tw`
    w-[88px] h-[48px] rounded-[50px] p-[18px] border-none text-14 leading-14 text-[#9E67FF] font-semibold mr-[12px]
  `}
`;

const CancelBtn = styled.button`
	background: #F7F3FD;
	font-size:14px;
	line-height:14px;
	color:#9E67FF;
  ${tw`
    w-[88px] h-[48px] rounded-[26px] p-[18px] mr-[12px] border-none cursor-pointer
    bg-[#9152FF] text-[#FFFFFF] font-semibold
  `}
`;



export default DeleteAccount;