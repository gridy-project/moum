import styled, { css } from "styled-components";
import more from "../../public/img/menu-black.png";
import PieceCategory from "../Moum/PieceCategory";
import PieceScrollVertical from "../Moum/PieceScrollVertical";
import privateLock from "../Moum/images/private-lock.png";
import { useState } from "react";
import { useMutation } from "react-query";
import { instance } from "api/axios";
import queryClient from "shared/query";

function MemoPieceCard ({piece}) {
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

  const copyPiece = () => {
    copy(piece.id);
  }

  return (
    <Card>
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
      <CardOption isActive={buttonState}>
        <div onClick={copyPiece}>복사하기</div>
      </CardOption>
    </Card>
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

export default MemoPieceCard;