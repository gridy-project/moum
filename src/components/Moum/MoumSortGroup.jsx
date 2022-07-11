import styled from "styled-components";

import moumSortBottom from "./images/moum-sort-select-bottom.png";
import pieceSelect from "./images/piece-select.png";
import pieceSearch from "./images/piece-search.png";

function MoumOptionGroup () {
  return (
    <OptionGroup>
      <Sort>
        <div className="selected-sort">최신 조각순<img src={moumSortBottom} alt="bottom" /></div>
        <ul>
          <li>최신 조각순</li>
          <li>사용자 지정순</li>
        </ul>
      </Sort>
      <Search>
        <form>
          <input type="text" placeholder="나의 조각 검색하기" />
          <button><img src={pieceSearch} alt="검색" /></button>
        </form>
      </Search>
      <Option>
        <button className="piece-select-button">
          <img src={pieceSelect} alt="select" />
          <span>조각 선택 및 정리</span>
        </button>
      </Option>
    </OptionGroup>
  );

}

const OptionGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  align-items: center;
`;

const Sort = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  .selected-sort {
    padding: 16px;
    border: 1px solid #DFDFDF;
    background-color: #FFFFFF;
    border-radius: 50px;
    color: #303030;
    display: flex;
    align-items: center;

    img {
      margin-left: 18px;
    }
  }

  ul {
    display: none;
  }
`;

const Search = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  form {
    display: flex;
    align-items: center;
    width: 400px;
    height: 44px;
    border-radius: 22px;
    background-color: #E8E1FC;
    justify-content: space-between;
    input {
      width: 100%;
      height: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      color: #9E67FF;
      padding: 0 0 0 20px;

      &::placeholder {
        color: #9E67FF;
        font-size: 15px;
      }
    }

    button {
      padding: 0 20px 0 10px;
      height: 100%;
      border: none;
      background-color: transparent;
    }
  }
`;

const Option = styled.div`
  display: flex;
  flex-shrink: 0;
  button {
    border: 1px solid #BE9AFF;
    background-color: #FFFFFF;
    padding: 18px;
    font-size: 16px;
    color: #9152FF;
    display: flex;
    align-items: center;
    border-radius: 50px;
    cursor: pointer;
    span {
      margin-left: 10px;
    }
  }
`;

export default MoumOptionGroup;