// React
import React, { useEffect } from 'react';
// Recoil
import { useRecoilState } from "recoil";
import { numberLoginState } from 'state/login';
// css
import tw from "twin.macro";
import styled from "styled-components";
import background from "../assets/images/pages/login/background.png"
// component
import Header from "components/Common/Header";
import StartLogin from 'components/Login/StartLogin';
import SearchId from 'components/Login/Id/SearchId';
import ReissuePwd from 'components/Login/ReissuePwd';
import Join from 'components/Login/SignUp/Join';
import CreateProfile from 'components/Login/SignUp/CreateProfile';
import { useLocation } from 'react-router-dom';

const Auth = () => {
  const match = useLocation();

  const [numberState, setNumberState] = useRecoilState(numberLoginState)

  useEffect(() => {
    if (match.pathname === "/login") {
      setNumberState(0);
    } else if (match.pathname === "/register") {
      setNumberState(3);
    }
  }, [match, setNumberState]);

  const runLoginPage = () => {
    setNumberState(0)
  }
  const runPwdPage = () => {
    setNumberState(1)
  }
  const runIdPage = () => {
    setNumberState(2)
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
  ${tw`
    absolute w-[100%] h-[100vh] overflow-hidden
  `}
  > img {
    ${tw`
      w-[100%] h-[100vh] object-cover
    `}
  }
`;

const Box = styled.div`
  transform: translateX(-50%) translateY(-50%);
  @media screen and (max-width: 1600px) {
    height: 660px;
  }
  ${tw`
    w-[1300px] h-[700px] absolute top-[50%] left-[50%]
  `}
`;

const ChangeContainer = styled.div`
  background-color:#fff;
  @media screen and (max-width: 1600px) {
    width: 500px;
  }
  ${tw`
    w-[540px] h-[100%] rounded-[24px] float-right flex justify-center items-center
  `}
`;

const Content = styled.div`
  ${tw`
    w-[370px]
  `}
`;

export default Auth;