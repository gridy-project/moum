import UserStatusView from "components/User/UserStatusView";
import Container from "components/Common/Container";
import Header from "components/Common/Header";
import useCustomQuery from "hooks/useCustomQuery";
import { useParams } from "react-router-dom";
import { instance } from "shared/axios";
import styled from "styled-components";
import ContentHeaderView from "components/User/ContentHeaderView";
import SelectFloat from "components/User/Float/SelectFloat";
import UserBoard from "components/User/UserBoard";

function User () {
  const {userId} = useParams(); 

  const {isSuccess, data: user} = useCustomQuery(["user", userId],
    () => instance.get(`/user/profile/${userId}`)
  );

  return (
    <Container>
      <Header selected={2} />
      <Content>
        {isSuccess && 
          <>
            <UserStatusView user={user.data} isOther />
            <ContentHeaderView />
            <UserBoard />
            <SelectFloat />
          </>
        }
      </Content>
    </Container>
  )
}

const Content = styled.div`
  width: 1200px;
  padding-top: 150px;
  padding-bottom: 70px;
`;

export default User;