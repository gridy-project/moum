import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from "styled-components";
import { executeSignInWithGoogleAxios } from 'utils/api/auth';
import { isLogin } from 'state/common/user';
import { setToken } from 'shared/localStorage';

import googlelogo from "assets/images/pages/login/google_logo.png";

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
    <GoogleLogin 
    onClick={() => googleLogin()}>
      <img src={googlelogo} alt="google">
      </img>
      <p>
      구글 계정으로 시작하기
      </p>
    </GoogleLogin>
  );
}

const GoogleLogin = styled.div`
  width: 360px;
  height: 44px;
  background: #F8F8F8;
  border: 1px solid #E9E9E9;
  border-radius: 50px;
  display:flex;
  justify-content:center;
  align-items:center;
  position: relative;
  cursor: pointer;
  img {
    width: 16px;
    height: 16px;
  }
  p {
    margin-left:10px;
  }
  &:hover {
    background: #E9E9E9;
  }
`;