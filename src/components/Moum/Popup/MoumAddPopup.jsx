import styled, { css } from "styled-components";
import { addMoumAxios } from "utils/api/moum";
import useHandleChange from "hooks/useHandleChange";
import queryClient from "shared/query";
import PopupTopView from "components/Common/PopupTopView";
import moumAdd from "assets/svg/moum_add.svg";
import CancelButton from "components/Common/CancelButton";
import ConfirmButton from "components/Common/ConfirmButton";
import ToggleSwitch from "components/Common/ToggleSwitch";
import useCustomMutate from "hooks/useCustomMutate";

function MoumAddPopup ({close}) {
  const {input, setInput, handleChange} = useHandleChange({
    name: "",
    share: false
  });

  const {mutateAsync: addMoum} = useCustomMutate((data) => addMoumAxios(data), { 
    onSuccess: data => {
      queryClient.invalidateQueries("mine/moums");
    }
  });

  const submitAddFolder = async (e) => {
    e.preventDefault();
    
    const moum = {
      name: input.name,
      status: input.share ? "PUBLIC" : "PRIVATE"
    }

    const {result} = await addMoum(moum);
    if (!result) {
      alert("폴더 추가 실패");
    }
    close();
  };

  const toggleShare = () => {
    setInput(current => ({...current, share: !current.share}));
  }

  return (
    <Box>
      <PopupTopView image={moumAdd} title={"모음 만들기"} />
      <Form onSubmit={submitAddFolder}>
        <div className="moum-name">
          <label htmlFor="name">모음 이름</label>
          <input 
            type="text" 
            id="name" 
            maxLength={20} 
            onChange={handleChange("name")} 
            value={input.name} 
            placeholder="공백 포함 20자 이내로 작성이 가능해요."
          />
        </div>
        <div className="moum-share">
          <label>공유설정</label>
          <ToggleSwitch 
            status={input.share} 
            onClick={toggleShare}
          />
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
          <ConfirmButton text={"만들기"} useSubmit isActive tabIndex={0}/>
        </div>
      </Form>
    </Box>
  )
}

const Box = styled.div`
  padding: 24px;
  width: 440px;
  height: 330px;
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

export default MoumAddPopup;