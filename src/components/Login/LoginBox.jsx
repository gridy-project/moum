import React from 'react';
import styled from 'styled-components';

const LoginBox = () => {

  return (
     <Content>
            <input placeholder='아이디'/>
            <input placeholder='비밀번호'/>
            <button>로그인</button>
            <TabBox>
              <Tab>비밀번호 찾기</Tab>
              |
              <Tab>아이디 찾기</Tab>
              | 
              <Tab>회원가입</Tab>
            </TabBox>
           </Content>
  );
};

const Content = styled.div`
  width: 369px;
  height: 435px;
  margin-left:90px;
  margin-top:130px;
`;

const TabBox = styled.div`
  display:flex;
  justify-content:space-around;
`;

const Tab = styled.a`

`
export default LoginBox;