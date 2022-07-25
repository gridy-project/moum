import iconMove from "assets/images/pages/moum/move_icon.png";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { atomFloatItemActive, atomFloatStatus, atomSelectedItems } from "state/user";
import { useParams } from "react-router-dom";
import { globalPopup } from "state/common/popup";
import MoveSelectPopup from "components/Common/Popup/MoveSelectPopup";
import useCustomQuery from "hooks/useCustomQuery";
import { instance } from "shared/axios";
import useCustomMutate from "hooks/useCustomMutate";

function SelectFloat () {
  const {folderId: viewFolderId = 0} = useParams();

  const floatStatus = useRecoilValue(atomFloatStatus);
  const floatItemActive = useRecoilValue(atomFloatItemActive);
  const selectedItems = useRecoilValue(atomSelectedItems);

  const setPopup = useSetRecoilState(globalPopup);
  const resetPopup = useResetRecoilState(globalPopup);

  const moumsQuery = useCustomQuery(
    "mine/moums/all", () => instance.post("/folders/0/all", [{category:"전체"}]));

  const {mutateAsync: savePieces} = useCustomMutate(({moumId, data}) => {
    return instance.post(`/myshare/boards/${moumId}`, data);
  });

  const move = () => {
    if (floatItemActive) {
      setPopup({
        state: true,
        component: (
          <MoveSelectPopup
            query={moumsQuery}
            close={resetPopup}
            confirm={async (moum) => {
              const {result} = await savePieces({moumId: moum.id, data:selectedItems.map(v => ({id: v}))});
              if (result) {
                alert("저장 완료");
              }
            }}
          />
        )
      });
    }
  }

  return (
    <FloatingBox isActive={floatStatus}>
      <FloatItem isActive={floatItemActive} onClick={move}>
        <img src={iconMove} alt="down" />
      </FloatItem>
    </FloatingBox>
  );
}


const FloatingBox = styled.div`
  position: fixed;
  bottom: -100px;
  display: flex;
  gap: 16px;
  transition: bottom .3s;
  left: 50%;
  transform: translateX(-50%);
  ${props => props.isActive && css`
    bottom: 50px;
  `}
`;

const FloatItem = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E0D6FF;
  box-shadow: 0px 0px 20px 1px #E8E1FC;
  transition: background-color .3s, box-shadow .3s;
  ${props => props.isActive && css`
    background-color: #9E67FF;
    box-shadow: 0px 0px 20px 1px #D2BAFF;
    cursor: pointer;
  `}
`;


export default SelectFloat;