import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../shared/localStorage";
import { useRecoilState } from "recoil";
import { isLogin } from "../../atoms/user";

function Header({selected}) {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useRecoilState(isLogin);

  return (
    <Container>
      <Logo><Link to="/"><span></span>moum</Link></Logo>
      <Menu>
        <nav>
          <ul>
            <Item isActive={selected === 0}><Link to="/">moum 소개</Link></Item>
            {loginStatus && (
              <>
                <Item isActive={selected === 1}><Link to="/moum">나의 모음</Link></Item>
                <Item isActive={selected === 2}><Link to="/search">전체 모음</Link></Item>
                <Item isActive={selected === 3}><Link to="/mypage">마이페이지</Link></Item>
              </>
            )
            }
          </ul>
        </nav>
        {loginStatus ? 
          (
            <button onClick={() => {
              removeToken();
              setLoginStatus(false);
              navigate("/");
            }}>로그아웃</button>
          ) : (
            <button onClick={() => { navigate("/login") }}>로그인</button>
          )
        }
      </Menu>
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