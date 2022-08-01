import styled, { css } from "styled-components";
import tw from "twin.macro";
import imageSuccess from "assets/svg/float/success.svg";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { globalMessageFloat } from "state/common/popup";

function MessageFloat () {
  const float = useRecoilValue(globalMessageFloat);
  const resetFloat = useResetRecoilState(globalMessageFloat);
  const [floatList, setFloatList] = useState([]);
  
  const loopFloat = useCallback((id) => {
    setTimeout(() => {
      setFloatList(current => {
        return current.map(
          (item) => {
            if (item.id === id) {
              if (item.timer - 1 !== -1) {
                loopFloat(id);
              }
              return ({...item, timer: item.timer - 1, state: item.timer - 1 > 0})
            } else {
              return item
            }
          }
        );
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (float.state) {
      const id = Date.now();
      setFloatList(current => [...current, {id, ...float, timer: float?.timer ?? 3, state: false}]);
      resetFloat();
    }
  }, [float, resetFloat]);
 
  useEffect(() => {
    if (floatList.length > 0) {
      let check = false;
      for (let i = 0; i < floatList.length; i++) {
        if (floatList[i].timer !== -1) {
          check = true;
        }
      }

      if (check === false) {
        setFloatList([]);
      }
    }
  }, [floatList]);

  return (
    <MessageFloatGroup>
      {floatList.map((item, idx) => {
        return <FloatItem key={idx} item={item} loop={loopFloat} />
      })}
    </MessageFloatGroup>
  )
}

const MessageFloatGroup = styled.div`

`;

export default MessageFloat;

function FloatItem ({item, loop}) {
  const [isActive, setActive] = useState(false);
  
  useEffect(() => {
    loop(item.id);
  }, [loop, item.id]);

  useEffect(() => {
    setTimeout(() => {
      if (item?.timer > 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    }, 50);
  }, [item.timer]);

  return(
    <Box isActive={isActive}>
      <div>
        <i><img src={imageSuccess} alt="success" /></i>
        <span>{item.message}</span>
      </div>
    </Box>
  )
}


const Box = styled.div`
  ${tw`fixed z-99 flex left-[50%] translate-x-[-50%] top-[-100px] opacity-0`}
  transition: top .5s cubic-bezier(.14,.74,.21,.88), opacity .5s;
  ${props => props.isActive && css`
    ${tw`top-[120px] opacity-100`};
  `}
  div {
    ${tw`px-11 py-10 border-2 border-solid border-[#AC7DFF] inline-flex rounded-40 justify-center items-center bg-[#FFFFFF]`};
    box-shadow: 0px 4px 20px rgba(172, 125, 255, 0.25);
    i {
      ${tw`w-36 h-36 bg-[#E0D6FF] rounded-18 flex justify-center items-center`};
    }
    span {
      ${tw`flex pr-10 ml-10 text-[#721EFC] text-18 leading-[1] font-semibold`}
    }
  }
`;