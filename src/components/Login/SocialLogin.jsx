import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { instance } from '../../api/axios';
import { setLoginStatus } from '../../redux/modules/userSlice';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {mutate: login} = useMutation(async (data) => {
    const response = await instance.post(`/user/social`, {}, { headers: { Code: data.code } });
    return response.data;
  }, {
    onSuccess: data => {
      alert("로그인 성공");
      setToken(data.accessToken, data.refreshToken);
      dispatch(setLoginStatus(true));
      navigate("/moum");
    },
    onError: err => {
      alert("로그인 실패");
      dispatch(setLoginStatus(false));
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