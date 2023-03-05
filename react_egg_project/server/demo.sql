-- 删除数据库
drop database egg;

-- 创建数据库
create database egg;

-- 创建表
use egg;

create table if not exists user(
  id int(11) not null auto_increment,
  username varchar(20) not null default 'admin' comment '用户名',
  pwd varchar(50) not null comment '密码',
  primary key(id)
)engine=InnoDB charset=utf8;

-- 查看表
show tables;

-- 查看表结构
desc user;

-- 删除表
drop table user;

-- 插入表数据
insert into user values(1, 'ming', '123456');
insert into user(username, pwd) 
values('ming', '123456'),
('gala', '123456'),
('xiaohu', '123456');

-- 查看表数据
select * from user;
select id, name from user;
select id, name from user where id = 1;

--- 修改表数据
update user set pwd = '654321' where id = 1;

-- 删除表数据
delete from user where id = 2;