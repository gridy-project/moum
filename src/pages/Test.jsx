import { useState } from "react";
import styled, { css } from "styled-components";

function Test () {
  const [toggle, setToggle] = useState(false);
  return (
    <Container>
      <Box isActive={toggle}></Box>
      <button onClick={() => setToggle(!toggle)}>토글</button>
    </Container>
  )
}

const Container = styled.div``;
const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${props => props.isActive ? "#000" : "#DDD"};
  ${props => props.isActive ? css``: null}
`;

export default Test;