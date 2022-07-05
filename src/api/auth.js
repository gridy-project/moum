import { setLoginStatus } from "../redux/modules/userSlice";
import { instance } from "../shared/axios";
import { getRefreshToken, removeToken, setToken } from "../shared/localStorage";

export const JWT_REFRESH_TIME = 3600 * 1000 - 60000;
export const refresh = async (dispatch, navigate) => { // 새로고침시 리프레시 토큰으로 액세스 토큰과 리프레시 토큰을 다시 받아 저장한다
  const token = getRefreshToken();

  if (token) {
    try {
      console.log("토큰 갱신");
      const response = await instance.post("/user/refresh", {}, { headers: { RefreshToken: `Bearer ${token}` } });
      const { accessToken, refreshToken } = response.data;
      setToken(accessToken, refreshToken);

      if (dispatch) { // dispatch 함수가 있을 경우 로그인 성공시 리덕스에서 로그인 상태 true로 변경
        dispatch(setLoginStatus(true));
      }
      if (navigate) { // navigate 함수가 있을 경우 로그인 성공시 모음 페이지로 이동
        navigate("/moum");
      }

      setTimeout(refresh, JWT_REFRESH_TIME); // 59분마다 토큰 갱신
    } catch (err) {
      console.log("토큰 갱신 실패");

      if (dispatch) { // dispatch 함수가 있을 경우 로그인 갱신 실패시 리덕스에서 로그인 상태 false로 변경
        dispatch(setLoginStatus(false));
      }
      if (navigate) { // navigate 함수가 있을 경우 로그인 갱신 실패시 리덕스에서 로그인 페이지로 이동
        navigate("/login");
      }

      removeToken();
    }
  }
}

export const signIn = async (data) => {
  try {
    const response = await instance.post(`/user/login`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const signUp = async (data) => {
  try {
    const response = await instance.post(`/user/login`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export const signInWithGoogle = async (code) => {
  try {
    const response = await instance.post(`/user/social`, {}, {
      headers: { Code: code }
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};