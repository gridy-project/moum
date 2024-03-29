import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ghostImg from "assets/common/Card/ghost.png";

function FollowerCard({user}) {
  const navigate = useNavigate();
  const runUserPage = () => {
    navigate(`/user/${user.id}`);
  }
  return (
    <Card onClick={runUserPage}>
      <div className="card-image">
        {user.imgPath && <img src={user.imgPath} onError={(e) => {
          e.target.src = ghostImg;
        }} alt="noImage" />}
      </div>
      <div className="card-content">
        <div className="card-title">{user.nickname}</div>
        <div className="card-description">{user?.information}</div>
        <div className="card-footer">
          <div className="card-follower">
            <em>팔로워</em>
            <p>{user.followerCnt}명</p>
          </div>
          <div className="card-piece"> 
            <em>총 파일</em>
            <p>{user.boardCnt}개</p>
          </div>
        </div>
      </div>
    </Card>
  );
}


const Card = styled.div`
  cursor: pointer;
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

  &:hover {
    background-color: #FCFCFC;
  }

  .card-image {
    width: 100px;
    height: 100px;
    background-color: #D2BAFF;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    overflow: hidden;

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