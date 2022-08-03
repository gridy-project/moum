import PopupTopView from "components/Common/PopupTopView";

import pieceAdd from "assets/svg/piece_add.svg";
import styled, { css } from "styled-components";
import CancelButton from "components/Common/CancelButton";
import ConfirmButton from "components/Common/ConfirmButton";
import tw from "twin.macro";
import { useMatch } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import useHandleChange from "hooks/useHandleChange";
import { useAddPiece } from "hooks/query/useQueryPiece";
import Swal from "sweetalert2";
import { useQueryClient } from "react-query";
import { globalBottomFloat } from "state/common/popup";
import MoumCreateFloat from "../Float/MoumCreateFloat";

const TYPE = {
  LINK : "LINK",
  MEMO : "MEMO"
}

function PieceAddPopup ({close}) {
  const queryClient = useQueryClient();
  const {params: {folderId: viewFolderId = 0}} = useMatch('/moum/:folderId');
  const {input, setInput, handleChange} = useHandleChange({
    type: TYPE.LINK,
    memo: "",
    link: ""
  });

  const setFloat = useSetRecoilState(globalBottomFloat);

  const {mutateAsync: addPiece} = useAddPiece();

  const addPieceSimple = async (e) => {
    e.preventDefault();

    if ((input.type === TYPE.MEMO && input.memo === "") || (input.type === TYPE.LINK && input.link === "")) {
      Swal.fire({
        icon: "error",
        title: "값을 입력해주세요"
      });
      return;
    }

    let obj = {}
    if (input.type === "LINK") {
      const regExp = RegExp("^((http|https)://)?(www.)?([a-zA-Z0-9]+)\\.[a-z]+([a-zA-Z0-9.?#]+)?");
      if (!regExp.test(input.link)) {
        Swal.fire({
          icon: "error",
          title: "올바른 주소 형식으로 입력해주세요"
        });
        return false;
      }
      obj = {
        folderId: viewFolderId,
        data: {
          link: input.link,
          boardType: input.type,
        }
      }
    } else if (input.type === "MEMO") {
      obj = {
        folderId: viewFolderId,
        data: {
          content: input.memo,
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
      close();
      setFloat({
        state: true,
        component: <MoumCreateFloat piece={data} />
      })
    } else {
      alert("파일 추가 실패");
    }
    setInput((current) => ({...current, memo: "", link: ""}));
  }

  return (
    <div className="p-24 w-630 h-450 overflow-hidden rounded-30 relative flex flex-col bg-[#FFFFFF]">
      <PopupTopView image={pieceAdd} title={"새 조각 만들기"} />
      <form onSubmit={addPieceSimple} className="relative flex flex-col w-full h-full">
        <div className="font-medium mt-30 text-16 leading-[1]">조각 유형 선택하기</div>
        <Type>
          <Button onClick={() => {setInput(current => ({...current, type: TYPE.LINK}))}} isActive={input.type === TYPE.LINK}>링크</Button>
          <Button onClick={() => {setInput(current => ({...current, type: TYPE.MEMO}))}} isActive={input.type === TYPE.MEMO}>메모</Button>
        </Type>
        <div className="mt-30 leading-[1]">링크 입력</div>
        {
          input.type === TYPE.LINK && 
          <Input 
            type="text" 
            placeholder="링크를 입력해주세요"
            maxLength={100}
            onChange={handleChange("link")}
            value={input.link}
          />
        }
        {
          input.type === TYPE.MEMO && (
            <TextArea placeholder="메모를 입력해주세요" maxLength={250} onChange={handleChange("memo")} value={input.memo}>
            </TextArea>
          )
        }
        <div className="absolute bottom-0 right-0">
          <CancelButton
            optionStyle={
              css`
                margin-right: 10px;
              `
            }
            onClick={close}
          />
          <ConfirmButton text={"저장하기"} useSubmit isActive />
        </div>
      </form>
    </div>
  )
}

const Type = styled.div`
  ${tw`flex mt-17`}
`;

const Button = styled.div`
  ${tw`px-20 py-16 bg-[#FFFFFF] border-1 border-solid border-[#C8C8C8] rounded-30 text-[#555555] leading-[1] cursor-pointer select-none`};
  transition: background .3s, border .3s;

  ${props => props.isActive && tw`
    bg-[#F7F3FD] border-[#721EFC]
  `}

  & + & {
    margin-left: 10px;
  }
`;

const Input = styled.input`
  ${tw`
    mt-16 border-1 border-solid border-[#D2BAFF] px-20 py-18 leading-[1] rounded-50 text-[#555555]
  `}
  transition: border .3s;

  &:focus {
    ${tw`outline-0 border-[#9152FF]`}
  }

  &::placeholder {
    color: #B7B7B7;
  }
`;

const TextArea = styled.textarea`
  ${tw`
    mt-16 border-1 border-solid border-[#D2BAFF] px-20 py-18 rounded-50 resize-none rounded-20 h-100 text-[#555555]
  `}
  transition: border .3s;

  &:focus {
    ${tw`outline-0 border-[#9152FF]`}
  }

  &::placeholder {
    ${tw`text-[#B7B7B7] font-normal`};
  }

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export default PieceAddPopup;