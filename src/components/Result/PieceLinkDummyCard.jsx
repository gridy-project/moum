import styled, { css } from "styled-components";
import noImage from "../../public/img/Image.png";
import more from "../../public/img/menu-black.png";
import PieceCategory from "../Moum/PieceCategory";

function PieceLinkDummyCard () {
  return (
    <Box>
      <a href="http://localhost:3000" target="blank">
        <div className="card-image">
          <img src={noImage} alt="noImage" />
          <div className="menu" onClick={
            (e) => {
              e.preventDefault();
            }
          }>
            <img src={more} alt="" />
          </div>
        </div>
        <div className="card-content">
          <div className="card-header">
            <PieceCategory category="디자인" />
          </div>
          <div className="card-title">제목</div>
          <div className="card-description"><span>내용</span></div>
        </div>
      </a>
      {/* <PieceCardOption isActive={buttonState} setActive={setButtonState} piece={piece} type={"LINK"} /> */}
    </Box>
  )
}

const Box = styled.div`
  position: relative;

  a {
    width: 100%;
    height: 314px;
    background-color: #FFFFFF;
    border-radius: 15px;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
  }

  
  ${props => props.isSelected && css`
    a {
      background-color: #E0D6FF;
      border: 2px solid #AC7DFF;
    }
  `}

  .card-image {
    width: 100%;
    height: 100%;
    background-color: #D9D9D9;
    border-radius: 0px 0px 15px 15px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .menu {
      position: absolute;
      right: 12px;
      top: 12px;
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
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-header {
    width: 100%;
    display: flex;
    padding: 12px 16px 16px;
    flex-shrink: 0;
    align-items: center;
  }

  .card-title {
    flex-shrink: 0;
    padding: 0 20px;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    height: 48px;
    display:-webkit-box; 
    word-wrap:break-word; 
    -webkit-line-clamp:2; 
    -webkit-box-orient:vertical; 
    overflow:hidden; 
    text-overflow:ellipsis;
  }

  .card-description {
    margin-top: 15px;
    margin-bottom: 20px;
    padding: 0 20px;
    line-height: 1.2;
    color: #595959;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
      width: 100%;
      white-space: nowrap;
    }
  }
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

export default PieceLinkDummyCard;