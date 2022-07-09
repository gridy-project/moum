import { createSlice } from "@reduxjs/toolkit";
import { refresh, signIn, signInWithGoogle } from "../../api/auth";
import { getRefreshToken, removeToken, setToken } from "../../shared/localStorage";

export function runLogin({ username, password }, navigate) {
  return async (dispatch) => {
    const { result, data } = await signIn({ username, password });
    if (result) {
      alert("로그인 성공");
      setToken(data.accessToken, data.refreshToken);
      dispatch(setLoginStatus(true));
      navigate("/moum");
    } else {
      dispatch(setLoginStatus(false));
      alert("로그인 실패");
    }
  }
}

export function runLoginSocial({ code }, navigate) {
  return async (dispatch) => {
    const { result, data } = await signInWithGoogle(code);
    if (result) {
      alert("로그인 성공");
      setToken(data.accessToken, data.refreshToken);
      dispatch(setLoginStatus(true));
      navigate("/moum");
    } else {
      alert("로그인 실패");
      dispatch(setLoginStatus(false));
    }
  }
}

export function runRefresh() {
  return async (dispatch) => {
    // const JWT_REFRESH_TIME = 3600 * 1000 - 60000;
    const token = getRefreshToken();

    if (token) {
      const { result, data } = await refresh(token);

      if (result) {
        console.log("토큰 갱신 성공");
        setToken(data.accessToken, data.refreshToken);
        dispatch(setLoginStatus(true));
      } else {
        console.log("토큰 갱신 실패");
        removeToken();
        dispatch(setLoginStatus(false));
      }
    }
  }
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    isLoad: false
  },
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLogin = action.payload;
      state.isLoad = true;
    }
  },
});

export const { setLoginStatus } = userSlice.actions;
export default userSlice.reducer;
