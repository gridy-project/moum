import { useState } from "react";
import styled from "styled-components";
import MoumCategory from "./MoumCategory";

function MoumCategoryGroup () {
  const [category] = useState(
    [
      {
        name: "카테고리 전체",
        isActive: true
      }, 
      {
        name: "카페",
        isActive: false
      }, 
      {
        name: "건강",
        isActive: false
      }, 
      {
        name: "식당",
        isActive: false
      }
    ]
  );
  return (
    <CategoryGroup>
      <div className="category-title">카테고리</div>
      <ul className="category-list">
        {category.map((v) => <MoumCategory key={v.name} category={v} />)}
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


export default MoumCategoryGroup;