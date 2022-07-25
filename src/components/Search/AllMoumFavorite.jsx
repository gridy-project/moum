import styled, { css } from "styled-components";
import { instance } from "shared/axios";
import useCustomQuery from "hooks/useCustomQuery";
import SearchMoumCard from "./Card/SearchMoumCard";
import { useEffect, useState } from "react";
import { SvgMoveLeft, SvgMoveRight } from "assets/code/Search/SvgMove";

function AllMoumFavorite () {
  const [viewMoums, setViewMoums] = useState([]);
  const [page, setPage] = useState(0);

  const {data: moums, isSuccess} = useCustomQuery("search/best", 
  () => instance.get("/BestFolders/0/20"));


  const pagePrev = () => {
    if (page !== 0) {
      setPage(current => current - 1);
    }
  }

  const pageNext = () => {
    if (page !== Math.ceil(moums.data.length/4) - 1) {
      setPage(current => current + 1)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(moums)
      const {data: list, result} = moums;

      if (result) {
        setViewMoums(list.slice(page*4, (page+1)*4));
      }
    }
  }, [moums, isSuccess, page]);

  return (
    isSuccess &&
    <Favorite>
      <div className="content-header">
        <em>스크랩 많은 인기 모음</em>
        <div className="btn-follow">
          <Button isActive={page !== 0} onClick={pagePrev}><SvgMoveLeft /></Button>
          <Button isActive={page !== Math.ceil(moums.data.length/4) - 1} onClick={pageNext}><SvgMoveRight /></Button>
        </div>
      </div>
      <FavoriteList>
        {
          viewMoums?.map((moum) => {
            return <SearchMoumCard key={moum.id} moum={moum}/>
          })
        }
      </FavoriteList>
    </Favorite>
  );
}


const Favorite = styled.div`
  margin-top: 70px;

  .content-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    em {
      display: block;
      font-size: 30px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;

      span {
        font-size: 16px;
        margin-left: 16px;
        color: #949494;
      }
    }
  }
`;

const Button = styled.button`
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 10px 1px #DFDFDF;
  transition: background-color .3s, box-shadow .3s;
  cursor: pointer;

  svg {
    path {
      transition: stroke .3s;
      stroke: ${props => props.isActive ? "#9152FF" : "#C8C8C8"}
    }
  }

  ${props => props.isActive && css`
    box-shadow: 0px 0px 10px 1px #D2BAFF;
  `}

  & + & {
    margin-left: 20px;
  }
`;

const FavoriteList = styled.div`
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


export default AllMoumFavorite;