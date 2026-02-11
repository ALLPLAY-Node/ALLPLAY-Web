import { Link, useNavigate } from "react-router";
import { GrLogin, GrLogout } from "react-icons/gr";
// import { logout } from "@/api/logout";
import { useAuthStore } from "@/stores/authStore";

const Topbar = () => {
  const navigate = useNavigate();

  const accessToken = useAuthStore((s) => s.accessToken);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = async () => {
    clearAuth();
    navigate("/");
  };

  return (
    <div className="flex justify-end gap-[24px] text-sm py-2">
      {accessToken ? (
        <button
          className="flex justify-center items-center gap-1"
          onClick={handleLogout}
        >
          <GrLogout size={18} />
          로그아웃
        </button>
      ) : (
        <Link to="/login" className="flex justify-center items-center gap-1">
          <GrLogin size={18} />
          로그인
        </Link>
      )}
      <Link to="/mypage" className="flex justify-center items-center gap-1">
        마이페이지
      </Link>
      <Link to="/help" className="flex justify-center items-center gap-1">
        도움말
      </Link>
    </div>
  );
};

export default Topbar;
