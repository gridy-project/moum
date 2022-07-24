import PopupTopView from "components/Common/PopupTopView";
import styled, { css } from "styled-components";

import moveFolder from "assets/common/Popup/move-folder.svg";
import CancelButton from "components/Common/CancelButton";
import ConfirmButton from "components/Common/ConfirmButton";
import { useState } from "react";

import folderNormalSvg from "assets/common/Popup/folder-normal.svg";
import folderActiveSvg from "assets/common/Popup/folder-active.svg";

function MoveSelectPopup ({query, close, confirm, title}) {
  console.log(query);
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
              {v.name}
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
  width: 435px;
  height: 510px;
  background-color: #FFFFFF;
  border-radius: 30px;
  padding: 32px;
  position: relative;
`;

const ShadowBox = styled.div`
  margin-top: 32px;
  width: 370px;
  height: 290px;
  box-shadow: 0px 2px 12px 2px #E8E1FC;
  border-radius: 12px;
`;

const ScrollView = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const Item = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  line-height: 45px;
  border: 1px solid #D8D8D8;
  border-radius: 25px;
  padding: 0 17px;
  cursor: pointer;

  img {
    margin-right: 10px;
  }

  & + & {
    margin-top: 14px;
  }

  ${props => props.isActive && css`
    background-color: #AC7DFF;
    color: #FFFFFF;
    font-weight: 600;
  `}
`;

const ButtonGroup = styled.div`
  position: absolute;
  right: 32px;
  bottom: 32px;
`;

export default MoveSelectPopup;