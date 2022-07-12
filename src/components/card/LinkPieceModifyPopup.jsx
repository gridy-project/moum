import { useEffect } from "react";
import styled from "styled-components";
import useHandleChange from "../../hooks/useHandleChange";
import noImage from "../../public/img/Image.png";
import { typeCategory } from "../../shared/type";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import { globalPopup, popupState } from "../../atoms/popup";
import { useMutation } from "react-query";
import { instance } from "../../api/axios";
import queryClient from "../../shared/query";

function LinkPieceModifyPopup ({piece}) {
  const setPopupState = useSetRecoilState(popupState);
  const resetPopup = useResetRecoilState(globalPopup);
  const {input, handleChange} = useHandleChange({
    subject: piece.title,
    content: piece.explanation,
    link: piece.link,
    image: piece.imgPath,
    category: piece.category ?? "카테고리",
    share: piece.status
  });

  const {mutate: modify} = useMutation(async ({id, data}) => {
    const response = await instance.put(`/board/${id}`, data);
    return response.data;
  }, {
    onSuccess: data => {
      queryClient.invalidateQueries("piece");
    },
    onError: err => {
      console.log(err);
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
      explanation: input.content,
      link: input.link,
      imgPath: input.image,
      category: input.category,
      boardType: "LINK",
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
    <ModifyMoum>
      <button onClick={onClose}>닫기</button>
      <form onSubmit={modifySubmit}>
        링크<input type="text" onChange={handleChange("link")} value={input.link} />
        <button>OG 불러오기</button>
        <img src={input.image || noImage} alt="수정 이미지" />
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
    </ModifyMoum>
  );
}

const ModifyMoum = styled.div`
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

export default LinkPieceModifyPopup;