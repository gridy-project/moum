import styled from "styled-components";
import {useRecoilValue} from "recoil";
import { pageMoumSelectedFolderId } from "../../atoms/moum";
import useGetReactQuery from "../../hooks/useGetReactQuery";
import { instance } from "../../api/axios";
import MoumSortablePieceTypeLinkCard from "./Card/MoumSortablePieceTypeLinkCard";
import MoumSortablePieceTypeMemoCard from "./Card/MoumSortablePieceTypeMemoCard";
import SortableList from 'react-easy-sort';
import arrayMove from 'array-move';
import { useState } from "react";
import { useEffect } from "react";

function PieceList ({selectAll}) {
  const folderId = useRecoilValue(pageMoumSelectedFolderId);
  const {data: piece, isLoading} = useGetReactQuery(["piece", folderId], async () => {
    const response = await instance.post(`/boards/0/${folderId}/all`, [{category: "전체"}]);
    return response.data;
  });

  const [sortablePieceList, setSortablePieceList] = useState([]);

  const onSortEnd = (oldIndex, newIndex) => {
    setSortablePieceList((array) => arrayMove(array, oldIndex, newIndex))
  }

  useEffect(() => {
    if (piece) {
      setSortablePieceList([...piece.folder.boardList])
    }
  }, [piece]);

  return (
    <List>
      {
      sortablePieceList.length > 0 ? (
        <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
          {
            sortablePieceList.map(
              (piece) => piece.boardType === "LINK" ? 
                <MoumSortablePieceTypeLinkCard key={piece.id} piece={piece} selectAll={selectAll} /> : 
                <MoumSortablePieceTypeMemoCard key={piece.id} piece={piece} selectAll={selectAll} />
            )
          }
        </SortableList>
      )
      : <div className="no-piece">조각을 생성해 주세요</div>
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