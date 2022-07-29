import styled from "styled-components";
import {useRecoilValue, useResetRecoilState} from "recoil";
import { atomMoum, atomMoumSort, atomPieceSelectMode, atomSelectedCategories, atomSelectedItems } from "state/moum";
import useCustomQuery from "hooks/useCustomQuery";
import SortableList from 'react-easy-sort';
import arrayMove from 'array-move';
import { useState } from "react";
import { useEffect } from "react";
import { getPieceMineAllAxios, getPieceMineByOptionsAxios } from "utils/api/moum";
import MoumPieceCard from "components/Moum/Card/MoumPieceCard";
import { useParams } from "react-router-dom";
import useCustomMutate from "hooks/useCustomMutate";
import { instance } from "shared/axios";

function PieceList ({search}) {
  const {folderId: viewFolderId = 0} = useParams();

  const categories = useRecoilValue(atomSelectedCategories);
  const sortState = useRecoilValue(atomMoumSort);
  const piecesQuery = useCustomQuery(["mine/pieces", viewFolderId, categories, search, sortState], async () => {
    if (search === "" && (categories[0]?.category === "전체" || categories.length === 0)) {
      const response = await getPieceMineAllAxios(viewFolderId, sortState === "사용자 지정순" ? true : false );
      return response.data;
    } else if (search === "") {
      const response = await getPieceMineByOptionsAxios(viewFolderId, { keyword: "all", categories, sort: sortState === "사용자 지정순" ? true : false });
      return response.data;
    } else {
      const response = await getPieceMineByOptionsAxios(viewFolderId, { keyword: search, categories, srot: sortState === "사용자 지정순" ? true : false });
      return response.data;
    }
  });

  const [sortablePieceList, setSortablePieceList] = useState([]);
  const {mutateAsync: order} = useCustomMutate(
    ({folderId, boardId, afterOrder}) => instance.post("/boards", {folderId, boardId, afterOrder}));

  const onSortEnd = async (oldIndex, newIndex) => {
    const {result} = await order({folderId: viewFolderId, boardId: sortablePieceList[oldIndex].id, afterOrder: sortablePieceList[newIndex].boardOrder});
    if (result) {
      setSortablePieceList((array) => arrayMove(array, oldIndex, newIndex));
    }
  }

  useEffect(() => {
    if (piecesQuery.isSuccess) {
      setSortablePieceList([...piecesQuery.data.boardList]);
    }
  }, [piecesQuery.isSuccess, piecesQuery.data]);

  const resetSelectAll = useResetRecoilState(atomMoum.modeSelectAll);
  const resetSelectMode = useResetRecoilState(atomPieceSelectMode);
  const resetSelectedItems = useResetRecoilState(atomSelectedItems);
  useEffect(() => {
    resetSelectAll();
    resetSelectMode();
    resetSelectedItems();
    return () => {
      resetSelectAll();
      resetSelectMode();
      resetSelectedItems();
    }
  }, [resetSelectAll, resetSelectMode, resetSelectedItems]);

  const selectAll = useRecoilValue(atomMoum.modeSelectAll);

  return (
    <List>
      { sortState === "최신 조각순" && sortablePieceList.length > 0 && (
        <div className="list">
          {
            sortablePieceList.map(
              (piece) => <MoumPieceCard 
              key={piece.id} 
              piece={piece} 
              selectAll={selectAll}
              />
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