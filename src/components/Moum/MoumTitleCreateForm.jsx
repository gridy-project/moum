// module
import { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";

import { instance } from "../../api/axios";

// custom hook
import useHandleChange from "../../hooks/useHandleChange";
import { mappingPieceToServerSimple } from "../../mapping/piece";

// image
import arrowSave from "../../public/img/arrow-moum-save.png"
import fastCreateBottom from "./images/fast-create-select-bottom.png";

function MoumTitleCreateForm () {
  const {input, setInput, handleChange} = useHandleChange({
    type: "LINK",
    content: ""
  });

  const {mutate: addPiece} = useMutation(async (data) => {
    const response = await instance.post("/board", data);
    return response.data;
  }, {
    onSuccess: data => {
      alert("파일 추가 성공");
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

    const mapping = mappingPieceToServerSimple(input);
    addPiece(mapping);

    // dispatch(addPieceSimpleThunk(folderId, mappingPieceToServerSimple(input)));
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
      <input type="text" placeholder="링크를 입력하세요." onChange={handleChange("content")} value={input.content}/>
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