// module
import useCustomMutate from "hooks/useCustomMutate";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { instance } from "shared/axios";
import styled from "styled-components";

import Swal from "sweetalert2";
import ghostImg from "assets/common/Card/ghost.png";

function UserStatusView({user, isOther}) {
  const {userId} = useParams();
  const queryClient = useQueryClient();
  
  const {mutateAsync: follow} = useCustomMutate((id) => {
    return instance.post(`/follow/${id}`, {
      followerId: id
    });
  });

  const {mutateAsync: unfollow} = useCustomMutate((id) => {
    return instance.delete(`/unfollow/${id}`, {
      data: {
        followerId: id
      }
    })
  });

  const handleFollow = async () => {
    const {result, message} = await follow(userId);
    if (result) {
      Swal.fire({
        icon: "success",
        title: message
      });
      queryClient.invalidateQueries("user");
    } else {
      Swal.fire({
        icon: "error",
        title: "팔로우 실패",
        text: message
      });
    }
  }

  const handleUnFollow = async () => {
    const {result, status} = await unfollow(userId);
    if (result) {
      Swal.fire({
        icon: "success",
        title: "팔로우 취소 성공"
      });
      queryClient.invalidateQueries("user");
    } else {
      if (status === 500) {
        Swal.fire({
          icon: "error",
          title: "팔로우 취소 실패",
          text: "대상을 찾을 수 없습니다"
        });
      }
    }
  }

  return (
    <Wrap>
      <Box>
        <Image>
          <div>
            {user.imgPath && <img src={user.imgPath} onError={(e) => {
              e.target.src = ghostImg;
            }} alt="유저 이미지" />}
          </div>
        </Image>
        <Content>
          <em>
          {user.nickname}
          {isOther && !user.follow && 
            <FollowButton onClick={handleFollow}>팔로우</FollowButton>
          }
          {isOther && user.follow && 
            <UnFollowButton onClick={handleUnFollow}>팔로잉</UnFollowButton>
          }
          </em>
          {user.information && <p>{user.information}</p>}
        </Content>
        <Follow>
          <div className="counter">
            <div className="follower"><em>팔로워</em><strong>{user.followerCnt}명</strong></div>
            <div className="following"><em>팔로잉</em><strong>{user.followingCnt}명</strong></div>
            <div className="moum"><em>전체 모음</em><strong>{user.folderCnt}개</strong></div>
            <div className="piece"><em>전체 조각</em><strong>{user.boardCnt}개</strong></div>
          </div>
        </Follow>
      </Box>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin-top: 60px;
  width: 100%;
  height: 120px;
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 20px;
`;

const Box = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  div {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #D2BAFF;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  em {
    font-size: 24px;
    color: #111111;
    display: flex;
    align-items: center;
  }

  p {
    font-size: 18px;
    margin-top: 10px;
    color: #777777;
  }
`;

const FollowButton = styled.button`
  margin-left: 16px;
  width: 80px;
  height: 32px;
  background-color: #9E67ff;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  transition: background-color .3s;
  cursor: pointer;

  &:hover {
    background-color: #8d64d4;
  }
`;

const UnFollowButton = styled(FollowButton)`
  width: 80px;
  background-color: #ECECEC;
  color: #777777;
  &:hover {
    background-color: #E0E0E0;
  }
`;

const Follow = styled.div`
  width: 350px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  .counter {
    width: 100%;
    height: 100%;
    display: flex;

    div {
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;

      em {
        font-size: 14px;
        color: #777777;
      }

      strong {
        font-weight: bold;
        margin-top: 15px;
        color: #303030;
      }
    }

    div + div::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 40px;
      background-color: #E5D6FF;
      left: 0;
    }
  }
`;

export default UserStatusView;