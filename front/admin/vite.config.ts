import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite";
import path, { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;
  const { VITE_PUBLIC_PATH } = viteEnv;
  return {
    base: "./",
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`,
        },
      },
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // 跨域代理配置
      proxy: {
        "/api/v1": {
          target: "https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e", // easymock
          // target: "https://www.fastmock.site/mock/f81e8333c1a9276214bcdbc170d9e0a0", // fastmock
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/v1/, ""),
        },
      },
    },
    plugins: [vue(), vueJsx()],
  };
};
