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
import useCustomQuery from "hooks/useCustomQuery";
import { useParams } from "react-router-dom";

function LinkDetailPopup ({close, piece, isUpdate}) {
  const {folderId: viewFolderId = 0} = useParams();

  const queryClient = useQueryClient();
  const [menu] = useState(["카테고리 선택", "작성한 내용", "이미지 변경"]);
  const [pageNum, setPageNum] = useState(0);
  const {input, setInput} = useHandleChange({});

  const {isSuccess, data} = useCustomQuery(["detail/piece", piece.id], () => instance.get(`/board/${piece.id}`));

  useEffect(() => {
    if (isSuccess && data) {
      const {data: item} = data;

      const imageType = item.imageList.filter(v => v.id === item.imageId)[0].imageType;
      let imageNum;
      if (imageType === "og") {
        imageNum = 0;
      } else if (imageType === "basic") {
        imageNum = 1;
      } else if (imageType === "self") {
        imageNum = 2;
      }
      setInput({
        id: item.id,
        subject: item.title,
        link: item.link,
        content: item.explanation,
        image: item.imgPath,
        share: item.status === "PUBLIC" ? true : false,
        folderId: item.folderId,
        category: item.category === "미정" ? "카테고리 없음" : item.category,
        select: imageNum,
        imageItems: {
          og: item.imageList.filter((v) => v.imageType === "og")[0]?.imgPath ?? null,
          recommend: item.imageList.filter((v) => v.imageType === "basic")[0]?.imgPath ?? null,
          upload: item.imageList.filter((v) => v.imageType === "self")[0]?.imgPath ?? null
        }
      });
    }
  }, [isSuccess, data, setInput]);

  const pageNext = () => {
    setPageNum(current => current + 1);
  }

  const {mutateAsync: modify} = useCustomMutate(({id, data}) => instance.put(`/board/${id}`, data));

  const pageEnd = async (type, uploadUrl) => {
    const id = input.id;

    const oldUrl = input.image;
    let newUrl;
    let typeText;
    if (type === 0) { // OG 이미지
      newUrl = input.imageItems.og;
      typeText = "og";
    } else if (type === 1) { // 추천 이미지
      // newUrl = input.image
    } else if (type === 2) { // 내 PC에서 불러오기
      newUrl = uploadUrl;
      typeText = "self";
    }

    const data = {
      title: input.subject,
      explanation: input.content,
      link: input.link,
      imgPath: oldUrl,
      image: {
        imgPath: newUrl,
        imageType: typeText
      },
      folderId: input.folderId,
      category: input.category === "카테고리 없음" ? null : input.category,
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

  return (
    <Box>
      <DetailPopupHeader setPageNum={setPageNum} pageNum={pageNum} menu={menu} />
      {
        isSuccess && input.id && <>
          {
            pageNum === 0 && 
            <PopupCategorySelect 
              next={pageNext} 
              close={close} 
              setter={setInput} 
              getter={input}
            />
          }
          {
            pageNum === 1 && 
            <PopupContentField 
              next={pageNext} 
              close={close} 
              setter={setInput} 
              getter={input}
            />
          }
          {
            pageNum === 2 && 
            <PopupImageChange 
              finish={pageEnd} 
              close={close} 
              setter={setInput} 
              getter={input} 
            />}
        </>
      }
    </Box>
  );
}

const Box = styled.div`
  width: 630px;
  height: 530px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
`;

export default LinkDetailPopup;