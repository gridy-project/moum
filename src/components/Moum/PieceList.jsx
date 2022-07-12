import styled from "styled-components";
import {useRecoilValue} from "recoil";
import { pageMoumSelectedFolderId } from "../../atoms/moum";
import useGetReactQuery from "../../hooks/useGetReactQuery";
import { instance } from "../../api/axios";
import LinkPieceCard from "../card/LinkPieceCard";
import MemoPieceCard from "../card/MemoPieceCard";

function PieceList () {
  const folderId = useRecoilValue(pageMoumSelectedFolderId);
  const {data: piece, isLoading} = useGetReactQuery(["piece", folderId], async () => {
    const response = await instance.post(`/boards/0/${folderId}/all`, [{category: "전체"}]);
    return response.data;
  });

  return (
    <List>
      { !isLoading &&
      piece?.boardList?.length > 0 ? piece.boardList.map(
        (piece) => piece.boardType === "LINK" ? 
          <LinkPieceCard key={piece.id} piece={piece} /> : 
          <MemoPieceCard key={piece.id} piece={piece}/>
      )
      : <div className="no-piece">조각을 생성해 주세요</div>
      }
    </List>
  );
}


const List = styled.div`
  padding-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

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