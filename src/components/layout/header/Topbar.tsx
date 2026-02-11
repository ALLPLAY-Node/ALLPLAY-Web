import { Link } from "react-router";
import { BsPerson } from "react-icons/bs";
import { GrLogin, GrLogout } from "react-icons/gr";
import { logout } from "@/api/logout";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Topbar = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      localStorage.clear();
      setAccessToken(null);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="flex justify-end gap-[24px] text-sm py-2">
      <Link to="/join" className="flex jusity-center items-center gap-1">
        <BsPerson size={18} />
        회원가입
      </Link>
      {accessToken ? (
        <button
          className="flex jusity-center items-center gap-1"
          onClick={handleLogout}
        >
          <GrLogout size={18} />
          로그아웃
        </button>
      ) : (
        <Link to="/login" className="flex jusity-center items-center gap-1">
          <GrLogin size={18} />
          로그인
        </Link>
      )}
      <Link to="/mypage" className="flex jusity-center items-center gap-1">
        마이페이지
      </Link>
      <Link to="/help" className="flex jusity-center items-center gap-1">
        도움말
      </Link>
    </div>
  );
};

export default Topbar;
