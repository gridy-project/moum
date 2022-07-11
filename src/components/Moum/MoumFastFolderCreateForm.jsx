import { useMutation } from "react-query";
import styled from "styled-components";
import { addMoumAxios } from "../../api/moum";
import useHandleChange from "../../hooks/useHandleChange";

function MoumFastFolderCreateForm () {
  const {input, handleChange} = useHandleChange({
    name: "",
    share: "NONE"
  });

  const {mutate: addMoum} = useMutation("user/login", async (data) => {
    const response = await addMoumAxios(data);
    return response.data;
  }, {
    onSuccess: data => {
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
  };

  return (
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
  );
}

const MakeFolder = styled.form``;

export default MoumFastFolderCreateForm;