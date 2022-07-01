import styled from "styled-components";
import Header from "../components/common/Header";
import MoumProfile from "../components/moum/MoumProfile";

function Main() {
  return (
    <Container>
      <Header />
      <Content>
        <MoumProfile />
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 1200px;
`;

export default Main;