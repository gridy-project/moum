// module
import styled from "styled-components";

// image
import moum from "assets/images/pages/moum/moum-background.png";
import { useSetRecoilState } from "recoil";
import { pageMoumSelectedFolderId } from "state/moum";
import OptionMenu from "components/Common/OptionMenu";

import MoumCardCommon from "./MoumCardCommon";


function MoumCard({moum, options, optionState, setOptionState}) {
  const setSelectedFolderId = useSetRecoilState(pageMoumSelectedFolderId);
  
  const runFolder = (e) => {
    setSelectedFolderId(moum.id);
  }

  return (
    <Container onClick={runFolder}>
      <MoumCardCommon 
        setButtonState={setOptionState}
        moum={moum}
      />
      <Option>
        <OptionMenu
          options={options}
          isActive={optionState}
        />
      </Option>
    </Container>
  );
}

const Container = styled.div`
  width: 282px;
  height: 314px;
  background-image: url(${moum});
  background-size: 100%;
  background-repeat: no-repeat;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  cursor: pointer;
`;


const Option = styled.div`
  position: absolute;
  top: 90px;
  right: -120px;
  z-index: 1;
`;

export default MoumCard;