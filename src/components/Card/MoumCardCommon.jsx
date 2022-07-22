
import more from "assets/images/pages/moum/menu-white.png";
import iconPrivate from "assets/images/pages/moum/icon-private.png";
import iconPieceCount from "assets/images/pages/moum/icon-piece-count.png";
import iconScrapCount from "assets/images/pages/moum/icon-scrap-count.png";
import styled from "styled-components";

function MoumCardCommon ({moum, setButtonState}) {
  function comma(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

  return (
    <>
      <Content>
        <div className="card-header">
          {moum.status === "PRIVATE" && <img src={iconPrivate} alt="private" />}
          <div className="menu" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setButtonState((current) => !current);
          }}><img src={more} alt="" /></div>
        </div>
        <div className={`card-title ${moum.status === "PUBLIC" && `no-image`}`}>{moum.name}</div>
      </Content>
      <Info>
        <div className="piece-count">
          <Icon><img src={iconPieceCount} alt="전체 조각 개수" /></Icon>
          <Text>전체 조각</Text>
          <Count>{comma(moum.boardCnt)}개</Count>
        </div>
        <div className="scrap-count">
          <Icon><img src={iconScrapCount} alt="스크랩 횟수" /></Icon>
          <Text>스크랩</Text>
          <Count>{comma(moum.sharedCount)}회</Count>
        </div>
      </Info>
    </>
  );
}

const Content = styled.div`
  .menu {
    position: absolute;
    right: 25px;
    top: 50px;
  }

  .card-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    flex-shrink: 0;

    > img {
      margin-top: 10px;
    }

    .category {
      width: 70px;
      height: 25px;
      font-size: 12px;
      background-color: #D9D9D9;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12.ㄴ5px;
    }
  }

  .card-title {
    padding: 20px 20px 0;
    font-size: 20px;
    line-height: 1.2;
    color: #FFFFFF;
  }

  .card-title.no-image {
    padding: 62px 20px 0;
  }

  .card-description {
    margin-top: 15px;
    margin-bottom: 20px;
    padding: 0 20px;
    line-height: 1.2;
    color: #FFFFFF;
  }

  .card-image {
    width: 100%;
    height: 100%;
    background-color: #ABABAB;
    border-radius: 0 0 15px 15px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

`;

const Info = styled.div`
  color: #FFFFFF;
  position: absolute;
  bottom: 25px;
  left: 25px;

  .piece-count, .scrap-count {
    display: flex;
  }

  .scrap-count {
    margin-top: 10px;
  }
`;

const Icon = styled.div`
  width: 20px;
`;

const Text = styled.div`
  width: 60px;
  font-size: 14px;
  margin-left: 5px;
`;

const Count = styled.div`
  font-size: 14px;
  margin-left: 10px;
  letter-spacing: 1px;
`;

export default MoumCardCommon;