import styled from "styled-components";
import { useMutation } from "react-query";
import { axiosAddMoum } from "../../api/moum";
import useHandleChange from "../../hooks/useHandleChange";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { globalPopup, popupState } from "../../atoms/popup";
import queryClient from "../../shared/query";

function MoumAddPopup () {
  const setPopupState = useSetRecoilState(popupState);
  const resetPopup = useResetRecoilState(globalPopup);

  const closePop = (e) => {
    setPopupState(false);
    resetPopup();
  }

  const {input, handleChange} = useHandleChange({
    name: "",
    share: "NONE"
  });

  const {mutate: addMoum} = useMutation(async (data) => {
    const response = await axiosAddMoum(data);
    return response.data;
  }, {
    onSuccess: data => {
      queryClient.invalidateQueries("mine/moums");
      alert("폴더 추가 성공");
    },
    onError: err => {
      alert("폴더 추가 실패");
    }
  });

  const submitAddFolder = async (e) => {
    e.preventDefault();

    if (input.share === "NONE") {
      alert("공유 설정이 필요합니다");
      return;
    }
    
    const moum = {
      name: input.name,
      status: input.share
    }

    addMoum(moum);
    setPopupState(false);
    resetPopup();
  };

  return (
    <Box>
      <MakeFolder onSubmit={submitAddFolder}>
        <label htmlFor="name" className="label-name">폴더명</label>
        <input type="text" id="name" onChange={handleChange("name")} value={input.name} />
        <label htmlFor="share" className="label-share">공유설정</label>
        <select id="share" onChange={handleChange("share")} value={input.share}>
          <option value="NONE">공유 설정</option>
          <option value="PUBLIC">공개</option>
          <option value="PRIVATE">비공개</option>
        </select>
        <button>폴더 생성</button>
      </MakeFolder>
      <button onClick={closePop}>팝업 닫기</button>
    </Box>
  )
}

const Box = styled.div`
  width: 500px;
  height: 500px;
  background-color: #FFFFFF;
  font-size: 24px;
  padding: 40px;
  label {
    display: block;
    margin-bottom: 10px;
  }

  .label-share {
    margin-top: 20px;
  }

  input {
    font-size: 20px;
  }

  select, option {
    font-size: 20px;
  }
`;

const MakeFolder = styled.form`
  button {
    display: block;
    width: 100px;
    height: 50px;
    margin: 20px 0;
    border: none;
    background-color: #29af61;
    color: #FFFFFF;
  }
`;

export default MoumAddPopup;