// module
import styled from "styled-components";

// image
import moum from "assets/images/pages/moum/moum-background.png";
import OptionMenu from "components/Common/OptionMenu";

import MoumCardCommon from "./MoumCardCommon";
import tw from "twin.macro";


function MoumCard({moum, options, optionState, setOptionState, onClick, useAuthor}) {
  return (
    <Container onClick={onClick}>
      <div className="z-1">
        <MoumCardCommon 
          setButtonState={setOptionState}
          moum={moum}
          useAuthor={useAuthor}
        />
      </div>
      <div className="absolute top-90 right-[-120px] z-2">
        <OptionMenu
          options={options}
          isActive={optionState}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  ${tw`relative flex flex-col justify-start border-0 cursor-pointer w-282 h-314 rounded-15`};
  &::before {
    content: '';
    background-image: url(${moum});
    background-size: 100%;
    background-repeat: no-repeat;
    transition: opacity .3s;
    ${tw`absolute block w-full h-full`};
  }

  &:hover::before {
    opacity: 0.9;
  }
`;

export default MoumCard;