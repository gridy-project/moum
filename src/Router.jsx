import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPage from "./pages/MyPage";
import Search from "./pages/Search";
import Moum from "./pages/Moum";
import NotFound from "./pages/NotFound";
import Write from "./pages/Write";
import Intro from "./pages/Intro";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { runRefresh } from "./redux/modules/userSlice";

function Router() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(runRefresh());
  }, [dispatch]);

  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/write" element={<Write />} />
        <Route path="/moum" element={<Moum />} />
        <Route path="/" element={<Intro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default Router;
