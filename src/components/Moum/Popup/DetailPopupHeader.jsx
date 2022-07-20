import styled, { css } from "styled-components";
import detailAdd from "assets/images/pages/moum/popup/detail-add-logo.png";

function DetailPopupHeader ({pageNum, menu}) {
  return (
    <PopHeaderView>
      <PopHeaderTitle>
        <div className="image-circle"><img src={detailAdd} alt="자세히 작성하기" /></div>
        <div className="title">자세히 작성하기</div>
      </PopHeaderTitle>
      <PopHeaderNavigation>
        <NavigationList>
          {menu.map((v, i) => {
            return <NavigationItem key={i} isActive={i === pageNum}>{v}</NavigationItem>
          })}
        </NavigationList>
      </PopHeaderNavigation>
    </PopHeaderView>
  );
}


const PopHeaderView = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 24px 0 24px;
  border-bottom: 2px solid #F7F3FD;
  width: 100%;
  height: 130px;
`;

const PopHeaderTitle = styled.div`
  display: flex;
  align-items: center;

  .image-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #E8E1FC;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    margin-left: 12px;
    font-size: 20px;
    font-weight: 500;
  }
`;

const PopHeaderNavigation = styled.div`
  padding-top: 20px;
`;

const NavigationList = styled.ul`
  display: flex;
  gap: 24px;
`;

const NavigationItem = styled.li`
  width: 95px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid transparent;
  position: relative;
  color: #777777;
  top: 2px;

  ${props => props.isActive && css`
    color: #721EFC;
    border-bottom: 2px solid #BE9AFF;
  `}
`;


export default DetailPopupHeader;