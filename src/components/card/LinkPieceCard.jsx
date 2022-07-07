import styled from "styled-components";
import noImage from "../../public/img/Image.png";
import more from "../../public/img/Menu.png";

function LinkPieceCard() {
  return (
    <Box>
      <div className="card-image">
        <img src={noImage} alt="noImage" />
        <div className="menu"><img src={more} alt="" /></div>
      </div>
      <div className="card-content">
        <div className="card-header">
          <div className="icon-box"></div>
          <div className="category">카테고리</div>
        </div>
        <div className="card-title">이 부분은 링크 제목이 표시되는 영역입니다.</div>
        <div className="card-description">메모를 남길 수 있는 영역</div>
      </div>
    </Box>
  );
}

const Box = styled.div`
  width: 280px;
  height: 310px;
  background-color: #FFFFFF;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;


  .card-image {
    width: 100%;
    height: 100%;
    background-color: #D9D9D9;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-content {

  }

  .card-header {
    width: 100%;
    display: flex;
    padding: 25px 15px 20px;
    flex-shrink: 0;

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

export default LinkPieceCard;