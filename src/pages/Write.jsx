import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Container from "../components/common/Container";
import Header from "../components/common/Header";
import useHandleChange from "../hooks/useHandleChange";
import { addPieceThunk } from "../redux/modules/moumSlice";
import { instance } from "../shared/axios";
import { typeCategory } from "../shared/type";

function Write() {
  const dispatch = useDispatch();
  const [input, setInput, handleChange] = useHandleChange({
    subject: "",
    link: "",
    content: "",
    share: "NONE",
    type: "NONE",
    category: "기타",
  });

  const addPiece = (e) => {
    e.preventDefault();
    dispatch(addPieceThunk(input));
  }

  const getOG = async (e) => {
    e.preventDefault();
    // e.stopPropagation();

    try {
      const response = await instance.post("/image/og", {url: input.link});
      const {image, title, description} = response.data;
      setInput((current) => ({...current, image, subject: title, content: description}));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Header />
      <div>
        <Divide>
          <div>링크타입</div>
          <form onSubmit={addPiece}>
            제목<input type="text" onChange={handleChange("subject")} value={input.subject} />
            링크<input type="text" onChange={handleChange("link")} value={input.link} />
            <button onClick={getOG}>OG가져오기</button>
            내용<input type="text" onChange={handleChange("content")} value={input.content} />
            <select onChange={handleChange("share")} value={input.share}>
              <option value="NONE">공유선택</option>
              <option value="PUBLIC">공개</option>
              <option value="PRIVATE">비공개</option>
            </select>
            <select onChange={handleChange("type")} value={input.type}>
              <option value="NONE">타입선택</option>
              <option value="LINK">링크</option>
              <option value="MEMO">메모</option>
            </select>
            <select onChange={handleChange("category")} value={input.category}>
              {typeCategory.map((opt) => {
                return <option key={opt.value} value={opt.value}>{opt.text}</option>
              })}
            </select>
            <button>추가</button>
          </form>
        </Divide>
        <Divide>
          <div>메모타입</div>
          <form onSubmit={addPiece}>
            제목<input type="text" onChange={handleChange("subject")} value={input.subject} />
            내용<input type="text" onChange={handleChange("content")} value={input.content} />
            <select onChange={handleChange("type")} value={input.type}>
              <option value="NONE">공유선택</option>
              <option value="PUBLIC">PUBLIC</option>
              <option value="PRIVATE">PRIVATE</option>
            </select>
            <select onChange={handleChange("type")} value={input.type}>
              <option value="NONE">타입선택</option>
              <option value="LINK">링크</option>
              <option value="MEMO">메모</option>
            </select>
            <button>추가</button>
          </form>
        </Divide>
        <Divide>
          <div>링크타입 (심플)</div>
          <form></form>
        </Divide>
        <Divide>
          <div>메모타입 (심플)</div>
        </Divide>
      </div>
    </Container>
  );
}

const Divide = styled.div`
  padding: 10px 0;
  width: 1200px;
`;

export default Write;