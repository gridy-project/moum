import imageNone from "assets/images/pages/moum/piece-none.png";
import more from "assets/images/pages/moum/menu-black.png";
import privateLock from "assets/svg/card/lock.svg";
import PieceCategory from "components/Moum/PieceCategory";
import { useState } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

function PieceLinkCardCommon ({piece, onClick, setButtonState, isSelected}) {
  return (
    <LinkBox onClick={onClick} isSelected={isSelected}>
      <div className="card-image">
        <img
          className="pointer-events-none w-full h-full object-cover"
          src={piece.imgPath}
          alt="noImage" 
          onError={(e) => {
            e.target.src = imageNone;
          }}
        />
        <div className="menu" onClick={
          (e) => {
            e.preventDefault();
            e.stopPropagation();
            setButtonState(current => !current);
          }
        }>
          <img src={more} alt="" className="w-18 h-18 object-cover" />
        </div>
      </div>
      <div className="card-content">
        <div className="card-header">
          {piece.status === "PRIVATE" && <PrivateIcon><img src={privateLock} alt="" /></PrivateIcon>}
          <PieceCategory category={piece.category} />
        </div>
        
        <div className="card-title">{piece.title}</div>
        <div className="card-description"><span className="w-[100%] whitespace-nowrap">{piece.explanation}</span></div>
      </div>
    </LinkBox>
  )
}

const LinkBox = styled.div`
  ${tw`w-full h-314 bg-[#FFFFFF] rounded-15 border-0 flex flex-col justify-start overflow-hidden cursor-pointer`}
  
  ${props => props.isSelected && css`
    ${tw`bg-[#E0D6FF] border-2 border-solid border-[#AC7DFF]`}
  `}

  .card-image {
    ${tw`w-full h-150 bg-[#D9D9D9] rounded-[0 0 15px 15px] overflow-hidden flex justify-center items-center relative`};
    .menu {
      ${tw`absolute right-12 top-12 w-28 h-28 bg-[#FFFFFF] rounded-8 flex justify-center items-center z-1 cursor-pointer`};
    }
  }

  .card-header {
    ${tw`w-full flex p-[12px 16px 16px] shrink-0 items-center`};
  }

  .card-title {
    ${tw`shrink-0 px-20 text-16 leading-24 w-full h-48 overflow-hidden text-ellipsis`};
    display:-webkit-box; 
    word-wrap:break-word; 
    -webkit-line-clamp:2; 
    -webkit-box-orient:vertical;
  }

  .card-description {
    ${tw`mt-15 mb-20 px-20 leading-[1.2] text-[#595959] overflow-hidden text-ellipsis`};
  }
`;

const PrivateIcon = styled.div`
  ${tw`w-28 h-28 pb-2 rounded-[50%] flex justify-center items-center bg-[#9152FF] mr-8`};
`;

export default PieceLinkCardCommon;