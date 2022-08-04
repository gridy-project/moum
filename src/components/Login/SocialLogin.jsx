import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from "styled-components";
import { isLogin } from 'state/common/user';
import { setToken } from 'shared/localStorage';

import googlelogo from "assets/images/pages/login/google_logo.png";

import Swal from "sweetalert2";
import tw from "twin.macro";
import useMessageFloat from 'hooks/useMessageFloat';
import { useExecuteLoginSocial } from 'hooks/query/useQueryUser';

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
  const toast = useMessageFloat();

  const {mutateAsync: login} = useExecuteLoginSocial();

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (data) => {
      try {
        const {result, data: token} = await login({code: data.code});
        if (result) {
          setToken(token.accessToken, token.refreshToken);
          setLogin(true);
          toast("로그인 되었습니다");
          navigate("/moum");
        } else {
          Swal.fire({
            icon: "error",
            title: "해당 이메일로 가입된 계정이 있습니다."
          });
          setLogin(false);
        }
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "소셜 로그인 실패"
        })
        setLogin(false);
      }
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
  ${tw`
    bg-[#F8F8F8] border-[#d8d8d8] w-[360px] h-[44px] rounded-[50px] border-solid border-[1px] flex justify-center items-center relative cursor-pointer
  `}
  img {
    ${tw`
    w-[16px] h-[16px] 
    `} 
  }
  p {
    ${tw`
      ml-[10px] font-semibold
    `} 
  }
  &:hover {
    background: #E9E9E9;
  }

  @media screen and (max-width: 1600px) {
    ${tw`h-40 w-330 text-14`}
  }
`;