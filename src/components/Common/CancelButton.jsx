import { css } from "styled-components";
import Button from "components/Common/Tag/Button";

function CancelButton ({text, isActive, onClick, optionStyle}) {
  return (
    <Button
      text={text ?? "취소"}
      defaultStyle={cancelBtnStyle + optionStyle}
      hoverStyle={cancelBtnHoverStyle}
      activeStyle={cancelBtnActiveStyle}
      isActive={isActive}
      onClick={onClick}
    />
  )
}

const cancelBtnStyle = css`
  border: none;
  padding: 16px 18px;
  font-weight: 600;
  font-size: 14px;
  border-radius: 50px;
  background-color: #F7F3FD;
  color: #9E67FF;
  cursor: pointer;
`;

const cancelBtnHoverStyle = css`

`;

const cancelBtnActiveStyle = css`
`;

export default CancelButton;
