import styled from "styled-components";
import SearchMoumCard from "components/Search/Card/SearchMoumCard";
import useCustomQuery from "hooks/useCustomQuery";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { atomSearch, atomSelectedCategories, atomSortState } from "state/user";
import { instance } from "shared/axios";
import { useInfiniteQuery } from "react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const query = async (userId, search, sortState, categories, pageParam) => {
  let searchString = `/folders/`; // API LINK
  searchString += `${userId}/`; // User ID
  if (search === "") {
    searchString += `all`;
  } else {
    searchString += `${search}`; 
  }

  searchString += "?page="+pageParam;

  if (sortState === "CUSTOM") {
    searchString += "&sort=folderOrder,asc";
  }

  if (categories.length === 0) {
    return instance.post(searchString, [{ category: "전체" }]);
  } else {
    return instance.post(searchString, categories)
  }
}

const moumsFetch = async ({userId, categories, search, sortState, pageParam}) => {
  const response = await query(userId, search, sortState, categories, pageParam);
  return { moums: response.data, nextPage: pageParam + 1, isLast: response.totalPage === pageParam }
}

function MoumList () {
  const {userId} = useParams();
  const [search] = useRecoilState(atomSearch);
  const [sortState] = useRecoilState(atomSortState);
  const [categories] = useRecoilState(atomSelectedCategories)

  const [moums, setMoums] = useState([]);

  const {ref, inView} = useInView();

  const { data, fetchNextPage } = useInfiniteQuery(
    ["other/moums", categories, search, sortState], 
    ({pageParam = 0}) => moumsFetch({userId, categories, search, sortState, pageParam}),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) {
          return lastPage.nextPage
        } else {
          return undefined;
        }
      }
    }
  )

  useEffect(() => {
    if (data) {
      setMoums((current) => {
        let arr = [];
        for (let i = 0; i < data.pages.length; i++) {
          arr = [...arr, ...data.pages[i].moums];
        }

        return arr;
      })
    }
  }, [data]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <List>
      <div className="list">
        {moums.map((item, i) => (
          <SearchMoumCard key={item.id} moum={item} />
        ))}
      </div>
      <div className="ref" ref={ref}></div>
    </List>
  )
}

const List = styled.div`
  padding-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .ref {
    width: 100%;
  }

  .list {
    width: 100%;
  }

  .list > div {
    width: calc(92% / 4);
    float: left;
  }

  .list > div + div {
    margin-left: calc(8% / 3);
  }

  .list > div:nth-of-type(4n + 1) {
    margin-left: 0;
  }

  .list > div:nth-of-type(n + 5) {
    margin-top: calc(8% / 3);
  }

  .no-piece {
    width: 100%;
    height: 500px;
    background-color: #EEEEEE;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #999999;
    border-radius: 10px;
  }
`;

export default MoumList;