import styled, { css } from "styled-components";
import PieceCategory from "../Moum/PieceCategory";
import more from "../../public/img/menu-black.png";
import PieceScrollVertical from "../Moum/PieceScrollVertical";

function PieceMemoDummyCard () {
  return (
    <Card>
      <CardHeader>
        <Category>
          <PieceCategory category="음악" />
        </Category>
        <More className="menu" onClick={(e) => { e.preventDefault(); }}><img src={more} alt="more" />
        </More>
      </CardHeader>
      <CardContent>
        <PieceScrollVertical>
          <div className="title">제목</div>
          <div className="content">내용</div>
        </PieceScrollVertical>
      </CardContent>
      {/* <PieceCardOption isActive={buttonState} setActive={setButtonState} piece={piece} type={"MEMO"} /> */}
    </Card>
  )
}


const Card = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 314px;
  background-color: #FFFFFF;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  
  ${props => props.isSelected && css`
    background-color: #E0D6FF;
    border: 2px solid #AC7DFF;
  `}
`;

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

export default PieceMemoDummyCard;