import styled from "styled-components";
import noImage from "../../public/img/Image.png";
import more from "../../public/img/Menu.png";

function LinkPieceCard({piece}) {
  return (
    <Box>
      <div className="card-image">
        <img src={piece.imgPath || noImage} alt="noImage" />
        <div className="menu"><img src={more} alt="" /></div>
      </div>
      <div className="card-content">
        <div className="card-header">
          <div className="icon-box"></div>
          <div className="category">{piece.category}</div>
        </div>
        <div className="card-title">{piece.title}</div>
        <div className="card-description">{piece.explanation}</div>
      </div>
    </Box>
  );
}

const Box = styled.div`
  width: 280px;
  height: 310px;
  background-color: #FFFFFF;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;


  .card-image {
    width: 100%;
    height: 100%;
    background-color: #D9D9D9;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .menu {
      position: absolute;
      right: 20px;
      top: 20px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-content {

  }

  .card-header {
    width: 100%;
    display: flex;
    padding: 25px 15px 20px;
    flex-shrink: 0;

    .icon-box {
      width: 20px;
      height: 20px;
      background-color: #D9D9D9;
      border-radius: 5px;
    }

    .category {
      height: 25px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12.5px;
      margin-left: 5px;
    }
  }

  .card-title {
    padding: 0 20px;
    font-size: 18px;
    line-height: 1.2;
  }

  .card-description {
    margin-top: 15px;
    margin-bottom: 20px;
    padding: 0 20px;
    line-height: 1.2;
    color: #595959;
  }
`;

export default LinkPieceCard;