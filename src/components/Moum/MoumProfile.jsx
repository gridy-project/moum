// module
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// redux
import { getUserInfoMineThunk } from "../../redux/modules/moumSlice";

function MoumProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.moum.userInfo);
  const userMore = useSelector((state) => state.moum.userInfoMore);

  useEffect(() => {
    dispatch(getUserInfoMineThunk());
  }, [dispatch]);

  useEffect(() => {
    console.log(userMore);
  }, [userMore]);
  return (
    <Wrap>
      <Box>
        <Image>
          <div>
            {user.imgPath && <img src={user?.imgPath} alt="유저 이미지" />}
          </div>
        </Image>
        <Content>
          <em>{user?.nickname}</em>
          {user?.information && <p>user?.information</p>}
        </Content>
        <Follow>
          <div className="counter">
            <div className="follower"><em>팔로워</em><strong>{userMore.followerCnt}명</strong></div>
            <div className="following"><em>팔로잉</em><strong>{userMore.followingCnt}명</strong></div>
            <div className="moum"><em>전체 모음</em><strong>{userMore.folderCnt}명</strong></div>
            <div className="piece"><em>전체 조각</em><strong>{userMore.boardCnt}명</strong></div>
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
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  em {
    font-size: 24px;
    color: #111111;
  }

  p {
    font-size: 18px;
    margin-top: 10px;
    color: #777777;
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

export default MoumProfile;