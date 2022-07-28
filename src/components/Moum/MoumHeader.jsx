import Header from "components/Common/Header";
import styled from "styled-components";
import MoumTitleContent from "./Header/MoumTitleContent";
import MoumTitleCreateForm from "./Header/MoumTitleCreateForm";

import moumTopImage from "assets/images/pages/moum/moum-top.jpg";

function MoumHeader () {
  return (
    <Title>
      <Header selected={1} />
      <MoumTitleContent />
      <MoumTitleCreateForm />
    </Title>
  );
}

const Title = styled.div`
  padding-top: 120px;
  width: 100%;
  height: 480px;
  background-image: url(${moumTopImage});
  background-position-y: 70px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0 0 60px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export default MoumHeader;