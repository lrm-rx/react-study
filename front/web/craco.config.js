const path = require("path");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  devServer: {
    proxy: {
      "/api/v1": {
        target: "http://127.0.0.1:3006/api/v1",
        changeOrigin: true,
        pathRewrite: {
          "^/api/v1": "",
        },
      },
    },
  },
  webpack: {
    alias: {
      "@": resolve("src"),
      "@assets": resolve("src/assets"),
      "@common": resolve("src/common"),
      "@components": resolve("src/components"),
      "@hooks": resolve("src/hooks"),
      "@views": resolve("src/views"),
      "@store": resolve("src/store"),
      "@utils": resolve("src/utils"),
      "@service": resolve("src/service"),
    },
    // devServer: {
    //   proxy: {
    //     "/api/v1": {
    //       target: "http://127.0.0.1:3006/api/v1",
    //       changeOrigin: true,
    //       pathRewrite: {
    //         "^/api": "/api/v1",
    //       },
    //     },
    //   },
    // },
  },
};
