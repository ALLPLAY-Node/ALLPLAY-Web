import { Link } from "react-router";
import { BsPerson } from "react-icons/bs";
import { GrLogin } from "react-icons/gr";

const Topbar = () => {
  return (
    <div className="flex justify-end gap-[24px] text-sm py-2">
      <Link to="/join" className="flex jusity-center items-center gap-1">
        <BsPerson size={18} />
        회원가입
      </Link>
      <Link to="/login" className="flex jusity-center items-center gap-1">
        <GrLogin size={18} />
        로그인
      </Link>
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
