import useCustomMutate from "hooks/useCustomMutate";
import useHandleChange from "hooks/useHandleChange";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { instance } from "shared/axios";
import styled from "styled-components";
import PopupCategorySelect from "./LinkDetailPopup/PopupCategorySelect";
import PopupContentField from "./LinkDetailPopup/PopupContentField";
import PopupImageChange from "./LinkDetailPopup/PopupImageChange";
import DetailPopupHeader from "./DetailPopupHeader";

function LinkDetailPopup ({close, piece}) {
  const queryClient = useQueryClient();
  const [menu] = useState(["카테고리 선택", "작성한 내용", "이미지 변경"]);
  const [pageNum, setPageNum] = useState(0);
  const {input, setInput} = useHandleChange({
    id: piece.id,
    folderId: 0,
    category: piece.category,
    link: piece.link,
    subject: piece.title,
    content: piece.explanation,
    image: piece.imgPath,
    share: false,
  });

  const pageNext = () => {
    setPageNum(current => current + 1);
  }

  const {mutateAsync: modify} = useCustomMutate(async ({id, data}) => await instance.put(`/board/${id}`, data));

  const pageEnd = async (imageUrl) => {
    const id = input.id;
    const data = {
      title: input.subject,
      explanation: input.content,
      link: input.link,
      imgPath: imageUrl ?? input.image,
      category: input.category,
      boardType: "LINK",
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

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <Box>
      <DetailPopupHeader pageNum={pageNum} menu={menu} />
      {pageNum === 0 && <PopupCategorySelect next={pageNext} close={close} setter={setInput} getter={input} />}
      {pageNum === 1 && <PopupContentField next={pageNext} close={close} setter={setInput} getter={input} />}
      {pageNum === 2 && <PopupImageChange finish={pageEnd} close={close} setter={setInput} getter={input} />}
    </Box>
  );
}

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default LinkDetailPopup;