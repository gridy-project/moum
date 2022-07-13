import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { floatState, globalFloat } from "../../atoms/popup";

function Float () {
  const [viewState, setViewState] = useRecoilState(floatState);
  const [float] = useRecoilState(globalFloat);

  useEffect(() => {
    if (viewState) {
      setTimeout(() => {
        setViewState(false)
      }, 5000);
    }
  }, [viewState, setViewState]);

  return (
    <Box isActive={viewState}>
      {float}
    </Box>
  )
}

const Box = styled.div`
  width: 300px;
  height: 100px;
  background-color: #333333;
  color: white;
  position: fixed;
  transition: bottom .3s ease-in;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.isActive ?
  css`
    bottom: 50px;
  `:
  css`
    bottom: -200px;
  `}
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
`;

export default Float;