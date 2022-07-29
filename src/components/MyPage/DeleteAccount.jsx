import React, {useState} from 'react';
import styled from 'styled-components';
// React Query
import { useMutation } from "react-query";
// modal
import Modal from "react-modal";
// axios
import { instance } from "shared/axios"
import Swal from "sweetalert2";
import { removeToken } from 'shared/localStorage';

Modal.setAppElement("#root");

const DeleteAccount = () => {
//  modal
const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

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
        Swal.fire({
          icon: "success",
          title: "성공적으로 탈퇴되었습니다."
        }).then(
          () => {
            removeToken();
				    window.location.replace("/")
          }
        )
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
            height: "248px",
            top: "25%",
            left: "39%",
            padding:"24px"
          },
        }}
      >								
          <ModalDeleteAccountHeader>					
            <h1>정말 탈퇴하시겠습니까?</h1>
          </ModalDeleteAccountHeader>
          <ModalBtnWrap>
            <CancelBtn onClick={() => setDeleteModalIsOpen(false)}>취소</CancelBtn>
            <RemoveAccountBtn 
            onClick={() => {clickDelete(); setDeleteModalIsOpen(false);}}
            >탈퇴하기</RemoveAccountBtn>
            <div>										
            </div>
          </ModalBtnWrap>
      </Modal>
    </DeleteAccountArticle>
  );
};

// DeleteAccount
const DeleteAccountArticle = styled.div`
	margin-top: 40px;
`;

const DeleteAccountBtn = styled.p`
	color: #8b8b8b;
	font-size: 14px;
	text-decoration: underline;
	cursor: pointer;
`;

// modal
const ModalDeleteAccountHeader = styled.div`
  	display:flex;
	align-items:center;
	margin-bottom:28px;
	h1 {
		color:#303030;
		font-size:20px;
		font-weight:600;
	}
`;
const ModalBtnWrap = styled.div`
  	display:flex;
	position:absolute;
	bottom: 24px;
	right:24px;
`;

const CancelBtn = styled.button`
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

const RemoveAccountBtn = styled.button`
  	width: 103px;
	height: 48px;
	border-radius: 50px;
	padding: 18px;
	font-size:14px;
	line-height:14px;
	border:none;
	background-color: #ECECEC;
	color:#949494;
`;

export default DeleteAccount;