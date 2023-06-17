const Mock = require("mockjs");
const Random = Mock.Random;

module.exports = [
  // 获取单个问卷信息
  {
    url: "/api/question/:id",
    method: "get",
    response() {
      return {
        code: 200,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
        },
      };
    },
  },
  // 创建问卷
  {
    url: "/api/question",
    method: "post",
    response() {
      return {
        code: 200,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
        },
      };
    },
  },
];
