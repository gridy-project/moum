import styled from "styled-components";

function Button ({text, isActive, defaultStyle, hoverStyle, activeStyle, onClick, useSubmit, ...props}) {
  return (
    useSubmit ? 
    <Item
      type="submit"
      defaultStyle={defaultStyle}
      hoverStyle={hoverStyle}
      activeStyle={activeStyle}
      isActive={isActive}
      {...props}
    >
    {text}
    </Item>
    :
    <Item
      type="button"
      onClick={
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onClick) {
            onClick(e);
          }
        }
      }
      defaultStyle={defaultStyle}
      hoverStyle={hoverStyle}
      activeStyle={activeStyle}
      isActive={isActive}
      {...props}
    >
    {text}
    </Item>
  )
}

const Item = styled.button`
  ${props => props.defaultStyle};

  &:hover {
    ${props => props.hoverStyle};
  }

  ${props => props.isActive && props.activeStyle};
`;

export default Button;