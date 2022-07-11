import styled, { css } from "styled-components";

import iconMoumSelectActive from "./images/moum/moum-select-active.png";
import iconMoumSelect from "./images/moum/moum-select.png";

function MoumSelectItem ({isActive, children, _onClick}) {
  return (
    <Item isActive={isActive} onClick={_onClick}>
      <span><img src={isActive ? iconMoumSelectActive : iconMoumSelect} alt="folder" /></span>
      {children}
    </Item>
  );
}

const Item = styled.li`
  padding: 16px 21px;
  color: #777777;
  border: 1px solid #E7E7E7;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-weight: 500;
  transition: color .3s, background-color .3s, box-shadow .3s;
  cursor: pointer;
  flex-shrink: 0;

  ${props => props.isActive && css`
    color: #721EFC;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 12px 1px #D2BAFF;
    border: 1px solid transparent;
  `}

  span {
    margin-right: 10px;
  }
`;

export default MoumSelectItem;