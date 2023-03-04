export default {
  "post /api/user/detail": (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 10,
        username: "测试用户",
        avatar:
          "https://5b0988e595225.cdn.sohucs.com/images/20181023/49199010439c4f819751cdb1c8043a8a.jpeg",
        tel: 123456789001,
        sign: "花桥流水",
      },
    });
  },
  "post /api/user/edit": (req, res) => {
    res.json({
      status: 200,
      data: "ok",
    });
  },
  "post /api/user/login": (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 100,
        username: "admin",
      },
    });
  },
  "post /api/user/register": (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 100,
        username: "admin",
      },
    });
  },
};
