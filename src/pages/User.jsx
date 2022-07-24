import UserStatusView from "components/User/UserStatusView";
import Container from "components/Common/Container";
import Header from "components/Common/Header";
import useCustomQuery from "hooks/useCustomQuery";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "shared/axios";
import styled from "styled-components";
import ContentHeaderView from "components/User/ContentHeaderView";
import ContentItemsView from "components/User/ContentItemsView";
import SelectFloat from "components/User/Float/SelectFloat";

function User () {
  const {userId} = useParams(); 

  const userQuery = useCustomQuery(["user", userId],
    () => instance.get(`/user/profile/${userId}`)
  );

  const [user, setUser] = useState({
    result: false,
    data: {}
  });

  useEffect(() => {
    if (userQuery.isSuccess) {
      const {data, result} = userQuery.data;
      if (result) {
        setUser({
          result,
          data
        })
      }
    }
  }, [userQuery.isSuccess, userQuery.data]);

  return (
    <Container>
      <Header selected={2} />
      <Content>
        {user.result && 
        <>
          <UserStatusView user={user.data} isOther />
          <ContentHeaderView />
          <ContentItemsView />
          <SelectFloat />
        </>
        }
      </Content>
    </Container>
  )
}

const Content = styled.div`
  width: 1200px;
  padding-bottom: 70px;
`;

export default User;