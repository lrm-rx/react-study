import { useState, useEffect, memo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import classnames from "classnames";
import Header from "../Header";
import Footer from "../Footer";
import { headerLinks } from "@/common/local-data";
import "@/common/common.scss";
import { LayoutWraper } from "./style";

const Layout = memo(() => {
  const location = useLocation();
  const [fixHeaderAndFooter, setFixHeaderAndFooter] = useState(true);
  useEffect(() => {
    if (location.pathname === "/articles") {
      setFixHeaderAndFooter(false);
      return;
    }
    setFixHeaderAndFooter(true);
  }, [location]);
  return (
    <LayoutWraper>
      <header className={classnames({ ["layout-header"]: fixHeaderAndFooter })}>
        <Header headerLinks={headerLinks} />
      </header>
      <main
        className={classnames({ ["main-content-area"]: fixHeaderAndFooter })}
      >
        <Outlet />
      </main>
      <footer className={classnames({ ["layout-footer"]: fixHeaderAndFooter })}>
        <Footer />
      </footer>
    </LayoutWraper>
  );
});

export default Layout;
