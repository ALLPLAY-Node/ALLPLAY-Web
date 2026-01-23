import { Outlet } from "react-router";
import Header from "./header/Header";

const Layout = () => {
  return (
    <div className="w-full px-4 py-2">
      <div className="mx-auto w-full max-w-[960px] flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
