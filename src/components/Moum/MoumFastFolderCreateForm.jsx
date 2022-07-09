import styled from "styled-components";
import { addMoum } from "../../api/moum";
import useHandleChange from "../../hooks/useHandleChange";

function MoumFastFolderCreateForm () {
  const {input, handleChange} = useHandleChange({
    name: "",
    share: "NONE"
  });

  const submitAddFolder = async (e) => {
    e.preventDefault();
    
    const moum = {
      name: input.name,
      status: input.share
    }

    const {result} = await addMoum(moum);

    if (result) {
      alert("폴더 생성 성공");
    } else {
      alert("폴더 생성 실패");
    }
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