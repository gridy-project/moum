import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import styled from "styled-components";
import MoumCategory from "./MoumCategory";

function MoumCategoryGroup ({user}) {
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState(
    [
      {
        name: "카테고리 전체",
        isActive: true
      },
      ...user.categoryList.map((v) => ({name: v.category, isActive: false})).filter((v) => v.name !== null)
    ]
  );

  useEffect(() => {
    setCategory(
      (current) => {
        const arr = [...current];
        arr[0].isActive = count === 0 ? true : false;
        return arr;
      }
    )
  }, [count]);

  const categoryClick = useCallback((idx) => {
    if (idx === 0) { // 전체 선택일경우 -> 전체선택은 비활성화 불가능
      setCategory(current => {
        setCount(0);
        // 선택된 카운트 값을 0으로 설정
        return current.map((v, i) => i === 0 ? {...v, isActive: true} : {...v, isActive: false});
        // 전체 선택을 제외한 나머지 false로 처리
      });
    } else {
      setCategory(current => {
        const arr = [...current]; // 새 배열 생성
        arr[idx].isActive = !arr[idx].isActive; // active 값 반전
        
        const active = arr[idx].isActive; // active 현재 상태 저장
        
        active ? setCount(current => current + 1) : setCount(current => current - 1);
        // active 상태에 따라 count 추가 및 감소
        return arr;
      })
    }
  }, []);

  return (
    <CategoryGroup>
      <div className="category-title">카테고리</div>
      <ul className="category-list">
        {category.map((v, i) => <MoumCategory key={i} category={v} _onClick={() => categoryClick(i)} />)}
      </ul>
    </CategoryGroup>
  );
}
const CategoryGroup = styled.div`
  .category-title {
    font-size: 22px;
    color: #111111;
    font-weight: bold;
    margin-top: 90px;
    margin-bottom: 20px;
  }

  .category-list {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
  }
`;


export default MoumCategoryGroup;