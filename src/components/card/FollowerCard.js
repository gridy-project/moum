import styled from "styled-components";
import noImage from "../../public/img/Image.png";

function FollowerCard() {
  return (
    <Container>
      <div className="card-header">
        <div className="card-circle">
          <div className="card-image">
            <img src={noImage} alt="noImage" />
          </div>
        </div>
      </div>
      <div className="card-content">
        <div className="card-title">계정 이름 들어가는 부분</div>
        <div className="card-description">계정에 대한 설명</div>
        <div className="card-footer">
          팔로워 10명 &nbsp; | &nbsp; 총 파일 100개
        </div>
      </div>
    </Container>
  );
}


const Container = styled.div`
  width: 280px;
  height: 360px;
  background-color: #FFFFFF;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  position: relative;

  .card-header {
    width: 100%;
    display: flex;
    justify-content: center;

    .card-circle {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background-color: #FFFFFF;
      position: relative;
      top: 40px;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;

      .card-image {
        width: 130px;
        height: 130px;
        background-color: #D9D9D9;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .card-content {
    width: 100%;
    height: 250px;
    background-color: #CCCCCC;
    position: absolute;
    bottom: 0;
    border-radius: 15px;
    padding-top: 90px;
    text-align: center;
  }

  .card-title {
    padding: 20px 20px 0;
    font-size: 20px;
    line-height: 1.2;
    color: #363636;
  }

  .card-description {
    margin-top: 15px;
    margin-bottom: 20px;
    padding: 0 20px;
    line-height: 1.2;
    color: #767676;
  }

  .card-footer {
    color: #5f5f5f;
    padding-top: 10px;
  }
`;

export default FollowerCard;