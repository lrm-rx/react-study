export default {
  "post /api/house/search": (req, res) => {
    setTimeout(() => {
      let data;
      if (req.body.pageNum < 4) {
        data = [
          {
            id: 1,
            img: "https://5b0988e595225.cdn.sohucs.com/images/20180728/e9bc0cdfb3994aee8b2d5fc0d1b407be.jpeg",
            title: "东城民宿",
            info: "东城区交通方便",
            price: "100",
          },
          {
            id: 2,
            img: "https://p6.itc.cn/q_70/images03/20210920/a01f9197039b44a38e4673bf9de4b4dd.png",
            title: "西城民宿",
            info: "西城区山水怡情",
            price: "120",
          },
          {
            id: 3,
            img: "https://n.sinaimg.cn/spider20220906/250/w600h450/20220906/2218-92adb02c50d21392e4264947128172e6.jpg",
            title: "新区民宿",
            info: "新区民宿位置优越",
            price: "200",
          },
          {
            id: 4,
            img: "https://p5.itc.cn/q_70/images03/20211111/525e8958e26641a894dd0cea458d59a1.jpeg",
            title: "老城民宿",
            info: "老城区风景秀美",
            price: "220",
          },
          {
            id: 5,
            img: "https://img2.gujianchina.cn/201710/19/10265735311.jpg",
            title: "东城民宿",
            info: "东城区交通方便",
            price: "100",
          },
          {
            id: 6,
            img: "https://pavo.elongstatic.com/i/Hotel870_470/nw_ICDnx4I0RG.jpg",
            title: "西城民宿",
            info: "西城区山水怡情",
            price: "120",
          },
          {
            id: 7,
            img: "https://img.zcool.cn/community/0109e95bed5d7ca80121ab5dfe0368.jpg@1280w_1l_2o_100sh.jpg",
            title: "新区民宿",
            info: "新区民宿位置优越",
            price: "200",
          },
          {
            id: 8,
            img: "https://5b0988e595225.cdn.sohucs.com/images/20200303/253e042f7161486994954e76049fea27.jpeg",
            title: "老城民宿",
            info: "老城区风景秀美",
            price: "220",
          },
        ];
      } else {
        data = [];
      }
      res.json({
        status: 200,
        data,
      });
    }, 500);
  },
  "post /api/house/detail": (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 8,
        banner: [
          "https://5b0988e595225.cdn.sohucs.com/images/20181023/49199010439c4f819751cdb1c8043a8a.jpeg",
          "https://dingyue.ws.126.net/ilduDXgnLXPnM8lOGX8v2zRDyWfTny2LUM76OTvA7n=5p1530064861959transferflag.png",
          "https://staticfileold.tujixiazai.com/wp-content/uploads/2018/10/f8d9bb249833bca6dc32ba8d1ebdec18.png",
        ],
        info: {
          title: "老城民宿",
          msg: "老城区风景秀美",
          price: "220",
          publishTime: 1595238771000,
          startTime: 1595238771000,
          endTime: 1597917171000,
        },
      },
    });
  },
  "post /api/comments/lists": (req, res) => {
    setTimeout(() => {
      let data;
      if (req.body.pageNum < 4) {
        data = [
          {
            id: 1,
            avatar:
              "https://sghimages.shobserver.com/img/catch/2021/10/01/6242601f-0c60-4bd8-8e02-c6330fe59a29.jpg",
            username: "ming",
            createTime: 1595238771000,
            info: "房屋很满意",
          },
          {
            id: 2,
            avatar:
              "https://sghimages.shobserver.com/img/catch/2021/10/01/6242601f-0c60-4bd8-8e02-c6330fe59a29.jpg",
            username: "xiaohu",
            createTime: 1595238771000,
            info: "空气清新",
          },
          {
            id: 3,
            avatar:
              "https://5b0988e595225.cdn.sohucs.com/images/20190129/2f5d7f56928148e7b7f07598921e3fa6.jpeg",
            username: "letme",
            createTime: 1595238771000,
            info: "态度温和",
          },
          {
            id: 4,
            avatar:
              "https://5b0988e595225.cdn.sohucs.com/images/20200419/fb58b8e841cd4d3d82097a03315828e2.jpeg",
            username: "uzi",
            createTime: 1595238771000,
            info: "早餐味道美",
          },
          {
            id: 5,
            avatar:
              "https://sghimages.shobserver.com/img/catch/2021/10/01/6242601f-0c60-4bd8-8e02-c6330fe59a29.jpg",
            username: "gala",
            createTime: 1595238771000,
            info: "态度温和",
          },
          {
            id: 6,
            avatar:
              "https://n.sinaimg.cn/sinacn20190716s/133/w1041h692/20190716/7ee1-hzxsvnn5375025.jpg",
            username: "lwx",
            createTime: 1595238771000,
            info: "早餐味道美",
          },
          {
            id: 7,
            avatar:
              "https://p8.itc.cn/q_70/images03/20210922/00e3d3ac96f8434ba5758bd4e3ffa0f4.jpeg",
            username: "lpl",
            createTime: 1595238771000,
            info: "态度温和",
          },
          {
            id: 8,
            avatar:
              "https://pic1.zhimg.com/v2-c979315e4cf3011a9965a375cb07e8ac_r.jpg",
            username: "lrm",
            createTime: 1595238771000,
            info: "早餐味道美",
          },
        ];
      } else {
        data = [];
      }
      res.json({
        status: 200,
        data,
      });
    }, 100);
  },
  "post /api/comments/add": (req, res) => {
    res.json({
      status: 200,
      data: "ok",
    });
  },
};
