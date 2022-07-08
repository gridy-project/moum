import styled, { css } from "styled-components";

function MoumCategoryGroup () {
  return (
    <CategoryGroup>
      <div className="category-title">카테고리</div>
      <ul className="category-list">
        <Category isActive={true}>전체</Category>
        <Category>음식</Category>
        <Category>여행</Category>
        <Category>운동</Category>
      </ul>
    </CategoryGroup>
  );
}
const CategoryGroup = styled.div`
  .category-title {
    font-size: 22px;
    color: #111111;
    font-weight: bold;
  }

  .category-list {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
  }
`;

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
`;


export default MoumCategoryGroup;