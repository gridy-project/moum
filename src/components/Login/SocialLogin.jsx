import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import styled from "styled-components";
import { loginGoogle } from '../../shared/api';

function SocialLogin ({loginSuccess}) {
  const clientId = process.env.REACT_APP_GOOGLE_SOCIAL_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <SocialLoginButton loginSuccess={loginSuccess}/>
    </GoogleOAuthProvider>
  );
}

export default SocialLogin;

function SocialLoginButton ({loginSuccess}) {
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (data) => {
      try {
        const response = await loginGoogle(data.code);
        loginSuccess(response);
        console.log("로그인 성공");
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