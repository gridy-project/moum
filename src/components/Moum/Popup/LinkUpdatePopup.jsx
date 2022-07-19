import useHandleChange from "hooks/useHandleChange";
import { useState } from "react";
import styled from "styled-components";
import PopupCategorySelect from "./LinkUpdatePopup/PopupCategorySelect";
import PopupContentField from "./LinkUpdatePopup/PopupContentField";
import PopupImageChange from "./LinkUpdatePopup/PopupImageChange";
import UpdatePopupHeader from "./UpdatePopupHeader";

function LinkUpdatePopup ({close, piece}) {
  const [menu] = useState(["카테고리 선택", "작성한 내용", "이미지 변경"]);
  const [pageNum, setPageNum] = useState(0);
  console.log(piece);
  const {input: data, setInput: setData, handleChange} = useHandleChange({
    folderId: 0,
    category: "",
    subject: "",
    content: "",
    image: ""
  });

  const pageNext = () => {
    setPageNum(current => current + 1);
  }

  const pageEnd = () => {
    close();
  }

  return (
    <Box>
      <UpdatePopupHeader pageNum={pageNum} menu={menu} />
      {pageNum === 0 && <PopupCategorySelect next={pageNext} close={close}/>}
      {pageNum === 1 && <PopupContentField next={pageNext} close={close} />}
      {pageNum === 2 && <PopupImageChange finish={pageEnd} close={close} />}
    </Box>
  );
}

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default LinkUpdatePopup;