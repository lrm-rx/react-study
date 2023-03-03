import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite";
import path, { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;
  const { VITE_PUBLIC_PATH } = viteEnv;
  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    plugins: [vue(), vueJsx()],
  };
};
