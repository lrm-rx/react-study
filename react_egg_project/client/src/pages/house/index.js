import React, { useState, useEffect } from "react";
import { useStoreHook } from "think-react-store";
import Banner from "./components/Banner";
import Info from "./components/Info";
import Lists from "./components/Lists";
import Footer from "./components/Footer";
import "./index.less";

export default function (props) {
  // const {
  //   house: { detail, getDetailAsync },
  // } = useStoreHook();

  useEffect(() => {
    // getDetailAsync({});
  }, []);

  return (
    <div className="house-page">
      {/* banner */}
      <Banner />
      {/* 房屋信息 */}
      <Info />
      {/* 评论列表 */}
      <Lists />
      {/* footer */}
      <Footer />
    </div>
  );
}
