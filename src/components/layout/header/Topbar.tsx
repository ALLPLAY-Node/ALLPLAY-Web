import { Link } from "react-router";
import { BsPerson } from "react-icons/bs";
import { GrLogin } from "react-icons/gr";

const Topbar = () => {
  return (
    <div className="flex justify-end gap-[24px] py-2 text-sm">
      <Link to="/join" className="flex items-center justify-center gap-1">
        <BsPerson size={18} />
        {"\uD68C\uC6D0\uAC00\uC785"}
      </Link>
      <Link to="/login" className="flex items-center justify-center gap-1">
        <GrLogin size={18} />
        {"\uB85C\uADF8\uC778"}
      </Link>
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
