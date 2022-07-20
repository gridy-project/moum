const { default: styled, css } = require("styled-components")

function ToggleSwitch ({status, onClick}) {
  return (
    <ToggleBox isActive={status} onClick={onClick}>
      <ToggleWrap>
        <Circle isActive={status}></Circle>
      </ToggleWrap>
    </ToggleBox>
  )
}

const ToggleBox = styled.div`
  width: 52px;
  height: 26px;
  border-radius: 13px;
  background-color: #E0E0E0;
  padding: 3px;
  transition: background-color .3s;
  cursor: pointer;
  ${props => props.isActive && css`
    background-color: #9E67FF;
  `}
`;

const ToggleWrap = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 13px;
  position: relative;
`;

const Circle = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #FFF;
  border-radius: 50%;
  left: 0;
  transition: left .3s;
  ${props => props.isActive && css`
    left: calc(100% - 20px);
  `}
`;

export default ToggleSwitch;