import styled, { css } from "styled-components";
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
                <Item><Link to="/">moum 소개</Link></Item>
                <Item isActive={true}><Link to="/moum">나의 모음</Link></Item>
                <Item><Link to="/search">전체 모음</Link></Item>
                <Item><Link to="/mypage">마이페이지</Link></Item>
              </ul>
            </nav>
            {isLogin ? 
              (
                <button onClick={() => {
                  removeToken();
                  dispatch(setLoginStatus(false));
                  navigate("/");
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
      }

      li + li {
        margin-left: ${marginLeft};
      }
    }
  }

  div {
    margin-left: ${marginLeft};
  }

  button {
    margin-left: ${marginLeft};
    width: 120px;
    height: 40px;
    border: 1px solid #777777;
    background-color: #E5D6FF;
    color: #949494;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
  }

  button:hover {
    background-color: #ddd;
    color: #444;
  }
`;

const Item = styled.li`
  ${({isActive}) => isActive && css`
    color: #721EFC;
  `};
`;


export default Header;