import styled from "styled-components";
import iconUserMono from "../../public/img/icon-user-mono.png";
import notificationBing from "../../public/img/notification-bing.png";

function Header() {
  return (
    <Container>
      <Logo><span></span>moum</Logo>
      <Menu>
        <nav>
          <ul>
            <li>moum 소개</li>
            <li>나의 모음</li>
            <li>전체 모음</li>
          </ul>
        </nav>
        <div className="icon-mono">
          <img src={iconUserMono} alt="profile" />
        </div>
        <div className="icon-notification">
          <img src={notificationBing} alt="notification" />
        </div>
        <button>로그인</button>
      </Menu>
    </Container>
  );
}

const Container = styled.div`
  width: 1280px;
  height: 200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  font-size: 36px;
  font-weight: bold;
  align-items: center;

  span {
    display: block;
    width: 36px;
    height: 36px;
    background-color: #999;
    border-radius: 5px;
    margin-right: 10px;
  }
`;

const marginLeft = "40px";
const Menu = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;

  nav {
    ul {
      display: flex;
      li {
        font-size: 18px;
      }
      li + li {
        margin-left: ${marginLeft};
      }
    }
  }

  div {
    margin-left: ${marginLeft};
  }

  div.icon-mono {

  }

  div.icon-notification {
    width: 40px;
    height: 40px;
    background-color: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }

  button {
    margin-left: ${marginLeft};
    width: 140px;
    height: 50px;
    border: none;
    background-color: #626262;
    color: #FFFFFF;
    border-radius: 10px;
    font-weight: bold;
    font-size: 18px;
  }
`;


export default Header;