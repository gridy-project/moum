import { useDispatch } from "react-redux";
import styled from "styled-components";
import useHandleChange from "../../hooks/useHandleChange";
import { addPieceSimpleThunk } from "../../redux/modules/moumSlice";

function MoumFastCreateForm () {
  const dispatch = useDispatch();
  const {input, handleChange} = useHandleChange({
    type: "NONE",
    content: ""
  });

  const addPieceSimple = (e) => {
    e.preventDefault();

    if (input.type === "NONE") {
      alert("타입을 선택해주세요");
      return;
    }

    if (input.content === "") {
      alert("값을 입력해주세요");
      return;
    }

    dispatch(addPieceSimpleThunk(input));
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
      <input type="text" onChange={handleChange("content")} value={input.content}/>
      <button>바로 생성하기</button>
    </Form>
  );
}

const Form = styled.div`
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
    /* div.selected-type {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    ul.select-type {
      display: none;
      li {

      }
    } */
  }

  input {
    border: none;
    width: 100%;
  }

  button {
    flex-shrink: 0;
    width: 150px;
    font-size: 16px;
    border: none;
    background: transparent;
    color: #721EFC;
    cursor: pointer;
  }
`;


export default MoumFastCreateForm;