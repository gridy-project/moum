import styled from "styled-components";

function Container ({children}) {
  return (
    <Wrap>
      {children}
    </Wrap>
  );
}

const Wrap = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Container;