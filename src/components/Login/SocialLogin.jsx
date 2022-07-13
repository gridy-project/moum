import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from "styled-components";
import { instance } from '../../api/axios';
import { isLogin } from '../../atoms/user';
import { setToken } from '../../shared/localStorage';

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
    const response = await instance.post(`/user/social`, {}, { headers: { Code: data.code } });
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
    <GoogleLogin onClick={() => googleLogin()}>구글 계정으로 로그인</GoogleLogin>
  );
}

const GoogleLogin = styled.div`
`;