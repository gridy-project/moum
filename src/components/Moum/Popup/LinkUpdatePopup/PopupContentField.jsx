import styled from "styled-components";
import PopupButtonGroup from "./PopupButtonGroup";

function PopupContentField ({next, close}) {
  return (
    <Box>
      <form>
        <label className="subject-label" htmlFor="subject">제목</label>
        <input id="subject" type="text" placeholder="해당 링크에 대한 제목을 적어주세요." />
        <label className="content-label" htmlFor="content">내용</label>
        <textarea 
          id="content"
          placeholder="해당 링크에 대한 설명을 적어주세요."
        ></textarea>
        <PopupButtonGroup next={next} close={close} />
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
  form {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    label {
      margin-top: 36px;
    }

    input {
      margin-top: 16px;
      background-color: #F5F5F5;
      border: none;
      height: 80px;
      border-radius: 20px;
      padding: 18px;
      vertical-align: top;
    }

    textarea {
      margin-top: 16px;
      height: 80px;
      background-color: #F5F5F5;
      resize: none;
      border: none;
      border-radius: 20px;
      padding: 18px;
    }
  }
`;

export default PopupContentField;