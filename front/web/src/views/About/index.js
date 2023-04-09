import { memo } from "react";
import { AboutWraper } from "./style";
import AboutBgImg from "@assets/images/bg5.jpg";

const About = memo(() => {
  return (
    <AboutWraper aboutBg={AboutBgImg}>
      <div className="about">
        <h2 className="title">关于本站</h2>
        <div className="content">
          本站是学习前端开发的demo,前端是用 react + axios +
          redux-toolkit实现,后端是用 koa + mysql + sequelize + redis 实现的.
        </div>
      </div>
    </AboutWraper>
  );
});

export default About;
