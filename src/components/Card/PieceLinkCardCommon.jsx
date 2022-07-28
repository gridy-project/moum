import imageNone from "assets/images/pages/moum/images-none.png";
import more from "assets/images/pages/moum/menu-black.png";
import privateLock from "assets/svg/card/lock.svg";
import PieceCategory from "components/Moum/PieceCategory";
import { useState } from "react";
import styled, { css } from "styled-components";

function PieceLinkCardCommon ({piece, onClick, setButtonState, isSelected}) {
  const [noImage, setNoImage] = useState(false);
  return (
    <LinkBox onClick={onClick} isSelected={isSelected}>
      <div className="card-image">
        <img
          className={noImage ? "no-image" : ""}
          src={piece.imgPath}
          alt="noImage" 
          onError={(e) => {
            e.target.src = imageNone;
            setNoImage(true);
          }}
        />
        <div className="menu" onClick={
          (e) => {
            e.preventDefault();
            e.stopPropagation();
            setButtonState(current => !current);
          }
        }>
          <img src={more} alt="" />
        </div>
      </div>
      <div className="card-content">
        <div className="card-header">
          {piece.status === "PRIVATE" && <PrivateIcon><img src={privateLock} alt="" /></PrivateIcon>}
          <PieceCategory category={piece.category} />
        </div>
        
        <div className="card-title">{piece.title}</div>
        <div className="card-description"><span>{piece.explanation}</span></div>
      </div>
    </LinkBox>
  )
}

const LinkBox = styled.div`
  width: 100%;
  height: 314px;
  background-color: #FFFFFF;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  cursor: pointer;

  img {
    pointer-events: none;
  }

  
  ${props => props.isSelected && css`
    background-color: #E0D6FF;
    border: 2px solid #AC7DFF;
  `}

  .card-image {
    width: 100%;
    height: 150px;
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
    img.no-image {
      width: auto;
      height: auto;
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

export default PieceLinkCardCommon;