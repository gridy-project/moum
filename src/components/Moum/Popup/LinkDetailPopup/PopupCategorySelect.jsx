import styled from "styled-components";
import useCustomQuery from "hooks/useCustomQuery";
import { getMoumMineAllAxios } from "utils/api/moum";
import { getSelectMoumCategory, typeCategory } from "shared/type";
import PopupButtonGroup from "./PopupButtonGroup";
import PopupSelectBoxFolder from "../CommonDetailPopup/PopupSelectBoxFolder";
import PopupSelectBoxCategory from "../CommonDetailPopup/PopupSelectBoxCategory";
import { instance } from "shared/axios";


function PopupCategorySelect ({getter, setter, next, close, initFolderId}) {
  const { isSuccess, data: query } = useCustomQuery(["mine/moums/all"], () => instance.get("/folders"));

  return (
    <Box>
      <form>
        <div className="name">저장할 모음 선택하기</div>
        {isSuccess && 
        <PopupSelectBoxFolder
          items={query.data}
          setter={setter}
          getter={getter}
          initFolderId={initFolderId}
        />}
        <div className="name">카테고리 선택</div>
        <PopupSelectBoxCategory
          items={typeCategory.map((v) => ({...getSelectMoumCategory(v), name: v}))}
          setter={setter}
          getter={getter}
        />
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

export default PopupCategorySelect;