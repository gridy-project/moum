// React
import React, { useState } from 'react';
// css
import styled from "styled-components";
import background from "../assets/images/pages/login/background.png"
// component
import Header from "components/Common/Header";
import StartLogin from 'components/Login/StartLogin';
import SearchId from 'components/Login/Id/SearchId';
import ReissuePwd from 'components/Login/ReissuePwd';
import Join from 'components/Login/Join';

const NewLogin = () => {
  const [state, setState] = useState(0);

  const runLoginPage = () => {
    setState(0)
  }
  const runPwdPage = () => {
    setState(1)
  }
  const runIdPage = () => {
    setState(2)
  }
  const runJoinPage = () => {
    setState(3)
  }

  return (
    <Container>
      <Header selected={3}/>
      <img src={background} alt=""/>
      <Box>
        <ChangeContainer>
          <Content>
            {state === 0 && <StartLogin
              runlogin={runLoginPage}
              runpwd={runPwdPage}
              runid={runIdPage}
              runjoin={runJoinPage}
            />}
            {state === 1 && <ReissuePwd />}
            {state === 2 && <SearchId/>}
            {state === 3 && <Join />}
          </Content>
        </ChangeContainer>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  position:relative;
`;

const Box = styled.div`
  width: 1453px;
  height: 702px;
  position:absolute;
  top:219px;
  right:310px;
`;

const ChangeContainer = styled.div`
  width: 540px;
  height: 702px;
  background-color:#fff;
  border-radius: 24px;
  float:right;
`;
const Content = styled.div`
  width: 369px;
  height: 435px;
  margin-left:90px;
  margin-top:130px;
`;

export default NewLogin;