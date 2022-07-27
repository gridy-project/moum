import CancelButton from "components/Common/CancelButton";
import ConfirmButton from "components/Common/ConfirmButton";
import PopupTopView from "components/Common/PopupTopView";
import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { instance } from "shared/axios";
import moumModify from "assets/svg/moum_modify.svg";
import styled, { css } from "styled-components";

function MoumUpdatePopup ({moum, close}) {
  const queryClient = useQueryClient();

  const ref = {
    name: useRef(null),
    share: useRef(null)
  }

  const {mutateAsync: modify} = useMutation(async ({id, data}) => await instance.put(`/folder/${id}`, data), {
      onSuccess: data => {
        queryClient.invalidateQueries("mine/moums");
    }
  });

  useEffect(() => {
    ref.name.current.value = moum.name;
  }, []);

  const onModify = async (e) => {
    e.preventDefault();
    const {result} = await modify({id: moum.id, data: {
      name: ref.name.current.value,
      status: moum.status
    }});
    if (result) {
      close();
    }
  }

  return (
    <Box>
      <PopupTopView image={moumModify} title={"이름 변경하기"} />
      <Form onSubmit={onModify}>
        <div className="moum-name">
          <label htmlFor="name">모음 이름</label>
          <input type="text" id="name" ref={ref.name} maxLength={20} placeholder="공백 포함 20자 이내로 작성이 가능해요." />
        </div>
        <div className="btn-group">
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
      </Form>
      {/* <button onClick={onClose}>팝업 닫기</button>
      <form onSubmit={onModify}>
        <input type="text" placeholder="폴더 이름" ref={ref.name} />
        <select ref={ref.share}>
          <option value="NONE">공유 설정</option>
          <option value="PUBLIC">공개</option>
          <option value="PRIVATE">비공개</option>
        </select>
        <button>수정하기</button>
      </form> */}
    </Box>
  )
}


const Box = styled.div`
  padding: 24px;
  width: 440px;
  height: 280px;
  overflow: hidden;
  border-radius: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
`;


const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .moum-name {
    margin-top: 32px;

    label {
      display: block;
      color: #303030;
    }

    input {
      margin-top: 12px;
      width: 100%;
      height: 50px;
      border-radius: 25px;
      border: 1px solid #D2BAFF; 
      padding: 0 20px;
      transition: border .3s;
      &:focus {
        outline: none;
        border: 1px solid #9152FF;
      }

      &::placeholder {
        color: #B7B7B7; 
      }
    }
  }

  .moum-share {
    margin-top: 40px;
    display: flex;
    align-items: center;
    
    label {
      color: #303030;
      margin-right: 12px;
    }
  }

  .btn-group {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

export default MoumUpdatePopup;