// module
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { globalBottomFloat } from "state/common/popup";

// custom hook
import useHandleChange from "hooks/useHandleChange";

// image
import arrowSave from "assets/images/pages/moum/arrow-moum-save.png"
import queryClient from "shared/query";
import fastCreateBottom from "assets/images/pages/moum/fast-create-select-bottom.png";
import MoumCreateFloat from "../Float/MoumCreateFloat";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import tw from "twin.macro";
import { useAddPiece } from "hooks/query/useQueryPiece";

function MoumTitleCreateForm () {
  const {folderId: viewFolderId = 0} = useParams();

  const setFloat = useSetRecoilState(globalBottomFloat);
  const {input, setInput, handleChange} = useHandleChange({
    type: "LINK",
    content: ""
  });

  const {mutateAsync: addPiece} = useAddPiece();

  const addPieceSimple = async (e) => {
    e.preventDefault();

    if (input.type === "NONE") {
      Swal.fire({
        icon: "error",
        title: "타입을 선택해주세요"
      });
      return;
    }

    if (input.content === "") {
      Swal.fire({
        icon: "error",
        title: "값을 입력해주세요"
      });
      return;
    }

    let obj = {}
    if (input.type === "LINK") {
      const regExp = RegExp("^((http|https)://)?(www.)?([a-zA-Z0-9]+)\\.[a-z]+([a-zA-Z0-9.?#]+)?");
      if (!regExp.test(input.content)) {
        Swal.fire({
          icon: "error",
          title: "올바른 주소 형식으로 입력해주세요"
        });
        return false;
      }
      obj = {
        folderId: viewFolderId,
        data: {
          link: input.content,
          boardType: input.type,
        }
      }
    } else if (input.type === "MEMO") {
      obj = {
        folderId: viewFolderId,
        data: {
          content: input.content,
          boardType: input.type,
        }
      }
    }

    const {result, data} = await addPiece(obj);
    if (result) {
      if (viewFolderId === 0) {
        queryClient.invalidateQueries("mine/moums");
      } else {
        queryClient.invalidateQueries("mine/pieces");
      }
      queryClient.invalidateQueries("user");
      setFloat({
        state: true,
        component: <MoumCreateFloat piece={data} />
      })
    } else {
      alert("파일 추가 실패");
    }
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
  ${tw`relative w-full h-full `};
`;

const SelectBox = styled.div`
  ${tw`flex items-center justify-between cursor-pointer `};

  img {
    margin-left: 8px;
  }
`;

const SelectBoxOption = styled.div`
  ${tw`
    absolute top-[50px] w-[80px] h-[80px] 
    bg-[#FFFFFF] p-[6px] rounded-[12px] cursor-pointer
  `}
  display: ${props => props.toggle ? "block" : "none"};
`;

const Option = styled.div`
  ${tw`
    w-full h-[50%] flex justify-center 
    items-center rounded-[6px] cursor-pointer
  `};
  transition: background .3s;

  &:hover {
    ${tw`bg-[#F1EAFF]`}
  }
`;

const Form = styled.form`
  ${tw`
    mt-[90px] w-[620px] h-[50px] 
    bg-[#FFFFFF] flex items-center rounded-[25px]
  `}
  box-shadow: 0px 2px 16px 4px rgba(145, 82, 255, 0.2);

  > div {
    ${tw`
      shrink-0 w-[80px] h-[70%] 
      border-r-[1px] border-[#DDDDDD] border-solid 
      flex justify-center items-center
    `};

    select {
      ${tw`border-0 w-[60%] h-full`}
    }
  }

  input {
    ${tw`border-0 w-full h-[40px] mx-[20px] outline-0 text-[16px]`}
    &::placeholder {
      color: #B7B7B7;
    }
  }

  button {
    ${tw`
      flex justify-center items-center shrink-0 w-[115px] h-full rounded-[25px] text-[16px] border-0 bg-[#9152FF] text-[#FFFFFF] cursor-pointer
    `};
    box-shadow: 0px 2px 16px 4px rgba(145, 82, 255, 0.2);
    transition: background-color .3s;

    &:hover {
      ${tw`bg-[#7c49d6]`};
    }

    img {
      ${tw`ml-[10px] mt-[-2px]`}
    }
  }
`;


export default MoumTitleCreateForm;