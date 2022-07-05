import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { JWT_REFRESH_TIME, refresh, signInWithGoogle } from "../../api/auth";
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
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (data) => {
      try {
        const {accessToken, refreshToken} = await signInWithGoogle(data.code);
        setToken(accessToken, refreshToken);
        navigate("/moum");
        setTimeout(refresh, JWT_REFRESH_TIME); // 59분마다 재발급
      } catch (err) {
        console.log(err);
      }
    },
    onError: (data) => { console.log('Login Failed' + data) }
  });

  return (
    <GoogleLogin onClick={() => googleLogin()}>구글 계정으로 로그인</GoogleLogin>
  );
}

const GoogleLogin = styled.div`
`;