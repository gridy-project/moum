import styled from "styled-components";
import LinkPieceCard from "../LinkPieceCard";
import MemoPieceCard from "../MemoPieceCard";

function PieceResultSet ({pieceQuery}) {
  return (
    <Wrap>
      <h2>관련있는 조각<p>조각 검색 결과 {pieceQuery.boardsCnt}건</p></h2>
      <PieceRelationList>
        {pieceQuery.boards.map((piece) => {
          return piece.boardType === "LINK" ? <LinkPieceCard piece={piece} /> : <MemoPieceCard piece={piece} />
        })}
      </PieceRelationList>
      {pieceQuery.boardsCnt === 0 && <div className="no-item">조각 검색 결과가 없습니다.</div>}
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
`;

const PieceRelationList = styled.div`
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

export default PieceResultSet;