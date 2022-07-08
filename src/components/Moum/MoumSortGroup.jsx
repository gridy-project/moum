import styled from "styled-components";

function MoumSortGroup () {
  return (
    <SortGroup>
      <select>
        <option>최신 조각순</option>
        <option>사용자 지정순</option>
      </select>
      <form>
        <input type="text" />
        <button>검색</button>
      </form>
    </SortGroup>
  );

}

const SortGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default MoumSortGroup;