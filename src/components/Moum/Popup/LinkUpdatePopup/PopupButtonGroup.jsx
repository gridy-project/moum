import styled from "styled-components";
import arrowRight from "assets/images/pages/moum/popup/arrow_right.png";

function PopupButtonGroup ({close, next, finish}) {
  return (
    <Group className="box-btn-group">
      <button className="btn-cancel" onClick={(e) => {
        e.preventDefault();
        close();
      }}>취소</button>
      {
        finish ? 
        <button className="btn-next" onClick={(e) => {
          e.preventDefault();
          finish();
        }}>저장하기</button>
        :
        <button className="btn-next" onClick={(e) => {
          e.preventDefault();
          next();
        }}>다음<img src={arrowRight} alt="right" /></button>
      }
    </Group>
  )
}

const Group = styled.div`
  right: 0;
  width: 170px;
  height: 48px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  z-index: 0;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 18px;
    border: none;
    border-radius: 24px;
    color: #FFFFFF;
    flex-shrink: 0;
    cursor: pointer;
  }

  .btn-cancel {
    height: 100%;
    background-color: #F7F3FD;
    color: #9E67FF;
  }

  .btn-next {
    height: 100%;
    background-color: #9152FF;
    margin-left: 12px;
    box-shadow: 0px 2px 12px 1px #D2BAFF;
    img {
      margin-left: 4px;
    }
  }
`;

export default PopupButtonGroup;