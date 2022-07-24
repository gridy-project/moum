import styled from "styled-components";
import SearchMoumCard from "components/Search/Card/SearchMoumCard";
import useCustomQuery from "hooks/useCustomQuery";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { atomSearch, atomSelectedCategories, atomSortState } from "state/user";
import { instance } from "shared/axios";

function MoumList () {
  const {userId} = useParams();
  const [search] = useRecoilState(atomSearch);
  const [sortState] = useRecoilState(atomSortState);
  const [categories] = useRecoilState(atomSelectedCategories)

  // Search Folder
  const {isSuccess, data: moumsQuery} = useCustomQuery(
    ["moums", userId, search, sortState], 
    () => {
      let searchString = `/folders/`; // API LINK
      searchString += `${userId}/`; // User ID
      if (search === "") {
        searchString += `all`;
      } else {
        searchString += `${search}`; 
      }

      searchString += "?page=0";

      if (sortState === "CUSTOM") {
        searchString += "&sort=folderOrder,asc";
      }

      if (categories.length === 0) {
        return instance.post(searchString, [{ category: "전체" }]);
      } else {
        return instance.post(searchString, categories)
      }
    });

  return (
    <List>
      <div className="list">
        {isSuccess && moumsQuery.data.map((item, i) => (
          <SearchMoumCard key={item.id} moum={item} />
        ))}
      </div>
    </List>
  )
}

const List = styled.div`
  padding-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .list {
    width: 100%;
  }

  .list > div {
    width: calc(92% / 4);
    float: left;
  }

  .list > div + div {
    margin-left: calc(8% / 3);
  }

  .list > div:nth-of-type(4n + 1) {
    margin-left: 0;
  }

  .list > div:nth-of-type(n + 5) {
    margin-top: calc(8% / 3);
  }

  .no-piece {
    width: 100%;
    height: 500px;
    background-color: #EEEEEE;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #999999;
    border-radius: 10px;
  }
`;

export default MoumList;