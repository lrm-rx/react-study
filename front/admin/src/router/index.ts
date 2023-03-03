import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const Layout = () => import("@/layout/index.vue");

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    // component: Layout,
    redirect: "/login",
    children: [],
  },
];

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes,
});

export default router;
