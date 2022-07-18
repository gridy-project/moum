import styled from "styled-components";

function FollowerCard() {
  return (
    <Container>
      <div className="card-image">
        {/* <img src={noImage} alt="noImage" /> */}
      </div>
      <div className="card-content">
        <div className="card-title">계정 이름 들어가는 부분</div>
        <div className="card-description">계정에 대한 설명</div>
        <div className="card-footer">
          <div className="card-follower">
            <em>팔로워</em>
            <p>10명</p>
          </div>
          <div className="card-piece"> 
            <em>총 파일</em>
            <p>100개</p>
          </div>
        </div>
      </div>
    </Container>
  );
}


const Container = styled.div`
  width: 280px;
  height: 350px;
  background-color: #FFFFFF;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  padding: 24px 16px 16px;

  .card-image {
    width: 100px;
    height: 100px;
    background-color: #D2BAFF;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-content {
    margin-top: 24px;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .card-title {
    font-size: 20px;
    line-height: 1.2;
    color: #111111;
  }

  .card-description {
    margin-top: 12px;
    line-height: 1.2;
    color: #777777;
    word-break: break-all;
    height: 40px;
    flex-shrink: 0;
  }

  .card-footer {
    margin-top: 24px;
    width: 100%;
    height: 100%;
    color: #5f5f5f;
    background-color: #F7F3FD;
    border-radius: 10px;
    position: relative;
    display: flex;

    > div {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      em {
        font-size: 14px;
        font-weight: 400;
      }

      p {
        margin-top: 16px;
        font-weight: 600;
        color: #303030;
      }
    }

    &::before {
      content: '';
      display: block;
      width: 1px;
      height: 41px;
      background-color: #E5D6FF;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export default FollowerCard;