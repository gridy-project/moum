import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPage from "./pages/MyPage";
import Search from "./pages/Search";
import Moum from "./pages/Moum";
import NotFound from "./pages/NotFound";
import Intro from "./pages/Intro";
import Test from "./pages/Test";
import { getRefreshToken, removeToken, setToken } from "./shared/localStorage";
import { refresh } from "./api/auth";
import { useSetRecoilState } from "recoil";
import { isLogin } from "./atoms/user";

function Router() {
  const setLogin = useSetRecoilState(isLogin);

  const refreshLogin = useCallback(async () => {
    const token = getRefreshToken();
    if (token) {
      const { result, data } = await refresh(token);

      if (result) {
        console.log("토큰 갱신 성공");
        setToken(data.accessToken, data.refreshToken);
        setLogin(true);
      } else {
        console.log("토큰 갱신 실패");
        removeToken();
        setLogin(false);
      }
    }
  }, [setLogin])

  useEffect(() => {
    refreshLogin();
  }, [refreshLogin]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<Search />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/moum" element={<Moum />} />
      <Route path="/test" element={<Test />} />
      <Route path="/" element={<Intro />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
