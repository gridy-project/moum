import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function useLoginStatus () {
  const navigate = useNavigate();
  const {isLogin, isLoad} = useSelector(state => state.user);

  const checkLogin = () => {
    if (isLoad === true && !isLogin) {
      alert("로그인이 필요합니다");
      navigate("/");
    }
  }

  return checkLogin;
}

export default useLoginStatus;