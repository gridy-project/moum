// module
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";

// image
import noImage from "../../public/img/Image.png";
import more from "../../public/img/menu-black.png";

// redux
import { removePieceThunk } from "../../redux/modules/moumSlice";
import { setMoumModifyData, setMoumModifyState } from "../../redux/modules/shareSlice";

// mapping
import { mappingServerToPiece } from "../../mapping/piece";

function LinkPieceCard({piece}) {
  const dispatch = useDispatch();
  const [buttonState, setButtonState] = useState(false);

  const onClickRemove = (e) => {
    dispatch(removePieceThunk(piece.id));
    setButtonState(false);
  }

  const setModify = () => {
    dispatch(setMoumModifyData(mappingServerToPiece(piece)));
    dispatch(setMoumModifyState(true));
  }

  return (
    <Box>
      <a href={piece.link} target="blank">
        <div className="card-image">
          <img src={piece.imgPath || noImage} alt="noImage" />
          <div className="menu" onClick={(e) => {e.preventDefault(); setButtonState(current => !current)}}><img src={more} alt="" /></div>
        </div>
        <div className="card-content">
          <div className="card-header"> 
            <div className="icon-box"></div>
            <div className="category">{piece.category}</div>
          </div>
          <div className="card-title">{piece.title}</div>
          <div className="card-description">{piece.explanation}</div>
        </div>
      </a>
      <CardOption isActive={buttonState}>
        <div onClick={() => {setButtonState(false); setModify();}}>수정하기</div>
        <div onClick={onClickRemove}>삭제하기</div>
      </CardOption>
    </Box>
  );
}

const Box = styled.div`
  position: relative;
  a {
    width: 280px;
    height: 310px;
    background-color: #FFFFFF;
    border-radius: 15px;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .card-image {
    width: 100%;
    height: 100%;
    background-color: #D9D9D9;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .menu {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 30px;
      height: 30px;
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
    padding: 25px 15px 20px;
    flex-shrink: 0;
    align-items: center;

    .icon-box {
      width: 20px;
      height: 20px;
      background-color: #D9D9D9;
      border-radius: 5px;
    }

    .category {
      height: 25px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12.5px;
      margin-left: 5px;
    }
  }

  .card-title {
    padding: 0 20px;
    font-size: 18px;
    line-height: 1.2;
  }

  .card-description {
    margin-top: 15px;
    margin-bottom: 20px;
    padding: 0 20px;
    line-height: 1.2;
    color: #595959;
  }
`;

const CardOption = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #FFFFFF;
  right: -50px;
  top: 60px;
  border: 1px solid #ddd;
  z-index: 1;
  display: none;

  ${props => props.isActive && css`
    display: block;
  `};

  div {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  div:hover {
    background-color: #ddd;
  }

  div + div {
    border-top: 1px solid #ddd;
  }
`;

export default LinkPieceCard;