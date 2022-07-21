// React
import React from 'react';
// Recoil
import { useRecoilState } from "recoil";
import { numberLoginState } from 'state/login';
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
  const [numberState, setNumberState] = useRecoilState(numberLoginState)

  const runLoginPage = () => {
    setNumberState(0)
  }
  const runPwdPage = () => {
    setNumberState(1)
  }
  const runIdPage = () => {
    setNumberState(2)
  }
  const runJoinPage = () => {
    setNumberState(3)
  }

  return (
    <Container>
      <Header selected={3}/>
      <img src={background} alt=""/>
      <Box>
        <ChangeContainer>
          <Content>
            {numberState === 0 && <StartLogin
              runlogin={runLoginPage}
              runpwd={runPwdPage}
              runid={runIdPage}
              runjoin={runJoinPage}
            />}
            {numberState === 1 && <ReissuePwd />}
            {numberState === 2 && <SearchId/>}
            {numberState === 3 && <Join />}
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