import { useParams } from "react-router-dom";
import styled from "styled-components";
import MoumList from "./List/MoumList";
import PieceList from "./List/PieceList";

function UserBoard () {
  const {folderId: viewFolderId = 0} = useParams();

  return (
    <Board>
      {
        viewFolderId === 0 ?
        <MoumList />
        :
        <PieceList />
      }
    </Board>
  )
}

const Board = styled.div`
  margin-top: 0px;
`;

export default UserBoard;