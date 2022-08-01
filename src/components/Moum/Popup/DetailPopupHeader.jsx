import styled, { css } from "styled-components";
import detailAdd from "assets/images/pages/moum/popup/detail-add-logo.png";
import tw from "twin.macro";

function DetailPopupHeader ({setPageNum, pageNum, menu}) {
  return (
    <div className="flex flex-col px-24 pt-24 border-b-2 border-solid border-[#F7F3FD] w-full h-130">
      <div className="flex items-center">
        <div className="w-44 h-44 rounded-[50%] bg-[#E8E1FC] flex justify-center items-center"><img src={detailAdd} alt="자세히 작성하기" /></div>
        <div className="ml-12 font-medium text-20">자세히 작성하기</div>
      </div>
      <div className="pt-20">
        <div className="flex gap-24">
          {menu.map((v, i) => {
            return <Item onClick={
              () => {
                setPageNum(i)
              }
            } key={i} isActive={i === pageNum}>{v}</Item>
          })}
        </div>
      </div>
    </div>
  );
}

const Item = styled.li`
  ${tw`
    w-95 h-40 flex justify-center items-center border-b-2 border-solid border-transparent relative text-[#777777] top-2 cursor-pointer
  `}

  ${props => props.isActive && css`
    ${tw`text-[#721EFC] border-2 border-solid border-[#BE9AFF]`};
  `}
`;


export default DetailPopupHeader;