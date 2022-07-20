import { useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import NewLogin from "pages/NewLogin"
import Register from "pages/Register";
import MyPage from "pages/MyPage";
import Search from "pages/Search";
import Moum from "pages/Moum";
import NotFound from "pages/NotFound";
import Intro from "pages/Intro";
import Test from "pages/Test";
import { getRefreshToken, removeToken, setToken } from "shared/localStorage";
import { useSetRecoilState } from "recoil";
import { isLogin } from "state/common/user";
import Result from "pages/Result";
import { executeTokenRefreshAxios } from "utils/api/auth";

function Router() {
  const setLogin = useSetRecoilState(isLogin);

  const refreshLogin = useCallback(async () => {
    const token = getRefreshToken();
    if (token) {
      try {
        const response = await executeTokenRefreshAxios(token);
        console.log("토큰 갱신 성공");
        setToken(response.data.accessToken, response.data.refreshToken);
        setLogin(true);
      } catch (err) {
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
      <Route path="/newlogin" element={<NewLogin />}/>
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search/:keyword" element={<Result />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/moum" element={<Moum />} />
      <Route path="/test" element={<Test />} />
      <Route path="/" element={<Intro />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
