import useCustomMutate from "hooks/useCustomMutate";
import useHandleChange from "hooks/useHandleChange";
import { useEffect, useState } from "react";
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
  console.log(piece);
  const {input, setInput} = useHandleChange({
    id: piece.id,
    folderId: 0,
    category: piece.category,
    subject: piece.title,
    content: piece.content,
    share: false,
  });

  useEffect(() => {
    console.log(input);
  }, [input]);

  const pageNext = () => {
    setPageNum(current => current + 1);
  }

  const {mutateAsync: modify} = useCustomMutate(async ({id, data}) => await instance.put(`/board/${id}`, data));

  const pageEnd = async (subject, content) => {
    const id = input.id;
    const data = {
      title: subject,
      content: content,
      category: input.category,
      boardType: "MEMO",
      status: input.share ? "PUBLIC" : "PRIVATE",
    }

    console.log(data);

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
      <DetailPopupHeader pageNum={pageNum} menu={menu} />
      {pageNum === 0 && <MemoCategorySelect getter={input} setter={setInput} close={close} next={pageNext}/>}
      {pageNum === 1 && <MemoContentField getter={input} setter={setInput} close={close} finish={pageEnd} />}
    </Box>
  )
}

const Box = styled.div`
  width: 100%;
  height: 100%;
`;

export default MemoDetailPopup;