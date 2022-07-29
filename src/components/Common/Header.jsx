import styled, { css } from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "shared/localStorage";
import { useRecoilState } from "recoil";
import { isLogin } from "state/common/user";
import { useEffect, useState } from "react";
import logoSvg from "assets/common/Header/logo.svg";

import presentImg from "assets/once/present.png";
import runSvg from "assets/once/run.svg";

import tw from "twin.macro";

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
        <Logo>
          <Link 
            to="/" 
            tabIndex={-1}
          ><img src={logoSvg} alt="moum" /></Link>
        </Logo>
        <Menu>
          <nav>
            <ul>
              <Item isActive={selected === 0}>
                <Link to="/" tabIndex={-1}>moum 소개</Link>
              </Item>
              {loginStatus && (
                <>
                  <Item isActive={selected === 1}>
                    <Link to="/moum">나의 모음</Link>
                  </Item>
                  <Item isActive={selected === 2}>
                    <Link to="/search">전체 모음</Link>
                    </Item>
                  <Item isActive={selected === 3}>
                    <Link to="/mypage">마이페이지</Link>
                  </Item>
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
  ${tw`
    absolute top-0 left-0 w-full h-[160px] flex flex-col items-center z-[5]
  `}

  ${props => props.isFixed && css`
    ${tw`
      bg-[#FFFFFF] h-[160px] fixed
    `}
  `}
`;

const Banner = styled.div`
  ${tw`
    flex w-full h-[70px] justify-center items-center bg-[#9E67FF] font-normal text-[#F7F3FD] cursor-pointer text-[19px]
  `}

  span {
    ${tw`font-medium text-[#FFFFFF]`}
  }

  img {
    ${tw`mx-[10px]`}
  }

  img.img-present {
    ${tw`w-[22px]`}
  }
`;

const Box = styled.div`
  ${tw`
    w-[1200px] h-[90px] flex justify-between
  `}
`;

const Logo = styled.div`
  ${tw`
    flex font-bold items-center h-full
  `}

  a {
    ${tw`
      flex text-[21px] items-center
    `}

    span {
      ${tw`
        block w-[22px] h-[22px] bg-[#9152FF] rounded-[5px] mr-[10px]
      `}
    }
  }
`;

const marginLeft = "40px";
const Menu = styled.div`
  ${tw`flex items-center`}

  nav {
    ul {
      ${tw`flex`}

      li {
        ${tw`text-[16px]`}
      }

      li + li {
        ${tw`ml-[${marginLeft}]`}
      }
    }
  }

  div {
    ${tw`ml-[${marginLeft}]`}
  }

  button {
    ${tw`
    ml-[${marginLeft}]
    w-[90px] h-[35px] border border-solid border-[#BF98FF] text-[#BF98FF] rounded-[10px] cursor-pointer
    `}

    &.btn-login {
      ${tw`
        font-semibold bg-[#FFFFFF]
      `}
    }

    &.btn-logout {
      ${tw`
        font-semibold bg-transparent border border-solid border-[#777777] text-[#949494]
      `}
    }
  }

  button:hover {
    ${tw`
      bg-[#DDDDDD]
      text-[#444444]
    `}
  }
`;

const Item = styled.li`
  ${tw`
    font-semibold
  `}
  ${({isActive}) => isActive && css`
    color: #721EFC;
  `};
`;


export default Header;