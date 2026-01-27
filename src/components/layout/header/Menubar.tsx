import { NavLink } from "react-router";

const Menubar = () => {
  return (
    <div className="flex items-end gap-[28px] text-[18px] shrink-0 whitespace-nowrap">
      <NavLink
        to="/spots"
        className={({ isActive }) =>
          `p-[10px] ${isActive ? "text-primary font-semibold" : ""}`
        }
      >
        시설 찾기
      </NavLink>
      <NavLink
        to="/spots/new"
        className={({ isActive }) =>
          `p-[10px] ${isActive ? "text-primary font-semibold" : ""}`
        }
      >
        시설 등록
      </NavLink>
      <NavLink
        to="/clubs"
        className={({ isActive }) =>
          `p-[10px] ${isActive ? "text-primary font-semibold" : ""}`
        }
      >
        동호회 찾기
      </NavLink>
      <NavLink
        to="/clubs/new"
        className={({ isActive }) =>
          `p-[10px] ${isActive ? "text-primary font-semibold" : ""}`
        }
      >
        동호회 등록
      </NavLink>
    </div>
  );
};

export default Menubar;
