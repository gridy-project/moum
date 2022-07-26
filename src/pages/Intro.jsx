import Container from "components/Common/Container";
import Header from "components/Common/Header";
import styled from "styled-components";
import logoWhite from "assets/common/Header/logo_white.png";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate("/auth");
  return (
    <Container>
      <Header selected={0} />
      <Content>
        <ContentView>
          <img src="https://i.ibb.co/VDF4t2K/Group-272.jpg" alt="intro1" />
        </ContentView>
        <ContentView>
          <img src="https://i.ibb.co/D8JqkH4/Group-273.jpg" alt="intro2" />
        </ContentView>
        <ContentView>
          <img src="https://i.ibb.co/GTM6nCJ/Group-276.jpg" alt="intro3" />
        </ContentView>
        <ContentView>
          <img src="https://i.ibb.co/0X8x2Yp/Group-274.jpg" alt="intro4" />
        </ContentView>
        <ContentView>
          <img src="https://i.ibb.co/2tnMvJR/Group-275.jpg" alt="intro5" />
          <button onClick={
            () => {
              navigate("/auth");
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
  width: 100%;
  position: absolute;
  top: 0;

  img {
    width: 100%;
  }
`;

const ContentView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 1920px;
  }

  &:nth-of-type(1) {
    background-color: #D1B7FE;
  }

  &:nth-of-type(2) {
    background-color: #F7F3FD;
  }

  &:nth-of-type(3) {
    background-color: #FFFFFF;
  }

  &:nth-of-type(4) {
    background-color: #E8E1FC;
  }

  &:nth-of-type(5) {
    position: relative;
    background-color: #FFFFFF;
    button {
      position: absolute;
      bottom: 170px;
      margin-right: 775px;
      width: 270px;
      height: 55px;
      background-color: transparent;
      border: none;
      font-size: 0;
      cursor: pointer;
    }
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 80px;
  background-color: #AC7DFF;
  img {
    width: auto;
  }
`;

const Box = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export default Intro;