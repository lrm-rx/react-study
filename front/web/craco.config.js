const path = require("path");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
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
  },
};
