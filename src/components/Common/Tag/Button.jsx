import styled from "styled-components";

function Button ({text, isActive, btnStyle, btnHoverStyle, btnActiveStyle, onClick, ...props}) {
  return (
    <Item
      onClick={
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onClick) {
            onClick(e);
          }
        }
      }
      btnStyle={btnStyle}
      btnHoverStyle={btnHoverStyle}
      btnActiveStyle={btnActiveStyle}
      isActive={isActive}
      {...props}
    >
    {text}
    </Item>
  )
}

const Item = styled.button`
  ${props => props.btnStyle};

  &:hover {
    ${props => props.btnHoverStyle};
  }

  ${props => props.isActive && props.btnActiveStyle};

  ${props => props.optionStyle && props.optionStyle};
`;

export default Button;