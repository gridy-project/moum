import Button from "components/Common/Tag/Button";
import { css } from "styled-components";

function ConfirmButton ({text, isActive, onClick, optionStyle, useSubmit}) {
  return (
    <Button
      text={text ?? "확인"}
      defaultStyle={createBtnStyle + optionStyle}
      hoverStyle={createBtnHoverStyle}
      activeStyle={createBtnActiveStyle}
      isActive={isActive}
      onClick={onClick}
      useSubmit={useSubmit}
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
  cursor: pointer;
`;

const createBtnHoverStyle = css`

`;

const createBtnActiveStyle = css`
  color: #FFFFFF;
  background-color: #9152ff;
  box-shadow: 0px 2px 12px 1px #D2BAFF;
`;

export default ConfirmButton;