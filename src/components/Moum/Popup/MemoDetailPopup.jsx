import useCustomMutate from "hooks/useCustomMutate";
import useHandleChange from "hooks/useHandleChange";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { instance } from "shared/axios";
import styled from "styled-components";
import DetailPopupHeader from "./DetailPopupHeader";
import MemoCategorySelect from "./MemoDetailPopup/MemoCategorySelect";
import MemoContentField from "./MemoDetailPopup/MemoContentField";

function MemoDetailPopup ({piece, close}) {
  const queryClient = useQueryClient();
  const [menu] = useState(["카테고리 선택", "작성한 내용"]);
  const [pageNum, setPageNum] = useState(0);

  const {input, setInput, handleChange} = useHandleChange({
    id: piece.id,
    category: piece.category === "미정" ? "카테고리 없음" : piece.category,
    subject: piece.title,
    content: piece.content,
    share: false,
  });

  const pageNext = () => {
    setPageNum(current => current + 1);
  }

  const {mutateAsync: modify} = useCustomMutate(async ({id, data}) => await instance.put(`/board/${id}`, data));

  const pageEnd = async (subject, content) => {
    const id = input.id;
    const data = {
      folderId: input.folderId,
      title: subject,
      content: content,
      category: input.category === "카테고리 없음" ? null : input.category,
      boardType: "MEMO",
      status: input.share ? "PUBLIC" : "PRIVATE",
    }

    const { result } = await modify({id, data});

    if (result) {
      queryClient.invalidateQueries("mine/pieces");
      queryClient.invalidateQueries("mine/categories");
      close();
    } else {
      alert("작성에 실패했습니다");
      close();
    }
  }

  return (
    <Box>
      <DetailPopupHeader pageNum={pageNum} setPageNum={setPageNum} menu={menu} />
      {
        pageNum === 0 && 
        <MemoCategorySelect 
          getter={input} 
          setter={setInput} 
          handleChange={handleChange} 
          close={close} 
          next={pageNext}
        />
      }
      {
        pageNum === 1 && 
        <MemoContentField 
          getter={input} 
          setter={setInput} 
          handleChange={handleChange} 
          close={close} 
          finish={pageEnd} 
        />
      }
    </Box>
  )
}

const Box = styled.div`
  width: 630px;
  height: 530px;
  background-color: #FFFFFF;
  border-radius: 30px;

`;

export default MemoDetailPopup;