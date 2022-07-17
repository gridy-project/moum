import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from "styled-components";
import { executeSignInWithGoogleAxios } from 'utils/api/auth';
import { isLogin } from '../../state/user';
import { setToken } from 'shared/localStorage';

import google from 'assets/images/pages/login/google.png';

function SocialLogin ({loginSuccess}) {
  const clientId = process.env.REACT_APP_GOOGLE_SOCIAL_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <SocialLoginButton loginSuccess={loginSuccess}/>
    </GoogleOAuthProvider>
  );
}

export default SocialLogin;

function SocialLoginButton () {
  const setLogin = useSetRecoilState(isLogin);
  const navigate = useNavigate();

  const {mutate: login} = useMutation(async (data) => {
    const response = await executeSignInWithGoogleAxios(data.code);
    return response.data;
  }, {
    onSuccess: data => {
      alert("로그인 성공");
      setToken(data.accessToken, data.refreshToken);
      setLogin(true);
      navigate("/");
    },
    onError: err => {
      alert("로그인 실패");
      setLogin(false);
    }
  });

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (data) => {
      login(data);
    },
    onError: (data) => {
      alert(data);
    }
  });

  return (
    <GoogleLogin onClick={() => googleLogin()}><img src={google} alt="google"></img>구글 계정으로 로그인</GoogleLogin>
  );
}

const GoogleLogin = styled.div`
  margin-top: 60px;
  width: 100%;
  height: 60px;
  background-color: #909090;
  color: #FFFFFF;
  font-size: 22px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background-color .3s;

  &:hover {
    background-color: #666666;
  }

  img {
    position: absolute;
    left: 25px;
  }
`;