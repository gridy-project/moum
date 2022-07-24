import Container from "components/Common/Container";
import Header from "components/Common/Header";
import styled from "styled-components";
import logoWhite from "assets/common/Header/logo_white.png";

function Intro() {
  return (
    <Container>
      <Header selected={0} />
      <Content>
        <img src="https://i.ibb.co/WyvTM7J/Group-272.png" alt="intro1" />
        <img src="https://i.ibb.co/D8JqkH4/Group-273.jpg" alt="intro2" />
        <img src="https://i.ibb.co/0X8x2Yp/Group-274.jpg" alt="intro3" />
        <img src="https://i.ibb.co/2tnMvJR/Group-275.jpg" alt="intro4" />
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