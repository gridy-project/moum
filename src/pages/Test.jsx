import { useRef, useState } from "react";
import styled from "styled-components";

function Test () {
  const [len, setLen] = useState(0);
  const text = useRef(null);

  const change = (e) => {
    setLen(e.target.value.length);
  }

  return (
    <Container>
      <input type="text" onChange={change} maxLength="40" ref={text} />
      <div>{len}자/40자</div>
    </Container>
  )
}

const Container = styled.div``;

export default Test;