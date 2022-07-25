import styled, { css } from "styled-components";
import { instance } from "shared/axios";
import SearchPieceCard from "./Card/SearchPieceCard";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";

const piecesFetch = async ({pageParam}) => {
  const response = await instance.get(`/newboards/${pageParam}/8`);
  const { content: data, last } = response.data;
  return { pieces: data, nextPage: pageParam + 1, isLast: last }
}

function AllMoumLatest () {
  const [last, setLast] = useState(false);

  const { data, fetchNextPage } = useInfiniteQuery(
    "filesQuery", 
    ({pageParam = 0}) => piecesFetch({pageParam}),
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
  }, [data]);

  return (
    <Latest>
      <em>최근 올라온 조각</em>
      <LatestList>
        {pieces?.map(piece => <SearchPieceCard key={piece.id} piece={piece} />)}
      </LatestList>
      <div className="latest-more">
        <More onClick={async () => {
          const response = await fetchNextPage();
          const pages = response.data.pages;
          if (pages[pages.length-1].isLast) {
            setLast(true);
          }
        }} isHide={last}>더보기</More>
      </div>
    </Latest>
  );
}


const Latest = styled.div`
  margin-top: 80px;
  em {
    display: block;
    font-size: 30px;
    margin-bottom: 30px;
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

const LatestList = styled.div`
  display: flex;
  flex-wrap: wrap;

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

const More = styled.button`
  ${props => props.isHide && css`
    display: none;
  `}
`;


export default AllMoumLatest;