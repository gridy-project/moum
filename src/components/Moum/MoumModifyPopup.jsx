import { useEffect } from "react";
import styled from "styled-components";
import useHandleChange from "../../hooks/useHandleChange";
import noImage from "../../public/img/Image.png";
import { typeCategory } from "../../shared/type";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import { globalPopup, popupState } from "../../atoms/popup";

function MoumModifyPopup ({piece}) {
  const setPopupState = useSetRecoilState(popupState);
  const resetPopup = useResetRecoilState(globalPopup);
  const {input, setInput, handleChange} = useHandleChange({
    subject: "",
    content: "",
    link: "",
    image: "",
    category: "NONE",
    type: "NONE",
    share: "NONE"
  });

  const modifySubmit = (e) => {
    e.preventDefault();
    setPopupState(false);
    resetPopup();
    setInput({
      subject: "",
      content: "",
      link: "",
      image: "",
      category: "NONE",
      type: "NONE",
      share: "NONE"
    });
  }

  useEffect(() => {
    setInput({
      subject: piece.title,
      content: piece.explanation,
      link: piece.link,
      image: piece.imgPath,
      category: piece.category ?? "NONE",
      type: piece.boardType,
      share: piece.status
    });
  }, [piece, setInput])

  return (
    <ModifyMoum>
      <form onSubmit={modifySubmit}>
        <button onClick={(e) => {
          e.preventDefault();
          setPopupState(false);
          resetPopup();
          setInput({
            subject: "",
            content: "",
            link: "",
            image: "",
            category: "",
            type: "NONE",
            share: "NONE"
          })
        }}>닫기</button>
        링크<input type="text" onChange={handleChange("link")} value={input.link} />
        <button>OG 불러오기</button>
        <img src={input.image || noImage} alt="수정 이미지" />
        <select onChange={handleChange("category")} value={input.category}>
          {typeCategory.map((opt) => {
            return <option key={opt} value={opt}>{opt}</option>
          })}
        </select>
        <select onChange={handleChange("share")} value={input.share}>
          <option value="NONE">공유 설정</option>
          <option value="PUBLIC">공개</option>
          <option value="PRIVATE">비공개</option>
        </select>
        <select onChange={handleChange("type")} value={input.type}>
          <option value="NONE">타입 설정</option>
          <option value="LINK">링크</option>
          <option value="MEMO">메모</option>
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

export default MoumModifyPopup;