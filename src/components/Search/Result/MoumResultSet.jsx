import useCustomQuery from "hooks/useCustomQuery";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import { instance } from "shared/axios";
import styled, { css } from "styled-components";
import SearchMoumCard from "../Card/SearchMoumCard";

const moumsFetch = async ({keyword, pageParam}) => {
  const response = await instance.post(`/allfolders/${keyword}?page=${pageParam}`);
  const { folders: moums, foldersCnt } = response.data;
  return { foldersCnt, moums, nextPage: pageParam + 1, isLast: pageParam === Math.floor(foldersCnt/8) }
}

function MoumResultSet () {
  const {keyword} = useParams();
  const [moums, setMoums] = useState([]);

  const { data, fetchNextPage } = useInfiniteQuery(
    ["moumsSearchQuery", keyword], 
    ({pageParam = 0}) => moumsFetch({keyword, pageParam}),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) {
          return lastPage.nextPage;
        } else {
          return undefined;
        }
      }
    }
  );

  const onClickMore = async () => {
    fetchNextPage();
  }

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

  const foldersCnt = data?.pages[0]?.foldersCnt ?? 0;

  return (
    <Wrap>
      <h2>관련있는 모음<p>모음 검색 결과 {foldersCnt}건</p></h2>
      <MoumRelationList>
        {
          moums?.map(
            (moum) => {
              return (<SearchMoumCard key={moum.id} moum={moum} />)
            }
          )
        }
      </MoumRelationList>

      {foldersCnt !== 0 && (
        <div className="latest-more">
          <More onClick={onClickMore} isHide={data?.pages[data?.pages?.length-1]?.isLast}>더보기</More>
        </div>
      )}
      {foldersCnt === 0 && <div className="no-item">모음 검색 결과가 없습니다.</div>}
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 1200px;

  .no-item {
    width: 100%;
    font-size: 24px;
    font-weight: 400;
  }

  > h2 {
    margin-top: 100px;
    margin-bottom: 36px;
    font-weight: 600;
    font-size: 24px;
    display: flex;
    align-items: center;
    color: #303030;

    > p {
      font-size: 16px;
      font-weight: 500;
      color: #949494;
      margin-left: 16px;
    }
  }


  .latest-more {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    padding-bottom: 100px;
    button {
      width: 280px;
      height: 56px;
      border: none;
      background-color: #E0D6FF;
      color: #9152FF;
      border-radius: 16px;
      cursor: pointer;
    }
  }
`;

const More = styled.button`
  ${props => props.isHide && css`
    display: none;
  `}
`;


const MoumRelationList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  > div {
    width: calc(92% / 4);
  }

  > div + div {
    margin-left: calc(8% / 3);
  }

  > div:nth-of-type(4n + 1) {
    margin-left: 0;
  }

  > div:nth-of-type(n + 5) {
    margin-top: calc(8% / 3);
  }
`;

export default MoumResultSet;