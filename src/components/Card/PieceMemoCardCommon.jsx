import PieceCategory from "components/Moum/PieceCategory";
import PieceScrollVertical from "components/Moum/PieceScrollVertical";
import styled from "styled-components";
import privateLock from "assets/images/pages/moum/private-lock.png";
import more from "assets/images/pages/moum/menu-black.png";

function PieceMemoCardCommon ({piece, setButtonState}) {
  return (
    <>
      <CardHeader>
        <Category>
          {piece.status === "PRIVATE" && <PrivateIcon><img src={privateLock} alt="" /></PrivateIcon>}
          <PieceCategory category={piece.category}/>
        </Category>
        <More className="menu" onClick={
            (e) => {
              e.preventDefault();
              setButtonState(current => !current);
            }
          }><img src={more} alt="more" /></More>
      </CardHeader>
      <CardContent>
        <PieceScrollVertical>
          <div className="title">{piece.title}</div>
          <div className="content">{piece.content}</div>
        </PieceScrollVertical>
      </CardContent>
    </>
  )
}


const CardHeader = styled.div`
  height: 50px;
  flex-shrink: 0;
  border-bottom: 1px solid #E8E1FC;
  display: flex;
  justify-content: space-between;
`;

const Category = styled.div`
  padding: 0 16px;
  display: flex;
  align-items: center;
`;

const PrivateIcon = styled.div`
  width: 28px;
  height: 28px;
  padding-bottom: 2px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9152FF;
  margin-right: 8px;
`;

const More = styled.div`
  margin: 12px;
  width: 28px;
  height: 28px;
  background-color: #FFFFFF;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: pointer;

  img {
    width: 18px;
    height: 18px;
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
`;

export default PieceMemoCardCommon;