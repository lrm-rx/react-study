import { memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import { headerLinks } from "@/common/local-data";

const Layout = memo(() => {
  return (
    <div>
      <Header headerLinks={headerLinks} />
      <Outlet />
    </div>
  );
});

export default Layout;
