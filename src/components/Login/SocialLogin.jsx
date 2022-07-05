import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { runLoginSocial } from '../../redux/modules/userSlice';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (data) => {
      dispatch(runLoginSocial(data, navigate));
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