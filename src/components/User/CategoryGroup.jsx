import useCustomQuery from "hooks/useCustomQuery";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { instance } from "shared/axios";
import { atomCategories, atomSelectedCategories } from "state/user";
import styled from "styled-components";
import CategoryItem from "./Item/CategoryItem";

function CategoryGroup () {
  const {userId: viewUserId, folderId: viewFolderId} = useParams();

  const {isSuccess, data} = useCustomQuery(["other/categories", viewUserId, viewFolderId], () => {
    return instance.get(`/boards/${viewUserId}/${viewFolderId}`);
  });

  const [categories, setCategories] = useState({
    result: false,
    data: []
  });


  useEffect(() => {
    if (isSuccess && data) {
      const {data: list} = data;
      setCategories({
        result: true,
        data: list
      })
    }
  }, [isSuccess, data]);

  const [category, setCategory] = useRecoilState(atomCategories);
  const [selected, setSelected] = useRecoilState(atomSelectedCategories);

  useEffect(() => {
    if (Object.keys(category).length === 0) {
      setCategory(
        current => {
          const obj = {};
          obj["전체"] = true;
          for (let i = 0; i < categories.data.length; i++) {
            obj[categories.data[i].category] = false;
          }
          return obj;
        }
      );
    } else {
      setCategory(
        current => {
          const obj = {};
          obj["전체"] = current["전체"];
          for (let i = 0; i < categories.data.length; i++) {
            obj[categories.data[i].category] = current[categories.data[i].category] ?? false;
          }
          return obj;
        }
      )
    }
  }, [categories.data]);

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
    <Group>
      <div className="category-title">카테고리</div>
      <ul className="category-list">
        {
          Object.keys(category)?.map(
          (v, i) => 
            <CategoryItem 
              key={i} 
              category={v === "전체" ? "카테고리 전체" : v} 
              active={category[v]} 
              onClick={
                () => clickCategory(v)
              } 
            />
          )
        }
      </ul>
    </Group>
  );
}


const Group = styled.div`
  .category-title {
    font-size: 22px;
    color: #111111;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  .category-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }
`;

export default CategoryGroup;