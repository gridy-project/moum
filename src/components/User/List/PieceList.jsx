import styled from "styled-components";
import useCustomQuery from "hooks/useCustomQuery";
import { useRecoilValue } from "recoil";
import { atomSearch, atomSelectedCategories, atomSortState } from "state/user";
import SearchPieceCard from "components/Search/Card/SearchPieceCard";
import { useParams } from "react-router-dom";
import { instance } from "shared/axios";
import { useEffect, useState } from "react";

function PieceList () {
  const {userId: viewUserId, folderId: viewFolderId} = useParams();

  const categories = useRecoilValue(atomSelectedCategories);
  const search = useRecoilValue(atomSearch);
  const sortState = useRecoilValue(atomSortState);

  const {isSuccess, data: piecesQuery} = useCustomQuery(["pieces", viewFolderId, categories, search], async () => {
      let searchString = `/boards/`; // API LINK
      searchString += `${viewUserId}/`; // User ID
      searchString += `${viewFolderId}/`;
      if (search === "") {
        searchString += `all`;
      } else {
        searchString += `${search}`; 
      }

      searchString += "?page=0";

      if (sortState === "CUSTOM") {
        searchString += "&sort=boardOrder,asc";
      }

      if (categories.length === 0) {
        return instance.post(searchString, [{ category: "전체" }]);
      } else {
        return instance.post(searchString, categories)
      }
  });

  // useEffect(() => {
  //   console.log(piecesQuery);
  // }, [piecesQuery])

  return (
    <List>
      { isSuccess && piecesQuery.data.boardList.length > 0 && (
        <div className="list">
          {
            piecesQuery.data.boardList.map(
              (piece) => <SearchPieceCard key={piece.id} piece={piece} />
            )
          }
        </div>
      )
      }
      {
        isSuccess && piecesQuery.data.boardList.length === 0 && <div className="no-piece">해당 모음에 조각이 없습니다.</div>
      }
    </List>
  );
}


const List = styled.div`
  padding-top: 40px;
  justify-content: flex-start;

  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .list > div {
    width: calc(92% / 4);
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

export default PieceList;