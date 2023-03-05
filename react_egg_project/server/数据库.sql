create database egg_house;

use egg_house;

-- 用户表
create table `user` (
  `id` int not null auto_increment,
  `username` varchar(20) default null comment '用户名',
  `password` varchar(64) default null comment '',
  `avatar` longtext comment '头像',
  `phone` varchar(20) default null comment '电话',
  `sign` varchar(300) default null comment '用户签名',
  `createTime` timestamp default null comment '创建时间',
  `updateTime` timestamp default null comment '更新时间',
  primary key(`id`)
)engine=InnoDB auto_increment=1 default charset=utf8 comment='用户表';

-- 民宿表
create table `house`(
  `id` int not null auto_increment,
  `name` varchar(50) default null comment '房屋名称',
  `info` varchar(150) default null comment '房屋简介',
  `addres` varchar(200) default null comment '房屋地址',
  `price` int default null comment '房屋价格',
  `publishTime` timestamp default null comment '发布时间',
  `cityCode` varchar(10) not null comment '城市编码',
  `showCount` int(5) not null default 0 comment '展示次数',
  `startTime` timestamp default null comment '开始出租时间',
  `endTime` timestamp default null comment '出租结束时间',
  primary key(`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment='房屋表';

-- 图片表
create table `imgs`(
  `id` int not null auto_increment,
  `url` varchar(500) default null comment '图片地址',
  `houseId` int not null comment '房屋id',
  `createTime` timestamp default null comment '创建时间',
  primary key(`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment='图片表';

-- 评论表
create table `comment`(
  `id` int not null auto_increment,
  `userId` int not null comment '用户表id',
  `houseId` int not null comment '房屋表id',
  `msg` varchar(500) default null comment '评论内容',
  `createTime` timestamp default null comment '创建时间',
  primary key(`id`)
) engine=InnoDB auto_increment=1 default charset=utf8 comment='评论表';

-- 订单表
create table `orders`(
  `id` int not null auto_increment,
  `orderNumber` varchar(20) default null comment '订单编号',
  `userId` int not null comment '用户id',
  `houseId` int not null comment '房屋id',
  `isPayed` int default 0 comment '是否支付，0未支付，1已支付',
  `createTime` timestamp default null comment '创建时间',
  `updateTime` timestamp default null comment '更新时间',
  primary key(`id`)
)engine=InnoDB auto_increment=1 default charset=utf8 comment='订单表';


INSERT INTO `imgs` VALUES
(1,'https://5b0988e595225.cdn.sohucs.com/images/20181023/49199010439c4f819751cdb1c8043a8a.jpeg',1,'2020-08-11 13:37:57'),
(2,'https://5b0988e595225.cdn.sohucs.com/images/20171205/61601034a37249b0801c4a0a6130d2fe.jpeg',1,'2020-08-11 13:37:57'),
(3,'https://sghimages.shobserver.com/img/catch/2021/10/01/6242601f-0c60-4bd8-8e02-c6330fe59a29.jpg',1,'2020-08-11 13:37:57'),
(4,'https://5b0988e595225.cdn.sohucs.com/images/20181128/6bb1e7f87ced4cc8ac36526492f8453e.jpeg',2,'2020-08-11 13:37:57'),
(5,'https://5b0988e595225.cdn.sohucs.com/images/20180728/e9bc0cdfb3994aee8b2d5fc0d1b407be.jpeg',2,'2020-08-11 13:37:57'),
(6,'https://p6.itc.cn/q_70/images03/20210920/a01f9197039b44a38e4673bf9de4b4dd.png',3,'2020-08-11 13:37:57'),
(7,'https://n.sinaimg.cn/spider20220906/250/w600h450/20220906/2218-92adb02c50d21392e4264947128172e6.jpg',4,'2020-08-11 13:37:57'),
(8,'https://p5.itc.cn/q_70/images03/20211111/525e8958e26641a894dd0cea458d59a1.jpeg',5,'2020-08-11 13:37:57'),
(9,'https://img2.gujianchina.cn/201710/19/10265735311.jpg',6,'2020-08-11 13:37:57'),
(10,'https://pavo.elongstatic.com/i/Hotel870_470/nw_ICDnx4I0RG.jpg',7,'2020-08-11 13:37:57'),
(11,'https://img.zcool.cn/community/0109e95bed5d7ca80121ab5dfe0368.jpg@1280w_1l_2o_100sh.jpg',8,'2020-08-11 13:37:57'),
(12,'https://5b0988e595225.cdn.sohucs.com/images/20200303/253e042f7161486994954e76049fea27.jpeg',9,'2020-08-11 13:37:57'),
(13,'https://5b0988e595225.cdn.sohucs.com/images/20181023/49199010439c4f819751cdb1c8043a8a.jpeg',10,'2020-08-11 13:37:57'),
(14,'https://dingyue.ws.126.net/ilduDXgnLXPnM8lOGX8v2zRDyWfTny2LUM76OTvA7n=5p1530064861959transferflag.png',11,'2020-08-11 13:37:57'),
(15,'https://staticfileold.tujixiazai.com/wp-content/uploads/2018/10/f8d9bb249833bca6dc32ba8d1ebdec18.png',12,'2020-08-11 13:37:57'),
(16,'https://sghimages.shobserver.com/img/catch/2021/10/01/6242601f-0c60-4bd8-8e02-c6330fe59a29.jpg',13,'2020-08-11 13:37:57'),
(17,'https://sghimages.shobserver.com/img/catch/2021/10/01/6242601f-0c60-4bd8-8e02-c6330fe59a29.jpg',14,'2020-08-11 13:37:57'),
(18,'https://5b0988e595225.cdn.sohucs.com/images/20190129/2f5d7f56928148e7b7f07598921e3fa6.jpeg',15,'2020-08-11 13:37:57')
;