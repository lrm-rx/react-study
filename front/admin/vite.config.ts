import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
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
          target: "http://127.0.0.1:3006/api/v1",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/v1/, ""),
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      createHtmlPlugin({
        inject: {
          data: {
            title: viteEnv.VITE_GLOB_APP_TITLE,
          },
        },
      }),
    ],
    // * 打包去除 console.log && debugger
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
};
