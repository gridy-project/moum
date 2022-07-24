import PieceCard from "components/Card/PieceCard";
import { useState } from "react";

import saveSvg from "assets/common/OptionMenu/save.svg";
import reportSvg from "assets/common/OptionMenu/report.svg";

function SearchPieceCard ({piece}) {
  const [optionState, setOptionState] = useState(false);
  const options = [
    {
      name: "내 모음에 저장하기",
      image: saveSvg,
      onClick: () => {
        alert("미구현");
      }
    },
    {
      name: "신고하기",
      image: reportSvg,
      onClick: () => {
        alert("미구현");
      }
    }
  ]
  return (
    <PieceCard
      piece={piece} 
      selectAll={false} 
      buttonState={optionState} 
      setButtonState={setOptionState} 
      options={options}
    />
  )
}

export default SearchPieceCard;