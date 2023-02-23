export default {
  "post /api/commons/citys": (req, res) => {
    res.json({
      status: 200,
      data: [
        [
          { label: "杭州", value: "10001" },
          { label: "苏州", value: "10002" },
        ],
      ],
    });
  },
  "post /api/house/hot": (req, res) => {
    res.json({
      status: 200,
      data: [
        {
          id: 1,
          img: "https://5b0988e595225.cdn.sohucs.com/images/20181023/49199010439c4f819751cdb1c8043a8a.jpeg",
          title: "东城民宿",
          info: "东城区交通方便",
          price: "100",
        },
        {
          id: 2,
          img: "https://5b0988e595225.cdn.sohucs.com/images/20171205/61601034a37249b0801c4a0a6130d2fe.jpeg",
          title: "西城民宿",
          info: "西城区山水怡情",
          price: "120",
        },
        {
          id: 3,
          img: "https://sghimages.shobserver.com/img/catch/2021/10/01/6242601f-0c60-4bd8-8e02-c6330fe59a29.jpg",
          title: "新区民宿",
          info: "新区民宿位置优越",
          price: "200",
        },
        {
          id: 4,
          img: "https://5b0988e595225.cdn.sohucs.com/images/20181128/6bb1e7f87ced4cc8ac36526492f8453e.jpeg",
          title: "老城民宿",
          info: "老城区风景秀美",
          price: "220",
        },
      ],
    });
  },
};
