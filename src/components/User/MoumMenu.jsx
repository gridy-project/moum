import useCustomQuery from "hooks/useCustomQuery";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "shared/axios";
import styled from "styled-components";
import MoumMenuItem from "./Item/MoumMenuItem";

function MoumMenu () {
  const navigate = useNavigate();

  const {userId: viewUserId, folderId: viewFolderId} = useParams();

  const {isSuccess, data: moumsQuery} = useCustomQuery(
    ["moums", viewUserId], 
    () => {
      let searchString = `/folders/`; // API LINK
      searchString += `${viewUserId}/`; // User ID
      searchString += `all`;
      searchString += "?page=0";
      return instance.post(searchString, [{ category: "전체" }]);
  });

  const onClick = (selectFolderId) => {
    navigate(`/user/${viewUserId}/${selectFolderId}`);
  }

  return (
    <List>
      <ul>
        {
          isSuccess &&
          moumsQuery?.data?.map((v, i) => {
            return (
              <MoumMenuItem 
              key={v.id} 
              isActive={v.id === parseInt(viewFolderId)} 
              onClick={() => onClick(v.id)}>
                {v.name}
              </MoumMenuItem>
            )
          })
        }
      </ul>
    </List>
  )
}

const List = styled.div`
  padding: 25px 0;
  width: 100%;
  ul {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    width: 100%;
  }
`;

export default MoumMenu;