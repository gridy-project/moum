import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { moumCategories, selectedCategories } from "../../state/moum";
import MoumCategory from "./MoumCategory";

function MoumCategoryGroup ({categories}) {
  const [category, setCategory] = useRecoilState(moumCategories);

  useEffect(() => {
    if (Object.keys(category).length === 0) {
      setCategory(
        current => {
          const obj = {};
          obj["전체"] = true;
          for (let i = 0; i < categories.length; i++) {
            obj[categories[i].category] = false;
          }
          return obj;
        }
      );
    } else {
      setCategory(
        current => {
          const obj = {};
          obj["전체"] = current["전체"];
          for (let i = 0; i < categories.length; i++) {
            obj[categories[i].category] = current[categories[i].category] ?? false;
          }
          return obj;
        }
      )
    }
  }, [categories]);

  const [selected, setSelected] = useRecoilState(selectedCategories);

  useEffect(() => {
    if (selected.length === 0) {
      setCategory(current => ({...current, "전체": true}));
    }
  }, [selected, setCategory]);

  useEffect(() => {
    const categoryKeys = Object.keys(category);
    if (categoryKeys.length > 0) {
      setSelected(
        Object
        .keys(category)
        .filter((v) => category[v]) // true인 것들만 남기기
        .map((v) => ({category : v}))
      );
    }
  }, [category]);

  const clickCategory = (category) => {
    setCategory(current => {
      const obj = {...current};
      if (category === "전체") {
        const objKeys = Object.keys(obj);
        const length = objKeys.length;
        for (let i = 0; i < length; i++) {
          obj[objKeys[i]] = false;
        }
        obj["전체"] = true;
        return obj;
      } else {
        obj["전체"] = false;
        obj[category] = !obj[category];
        const objKeys = Object.keys(obj);
        const length = objKeys.length;
        let nowCount = 0;
        for (let i = 0; i < length; i++) {
          if (obj[objKeys[i]]) {
            nowCount += 1;
          }
        }
        if (nowCount === 0) {
          return {...current, "전체": false, [category]: true};
        } else {
          return obj;
        }
      }
    })
  }

  return (
    <CategoryGroup>
      <div className="category-title">카테고리</div>
      <ul className="category-list">
        {
          Object.keys(category)?.map(
          (v, i) => <MoumCategory 
                      key={i} 
                      category={v === "전체" ? "카테고리 전체" : v} 
                      active={category[v]} 
                      _onClick={
                        () => clickCategory(v)
                      } 
                    />
          )
        }
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