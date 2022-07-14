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
      console.log(data);
      queryClient.invalidateQueries("moums");
      alert("폴더 추가 성공");
    },
    onError: err => {
      alert("폴더 추가 실패");
    }
  });

  const submitAddFolder = async (e) => {
    e.preventDefault();
    
    const moum = {
      name: input.name,
      status: input.share
    }

    addMoum(moum);
    setPopupState(false);
    resetPopup();
  };

  return (
    <div>
      <MakeFolder onSubmit={submitAddFolder}>
        폴더명<input type="text" onChange={handleChange("name")} value={input.name} />
        공유설정
        <select onChange={handleChange("share")} value={input.share}>
          <option value="NONE">공유 설정</option>
          <option value="PUBLIC">공개</option>
          <option value="PRIVATE">비공개</option>
        </select>
        <button>폴더 생성</button>
      </MakeFolder>
      <button onClick={closePop}>닫기</button>
    </div>
  )
}

const MakeFolder = styled.form``;

export default MoumAddPopup;