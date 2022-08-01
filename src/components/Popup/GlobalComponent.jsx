import { useSetRecoilState } from "recoil";
import { atomScrollState } from "state/common/scroll";
import BottomFloat from "./BottomFloat";
import MessageFloat from "./MessageFloat";
import Popup from "./Popup";

function GlobalComponent () {
  const scrollState = useSetRecoilState(atomScrollState);
  return (
    <>
      <Popup />
      <MessageFloat />
      <BottomFloat />
      <div onClick={() => {scrollState(true)}} className="z-5 cursor-pointer fixed w-64 h-64 bg-[#FFFFFF] bottom-0 right-0 m-50 rounded-[50%] justify-center items-center flex shadow-md">TOP</div>
    </>
  )
}

export default GlobalComponent;