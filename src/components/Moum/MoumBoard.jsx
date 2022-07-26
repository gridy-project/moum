import MoumList from "components/Moum/List/MoumList";
import PieceList from "components/Moum/List/PieceList";
import { useRecoilValue } from "recoil";
import { atomMoum } from "state/moum";
import styled from "styled-components";

function MoumBoard ({folderId, search}) {
  const selectAll = useRecoilValue(atomMoum.modeSelectAll);
  return (
    <PieceBoard>
      {
        folderId === 0 ? 
        <MoumList />
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