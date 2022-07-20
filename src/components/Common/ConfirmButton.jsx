import Button from "components/Common/Tag/Button";
import { css } from "styled-components";

function ConfirmButton ({text, isActive, onClick, optionStyle}) {
  return (
    <Button
      text={text ?? "확인"}
      btnStyle={createBtnStyle + optionStyle}
      btnHoverStyle={createBtnHoverStyle}
      btnActiveStyle={createBtnActiveStyle}
      isActive={isActive}
      onClick={onClick}
    />
  );
}

const createBtnStyle = css`
  border: none;
  padding: 16px 18px;
  font-weight: 600;
  font-size: 14px;
  border-radius: 50px;
  background-color: #ECECEC;
  color: #949494;
`;

const createBtnHoverStyle = css`

`;

const createBtnActiveStyle = css`
  color: #FFFFFF;
  background-color: #9152ff;
  box-shadow: 0px 2px 12px 1px #D2BAFF;
`;

export default ConfirmButton;