import styled, { css } from "styled-components";
import List from "./Tag/List";

function OptionMenu ({width, height, options, isActive, ...props}) {
  return (
    <Box width={width} height={height} isActive={isActive}>
      <nav>
        <ul>
          {options.map((option, idx) => {
            return (
              <List
                key={idx}
                defaultStyle={itemDefaultStyle}
                hoverStyle={itemHoverStyle}
                activeStyle={itemActiveStyle}
                onClick={option.onClick ?? (() => {alert("작동이 없는 버튼입니다")})}
              >
                <img src={option.image} alt={option.name} />
                {option.name}
              </List>
            )
          })}
        </ul>
      </nav>
    </Box>
  );
}

const Box = styled.div`
  display: ${props => props.isActive ? "block" : "none"};
  width: 170px;
  background-color: #FFFFFF;
  box-shadow: 2px 2px 16px rgba(139, 139, 139, 0.5);
  border-radius: 20px;
  padding: 10px;
  img {
    margin-right: 10px;
  }
`;

const itemDefaultStyle = css`
  width: 150px;
  padding: 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #303030;
  border-radius: 20px;
  cursor: pointer;

  & + & {
    margin-top: 5px;
  }
`;

const itemHoverStyle = css`
  background-color: #F5F5F5;
`;

const itemActiveStyle = css`
`;

export default OptionMenu;