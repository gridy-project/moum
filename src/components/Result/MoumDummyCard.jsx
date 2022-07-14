
import more from "../../public/img/menu-white.png";
import iconPieceCount from "../../public/img/icon-piece-count.png";
import iconScrapCount from "../../public/img/icon-scrap-count.png";
import moum from "../../public/img/moum-background.png";
import styled, { css } from "styled-components";

function MoumDummy () {
  return (
    <Container>
      <div className="card-content">
        <div className="card-header">
          <div className="menu"><img src={more} alt="" /></div>
        </div>
        <div className={`card-title`}>모음 이름</div>
      </div>
      <div className="card-info">
        <div className="piece-count">
          <Icon><img src={iconPieceCount} alt="전체 조각 개수" /></Icon>
          <Text>전체 조각</Text>
          <Count>10개</Count>
        </div>
        <div className="scrap-count">
          <Icon><img src={iconScrapCount} alt="스크랩 횟수" /></Icon>
          <Text>스크랩</Text>
          <Count>1,123회</Count>
        </div>
      </div>
      <CardOption>
        <div>수정하기</div>
        <div>삭제하기</div>
      </CardOption>
    </Container>
  )
}


const Container = styled.div`
  width: 282px;
  height: 314px;
  background-image: url(${moum});
  background-size: 100%;
  background-repeat: no-repeat;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  cursor: pointer;

  .menu {
    position: absolute;
    right: 25px;
    top: 50px;
  }

  .card-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;

    > img {
      margin-top: 10px;
    }

    .category {
      width: 70px;
      height: 25px;
      font-size: 12px;
      background-color: #D9D9D9;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12.ㄴ5px;
    }
  }



  .card-title {
    padding: 80px 20px 0;
    font-size: 20px;
    line-height: 1.2;
    color: #FFFFFF;
  }

  .card-description {
    margin-top: 15px;
    margin-bottom: 20px;
    padding: 0 20px;
    line-height: 1.2;
    color: #FFFFFF;
  }

  .card-image {
    width: 100%;
    height: 100%;
    background-color: #ABABAB;
    border-radius: 0 0 15px 15px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-info {
    color: #FFFFFF;
    position: absolute;
    bottom: 25px;
    left: 25px;

    .piece-count, .scrap-count {
      display: flex;
    }

    .scrap-count {
      margin-top: 10px;
    }
  }
`;

const Icon = styled.div`
  width: 20px;
`;
const Text = styled.div`
  width: 60px;
  font-size: 14px;
  margin-left: 5px;
`;
const Count = styled.div`
  font-size: 14px;
  margin-left: 10px;
  letter-spacing: 1px;
`;

const CardOption = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #FFFFFF;
  right: -50px;
  top: 80px;
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

export default MoumDummy;