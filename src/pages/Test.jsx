import styled from "styled-components";
import { Scrollbars } from 'react-custom-scrollbars-2';

function Test () {
  return (
    <Container>
      <Scrollbars style={{width: 500, height: 500, overflowX: "hidden"}}>
        <p style={{wordWrap: "break-word"}}></p>
      </Scrollbars>
    </Container>
  )
}

const Container = styled.div`

`;

export default Test;