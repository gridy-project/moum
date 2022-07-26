import Header from "components/Common/Header";
import styled from "styled-components";
import MoumTitleContent from "./Header/MoumTitleContent";
import MoumTitleCreateForm from "./Header/MoumTitleCreateForm";

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
  padding-top: 180px;
  width: 100%;
  height: 480px;
  background-image: url("https://i.ibb.co/G98Qn89/Rectangle-1808.png");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0 0 60px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export default MoumHeader;