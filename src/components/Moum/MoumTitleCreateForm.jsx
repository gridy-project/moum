// module
import { useEffect } from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { instance } from "../../api/axios";
import { pageMoumSelectedFolderId } from "../../atoms/moum";
import { floatState, globalFloat, globalPopup, popupState } from "../../atoms/popup";

// custom hook
import useHandleChange from "../../hooks/useHandleChange";

// image
import arrowSave from "../../public/img/arrow-moum-save.png"
import queryClient from "../../shared/query";
import LinkPieceModifyPopup from "../card/LinkPieceModifyPopup";
import MemoPieceModifyPopup from "../card/MemoPieceModifyPopup";
import fastCreateBottom from "./images/fast-create-select-bottom.png";

function MoumCreateModifyPopup ({piece}) {
  const setFloatState = useSetRecoilState(floatState);
  const setPopupState = useSetRecoilState(popupState);
  const setPopup = useSetRecoilState(globalPopup);

  const runModifyPopup = (e) => {
    if (piece.boardType === "LINK") {
      setPopup(<LinkPieceModifyPopup piece={piece} />);
    } else if (piece.boardType === "MEMO") {
      setPopup(<MemoPieceModifyPopup piece={piece} />);
    }
    setPopupState(true);
    setFloatState(false);
  }

  return (
    <div>
      <button onClick={runModifyPopup}>수정하기</button>
    </div>
  )
}

function MoumTitleCreateForm () {
  const setFloatState = useSetRecoilState(floatState);
  const setFloat = useSetRecoilState(globalFloat);
  const folderId = useRecoilValue(pageMoumSelectedFolderId);
  const {input, setInput, handleChange} = useHandleChange({
    type: "LINK",
    content: ""
  });

  const {mutate: addPiece} = useMutation(async (data) => {
    if (folderId === 0) {
      const response = await instance.post("/board", data);
      return response.data;
    } else {
      const response = await instance.put("/folder", {folderId, ...data});
      return response.data;
    }
  }, {
    onSuccess: data => {
      queryClient.invalidateQueries("piece");
      setFloatState(true);
      console.log(data);
      setFloat(<MoumCreateModifyPopup piece={data} />)
    },
    onError: err => {
      alert("파일 추가 실패");
    }
  });

  const addPieceSimple = (e) => {
    e.preventDefault();
    console.log("작동");

    if (input.type === "NONE") {
      alert("타입을 선택해주세요");
      return;
    }

    if (input.content === "") {
      alert("값을 입력해주세요");
      return;
    }

    let obj = {}
    if (input.type === "LINK") {
      obj = {
        link: input.content,
        status: "PRIVATE",
        boardType: input.type,
      }
    } else if (input.type === "MEMO") {
      obj = {
        content: input.content,
        status: "PRIVATE",
        boardType: input.type,
      }
    }

    addPiece(obj);
    setInput((current) => ({...current, content: ""}));
  }

  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState({value: "LINK", text: "링크"});

  return (
    <Form className="maker" onSubmit={addPieceSimple}>
      <SelectWrap>
        <SelectBox onClick={() => {setToggle((current) => !current)}}>
          <span>{type.text}</span>
          <img src={fastCreateBottom} alt="toggle" />
        </SelectBox>
        <SelectBoxOption toggle={toggle}>
          <Option onClick={
            () => {
              setType({value: "LINK", text: "링크"});
              setInput(current => ({...current, type: "LINK"}));
              setToggle((current) => !current);
            }}>링크</Option>
          <Option onClick={
            () => {
              setType({value: "MEMO", text: "메모"});
              setInput(current => ({...current, type: "MEMO"}));
              setToggle((current) => !current);
            }}>메모</Option>
        </SelectBoxOption>
      </SelectWrap>
      <input 
        type="text" 
        placeholder={type.value === "LINK" ? "링크를 입력하세요." : "메모를 입력하세요"} 
        onChange={handleChange("content")} 
        value={input.content}/>
      <button>저장하기<img src={arrowSave} alt="save" /></button>
    </Form>
  );
}

const SelectWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  img {
    margin-left: 8px;
  }
`;

const SelectBoxOption = styled.div`
  position: absolute;
  top: 50px;
  width: 80px;
  height: 80px;
  box-shadow: 0px 2px 16px 4px rgba(145, 82, 255, 0.2);
  background-color: #FFFFFF;
  padding: 6px;
  border-radius: 12px;
  cursor: pointer;
  display: ${props => props.toggle ? "block" : "none"};
`;

const Option = styled.div`
  width: 100%;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  transition: background .3s;

  &:hover {
    background-color: #F1EAFF;
  }
`;

const Form = styled.form`
  margin-top: 90px;
  width: 620px;
  height: 50px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 16px 4px rgba(145, 82, 255, 0.2);
  border-radius: 25px;

  > div {
    flex-shrink: 0;
    width: 80px;
    height: 70%;
    border-right: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;

    select {
      border: none;
      width: 60%;
      height: 100%;
    }
  }

  input {
    border: none;
    width: 100%;
    height: 40px;
    margin: 0 20px;
    outline: none;
    font-size: 16px;
    &::placeholder {
      color: #B7B7B7;
    }
  }

  button {
    flex-shrink: 0;
    width: 115px;
    height: 100%;
    border-radius: 25px;
    font-size: 16px;
    border: none;
    background: #9152FF;
    color: #FFFFFF;
    box-shadow: 0px 2px 16px 4px rgba(145, 82, 255, 0.2);
    cursor: pointer;

    img {
      margin-left: 5px;
    }
  }
`;


export default MoumTitleCreateForm;