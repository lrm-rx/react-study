const dayjs = require("dayjs");

module.exports = {
  base64Encode(str = "") {
    return new Buffer(str).toString("base64");
  },
  time() {
    return dayjs().format("YYYY-MM-DD HH:mm:ss");
  },
  timestamp(data) {
    return new Date(data).getTime();
  },
  unPick(source, array) {
    if (Array.isArray(array)) {
      const obj = {};
      for (const i in source) {
        if (Object.hasOwnProperty.call(source, i) && !array.includes(i)) {
          obj[i] = source[i];
        }
      }
      return obj;
    }
  },
};
