import styled, { css } from "styled-components";
import { getSelectMoumCategory } from "shared/type";

function CategoryItem ({category, active, onClick}) {
  return (
    <Item isActive={active} onClick={onClick}>
      <span>
        <img src={
          active ? 
          getSelectMoumCategory(category).imageActive : 
          getSelectMoumCategory(category).image} alt={category}
        />
      </span>
      <span>
        {category}
      </span>
    </Item>
  )
}

const Item = styled.li`
  padding: 15px 18px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  cursor: pointer;
  transition: border .3s, color .3s;
  ${({isActive}) => isActive ? css`
    border: 2px solid #721EFC;
    color: #721EFC;
  ` : css`
    border: 2px solid #C8C8C8;
    color: #555555;
  `}

  & + & {
    margin-left: 10px;
  }

  span {
    display: flex;
    align-items: center;
  }

  span + span {
    margin-left: 5px;
  }
`;

export default CategoryItem;