import { history } from "umi";

export function onRouteChange(route) {
  const nowPath = route.clientRoutes[0].routes.filter(
    (item) => item.path === route.location.pathname
  );
  const isLogin = localStorage.getItem("token");

  if (nowPath.length === 1 && nowPath[0].auth && !isLogin) {
    history.push({
      pathname: "/login",
      search: `?from=${new Date().getTime()}`,
    });
  }
}
