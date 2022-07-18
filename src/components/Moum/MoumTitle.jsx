import Header from "components/Common/Header";
import styled from "styled-components";
import MoumTitleContent from "./MoumTitleContent";
import MoumTitleCreateForm from "./MoumTitleCreateForm";

function MoumTitle ({isSuccess, moums}) {
  return (
    <Title>
      <Header selected={1} />
      <MoumTitleContent />
      {isSuccess && <MoumTitleCreateForm moums={moums} />}
    </Title>
  );
}

const Title = styled.div`
  padding-top: 200px;
  width: 100%;
  height: 500px;
  background-color: #E5D6FF;
  border-radius: 0 0 60px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export default MoumTitle;