import useCustomQuery from "hooks/useCustomQuery";
import { useParams } from "react-router-dom";
import { getSelectMoumCategory, typeCategory } from "shared/type";
import styled, { css } from "styled-components";
import { getMoumMineAllAxios } from "utils/api/moum";
import PopupSelectBoxCategory from "../CommonDetailPopup/PopupSelectBoxCategory";
import PopupSelectBoxFolder from "../CommonDetailPopup/PopupSelectBoxFolder";
import PopupButtonGroup from "../LinkDetailPopup/PopupButtonGroup";

function MemoCategorySelect ({getter, setter, close, next}) {
  const { isSuccess, data: query } = useCustomQuery("mine/moums/all", async () => await getMoumMineAllAxios());

  return (
    <Box>
      <form>
        <div className="name">저장할 모음 선택하기</div>
        {isSuccess && 
        <PopupSelectBoxFolder
          items={query.data}
          setter={setter}
          getter={getter}
        />}
        <div className="name">카테고리 선택</div>
        <PopupSelectBoxCategory
          items={typeCategory.map((v) => ({...getSelectMoumCategory(v), name: v}))}
          setter={setter}
          getter={getter}
        />
        <Share isShared={getter.share}>
          조각 공개 설정
          <div className="switch" onClick={() => setter(current => ({...current, share: !current.share}))}>
            <div className="switch-ball"></div>
          </div>
        </Share>
        <PopupButtonGroup close={close} next={next} />
      </form>
    </Box>
  )
}

const Box = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 130px);
  flex-direction: column;
  padding: 24px;
  form {
    width: 100%;
    height: 100%;
    position: relative;

    .name {
      margin-top: 12px;
      color: #303030;
      margin-bottom: 17px;
    }

    .name:nth-of-type(3) {
      margin-top: 36px;
    }
  }
`;


const Share = styled.div`
  margin-top: 36px;
  color: #303030;
  display: flex;
  align-items: center;
  z-index: 0;

  .switch {
    margin-left: 12px;
    width: 52px;
    height: 26px;
    background-color: #E0E0E0;
    border-radius: 13px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    transition: background-color .3s;

    .switch-ball {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #FFFFFF;
      position: absolute;
      left: calc(3px);
      transition: left .3s;
    }

    ${props => props.isShared && css`
      background-color: #9E67FF;
      .switch-ball {
        left: calc(100% - 23px);
      }
    `}
  }
`;


export default MemoCategorySelect;