import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "shared/localStorage";
import { useRecoilState } from "recoil";
import { isLogin } from "state/common/user";
import { useEffect, useState } from "react";
import logoSvg from "assets/common/Header/logo.svg";

import tw from "twin.macro";
import Swal from "sweetalert2";

function Header({selected = 0}) {
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
  }, [headerFixed]);

  const loginAlert = () => {
    Swal.fire({
      icon: "warning",
      title: "로그인이 필요한 페이지입니다",
      showCancelButton: true,
      confirmButtonText: "로그인",
      cancelButtonText: "취소",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  }

  return (
    <Container isFixed={headerFixed}>
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
              <Item onClick={() => {
                if (loginStatus) {
                  navigate("/moum");
                } else {
                  loginAlert();
                }
              }} isActive={selected === 1}>
                나의 모음
              </Item>
              <Item onClick={() => {
                if (loginStatus) {
                  navigate("/search");
                } else {
                  loginAlert();
                }
              }} isActive={selected === 2}>
                전체 모음
              </Item>
              <Item onClick={() => {
                if (loginStatus) {
                  navigate("/mypage");
                } else {
                  loginAlert();
                }
              }} isActive={selected === 3}>
                마이페이지
              </Item>
            </ul>
          </nav>
          {loginStatus ? 
            (
              <button className="font-semibold bg-transparent border border-solid border-[#777777] text-[#949494]" onClick={() => {
                removeToken();
                setLoginStatus(false);
                navigate("/");
              }}>로그아웃</button>
            ) : (
              <button className="font-semibold bg-[#FFFFFF]" onClick={() => { navigate("/login") }}>로그인</button>
            )
          }
        </Menu>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  ${tw`
    absolute top-0 left-0 w-full h-[90px] flex flex-col items-center z-[5]
  `}

  ${props => props.isFixed && css`
    ${tw`
      bg-[#FFFFFF] h-[90px] fixed
    `}
  `}
`;

const Box = styled.div`
  ${tw`
    w-[1200px] h-[90px] flex justify-between
  `}
`;

const Logo = styled.div`
  ${tw`flex items-center h-full font-bold `}

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

const Menu = styled.div`
  ${tw`flex items-center`}

  nav {
    ul {
      ${tw`flex`}

      li {
        ${tw`text-[16px]`}
      }

      li + li {
        ${tw`ml-40`}
      }
    }
  }

  div {
    ${tw`ml-40`}
  }

  button {
    ${tw`
    ml-40 w-[90px] h-[35px] border border-solid border-[#BF98FF] text-[#BF98FF] rounded-[10px] cursor-pointer
    `}
  }

  button:hover {
    ${tw`
      bg-[#DDDDDD]
      text-[#444444]
    `}
  }
`;

const Item = styled.li`
  ${tw`font-semibold cursor-pointer`}
  &:hover {
    ${tw`text-[#333333]`}
  }

  ${({isActive}) => isActive && css`
    ${tw`text-[#721EFC]`};
  `};
`;


export default Header;