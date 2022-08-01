import styled from "styled-components";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { atomSearch, atomSelectedCategories, atomSelectedItems, atomSelectItemsAll, atomSelectMode, atomSortState } from "state/user";
import SearchPieceCard from "components/Search/Card/SearchPieceCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetPiecesInfinite } from "hooks/query/useQueryPiece";
import { useInView } from "react-intersection-observer";

function PieceList () {
  const {userId: viewUserId, folderId: viewFolderId} = useParams();

  const categories = useRecoilValue(atomSelectedCategories);
  const search = useRecoilValue(atomSearch);
  const sortState = useRecoilValue(atomSortState);

  const {data, fetchNextPage} = useGetPiecesInfinite({userId: viewUserId, folderId: viewFolderId, categories, search, sortState});
  const [pieces, setPieces] = useState([]);

  const resetSelectAll = useResetRecoilState(atomSelectItemsAll);
  const resetSelectMode = useResetRecoilState(atomSelectMode);
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

  useEffect(() => {
    if (data) {
      setPieces((current) => {
        let arr = [];
        for (let i = 0; i < data.pages.length; i++) {
          arr = [...arr, ...data.pages[i].data];
        }

        return arr;
      });
    }
  }, [data]);

  const {ref, inView} = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <List>
      { pieces?.length > 0 && (
        <div className="list">
          {
            pieces?.map(
              (piece) => <SearchPieceCard key={piece.id} piece={piece} />
            )
          }
        </div>
      )
      }
      {
        pieces?.length === 0 && <div className="no-piece">해당 모음에 조각이 없습니다.</div>
      }
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