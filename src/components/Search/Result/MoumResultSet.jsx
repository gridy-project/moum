import styled from "styled-components";
import SearchMoumCard from "../Card/SearchMoumCard";

function MoumResultSet ({moumQuery}) {
  return (
    <Wrap>
      <h2>관련있는 모음<p>모음 검색 결과 {moumQuery.foldersCnt}건</p></h2>
      <MoumRelationList>
        {moumQuery.folders.map((moum) => {
          return <SearchMoumCard key={moum.id} moum={moum} />
        })}
      </MoumRelationList>
      {moumQuery.foldersCnt === 0 && <div className="no-item">모음 검색 결과가 없습니다.</div>}
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