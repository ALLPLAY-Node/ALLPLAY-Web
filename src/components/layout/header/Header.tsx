import Logo from "@/assets/logo.png";
import Menubar from "./Menubar";
import Search from "./Search";
import Topbar from "./Topbar";

const Header = () => {
  return (
    <div>
      <Topbar />
      <header className="w-full h-[45px] flex items-center gap-6">
        <img src={Logo} alt="로고" className="w-[140px] h-[45px] shrink-0" />
        <nav className="shrink-0 whitespace-nowrap">
          <Menubar />
        </nav>
        <div className="ml-auto min-w-0 flex-1 flex justify-end">
          <Search />
        </div>
      </header>
    </div>
  );
};

export default Header;
