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
import Join from 'components/Login/SignUp/Join';
import CreateProfile from 'components/Login/SignUp/CreateProfile';

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
  const runCreateProfilePage = () => {
    setNumberState(4)
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
            {numberState === 3 && <Join 
              runProfile={runCreateProfilePage}
            />}
            {numberState === 4 && <CreateProfile />}
          </Content>
        </ChangeContainer>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  
  > img {
    width: 100%;
    object-fit: cover;
  }
`;

const Box = styled.div`
  width: 1300px;
  height: 700px;
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const ChangeContainer = styled.div`
  width: 540px;
  height: 700px;
  background-color:#fff;
  border-radius: 24px;
  float:right;
`;

const Content = styled.div`
  width: 370px;
  height: 435px;
  margin-left:90px;
  margin-top:130px;
`;

export default NewLogin;