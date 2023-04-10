import { memo } from "react";
import { NavLink } from "react-router-dom";
import { AboutWraper } from "./style";
import AboutBgImg from "@assets/images/bg5.jpg";

const About = memo(() => {
  return (
    <AboutWraper aboutBg={AboutBgImg}>
      <div className="about">
        <h2 className="title">关于本站</h2>
        <div className="content">
          后端使用 koa2 + sequelize + mysql + redis 实现,前端分别使用 react18 +
          Ant Design 5 + redux-toolkit和vite + vue3 + element plus + pinia实现,
          主要实现了:
          <div className="site-explain">
            <ul>
              <li>1.用户管理</li>
              <li>2.文章管理</li>
              <li>3.文章分类管理</li>
              <li>4.文章标签管理</li>
              <li>5.评论管理</li>
              <li>6.邮件发送验证码</li>
              <li>......</li>
              <li>的增删改查</li>
            </ul>
            <ul className="site-address">
              <li>
                1.前台展示:
                <NavLink to="http://8.134.99.193:8081" target="_blank">
                  http://8.134.99.193:8081
                </NavLink>
              </li>
              <li>
                2.后台管理:
                <NavLink to="http://8.134.99.193:8080" target="_blank">
                  http://8.134.99.193:8080
                </NavLink>
              </li>
              <li>
                账号: admin
                <br />
                密码: a123456
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AboutWraper>
  );
});

export default About;
