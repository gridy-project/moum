import Header from "components/Common/Header";
import styled from "styled-components";
import MoumTitleCreateForm from "./Header/MoumTitleCreateForm";

import tw from "twin.macro";

import moumTopImage from "assets/images/pages/moum/moum-top.jpg";

function MoumHeader () {
  return (
    <Title>
      <Header selected={1} />
      <div className="flex flex-col items-center w-full">
        <em className="text-36 text-[#FFFFFF] font-semibold">
          간편한 정보 아카이빙, moum
        </em>
        <p className="pt-20 text-20 text-[#FFFFFF] font-normal">
          링크, 글, 이미지 조각을 모아두고 쉽게 찾을 수 있어요.
        </p>
      </div>
      <MoumTitleCreateForm />
    </Title>
  );
}

const Title = styled.div`
  ${tw`
  pt-40
  w-full h-[480px] bg-no-repeat bg-cover rounded-[0 0 60px 60px] flex flex-col items-center justify-center relative
  `}
  background-image: url(${moumTopImage});
`;

export default MoumHeader;