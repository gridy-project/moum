import PieceCategory from "components/Moum/PieceCategory";
import PieceScrollVertical from "components/Moum/PieceScrollVertical";
import styled from "styled-components";
import privateLock from "assets/svg/card/lock.svg";
import more from "assets/images/pages/moum/menu-black.png";
import tw from "twin.macro";

function PieceMemoCardCommon ({piece, setButtonState}) {
  return (
    <>
      <CardHeader>
        <Category>
          {piece.status === "PRIVATE" && <PrivateIcon><img src={privateLock} alt="" /></PrivateIcon>}
          <PieceCategory category={piece.category}/>
        </Category>
        <More className="menu" onClick={
            (e) => {
              e.preventDefault();
              setButtonState(current => !current);
            }
          }><img src={more} alt="more" /></More>
      </CardHeader>
      <CardContent>
        <PieceScrollVertical>
          <div className="title">{piece.title}</div>
          <div className="content">{piece.content}</div>
        </PieceScrollVertical>
      </CardContent>
    </>
  )
}


const CardHeader = styled.div`
  ${tw`h-50 shrink-0 border-b-1 border-solid border-[#E8E1FC] flex justify-between`};
`;

const Category = styled.div`
  ${tw`flex items-center px-16`};
`;

const PrivateIcon = styled.div`
  ${tw`w-28 h-28 pb-2 rounded-[50%] flex justify-center items-center bg-[#9152FF] mr-8`};
`;

const More = styled.div`
  ${tw`m-12 w-28 h-28 bg-[#FFFFFF] rounded-8 flex justify-center items-center z-1 cursor-pointer`};

  img {
    ${tw`object-cover w-18 h-18`};
  }
  
  transition: background .3s;
  &:hover {
    ${tw`bg-[#DDDDDD]`}
  }
`;

const CardContent = styled.div`
  ${tw`w-full h-full break-all`}
`;

export default PieceMemoCardCommon;