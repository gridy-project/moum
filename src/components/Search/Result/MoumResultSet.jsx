import useCustomQuery from "hooks/useCustomQuery";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "shared/axios";
import styled, { css } from "styled-components";
import SearchMoumCard from "../Card/SearchMoumCard";

function MoumResultSet () {
  const params = useParams();

  const [page, setPage] = useState(0);
  const [pageCnt, setPageCnt] = useState(0);
  const [folders, setFolders] = useState([]);

  const {isSuccess, data: moums} = useCustomQuery(["folderQuery", page], 
    () => instance.post(`/allfolders/${params.keyword}?page=${page}`));

  const onClickMore = () => {
    setPage(current => current + 1);
  }

  useEffect(() => {
    if (isSuccess && moums) {
      const {result, data: {
        folders: list,
        foldersCnt: count
      }} = moums;

      if (result) {
        setFolders(current => {
          if (current[current.length-1]?.id !== list[list.length - 1]?.id) {
            // 마지막의 id 값이 같지 않은 경우에만 추가
            return [...current, ...list]
          } else {
            return current
          }
        });
        setPageCnt(Math.ceil(count / 8))
      }
    }
  }, [isSuccess, moums, page]);

  return (
    <Wrap>
      <h2>관련있는 모음<p>모음 검색 결과 {isSuccess && moums.data.foldersCnt}건</p></h2>
      <MoumRelationList>
        {
        folders?.map(
          (moum) => {
            return (<SearchMoumCard key={moum.id} moum={moum} />)
          }
        )
        }
      </MoumRelationList>

      {moums?.data?.foldersCnt !== 0 && (
        <div className="latest-more">
          <More onClick={onClickMore} isHide={page === pageCnt - 1}>더보기</More>
        </div>
      )}
      {moums?.data?.foldersCnt === 0 && <div className="no-item">모음 검색 결과가 없습니다.</div>}
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