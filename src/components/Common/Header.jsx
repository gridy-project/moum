import styled, { css } from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "shared/localStorage";
import { useRecoilState } from "recoil";
import { isLogin } from "state/common/user";
import { useEffect, useState } from "react";
import logoSvg from "assets/common/Header/logo.svg";

import presentImg from "assets/once/present.png";
import runSvg from "assets/once/run.svg";

function Header({selected}) {
  const navigate = useNavigate();
  const location = useLocation();

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
      {
        !(location.pathname === "/login" || location.pathname === "/register") &&
        <Banner onClick={() => {
          window.open("https://docs.google.com/forms/d/e/1FAIpQLSeh0TbZXtvfmEyEbbPSyS8w9pOLZmrK7FCidbZUGdl2IdNnjw/viewform?usp=sf_link");
        }}>
          <img className="img-present" src={presentImg} alt="event" />
          <div>
            7월 31일(일)까지 단 4일! moum <span>설문조사 참여하고 이벤트 상품</span> 받아가세요
          </div>
          <img className="img-run" src={runSvg} alt="run" />
        </Banner>
      }
      <Box>
        <Logo><Link to="/"><img src={logoSvg} alt="moum" /></Link></Logo>
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
              <button className="btn-logout" onClick={() => {
                removeToken();
                setLoginStatus(false);
                navigate("/");
              }}>로그아웃</button>
            ) : (
              <button className="btn-login" onClick={() => { navigate("/login") }}>로그인</button>
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
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;

  ${props => props.isFixed && css`
    background-color: #FFFFFF;
    height: 160px;
    position: fixed;
  `}
`;

const Banner = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #9e67ff;
  font-weight: 400;
  color: #F7F3FD;
  cursor: pointer;
  font-size: 19px;

  span {
    font-weight: 500;
    color: #FFFFFF;
  }

  img {
    margin: 0 10px;
  }

  img.img-present {
    width: 22px;
  }

  img.img-run {

  }
`;

const Box = styled.div`
  width: 1200px;
  height: 90px;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
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
    width: 90px;
    height: 35px;
    border: 1px solid #BF98FF;
    color: #BF98FF;
    border-radius: 10px;
    cursor: pointer;

    &.btn-login {
      font-weight: 600;
      background-color: #FFFFFF;
    }

    &.btn-logout {
      font-weight: 600;
      background-color: transparent;
      border: 1px solid #777777;
      color: #949494;
    }
  }

  button:hover {
    background-color: #ddd;
    color: #444;
  }
`;

const Item = styled.li`
  font-weight: 600;
  ${({isActive}) => isActive && css`
    color: #721EFC;
  `};
`;


export default Header;