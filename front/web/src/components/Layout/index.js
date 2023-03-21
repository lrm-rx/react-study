import { memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { headerLinks } from "@/common/local-data";
import { LayoutWraper } from "./style";

const Layout = memo(() => {
  return (
    <LayoutWraper>
      <header className="layout-header">
        <Header headerLinks={headerLinks} />
      </header>
      <main className="main-content-area">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <Footer />
      </footer>
    </LayoutWraper>
  );
});

export default Layout;
