import { useLocation, Outlet } from "umi";
import { SafeArea } from "antd-mobile";
import "normalize.css/normalize.css"; //全局引入
import { StoreProvider } from "think-react-store";
import * as store from "../stores";
import styles from "./index.less";
import { ErrorBoundary, MenuBar } from "@/components";

export default function Layout() {
  const location = useLocation();
  const paths = ["/", "/order", "/user"];

  return (
    <div>
      <SafeArea position="top" />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <MenuBar
        show={paths.includes(location.pathname)}
        pathname={location.pathname}
      />
      <SafeArea position="bottom" />
    </div>
  );
}
