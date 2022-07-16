// module
import { instance } from "api/axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import queryClient from "shared/query";
import styled, { css } from "styled-components";

// image
import noImage from "../../public/img/Image.png";
import more from "../../public/img/menu-black.png";
import PieceCategory from "../Moum/PieceCategory";


function LinkPieceCard({piece}) {
  const [buttonState, setButtonState] = useState(false);

  const {mutate: copy} = useMutation(async (boardId) => {
    const response = await instance.post(`/myshare/board/${boardId}`, {});
    return response.data;
  }, {
    onSuccess: data => {
      queryClient.invalidateQueries("mine/pieces");
      alert("복사 성공");
    },
    onError: err => {
      console.log(err);
    }
  });

  const copyPiece = (e) => {
    copy(piece.id);
  }

  return (
    <Box>
      <a href={piece.link} target="blank">
        <div className="card-image">
          <img src={piece.imgPath || noImage} className={noImage && "no-image"} alt="noImage" />
          <div className="menu" onClick={
            (e) => {
              e.preventDefault();
              setButtonState(current => !current);
            }
          }>
            <img src={more} alt="" />
          </div>
        </div>
        <div className="card-content">
          <div className="card-header">
            <PieceCategory category={piece.category} />
          </div>
          
          <div className="card-title">{piece.title}</div>
          <div className="card-description"><span>{piece.explanation}</span></div>
        </div>
      </a>
      <CardOption isActive={buttonState}>
        <div onClick={copyPiece}>복사하기</div>
      </CardOption>
    </Box>
  );
}

const CardOption = styled.div`
  position: absolute;
  width: 100px;
  height: 40px;
  background-color: #FFFFFF;
  right: -60px;
  top: 50px;
  border: 1px solid #ddd;
  z-index: 1;
  display: none;

  ${props => props.isActive && css`
    display: block;
  `};

  div {
    width: 100%;
    height: 100%;
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
    /* height: 100%; */
    height: 155px;
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

export default LinkPieceCard;