import { useMutation } from "react-query";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { instance } from "shared/axios";
import { globalPopup, popupState } from "state/common/popup";
import useHandleChange from "hooks/useHandleChange";
import queryClient from "shared/query";
import { typeCategory } from "shared/type";

function MemoPieceModifyPopup({piece}) {
  const setPopupState = useSetRecoilState(popupState);
  const resetPopup = useResetRecoilState(globalPopup);

  const {input, handleChange} = useHandleChange({
    subject: piece.title,
    content: piece.content,
    category: piece.category ?? "카테고리",
    share: piece.status
  });

  const {mutate: modify} = useMutation(async ({id, data}) => {
    const response = await instance.put(`/board/${id}`, data);
    return response.data;
  }, {
    onSuccess: data => {
      queryClient.invalidateQueries("mine/pieces");
      queryClient.invalidateQueries("mine/categories");
    }
  });

  const modifySubmit = (e) => {
    e.preventDefault();

    if (input.category === "카테고리") {
      alert("카테고리를 선택해 주세요");
      return;
    }

    const id = piece.id;
    const data = {
      title: input.subject,
      content: input.content,
      category: input.category,
      boardType: "MEMO",
      status: input.share,
    }

    modify({id, data});

    setPopupState(false);
    resetPopup();
  }

  const onClose = (e) => {
    e.preventDefault();
    setPopupState(false);
    resetPopup();
  }

  return (
    <ModifyPiece>
      <button onClick={onClose}>닫기</button>
      <form onSubmit={modifySubmit}>
        <select onChange={handleChange("category")} value={input.category}>
          {typeCategory.map((opt) => {
            return <option key={opt} value={opt}>{opt}</option>
          })}
        </select>
        <select onChange={handleChange("share")} value={input.share}>
          <option value="PUBLIC">공개</option>
          <option value="PRIVATE">비공개</option>
        </select>
        제목<input type="text" onChange={handleChange("subject")} value={input.subject}/>
        내용<input type="text" onChange={handleChange("content")} value={input.content}/>
        <button>수정하기</button>
      </form>
    </ModifyPiece>
  )
}


const ModifyPiece = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 500px;
  background-color: #FFFFFF;
  z-index: 1;
  form {
    display: flex;
    flex-direction: column;
    padding: 0 270px;
  }
`;

export default MemoPieceModifyPopup;