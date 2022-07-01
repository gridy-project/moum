import styled from "styled-components";

function MoumProfile() {
  return (
    <Container>
      <Image>
        <div>
          <img src="" alt="" />
        </div>
      </Image>
      <Content>
        <em>계정 이름</em>
        <p>계정에 대한 설명글이 나오는 영역</p>
        <div>
          <span className="nickname">닉네임</span>
          <span className="follower">팔로워 <strong>30명</strong></span>
          <span className="following">팔로잉 <strong>2명</strong></span>
        </div>
      </Content>
      <ButtonWrap>
        <button>새로 작성하기</button>
      </ButtonWrap>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 10px;
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  div {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #FFFFFF;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);

    img {

    }
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  em {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  div {
    span {
      font-size: 14px;
      color: #999999;
      strong{
        font-weight: bold;
      }
    }

    span:nth-of-type(1) {
      margin-right: 10px;
      color: #333333;
    }

    span:nth-of-type(2) {
      margin-right: 10px;
    }

    span:nth-of-type(3) {
      position: relative;
      margin-left: 10px;
    }

    span:nth-of-type(3)::before {
      position: absolute;
      content: '';
      width: 2px;
      height: 15px;
      background-color: #DDDDDD;
      left: -10px;
      top: 0px;
    }
  }
`;

const ButtonWrap = styled.div`
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  button {
    width: 150px;
    height: 50px;
    border-radius: 25px;
    margin: 35px;
    font-size: 18px;
    background-color: #888888;
    border: none;
    color: #FFFFFF;
  }
`;

export default MoumProfile;