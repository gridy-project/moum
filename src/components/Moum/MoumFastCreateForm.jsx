// module
import { useDispatch } from "react-redux";
import styled from "styled-components";

// custom hook
import useHandleChange from "../../hooks/useHandleChange";

// mapping
import { mappingPieceToServerSimple } from "../../mapping/piece";

// redux
import { addPieceSimpleThunk } from "../../redux/modules/moumSlice";

// image
import arrowSave from "../../public/img/arrow-moum-save.png"

function MoumFastCreateForm () {
  const dispatch = useDispatch();
  const {input, handleChange} = useHandleChange({
    type: "NONE",
    content: ""
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

    dispatch(addPieceSimpleThunk(mappingPieceToServerSimple(input)));
  }

  return (
    <Form className="maker" onSubmit={addPieceSimple}>
      <div>
        <select className="select-type" onChange={handleChange("type")} value={input.type}>
          <option value="NONE">선택</option>
          <option value="LINK">링크</option>
          <option value="MEMO">메모</option>
        </select>
      </div>
      <input type="text" placeholder="링크를 입력하세요." onChange={handleChange("content")} value={input.content}/>
      <button>저장하기<img src={arrowSave} alt="save" /></button>
    </Form>
  );
}

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


export default MoumFastCreateForm;