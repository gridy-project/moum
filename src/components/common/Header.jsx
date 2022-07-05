import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import iconUserMono from "../../public/img/icon-user-mono.png";
import notificationBing from "../../public/img/notification-bing.png";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../shared/localStorage";
import { setLoginStatus } from "../../redux/modules/userSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLogin, isLoading } = useSelector((state) => state.user);

  return (
    <Container>
      {!isLoading && (
        <>
          <Logo><Link to="/"><span></span>moum</Link></Logo>
          <Menu>
            <nav>
              <ul>
                <li><Link to="/">moum 소개</Link></li>
                <li><Link to="/moum">나의 모음</Link></li>
                <li><Link to="/search">전체 모음</Link></li>
              </ul>
            </nav>
            <div className="icon-mono">
              <Link to="/mypage"><img src={iconUserMono} alt="profile" /></Link>
            </div>
            <div className="icon-notification">
              <img src={notificationBing} alt="notification" />
            </div>
            {isLogin ? 
              (
                <button onClick={() => {
                  removeToken();
                  dispatch(setLoginStatus(false));
                  navigate("/")
                }}>로그아웃</button>
              ) : (
                <button onClick={() => { navigate("/login") }}>로그인</button>
              )
            }
          </Menu>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 1200px;
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
  height: 100%;

  a {
    display: flex;
    font-size: 21px;
    align-items: center;

    span {
      display: block;
      width: 22px;
      height: 22px;
      background-color: #9152FF;;
      border-radius: 5px;
      margin-right: 10px;
    }
  }
`;

const marginLeft = "40px";
const Menu = styled.div`
  display: flex;
  align-items: center;

  nav {
    ul {
      display: flex;
      li {
        font-size: 16px;
        font-weight: bold;
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
    cursor: pointer;
  }

  button:hover {
    background-color: #ddd;
    color: #444;
  }
`;


export default Header;