import useCustomQuery from "hooks/useCustomQuery";
import { useParams } from "react-router-dom";
import { instance } from "shared/axios";
import styled from "styled-components";
import SearchPieceCard from "../Card/SearchPieceCard";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";

const piecesFetch = async ({keyword ,pageParam}) => {
  const response = await instance.post(`/allboards/${keyword}/${pageParam}`, [{ category: "전체" }]);
  const { boards, boardsCnt } = response.data;
  return { pieces: boards, count: boardsCnt, nextPage: pageParam + 1, isLast: Math.floor(boardsCnt/8) === pageParam }
}

function PieceResultSet () {
  const {keyword} = useParams();
  const {ref, inView} = useInView();

  const { data, fetchNextPage } = useInfiniteQuery(
    ["filesQuery", keyword], 
    ({pageParam = 0}) => piecesFetch({keyword: keyword, pageParam}),
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

  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (data) {
      setPieces((current) => {
        let arr = [];
        for (let i = 0; i < data.pages.length; i++) {
          arr = [...arr, ...data.pages[i].pieces];
        }

        return arr;
      })
    }
  }, [data])

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    pieces.length > 0 &&
    <Wrap>
      <h2>관련있는 조각<p>조각 검색 결과 {data.pages[0].count}건</p></h2>
      <PieceRelationList>
        {pieces.map((piece) => {
          return <SearchPieceCard key={piece.id} piece={piece} />
        })}
      </PieceRelationList>
      {data.pages[0].count === 0 && <div className="no-item">조각 검색 결과가 없습니다.</div>}
      <div ref={ref}></div>
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
`;

const PieceRelationList = styled.div`
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

export default PieceResultSet;