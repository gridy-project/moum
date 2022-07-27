import styled from "styled-components";
import useHandleChange from "hooks/useHandleChange";
import noImage from "assets/images/pages/moum/images-none.png";
import { typeCategory } from "shared/type";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import { globalPopup, popupState } from "state/common/popup";
import { useMutation } from "react-query";
import { instance } from "shared/axios";
import queryClient from "shared/query";
import { useState } from "react";
import { useRef } from "react";

function  LinkPieceModifyPopup ({piece}) {
  const setPopupState = useSetRecoilState(popupState);
  const resetPopup = useResetRecoilState(globalPopup);
  const [customFileState, setCustomFileState] = useState(false);
  const fileRef = useRef(null);
  const {input, setInput, handleChange} = useHandleChange({
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
      queryClient.invalidateQueries("mine/pieces");
      queryClient.invalidateQueries("mine/categories");
    }
  });

  const {mutate: upload} = useMutation(async (data) => {
    const response = await instance.post(`/board/image`, data);
    return response.data;
  }, {
    onSuccess: (imageData) => {
      const id = piece.id;
      const data = {
        title: input.subject,
        explanation: input.content,
        link: input.url,
        imgPath: imageData.url,
        category: input.category,
        boardType: "LINK",
        status: input.share,
      }

      modify({id, data});

      setPopupState(false);
      resetPopup();
    }
  });

  const modifySubmit = (e) => {
    e.preventDefault();

    if (input.category === "카테고리") {
      alert("카테고리를 선택해 주세요");
      return;
    }

    if (customFileState) {
      const formData = new FormData();
      formData.append("boardImage", fileRef.current.files[0]);
      upload(formData);
    } else {
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
  }

  const onClose = (e) => {
    e.preventDefault();
    setPopupState(false);
    resetPopup();
  }

  const {mutate: og} = useMutation(async (url) => {
    const response = await instance.post(`/image/og`, {url});
    return response.data;
  }, {
    onSuccess: (data) => {
      setInput(
        current => {
          const obj = {...current};
          obj.subject = data?.title ?? "";
          obj.content = data?.description ?? "";
          obj.image = data?.image;
          return obj;
        }
      )
    }
  });

  const getOG = (e) => {
    e.preventDefault();
    og(input.link);
    setCustomFileState(false);
    fileRef.current.value = "";
  }

  const changeFile = (fileEvent) => {
    if (fileEvent.target.files && fileEvent.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
          const previewImage = document.getElementById('uploadImage');
          previewImage.src = e.target.result;
      }
      reader.readAsDataURL(fileEvent.target.files[0]);
      setCustomFileState(true);
    }
  }

  return (
    <Box>
      <form onSubmit={modifySubmit}>

        <div className="link">
          링크<input type="text" onChange={handleChange("link")} value={input.link} />
          <button onClick={getOG}>OG 불러오기</button>
        </div>
        {
          customFileState ? <img id="uploadImage" src={noImage} alt="업로드 이미지" /> : <img src={input.image || noImage} alt="수정 이미지" />
        }
        <label className="custom-upload" htmlFor="file">커스텀 이미지 올리기</label>
        <input accept="image/*" id="file" type="file" onChange={changeFile} ref={fileRef} hidden/>
        <select onChange={handleChange("category")} value={input.category}>
          {typeCategory.map((opt) => {
            return <option key={opt} value={opt}>{opt}</option>
          })}
        </select>
        공개여부
        <select onChange={handleChange("share")} value={input.share}>
          <option value="PUBLIC">공개</option>
          <option value="PRIVATE">비공개</option>
        </select>
        제목<input type="text" onChange={handleChange("subject")} value={input.subject}/>
        내용<input type="text" onChange={handleChange("content")} value={input.content}/>
        <button className="complete">완료</button>
      </form>
    </Box>
  );
}

const Box = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 650px;
  background-color: #FFFFFF;
  z-index: 1;
  padding: 20px;

  .close-pop {
    border: none;
    width: 50px;
    height: 30px;
    background-color: #d84343;
    color: #FFFFFF;
  }

  form {
    display: flex;
    flex-direction: column;
    font-size: 24px;

    .link {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;

      input {
        font-size: 24px;
        box-sizing: border-box;
        border: 1px solid #ddd;
      }

      button {
        font-size: 24px;
        border: none;
        background-color: #DDDDDD;
        box-sizing: border-box;
      }
    }

    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
      border: 1px solid #ddd;
    }

    select {
      font-size: 24px;
    }

    input {
      font-size: 24px;
    }

    .custom-upload {
      padding: 10px;
      color: #333333;
      background-color: #DDDDDD;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #CCCCCC;
      }
    }

    .complete {
      font-size: 24px;
      height: 50px;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      padding: 0;
      color: #FFFFFF;
      background-color: #000000;
    }
  }
`;

export default LinkPieceModifyPopup;