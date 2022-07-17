import styled from "styled-components";
import { getPieceCategory } from "shared/type";

function PieceCategory ({category}) {
  return (category === "미정" ? 
  (<NoCategory>카테고리 없음</NoCategory>)
  :
  (<Category>
    <img src={getPieceCategory(category).image} alt={category} />
    <span>{category}</span>
  </Category>)
  )
}

const Category = styled.div`
  padding: 8px 12px;
  background-color: #F7F3FD;
  font-size: 12px;
  border-radius: 50px;
  color: #9152FF;
  display: flex;
  align-items: center;

  img {
    margin-right: 5px;
  }
`;


const NoCategory = styled.div`
  padding: 8px 12px;
  background-color: #F5F5F5;
  font-size: 12px;
  border-radius: 50px;
  color: #949494;
`;

export default PieceCategory;