import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPage from "./pages/MyPage";
import Search from "./pages/Search";
import Moum from "./pages/Moum";
import NotFound from "./pages/NotFound";
import Write from "./pages/Write";
import Intro from "./pages/Intro";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<Write />} />
        <Route path="/moum" element={<Moum />} />
        <Route path="/" element={<Intro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
