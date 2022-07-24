import styled from "styled-components";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { moumSort, pageMoumSelectedFolderId, selectedCategories } from "state/moum";
import useCustomQuery from "hooks/useCustomQuery";
import SortableList from 'react-easy-sort';
import arrayMove from 'array-move';
import { useState } from "react";
import { useEffect } from "react";
import { getPieceMineAllAxios, getPieceMineByOptionsAxios } from "utils/api/moum";
import MoumPieceCard from "components/Moum/Card/MoumPieceCard";
import { useParams } from "react-router-dom";

function PieceList ({selectAll, search}) {
  const {folderId: viewFolderId = 0} = useParams();

  const categories = useRecoilValue(selectedCategories);
  const sortState = useRecoilValue(moumSort);
  const piecesQuery = useCustomQuery(["mine/pieces", viewFolderId, categories, search], async () => {
    if (search === "" && (categories[0]?.category === "전체" || categories.length === 0)) {
      const response = await getPieceMineAllAxios(viewFolderId);
      return response.data;
    } else if (search === "") {
      const response = await getPieceMineByOptionsAxios(viewFolderId, { keyword: "all", categories });
      return response.data;
    } else {
      const response = await getPieceMineByOptionsAxios(viewFolderId, { keyword: search, categories });
      return response.data;
    }
  });

  const [sortablePieceList, setSortablePieceList] = useState([]);

  const onSortEnd = (oldIndex, newIndex) => {
    setSortablePieceList((array) => arrayMove(array, oldIndex, newIndex))
  }

  useEffect(() => {
    if (piecesQuery.isSuccess) {
      setSortablePieceList([...piecesQuery.data.boardList]);
    }
  }, [piecesQuery.isSuccess, piecesQuery.data]);

  return (
    <List>
      { sortState === "최신 조각순" && sortablePieceList.length > 0 && (
        <div className="list">
          {
            sortablePieceList.map(
              (piece) => <MoumPieceCard key={piece.id} piece={piece} selectAll={selectAll} />
            )
          }
        </div>
      )
      }
      { sortState === "사용자 지정순" && sortablePieceList.length > 0 && (
        <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
          {
            sortablePieceList.map(
              (piece) => <MoumPieceCard key={piece.id} piece={piece} selectAll={selectAll} sortable />
            )
          }
        </SortableList>
      )
      }
      {
        piecesQuery.isSuccess && sortablePieceList.length === 0 && <div className="no-piece">조각을 생성해 주세요</div>
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