import styled from "styled-components";
import noImage from "../../public/img/Image.png";
import more from "../../public/img/Menu.png";

function LinkPieceCard() {
  return (
    <Container>
      <div className="card-content">
        <div className="card-header">
          <div className="category">카테고리</div>
          <div className="menu"><img src={more} alt="" /></div>
        </div>
        <div className="card-title">이 부분은 링크 제목이 표시되는 영역입니다.</div>
        <div className="card-description">메모를 남길 수 있는 영역</div>
      </div>
      <div className="card-image">
        <img src={noImage} alt="noImage" />
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 280px;
  height: 360px;
  background-color: #F5F5F5;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .card-content {

  }

  .card-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    flex-shrink: 0;

    .category {
      width: 70px;
      height: 25px;
      font-size: 12px;
      background-color: #D9D9D9;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12.5px;
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
  }

  .card-image {
    width: 100%;
    height: 100%;
    background-color: #D9D9D9;
    border-radius: 0 0 15px 15px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default LinkPieceCard;