import styled from "styled-components";
import MoumList from "./List/MoumList";
import PieceList from "./List/PieceList";

function MoumBoard ({folderId, search, moums, selectAll}) {

  return (
    <PieceBoard>
      {
        folderId === 0 ? 
        <MoumList
          moums={moums}
        />
        :
        <PieceList
          selectAll={selectAll}
          search={search}
        />
      }
    </PieceBoard>
  )
}

const PieceBoard = styled.div`
  margin-top: 0px;
`;

export default MoumBoard;