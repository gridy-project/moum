import Header from "components/Common/Header";
import styled from "styled-components";
import MoumTitleContent from "./Header/MoumTitleContent";
import MoumTitleCreateForm from "./Header/MoumTitleCreateForm";

import tw from "twin.macro";

import moumTopImage from "assets/images/pages/moum/moum-top.jpg";

function MoumHeader () {
  return (
    <Title>
      <Header selected={1} />
      <MoumTitleContent />
      <MoumTitleCreateForm />
    </Title>
  );
}

const Title = styled.div`
  ${tw`
    pt-[120px] w-full h-[480px] bg-no-repeat bg-cover rounded-[0 0 60px 60px] flex flex-col items-center justify-center relative
  `}
  background-image: url(${moumTopImage});
  background-position-y: 70px;
`;

export default MoumHeader;