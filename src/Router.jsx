import { useCallback, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MyPage from "pages/MyPage";
import Search from "pages/Search";
import Moum from "pages/Moum";
import NotFound from "pages/NotFound";
import Intro from "pages/Intro";
import Test from "pages/Test";
import { getRefreshToken, removeToken, setToken } from "shared/localStorage";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLogin } from "state/common/user";
import Result from "pages/Result";
import User from "pages/User";
import Auth from "pages/Auth";

import ReactGA from "react-ga";
import { apiUser } from "utils/api/user";
import GlobalComponent from "components/Popup/GlobalComponent";
import { atomScrollState } from "state/common/scroll";

function Router() {
  const setLogin = useSetRecoilState(isLogin);
  const location = useLocation();

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    }
  }, [location]);

  const refreshLogin = useCallback(async () => {
    const token = getRefreshToken();
    if (token) {
      try {
        const response = await apiUser.refresh({ refreshToken: token });
        setToken(response.data.accessToken, response.data.refreshToken);
        setLogin(true);
      } catch (err) {
        removeToken();
        setLogin(false);
      }
    }
  }, [setLogin])

  useEffect(() => {
    refreshLogin();
  }, [refreshLogin]);

  // Recoil
  const [scrollState, setScrollState] = useRecoilState(atomScrollState);

  // Ref
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollState) {
      scrollRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end', 
        inline: 'nearest'
      });
      setScrollState(false);
    }
  }, [scrollState, setScrollState]);

  return (
    <>
      <div ref={scrollRef}></div>
      <GlobalComponent />
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/auth/:page" element={<Auth />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:keyword" element={<Result />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/moum" element={<Moum />} />
        <Route path="/moum/:folderId" element={<Moum />} />
        <Route path="/scrap" element={<Moum isScrap />} />
        <Route path="/scrap/:userId/:folderId" element={<Moum isScrap />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/user/:userId/:folderId" element={<User />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test/:name" element={<Test />} />
        <Route path="/" element={<Intro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
