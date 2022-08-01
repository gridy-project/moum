
import more from "assets/images/pages/moum/menu-white.png";
import iconPrivate from "assets/images/pages/moum/icon-private.png";
import iconPieceCount from "assets/images/pages/moum/icon-piece-count.png";
import iconScrapCount from "assets/images/pages/moum/icon-scrap-count.png";
import styled from "styled-components";
import tw from "twin.macro";

function MoumCardCommon ({moum, setButtonState, useAuthor}) {
  function comma(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

  return (
    <>
      <Content>
        <div className="card-header">
          {moum.status === "PRIVATE" && <img src={iconPrivate} alt="private" className="mt-10" />}
          {moum.name !== "무제" &&
            <div className="absolute right-25 top-50" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setButtonState((current) => !current);
            }}>
              <img src={more} alt="" />
            </div>
          }
        </div>
        <div className={`card-title ${moum.status === "PUBLIC" && `no-image`}`}>{moum.name}</div>
        {
          useAuthor && 
          <div className="flex items-center px-20 py-12">
            {
              moum.imgPath &&
              <div className="w-20 h-20 rounded-[50%] overflow-hidden box-content border-1 border-solid border-[#FFFFFF] font-medium mr-8">
                <img className="w-full h-full" src={moum.imgPath} alt={moum.name} />
              </div>
            }
            <span className="text-[#FFFFFF] text-14">{moum.nickname}</span>
          </div>
        }
      </Content>
      <div className="text-[#FFFFFF] absolute bottom-25 left-25">
        <div className="flex">
          <Icon><img src={iconPieceCount} alt="전체 조각 개수" /></Icon>
          <Text>전체 조각</Text>
          <Count>{comma(moum.boardCnt)}개</Count>
        </div>
        <div className="flex mt-15">
          <Icon><img src={iconScrapCount} alt="스크랩 횟수" /></Icon>
          <Text>스크랩</Text>
          <Count>{comma(moum.sharedCount)}회</Count>
        </div>
      </div>
    </>
  );
}

const Content = styled.div`
  .card-header {
    ${tw`flex justify-between w-full px-20 py-10 shrink-0`};
  };
  .card-title {
    ${tw`pt-20 px-20 text-20 leading-[1.2] text-[#FFFFFF]`};
  };
  .card-title.no-image {
    ${tw`px-20 pt-62`};
  };
`;

const Icon = styled.div`${tw`w-20`}`;
const Text = styled.div`${tw`ml-5 w-60 text-14`}`;
const Count = styled.div`${tw`text-14 ml-10 tracking-[1px]`}`;

export default MoumCardCommon;