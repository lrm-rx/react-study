import { useLocation, Outlet } from "umi";
import { SafeArea } from "antd-mobile";
import "normalize.css/normalize.css"; //全局引入
import { Provider } from "react-redux";
import { store } from "../stores";
import styles from "./index.less";
import { ErrorBoundary, MenuBar } from "@/components";

export default function Layout() {
  const location = useLocation();
  const paths = ["/", "/order", "/user"];

  return (
    <Provider store={store}>
      <SafeArea position="top" />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <MenuBar
        show={paths.includes(location.pathname)}
        pathname={location.pathname}
      />
      <SafeArea position="bottom" />
    </Provider>
  );
}
