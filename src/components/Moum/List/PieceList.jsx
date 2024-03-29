import styled from "styled-components";
import {useRecoilValue, useResetRecoilState} from "recoil";
import { atomMoum, atomMoumSort, atomPieceSelectMode, atomSelectedCategories, atomSelectedItems } from "state/moum";
import SortableList from 'react-easy-sort';
import arrayMove from 'array-move';
import { useState } from "react";
import { useEffect } from "react";
import MoumPieceCard from "components/Moum/Card/MoumPieceCard";
import { useParams } from "react-router-dom";
import { useGetPiecesMineInfinite, useOrderPiece } from "hooks/query/useQueryPiece";
import { useInView } from "react-intersection-observer";
import useMessageFloat from "hooks/useMessageFloat";
import { useQueryClient } from "react-query";
import PieceAddCard from "../Card/PieceAddCard";

function PieceList ({search}) {
  const {folderId: viewFolderId = 0} = useParams();
  const toast = useMessageFloat();
  const query = useQueryClient();

  const categories = useRecoilValue(atomSelectedCategories);
  const sortState = useRecoilValue(atomMoumSort);

  const {data: pieces, fetchNextPage} = useGetPiecesMineInfinite({folderId: viewFolderId, categories, search, sortState}, {
    refetchOnWindowFocus: true,
    retry: 0
  });

  const [sortablePieceList, setSortablePieceList] = useState([]);
  const {mutateAsync: order} = useOrderPiece();

  const onSortEnd = async (oldIndex, newIndex) => {
    setSortablePieceList((array) => arrayMove(array, oldIndex, newIndex));
    const {result} = await order({folderId: viewFolderId, boardId: sortablePieceList[oldIndex].id, afterOrder: sortablePieceList[newIndex].boardOrder});
    if (result) {
      query.invalidateQueries("mine/pieces");
      toast("조각 순서가 변경 되었습니다");
    }
  }

  useEffect(() => {
    if (pieces) {
      setSortablePieceList((current) => {
        let arr = [];
        for (let i = 0; i < pieces.pages.length; i++) {
          arr = [...arr, ...pieces.pages[i].data];
        }

        return arr;
      });
    }
  }, [pieces]);

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

  const {ref, inView} = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <List>
      { sortState === "최신 조각순" && (
        <div className="list">
          <PieceAddCard />
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
      { sortState === "사용자 지정순" && (
        <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
          {
            sortablePieceList.map(
              (piece) => <MoumPieceCard key={piece.id} piece={piece} selectAll={selectAll} sortable />
            )
          }
        </SortableList>
      )
      }
      {/* {
        pieces && sortablePieceList.length === 0 && <div className="no-piece">조각을 생성해 주세요</div>
      } */}
      <div className="w-[100%]" ref={ref}></div>
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