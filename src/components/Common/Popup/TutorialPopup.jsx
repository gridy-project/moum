import styled from "styled-components";
import tw from "twin.macro";

import guideOne from "assets/common/Tutorial/guide-1.jpg";
import guideTwo from "assets/common/Tutorial/guide-2.jpg";
import guideThree from "assets/common/Tutorial/guide-3.jpg";
import guideFour from "assets/common/Tutorial/guide-4.jpg";
import guideFive from "assets/common/Tutorial/guide-5.jpg";
import guideSix from "assets/common/Tutorial/guide-6.jpg";
import { useCookies } from "react-cookie";
import { useState } from "react";

import arrowLeft from "assets/common/Tutorial/arrow_left.png";
import arrowRight from "assets/common/Tutorial/arrow_right.png";

function TutorialPopup ({close}) {
  const [page, setPage] = useState(0);
  const setCookie = useCookies()[1];

  const weekClosePopup = () => {
    const expiredDate = new Date();
    expiredDate.setMonth(expiredDate.getMonth() + 1);
    setCookie("tutorial", true, {path: "/", expires: expiredDate});
    close();
  }

  return (
    <Popup>
      <Header>
        <em className="text-28">
          10초만에 살펴보는
          <span className="text-[#721EFC] block">편리한 moum 사용 가이드</span>
        </em>
        <button 
          onClick={weekClosePopup} 
          className="p-10 self-baseline mr-[-10px] mt-[-10px] hover:text-[#666] transition-colors duration-300"
        >건너뛰기</button>
      </Header>
      <Content>
        <ContentWrap page={page}>
          <ContentGroup>
            <Box>
              <img src={guideOne} alt="guide" />
              <div>
                <strong>나의 모음 만들기</strong>
                <p>나의 모음 페이지에서 모음 만들기를 클릭해서 만들어요</p>
              </div>
            </Box>
            <Box>
              <img src={guideTwo} alt="guide" />
              <div>
                <strong>나의 링크, 메모 조각 만들기 1</strong>
                <p>상단 입력창에 링크 혹은 메모를 적고 저장하기를 누르면 끝!</p>
              </div>
            </Box>
          </ContentGroup>
          <ContentGroup>
            <Box>
              <img src={guideThree} alt="guide" />
              <div>
                <strong>나의 링크, 메모 조각 만들기 2</strong>
                <p>나의 모음에서 조각 만들기를 클릭해서 만들 수도 있어요.</p>
              </div>
            </Box>
            <Box>
              <img src={guideFour} alt="guide" />
              <div>
                <strong>내 조각 자세히 작성하기</strong>
                <p>조각을 만든 후, 하단에 뜨는 버튼을 눌러 조각 설정이 가능해요</p>
              </div>
            </Box>
          </ContentGroup>
          <ContentGroup>
            <Box>
              <img src={guideFive} alt="guide" />
              <div>
                <strong>다른 사용자의 모음 스크랩하기</strong>
                <p>스크랩한 후, 나의 모음에서 스크랩한 모음을 볼 수 있어요</p>
              </div>
            </Box>
            <Box>
              <img src={guideSix} alt="guide" />
              <div>
                <strong>다른 계정 팔로우하고 찾아보기</strong>
                <p>다른 계정을 팔로우하면 전체 모음에서 바로 확인 가능해요</p>
              </div>
            </Box>
          </ContentGroup>
        </ContentWrap>
      </Content>
      <div className="h-325 mt-50"></div>
      <PageGroup>
        {[null, null, null].map((v, i) => {
          return <Page key={i} isActive={page === i} onClick={() => {setPage(i)}}></Page>  
        })}
      </PageGroup>
      <ButtonGroup>
        {page !== 0 && 
          <button onClick={() => {setPage(current => current - 1)}} className="flex items-center px-14 py-16 leading-[1] border-1 border-solid border-[#AC7DFF] bg-[#FFFFFF] rounded-50 mr-15 transition-colors hover:bg-[#EEEEEE]">
            <img src={arrowLeft} alt="" />
            <span className="px-6 text-[#9E67FF]">이전</span>
          </button>
        }
        {page !== 2 &&
          <button onClick={() => {setPage(current => current + 1)}} className="flex items-center px-14 py-16 leading-[1] border-1 border-solid border-[#AC7DFF] bg-[#9152FF] rounded-50 transition-colors hover:bg-[#7943d5]">
            <span className="px-6 text-[#FFFFFF]">다음</span>
            <img src={arrowRight} alt="" />
          </button>
        }
        {page === 2 &&
          <button onClick={weekClosePopup} className="flex items-center px-30 py-16 leading-[1] border-1 border-solid border-[#AC7DFF] bg-[#9152FF] rounded-50 transition-colors hover:bg-[#7943d5]">
            <span className="px-6 text-[#FFFFFF]">확인</span>
          </button>
        }
      </ButtonGroup>
    </Popup>
  )
}

const Popup = styled.div`
  ${tw`w-900 h-610 bg-[#F6F5FB] rounded-30 p-40`};
`;

const Header = styled.div`
  ${tw`flex justify-between w-full h-70`};
`;

const Content = styled.div`
  ${tw`absolute left-0 w-[100%] py-10 flex mt-40 overflow-hidden`};
`;

const ContentWrap = styled.div`
  ${tw`w-[300%] flex flex-nowrap shrink-0 relative`};
  transition: left .3s;
  left: ${props => props.page * -100 + "%"};
`;

const ContentGroup = styled.div`
  ${tw`flex justify-between w-[33.33%] px-40 shrink-0`};
`;

const Box = styled.div`
  ${tw`flex flex-col overflow-hidden w-390 h-325 rounded-20 bg-[#FFFFFF]`};
  box-shadow: 0px 0px 20px #E8E1FC;

  img {
    ${tw`object-cover w-full h-230 shrink-0`};
  }

  div {
    ${tw`flex flex-col items-center justify-center h-full`};

    strong {
      ${tw`font-[500] text-[#303030] text-20`};
    }

    p {
      ${tw`text-15 text-[#777777] mt-5`};
    }
  }
`;

const PageGroup = styled.div`
  ${tw`flex justify-center w-full gap-5 p-25`};
`;

const Page = styled.div`
  ${tw`w-8 h-8 bg-[#000000] rounded-[50%] bg-[#B7B7B7] cursor-pointer transition-colors duration-300`};
  ${props => props.isActive && tw`
    bg-[#721EFC]
  `};
`;  

const ButtonGroup = styled.div`
  ${tw`absolute bottom-0 right-0 flex pb-40 pr-40`};
`;

export default TutorialPopup;