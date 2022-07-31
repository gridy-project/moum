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

import Swal from "sweetalert2";
import tw from "twin.macro";

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
    return await executeSignInWithGoogleAxios(data.code);
  }, {
    onSuccess: response => {
      if (response.data) {
        setToken(response.data.accessToken, response.data.refreshToken);
        setLogin(true);
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "해당 이메일로 가입된 계정이 있습니다."
        });
        setLogin(false);
      }
    },
    onError: err => {
      Swal.fire({
        icon: "error",
        title: "소셜 로그인 실패"
      })
      setLogin(false);
    }
  });

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (data) => {
      login(data);
    },
    onError: (data) => {
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
  background: #F8F8F8;
  border: #E9E9E9;
  ${tw`
    w-[360px] h-[44px] rounded-[50px] border-solid border-[1px] flex justify-center items-center relative cursor-pointer
  `} 
  img {
    ${tw`
    w-[16px] h-[16px] 
    `} 
  }
  p {
    ${tw`
      ml-[10px]
    `} 
  }
  &:hover {
    background: #E9E9E9;
  }
`;