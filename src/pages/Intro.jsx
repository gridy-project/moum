import Container from "components/Common/Container";
import Header from "components/Common/Header";
import styled from "styled-components";
import logoWhite from "assets/common/Header/logo_white.png";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLogin } from "state/common/user";
import Swal from "sweetalert2";

import tw from "twin.macro";

import introOneImage from "assets/images/pages/intro/intro-1.jpg";
import introTwoImage from "assets/images/pages/intro/intro-2.png";
import introThreeImage from "assets/images/pages/intro/intro-3.png";
import introFourImage from "assets/images/pages/intro/intro-4.png";
import introFiveImage from "assets/images/pages/intro/intro-5.png";

function Intro() {
  const login = useRecoilValue(isLogin);
  const navigate = useNavigate("/auth");
  return (
    <Container>
      <Header selected={0} />
      <Content>
        <ContentView>
          <img src={introOneImage} alt="intro1" />
        </ContentView>
        <ContentView>
          <img src={introTwoImage} alt="intro2" />
        </ContentView>
        <ContentView>
          <img src={introThreeImage} alt="intro3" />
        </ContentView>
        <ContentView>
          <img src={introFourImage} alt="intro4" />
        </ContentView>
        <ContentView>
          <img src={introFiveImage} alt="intro5" />
          <button onClick={
            () => {
              if (login) {
                Swal.fire({
                  icon: "error",
                  title: "이미 로그인이 되어 있는 상태입니다"
                });
              } else {
                navigate("/register");
              }
            }
          }>30초 회원가입 하러가기</button>
        </ContentView>
        <Footer>
          <Box>
            <img src={logoWhite} alt="moum white logo" />
          </Box>
        </Footer>
      </Content>
    </Container>
  );
}

const Content = styled.div`
  ${tw`w-full pt-[70px] absolute top-0`}

  img {
    ${tw`w-full`}
  }
`;

const ContentView = styled.div`
  ${tw`w-full flex justify-center overflow-x-hidden`}

  &:nth-of-type(1) {
    ${tw`bg-[#D1B7FE]`}
    img {
      ${tw`w-[1920px]`}
    }
  }

  &:nth-of-type(2) {
    background-color: #F7F3FD;
    ${tw`bg-[#F7F3FD] w-full h-[1229px] flex justify-center items-center`}
    img {
      ${tw`w-[1179px]`}
    }
  }

  &:nth-of-type(3) {
    ${tw`bg-[#FFFFFF] w-full h-[888px] flex justify-center items-center`}
    img {
      ${tw`w-[1200px]`}
    }
  }

  &:nth-of-type(4) {
    ${tw`bg-[#E8E1FC] w-full h-[660px] flex justify-center items-center`}
    img {
      ${tw`w-[1675px]`}
    }
  }

  &:nth-of-type(5) {
    ${tw`relative bg-[#FFFFFF] w-full h-[1920px] flex justify-center items-center`}
    
    img {
      ${tw`w-[1200px]`}
    }

    button {
      ${tw`
      absolute bottom-[207px] bg-[#000000] 
      mr-[750px] w-[270px] h-[55px] bg-transparent
      border-0 text-[0px] cursor-pointer
      `}
    }
  }
`;

const Footer = styled.div`
  ${tw`
    w-full h-[80px] bg-[#AC7DFF]
  `}
  img {
    ${tw`w-auto`}
  }
`;

const Box = styled.div`
  ${tw`
    w-[1200px] h-full mx-auto flex items-center
  `}
`;

export default Intro;