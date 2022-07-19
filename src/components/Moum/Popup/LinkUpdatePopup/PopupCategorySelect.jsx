import styled from "styled-components";
import useCustomQuery from "hooks/useCustomQuery";
import { getMoumMineAllAxios } from "utils/api/moum";
import folderIcon from "assets/images/pages/moum/popup/folder-icon.png";
import folderIconGrey from "assets/images/pages/moum/popup/folder-icon-grey.png";
import { getSelectMoumCategory, typeCategory } from "shared/type";
import PopupSelectBox from "./PopupSelectBox";
import PopupButtonGroup from "./PopupButtonGroup";


function PopupCategorySelect ({next, close}) {
  const { isSuccess, data: query } = useCustomQuery("mine/moums/all", async () => await getMoumMineAllAxios());

  const onSubmit = (e) => {
    e.preventDefault();
    next();
  }

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <div className="name">저장할 모음 선택하기</div>
        {isSuccess && 
        <PopupSelectBox 
          width={360} 
          height={48} 
          items={query.data} 
          useIcon
          useSingleIcon
          useSingleIconImage = {folderIcon}
          useSingleIconImageNotSelected = {folderIconGrey}
          zIndex={1}
        />}
        <div className="name">카테고리 선택</div>
        <PopupSelectBox 
          width={200} 
          height={48} 
          items={typeCategory.map((v) => ({...getSelectMoumCategory(v), name: v}))} 
          useIcon
          useItemsIcon
          zIndex={0}
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