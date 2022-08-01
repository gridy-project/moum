import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { globalBottomFloat } from "state/common/popup";
import styled, { css } from "styled-components";

function BottomFloat () {
  const [float, setFloat] = useRecoilState(globalBottomFloat);

  useEffect(() => {
    if (float.state) {
      setTimeout(() => {
        setFloat(current => ({
          ...current,
          state: false
        }))
      }, 5000);
    }
  }, [float.state, setFloat]);

  return (
    <Box isActive={float.state} backgroundColor={"#721EFC"} width={"360px"} height={"80px"}>
      {float.component}
    </Box>
  )
}


const Box = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
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
  z-index: 999;
`;

export default BottomFloat;