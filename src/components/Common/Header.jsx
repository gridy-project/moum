import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "shared/localStorage";
import { useRecoilState } from "recoil";
import { isLogin } from "state/common/user";
import { useEffect, useState } from "react";

function Header({selected}) {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useRecoilState(isLogin);
  const [headerFixed, setHeaderFixed] = useState(false);

  useEffect(() => {
    if (window.scrollY > 0) setHeaderFixed(true);
    function scrollEvt (e) {
      if (window.scrollY > 0) {
        if (!headerFixed) setHeaderFixed(true);
      } else {
        setHeaderFixed(false);
      }
    }

    window.addEventListener("scroll", scrollEvt);
    return () => {
      window.removeEventListener("scroll", scrollEvt);
    }
  }, [headerFixed])

  return (
    <Container isFixed={headerFixed}>
      <Box>
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
              <button onClick={() => { navigate("/newlogin") }}>로그인</button>
            )
          }
        </Menu>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  z-index: 5;

  ${props => props.isFixed && css`
    background-color: #FFFFFF;
    height: 90px;
    position: fixed;
  `}
`;

const Box = styled.div`
  width: 1200px;
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