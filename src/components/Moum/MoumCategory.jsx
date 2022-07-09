import styled, { css } from "styled-components";
import { getSelectMoumCategory } from "../../shared/type";

function MoumCategory ({category}) {
  return <Category isActive={category.isActive}>
    <span>
      <img src={
        category.isActive ? 
        getSelectMoumCategory(category.name).imageActive : 
        getSelectMoumCategory(category.name).image} alt={category.name}
      />
    </span>{category.name}
  </Category>
}

const Category = styled.li`
  padding: 0 15px;
  height: 40px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  border-radius: 20px;
  ${({isActive}) => isActive ? css`
    border: 1px solid #721EFC;
    color: #721EFC;
  ` : css`
    border: 1px solid #C8C8C8;
    color: #555555;
  `}

  & + & {
    margin-left: 10px;
  }

  span {
    margin-right: 5px;
  }
`;

export default MoumCategory;