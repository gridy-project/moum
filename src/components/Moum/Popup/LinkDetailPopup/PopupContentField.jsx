import { useRef } from "react";
import styled from "styled-components";
import PopupButtonGroup from "./PopupButtonGroup";

function PopupContentField ({next, close, setter, getter, handleChange}) {
  const ref = {
    subject: useRef(null),
    content: useRef(null)
  }

  const nextContent = () => {
    setter(current => ({
      ...current,
      subject: ref.subject.current.value,
      content: ref.content.current.value
    }));
    next();
  }

  return (
    <Box>
      <form className="relative flex flex-col w-full h-full">
        <label className="mt-36" htmlFor="subject">제목</label>
        <input 
          className="mt-16 bg-[#F5F5F5] border-0 h-50 rounded-20 p-18 align-top"
          id="subject" 
          type="text" 
          placeholder="해당 링크에 대한 제목을 적어주세요." 
          ref={ref.subject} 
          defaultValue={getter.subject}
          maxLength={30}
          onChange={handleChange("subject")}
        />
        <label className="mt-36" htmlFor="content">내용</label>
        <textarea 
          className="mt-16 h-80 bg-[#F5F5F5] resize-none border-0 rounded-20 p-18"
          id="content"
          placeholder="해당 링크에 대한 설명을 적어주세요."
          ref={ref.content}
          defaultValue={getter.content}
          maxLength={250}
          onChange={handleChange("content")}
        ></textarea>
        <PopupButtonGroup next={nextContent} close={close} />
      </form>
    </Box>
  )
}

const Box = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 130px);
  flex-direction: column;
  padding: 0 24px 24px 24px;
`;

export default PopupContentField;