import styled, { css } from "styled-components";
import { instance } from "shared/axios";
import useCustomQuery from "hooks/useCustomQuery";
import SearchPieceCard from "./Card/SearchPieceCard";
import { useEffect, useState } from "react";

function AllMoumLatest () {
  const [page, setPage] = useState(0);
  const [pageCnt, setPageCnt] = useState(0);
  const [viewPieces, setViewPieces] = useState([]);
  const {data: pieces, isSuccess} = useCustomQuery(["search/latestPiece", page], () => instance.get(`/newboards/${page}/8`));

  const onClickMore = () => {
    setPage(current => current + 1);
  }

  useEffect(() => {
    if (isSuccess && pieces) {
      const {
        data: {
          content: list, totalPages
        },
        result
      } = pieces;
      if (result) {
        setViewPieces(current => {
          if (current[current.length-1]?.id !== list[list.length - 1].id) {
            // 마지막의 id 값이 같지 않은 경우에만 추가
            return [...current, ...list]
          } else {
            return current
          }
        });
        setPageCnt(totalPages);
      }
    }
  }, [pieces, isSuccess]);

  return (
    <Latest>
      <em>최근 올라온 조각</em>
      <LatestList>
        {viewPieces?.map(piece => <SearchPieceCard key={piece.id} piece={piece} />)}
      </LatestList>
      <div className="latest-more">
        <More onClick={onClickMore} isHide={page === pageCnt - 1}>더보기</More>
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