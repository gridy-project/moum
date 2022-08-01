import PopupTopView from "components/Common/PopupTopView";
import styled, { css } from "styled-components";

import moveFolder from "assets/common/Popup/move-folder.svg";
import CancelButton from "components/Common/CancelButton";
import ConfirmButton from "components/Common/ConfirmButton";
import { useState } from "react";

import folderNormalSvg from "assets/common/Popup/folder-normal.svg";
import folderActiveSvg from "assets/common/Popup/folder-active.svg";
import tw from "twin.macro";

function MoveSelectPopup ({query, close, confirm, title}) {
  const {isSuccess, data: list} = query;
  const [select, setSelect] = useState(0);

  return (
    <Popup>
      <PopupTopView image={moveFolder} title={title ?? "이동할 모음 선택하기"} />
      <ShadowBox>
        <ScrollView>
          {isSuccess && list.data.map((v, i) => {
            return (
            <Item key={v.id} isActive={select === i} onClick={() => {setSelect(i)}}>
              <img src={select === i ? folderActiveSvg : folderNormalSvg} alt="folder" />
              <div>{v.name}</div>
            </Item>
            )
          })}
        </ScrollView>
      </ShadowBox>
      <ButtonGroup>
        <CancelButton onClick={close} />
        <ConfirmButton
          isActive 
          optionStyle={css`
            margin-left: 12px;
          `} 
          text={"이동하기"}
          onClick={() => {
            confirm(list.data[select]);
            close();
          }}
        />
      </ButtonGroup>
    </Popup>
  )
}

const Popup = styled.div`
  ${tw`w-435 h-510 bg-[#FFFFFF] rounded-30 p-32 relative`};
`;

const ShadowBox = styled.div`
  ${tw`mt-32 w-370 h-290 rounded-12`};
  box-shadow: 0px 2px 12px 2px #E8E1FC;
`;

const ScrollView = styled.div`
  ${tw`p-20 w-[100%] h-[100%]`}
  overflow-y: auto;
`;

const Item = styled.div`
  ${tw`w-[100%] h-45 flex items-center leading-45 border border-solid border-[#D8D8D8] rounded-25 px-17 cursor-pointer`};

  img {
    margin-right: 10px;
  }

  & + & {
    margin-top: 14px;
  }
  
  div {
    ${tw`truncate`}
  }

  ${props => props.isActive && css`
    ${tw`bg-[#AC7DFF] text-[#FFFFFF] font-semibold`};
  `}
`;

const ButtonGroup = styled.div`
  ${tw`absolute right-32 bottom-32`};
`;

export default MoveSelectPopup;