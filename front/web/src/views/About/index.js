import { memo } from "react";
import { AboutWraper } from "./style";
import AboutBgImg from "@/assets/images/bg5.jpg";

const About = memo(() => {
  return <AboutWraper aboutBg={AboutBgImg}>关于</AboutWraper>;
});

export default About;
