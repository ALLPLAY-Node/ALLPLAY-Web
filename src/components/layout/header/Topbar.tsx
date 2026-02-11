import { Link } from "react-router";
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
    <div className="flex justify-end gap-[24px] py-2 text-sm">
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
      <Link
        to="/mypage"
        className="flex jusity-center items-center gap-1"
      ></Link>
      마이페이지
      <Link to="/mypage" className="flex items-center justify-center gap-1">
        {"\uB9C8\uC774\uD398\uC774\uC9C0"}
      </Link>
      <Link to="/help" className="flex items-center justify-center gap-1">
        {"\uB3C4\uC6C0\uB9D0"}
      </Link>
    </div>
  );
};

export default Topbar;
