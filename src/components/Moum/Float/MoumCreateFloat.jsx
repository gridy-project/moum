import fastCreateOptionModify from "assets/images/pages/moum/fast-create-option-modify.png";
import fastCreateOptionArrow from "assets/images/pages/moum/fast-create-option-arrow.png";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import LinkDetailPopup from "../Popup/LinkDetailPopup";
import MemoDetailPopup from "../Popup/MemoDetailPopup";
import { globalBottomFloat, globalPopup } from "state/common/popup";

function MoumCreateFloat ({piece}) {
  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);
  const setFloat = useSetRecoilState(globalBottomFloat);

  const closeModal = () => {
    resetPopup();
  }

  const openModal = () => {
    if (piece.boardType === "LINK") {
      setPopup({
        state: true,
        component: <LinkDetailPopup piece={piece} close={closeModal} />
      });
    } else if (piece.boardType === "MEMO") {
      setPopup({
        state: true,
        component: <MemoDetailPopup piece={piece} close={closeModal} />
      });
    }
  }

  const runModifyPopup = (e) => {
    openModal();
    setFloat(current => ({...current, state: false}));
  }

  return (
    <div className="flex items-center justify-between w-full h-full pr-16 pl-28 ">
      <img src={fastCreateOptionModify} alt="modify" />
      <div>
        <em className="font-semibold">
          {piece.folderName}
        </em>
        <p className="mt-5 font-normal text-13">에 조각 저장 완료</p>
      </div>
      <button 
        className="w-150 h-50 bg-[#FFFFFF] border-0 rounded-25 text-[#721EFC] flex justify-center items-center" 
        onClick={runModifyPopup}
      >
        자세히 작성하기
        <img className="ml-5" src={fastCreateOptionArrow} alt="modify" />
      </button>
    </div>
  )
}

export default MoumCreateFloat;